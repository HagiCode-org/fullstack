import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, rm, writeFile, rename, mkdir } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import { cn } from '../../src/lib/utils.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

// Values pinned to repos/web/components.json. Only the CSS entry differs, because the sites are separate repositories.
const PINNED_CONFIG = {
  style: 'radix-nova',
  rsc: false,
  tsx: true,
  tailwind: { config: '', css: 'src/styles/global.css', baseColor: 'neutral', cssVariables: true, prefix: '' },
  iconLibrary: 'lucide',
  aliases: {
    components: '@/components',
    utils: '@/lib/utils',
    ui: '@/components/ui',
    lib: '@/lib',
    hooks: '@/hooks',
  },
  menuColor: 'default',
  menuAccent: 'bold',
};

const SEED_COMPONENTS = ['button', 'card'];
const SEED_DIR = 'src/components/ui';
const UTILS_PATH = 'src/lib/utils.ts';
const GLOBAL_CSS = 'src/styles/global.css';
const ALIAS_PREFIX = '@/';

// Token names from the shadcn set. Each one must be defined for light and dark, and bridged into @theme inline.
const COLOR_TOKENS = [
  'background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground',
  'primary', 'primary-foreground', 'secondary', 'secondary-foreground', 'muted', 'muted-foreground',
  'accent', 'accent-foreground', 'destructive', 'border', 'input', 'ring',
];
const TOKENS = [...COLOR_TOKENS, 'radius'];

// Element rules that must sit inside @layer base, so a utility class always beats them.
const BASE_RULES = ['body', 'main', 'h1', 'p', 'a', ':focus-visible'];

