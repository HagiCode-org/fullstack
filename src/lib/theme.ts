// The reader's theme choice. The active theme lives on the document root as data-theme; this module holds the pure
// decisions about it, so the head bootstrap, the toggle runtime and the node tests share one set of rules.

export const THEME_STORAGE_KEY = 'hagicode-fullstack:theme';

export const THEMES = ['light', 'dark'] as const;
export type Theme = (typeof THEMES)[number];

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

// A valid stored choice wins. Anything else (nothing stored, or a value that is not a theme) follows the system.
export function resolveTheme(stored: unknown, systemPrefersDark: boolean): Theme {
  if (isTheme(stored)) return stored;
  return systemPrefersDark ? 'dark' : 'light';
}

export function nextTheme(current: Theme): Theme {
  return current === 'dark' ? 'light' : 'dark';
}
