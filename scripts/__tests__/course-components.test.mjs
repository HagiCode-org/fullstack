import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

// Source-level guard for the three component tiers (design D11, D12). Components are checked by reading their
// source, so this runs under plain `node --test` with no build.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const TIER2_DIR = 'src/components/course';
const TIER1_DIR = 'src/components/ui';
const TIER2_ALLOWED_PACKAGES = new Set(['react', 'lucide-react']);
const TIER3_FORBIDDEN = [
  { pattern: /<button\b/u, label: 'raw <button>' },
  { pattern: /<details\b/u, label: 'raw <details>' },
  { pattern: /<progress\b/u, label: 'raw <progress>' },
  { pattern: /role="alert"/u, label: 'role="alert" markup' },
];

// Import specifiers of a source file, with type-only imports included.
function importsOf(source) {
  return [...source.matchAll(/^\s*import\s[^'"]*?from\s+['"]([^'"]+)['"]|^\s*import\s+['"]([^'"]+)['"]/gmu)].map(
    (match) => match[1] ?? match[2],
  );
}

// Failures for one tier 2 file. `tier1Exists(name)` and `tier2Exists(name)` answer whether a sibling file exists.
export function tier2Failures(file, source, { tier1Exists, tier2Exists }) {
  const failures = [];
  for (const specifier of importsOf(source)) {
    if (specifier.startsWith('./') || specifier.startsWith('../')) {
      const name = specifier.replace(/^\.\//u, '').replace(/\.(tsx?|ts)$/u, '');
      if (!tier2Exists(name)) {
        failures.push(`${file} imports "${specifier}", which is not a tier 2 file (rule: tier 2 imports only tier 1, @/lib, react, lucide-react and sibling tier 2 files)`);
      }
      continue;
    }
    if (specifier.startsWith('@/components/ui/')) {
      const name = specifier.slice('@/components/ui/'.length);
      if (!tier1Exists(name)) {
        failures.push(`${file} imports tier 1 primitive "${specifier}", which does not exist (rule: every tier 1 primitive a tier 2 file imports must exist)`);
      }
      continue;
    }
    if (specifier === '@/lib' || specifier.startsWith('@/lib/')) continue;
    if (TIER2_ALLOWED_PACKAGES.has(specifier)) continue;
    failures.push(`${file} imports "${specifier}" (rule: tier 2 imports only tier 1, @/lib, react, lucide-react and sibling tier 2 files)`);
  }
  return failures;
}

// Failures for one .astro file. Pages, layouts, and tier 3 components must not use a client directive, and must not
// hand-build markup that a tier 2 component owns.
export function astroFailures(file, source, { tier3 }) {
  const failures = [];
  if (/\bclient:(load|idle|visible|media|only)\b/u.test(source)) {
    failures.push(`${file} uses a client: directive (rule: no hydrated islands; course components are static)`);
  }
  if (tier3) {
    for (const { pattern, label } of TIER3_FORBIDDEN) {
      if (pattern.test(source)) {
        failures.push(`${file} contains ${label} (rule: tier 3 imports tier 2 instead of hand-building ${label.replace('raw ', '').replace(' markup', '')})`);
      }
    }
  }
  return failures;
}

function listFiles(dir, extensions) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full, extensions);
    return extensions.some((ext) => entry.name.endsWith(ext)) ? [full] : [];
  });
}

// Every failure in the repository at `base`.
export function repositoryFailures(base) {
  const failures = [];
  const rel = (file) => path.relative(base, file).split(path.sep).join('/');
  const tier1Names = new Set(listFiles(path.join(base, TIER1_DIR), ['.tsx']).map((file) => path.basename(file, '.tsx')));
  const tier2Names = new Set(
    listFiles(path.join(base, TIER2_DIR), ['.ts', '.tsx']).map((file) => path.basename(file).replace(/\.(tsx?|ts)$/u, '')),
  );
  for (const file of listFiles(path.join(base, TIER2_DIR), ['.ts', '.tsx'])) {
    failures.push(
      ...tier2Failures(rel(file), readFileSync(file, 'utf8'), {
        tier1Exists: (name) => tier1Names.has(name),
        tier2Exists: (name) => tier2Names.has(name),
      }),
    );
  }
  for (const file of listFiles(path.join(base, 'src'), ['.astro'])) {
    const relative = rel(file);
    const tier3 =
      relative.startsWith('src/pages/') ||
      relative.startsWith('src/layouts/') ||
      (relative.startsWith('src/components/') && !relative.startsWith(`${TIER2_DIR}/`));
    failures.push(...astroFailures(relative, readFileSync(file, 'utf8'), { tier3 }));
  }
  return failures;
}

const tier1Exists = (name) => ['button', 'card', 'progress'].includes(name);
const tier2Exists = (name) => ['Disclosure', 'hooks'].includes(name);

describe('course component tiers', () => {
  it('pass on the repository as it stands', () => {
    assert.deepEqual(repositoryFailures(root), []);
  });

  it('name a tier 2 file that imports from a page or a data module', () => {
    const source = "import { courses } from '@/courses/registry';\nexport const X = () => null;\n";
    const failures = tier2Failures('src/components/course/Bad.tsx', source, { tier1Exists, tier2Exists });
    assert.ok(failures.some((message) => message.includes('src/components/course/Bad.tsx') && message.includes('@/courses/registry')), failures.join('; '));
  });

  it('name a tier 2 file that imports a missing tier 1 primitive', () => {
    const source = "import { Badge } from '@/components/ui/badge';\n";
    const failures = tier2Failures('src/components/course/Bad.tsx', source, { tier1Exists, tier2Exists });
    assert.ok(failures.some((message) => message.includes('@/components/ui/badge') && message.includes('does not exist')), failures.join('; '));
  });

  it('name a client directive in an .astro file', () => {
    const failures = astroFailures('src/pages/bad.astro', '<SwitcherMenu client:load items={[]} />', { tier3: true });
    assert.ok(failures.some((message) => message.includes('client:') && message.includes('src/pages/bad.astro')), failures.join('; '));
  });

  it('name raw disclosure, button, progress, and alert markup in tier 3', () => {
    const source = '<details><summary>x</summary></details>\n<button>y</button>\n<progress value="1" />\n<div role="alert">z</div>';
    const failures = astroFailures('src/layouts/Bad.astro', source, { tier3: true });
    for (const label of ['raw <details>', 'raw <button>', 'raw <progress>', 'role="alert"']) {
      assert.ok(failures.some((message) => message.includes(label) && message.includes('src/layouts/Bad.astro')), `${label}: ${failures.join('; ')}`);
    }
  });

  it('allows the same markup in tier 2 and a tier 3 file that imports tier 2', () => {
    assert.deepEqual(astroFailures('src/pages/ok.astro', "import { Notice } from '@/components/course/Notice';\n<Notice>x</Notice>", { tier3: true }), []);
    assert.deepEqual(tier2Failures('src/components/course/Ok.tsx', "import { Disclosure } from './Disclosure';\nimport { cn } from '@/lib/utils';\nimport { ChevronDownIcon } from 'lucide-react';\n", { tier1Exists, tier2Exists }), []);
  });
});