// Index of the brace that closes the block opened at `open`.
function closingBrace(text, open) {
  let depth = 0;
  for (let index = open; index < text.length; index += 1) {
    if (text[index] === '{') depth += 1;
    if (text[index] === '}') {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

// Body of the first block that starts with `header`, or '' when the header is absent.
function blockBody(text, header) {
  const start = text.indexOf(header);
  if (start === -1) return '';
  const open = text.indexOf('{', start);
  return text.slice(open + 1, closingBrace(text, open));
}

// Package name of a bare import specifier, such as `radix-ui` or `@scope/name/sub`.
function packageName(specifier) {
  const parts = specifier.split('/');
  return specifier.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
}

// Collects the failures for the shadcn foundation under `base`. Returns a list of messages naming each item.
export async function collectFailures(base, { manifest } = {}) {
  const failures = [];
  const readText = (file) => readFile(path.join(base, file), 'utf8');

  const config = JSON.parse(await readText('components.json'));
  for (const [key, expected] of Object.entries(PINNED_CONFIG)) {
    if (key === 'aliases' || key === 'tailwind') continue;
    if (JSON.stringify(config[key]) !== JSON.stringify(expected)) {
      failures.push(`components.json ${key} must be ${JSON.stringify(expected)}, found ${JSON.stringify(config[key])}`);
    }
  }
  for (const [key, expected] of Object.entries(PINNED_CONFIG.tailwind)) {
    if (JSON.stringify(config.tailwind?.[key]) !== JSON.stringify(expected)) {
      failures.push(`components.json tailwind.${key} must be ${JSON.stringify(expected)}, found ${JSON.stringify(config.tailwind?.[key])}`);
    }
  }
  for (const [key, expected] of Object.entries(PINNED_CONFIG.aliases)) {
    if (config.aliases?.[key] !== expected) {
      failures.push(`components.json alias ${key} must be ${expected}, found ${config.aliases?.[key]}`);
    }
  }

  const tsconfig = JSON.parse(await readText('tsconfig.json'));
  if (tsconfig.compilerOptions?.paths?.['@/*']?.[0] !== './src/*') {
    failures.push('tsconfig.json must map "@/*" to "./src/*" so the components aliases resolve inside src/');
  }

  const pkg = manifest ?? JSON.parse(await readText('package.json'));
  const declared = new Set([...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.devDependencies ?? {})]);
  for (const name of ['@hagicode/hagilight', '@hagicode/hagilight-core']) {
    if (!pkg.dependencies?.[name]) failures.push(`package.json must keep ${name} pinned in dependencies`);
  }

  let utilsSource = null;
  try {
    utilsSource = await readText(UTILS_PATH);
  } catch {
    failures.push(`${UTILS_PATH} is missing; the cn() helper must exist at the utils alias`);
  }
  if (utilsSource !== null && !/export\s+function\s+cn\b/u.test(utilsSource)) {
    failures.push(`${UTILS_PATH} must export cn()`);
  }

  for (const component of SEED_COMPONENTS) {
    const file = `${SEED_DIR}/${component}.tsx`;
    let source;
    try {
      source = await readText(file);
    } catch {
      failures.push(`seed component ${component} is missing: ${file}`);
      continue;
    }
    if (!/from\s+["']@\/lib\/utils["']/u.test(source)) {
      failures.push(`seed component ${component} must import cn through "@/lib/utils"`);
    }
    if (/from\s+["'](?:\.\.?\/)+(?:[^"']*\/)?lib\/utils["']/u.test(source)) {
      failures.push(`seed component ${component} must not reach the helper through a relative path`);
    }
    for (const [, specifier] of source.matchAll(/from\s+["']([^"']+)["']/gu)) {
      if (specifier.startsWith('.') || specifier.startsWith(ALIAS_PREFIX)) continue;
      const name = packageName(specifier);
      if (!declared.has(name)) {
        failures.push(`seed component ${component} imports "${name}", which is not declared in package.json`);
      }
    }
  }

  let css = null;
  try {
    css = await readText(GLOBAL_CSS);
  } catch {
    failures.push(`${GLOBAL_CSS} is missing`);
  }
  if (css !== null) {
    const rootLight = blockBody(css, ':root {');
    const rootDark = blockBody(css, '@media (prefers-color-scheme: dark) {');
    const themeInline = blockBody(css, '@theme inline');
    for (const token of TOKENS) {
      if (!new RegExp(`--${token}:`, 'u').test(rootLight)) {
        failures.push(`${GLOBAL_CSS} must define the light token --${token} on :root`);
      }
    }
    for (const token of COLOR_TOKENS) {
      if (!new RegExp(`--${token}:`, 'u').test(rootDark)) {
        failures.push(`${GLOBAL_CSS} must define the dark token --${token} under prefers-color-scheme: dark`);
      }
    }
    for (const token of COLOR_TOKENS) {
      if (!new RegExp(`--color-${token}:\\s*var\\(--${token}\\)`, 'u').test(themeInline)) {
        failures.push(`${GLOBAL_CSS} must bridge --${token} into @theme inline as --color-${token}`);
      }
    }
    const layerBody = blockBody(css, '@layer base {');
    if (!layerBody) {
      failures.push(`${GLOBAL_CSS} must keep its element rules inside @layer base`);
    }
    for (const rule of BASE_RULES) {
      const selector = new RegExp(`(^|[\\s,}])${rule.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')}\\s*[{,]`, 'mu');
      if (!selector.test(layerBody)) {
        failures.push(`${GLOBAL_CSS} must define the element rule "${rule}" inside @layer base`);
      }
    }
    for (const [legacy, token] of [['--color-bg', 'background'], ['--color-fg', 'foreground'], ['--color-muted', 'muted-foreground']]) {
      if (!new RegExp(`${legacy}:\\s*var\\(--${token}\\)`, 'u').test(rootLight)) {
        failures.push(`${GLOBAL_CSS} must alias the legacy ${legacy} to --${token}`);
      }
    }
  }

  return failures;
}

// Copies the foundation files into a temporary directory so a test can break one item without touching the repository.
async function copyFoundation() {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'shadcn-foundation-'));
  for (const file of ['components.json', 'package.json', 'tsconfig.json', UTILS_PATH, GLOBAL_CSS]) {
    await mkdir(path.dirname(path.join(dir, file)), { recursive: true });
    await cp(path.join(root, file), path.join(dir, file));
  }
  await cp(path.join(root, SEED_DIR), path.join(dir, SEED_DIR), { recursive: true });
  return dir;
}

describe('cn helper', () => {
  it('keeps the later of two conflicting utility classes', () => {
    assert.equal(cn('p-2 text-sm', 'p-4'), 'text-sm p-4');
  });

  it('drops falsy and conditional values that do not apply', () => {
    assert.equal(cn('font-medium', false, undefined, null, '', 0, ['rounded-lg', false], { hidden: false, block: true }), 'font-medium rounded-lg block');
  });
});

describe('shadcn foundation in the repository', () => {
  it('passes every check on the current files', async () => {
    assert.deepEqual(await collectFailures(root), []);
  });

  it('names a seed import that the manifest does not declare', async () => {
    const manifest = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
    delete manifest.dependencies['radix-ui'];
    const failures = await collectFailures(root, { manifest });
    assert.ok(
      failures.some((message) => message.includes('"radix-ui"') && message.includes('not declared in package.json')),
      `expected a failure naming radix-ui, got: ${failures.join('; ')}`,
    );
  });
});

describe('shadcn foundation guard catches breakage', () => {
  it('names a deleted seed component', async () => {
    const dir = await copyFoundation();
    try {
      await rm(path.join(dir, SEED_DIR, 'card.tsx'));
      const failures = await collectFailures(dir);
      assert.ok(failures.some((message) => message.includes('seed component card is missing')), failures.join('; '));
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it('names a token removed from the dark set', async () => {
    const dir = await copyFoundation();
    try {
      const file = path.join(dir, GLOBAL_CSS);
      const css = await readFile(file, 'utf8');
      await writeFile(file, css.replace(/\n\s*--card-foreground: oklch\(0\.985 0 0\);/u, ''));
      const failures = await collectFailures(dir);
      assert.ok(failures.some((message) => message.includes('--card-foreground') && message.includes('dark')), failures.join('; '));
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it('names an element rule moved outside the base layer', async () => {
    const dir = await copyFoundation();
    try {
      const file = path.join(dir, GLOBAL_CSS);
      const css = await readFile(file, 'utf8');
      await writeFile(file, css.replace('@layer base {', '{'));
      const failures = await collectFailures(dir);
      assert.ok(failures.some((message) => message.includes('@layer base')), failures.join('; '));
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
