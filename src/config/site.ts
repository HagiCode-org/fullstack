// Single source for the site identity. Pages, the layout, and Hagilight metadata read from here.
export const SITE_NAME = 'HagiCode Fullstack';

export const SITE_DESCRIPTION =
  'Zero to hero with AI, for everyone: a step-by-step tutorial for people who want to become fullstack engineers in the AI era.';

// The ten locales the site serves. Every page that exists in one locale exists in all of them.
export const SUPPORTED_LOCALES = [
  'en-US',
  'zh-CN',
  'zh-Hant',
  'ja-JP',
  'ko-KR',
  'de-DE',
  'fr-FR',
  'es-ES',
  'pt-BR',
  'ru-RU',
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en-US';

// Each locale is shown by its own name in the language switcher.
export const LOCALE_NATIVE_NAMES: Record<Locale, string> = {
  'en-US': 'English',
  'zh-CN': '简体中文',
  'zh-Hant': '繁體中文',
  'ja-JP': '日本語',
  'ko-KR': '한국어',
  'de-DE': 'Deutsch',
  'fr-FR': 'Français',
  'es-ES': 'Español',
  'pt-BR': 'Português (Brasil)',
  'ru-RU': 'Русский',
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
