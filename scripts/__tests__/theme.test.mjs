import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import { THEME_STORAGE_KEY, isTheme, nextTheme, resolveTheme } from '../../src/lib/theme.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const readText = (file) => readFileSync(path.join(root, file), 'utf8');

// Dark token names the shadcn components read, plus the link colour the dark theme overrides.
const DARK_TOKENS = [
  'background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground',
  'primary', 'primary-foreground', 'secondary', 'secondary-foreground', 'muted', 'muted-foreground',
  'accent', 'accent-foreground', 'destructive', 'border', 'input', 'ring', 'color-accent',
];

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

// Body of the first block whose header is `header`, or '' when the header is absent.
function blockBody(text, header) {
  const start = text.indexOf(header);
  if (start === -1) return '';
  const open = text.indexOf('{', start);
  return text.slice(open + 1, closingBrace(text, open));
}

// Custom property names declared in a block body, in order.
function declaredTokens(body) {
  return [...body.matchAll(/--([a-z-]+):/gu)].map((match) => match[1]);
}

describe('theme helpers', () => {
  it('uses one storage key for every page', () => {
    assert.equal(THEME_STORAGE_KEY, 'hagicode-fullstack:theme');
  });

  it('accepts only light and dark as stored values', () => {
    assert.equal(isTheme('light'), true);
    assert.equal(isTheme('dark'), true);
    assert.equal(isTheme('system'), false);
    assert.equal(isTheme('Dark'), false);
    assert.equal(isTheme(null), false);
  });

  it('uses a valid stored value over the system preference', () => {
    assert.equal(resolveTheme('light', true), 'light');
    assert.equal(resolveTheme('dark', false), 'dark');
  });

  it('ignores an invalid stored value and follows the system', () => {
    assert.equal(resolveTheme('blue', true), 'dark');
    assert.equal(resolveTheme('blue', false), 'light');
  });

  it('follows the system when nothing is stored', () => {
    assert.equal(resolveTheme(null, true), 'dark');
    assert.equal(resolveTheme(null, false), 'light');
  });

  it('flips the theme in both directions', () => {
    assert.equal(nextTheme('light'), 'dark');
    assert.equal(nextTheme('dark'), 'light');
  });
});

describe('theme tokens in global.css', () => {
  const css = readText('src/styles/global.css');

  it('keeps the light tokens on :root and sets colour-scheme for each explicit theme', () => {
    assert.ok(blockBody(css, ':root {').includes('--background:'), 'light tokens belong on :root');
    assert.ok(/:root\[data-theme="light"\]\s*\{[^}]*color-scheme:\s*light/u.test(css), 'light theme sets color-scheme: light');
    assert.ok(/:root\[data-theme="dark"\]\s*\{[^}]*color-scheme:\s*dark/u.test(css), 'dark theme sets color-scheme: dark');
  });

  it('has an attribute block for the dark theme', () => {
    assert.ok(css.includes(':root[data-theme="dark"] {'), 'missing :root[data-theme="dark"] block');
  });

  // The media block after the attribute block; the dark variant earlier in the file also opens one.
  const fallbackMedia = blockBody(css.slice(css.indexOf(':root[data-theme="dark"] {')), '@media (prefers-color-scheme: dark) {');

  it('has a media fallback for a visitor with no stored choice', () => {
    assert.ok(fallbackMedia.includes(':root:not([data-theme]) {'), 'the media block must scope the dark tokens to :root:not([data-theme])');
  });

  it('defines the same dark token names in both copies', () => {
    const attribute = declaredTokens(blockBody(css, ':root[data-theme="dark"] {'));
    const fallback = declaredTokens(blockBody(fallbackMedia, ':root:not([data-theme]) {'));
    for (const token of DARK_TOKENS) {
      assert.ok(attribute.includes(token), `--${token} is missing from the [data-theme="dark"] block`);
      assert.ok(fallback.includes(token), `--${token} is missing from the prefers-color-scheme fallback`);
    }
    assert.deepEqual([...attribute].sort(), [...fallback].sort());
  });

  it('binds the dark: variant to the theme attribute and the media fallback', () => {
    assert.ok(/@custom-variant dark \{/u.test(css), 'the dark variant must be a block form');
    assert.ok(css.includes('&:where([data-theme="dark"], [data-theme="dark"] *)'), 'missing the attribute branch of the dark variant');
    assert.ok(css.includes('&:where(:root:not([data-theme]), :root:not([data-theme]) *)'), 'missing the media branch of the dark variant');
  });

  it('shows the moon under a light theme and the sun under a dark one', () => {
    assert.ok(/\.theme-toggle__sun\s*\{\s*display:\s*none;/u.test(css), 'the sun is hidden by default');
    assert.ok(/:root\[data-theme="dark"\] \.theme-toggle__moon\s*\{\s*display:\s*none;/u.test(css), 'the moon is hidden under the dark theme');
    assert.ok(/:root:not\(\[data-theme\]\) \.theme-toggle__sun\s*\{\s*display:\s*block;/u.test(css), 'the sun shows on a dark system with no choice');
  });
});

describe('theme wiring in the layout and header', () => {
  it('bootstraps the theme inline in the head with the shared storage key', () => {
    const layout = readText('src/layouts/BaseLayout.astro');
    const head = layout.slice(layout.indexOf('<head>'), layout.indexOf('</head>'));
    assert.ok(/<script is:inline define:vars=\{\{ storageKey: THEME_STORAGE_KEY \}\}>/u.test(head), 'the bootstrap must be an inline script in <head>');
    assert.ok(head.includes('localStorage.getItem(storageKey)'), 'the bootstrap reads the stored choice');
    assert.ok(head.includes("matchMedia('(prefers-color-scheme: dark)')"), 'the bootstrap falls back to the system');
  });

  it('renders the runtime and passes the toggle label to the header', () => {
    const layout = readText('src/layouts/BaseLayout.astro');
    assert.ok(layout.includes('<ThemeRuntime />'), 'the layout must render ThemeRuntime');
    assert.ok(layout.includes('themeLabel={ui.themeToggleLabel}'), 'the layout must pass the toggle label to SiteHeader');
  });

  it('renders a hidden toggle with its hook, a label and both icons', () => {
    const toggle = readText('src/components/course/ThemeToggle.tsx');
    assert.ok(toggle.includes('{...hookProps("themeToggle")}'), 'the toggle needs the themeToggle hook');
    assert.ok(/^\s*hidden$/mu.test(toggle), 'the toggle starts hidden');
    assert.ok(toggle.includes('aria-label={label}') && toggle.includes('title={label}'), 'the label is the accessible name and title');
    assert.ok(toggle.includes('aria-pressed="false"'), 'the toggle carries aria-pressed');
    assert.ok(toggle.includes('MoonIcon') && toggle.includes('SunIcon'), 'both icons are in the markup');
  });
});
