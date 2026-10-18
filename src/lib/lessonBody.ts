import { DEFAULT_LOCALE, type Locale } from '../config/site.ts';

// Id of a lesson body, the same shape the lessons collection uses for its entries.
export function bodyId(courseId: string, locale: Locale, lessonId: string): string {
  return `${courseId}/${locale}/${lessonId}`;
}

// The body in the page's locale, or the en-US body with fallback set when that locale has none.
// Null when there is no body at all, which the build treats as an error through the course integrity check.
export function selectLessonBody<T>(
  findBody: (id: string) => T | undefined,
  courseId: string,
  lessonId: string,
  locale: Locale,
): { body: T; fallback: boolean } | null {
  const own = findBody(bodyId(courseId, locale, lessonId));
  if (own !== undefined) return { body: own, fallback: false };
  const english = findBody(bodyId(courseId, DEFAULT_LOCALE, lessonId));
  return english === undefined ? null : { body: english, fallback: true };
}
