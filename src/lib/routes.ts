import { DEFAULT_LOCALE, isLocale, SUPPORTED_LOCALES, type Locale } from '../config/site.ts';
import { courses, flattenLessons } from '../courses/registry.ts';
import type { Course } from '../courses/types.ts';

// Every page of the site. Groups have no route; a lesson route always names a lesson of its course.
export type Route =
  | { kind: 'home'; locale: Locale }
  | { kind: 'course'; locale: Locale; courseId: string }
  | { kind: 'lesson'; locale: Locale; courseId: string; lessonId: string };

// The default locale is unprefixed; every other locale is served under a prefix equal to its code.
export function routePath(route: Route): string {
  const prefix = route.locale === DEFAULT_LOCALE ? '' : `/${route.locale}`;
  if (route.kind === 'home') return `${prefix}/`;
  if (route.kind === 'course') return `${prefix}/courses/${route.courseId}/`;
  return `${prefix}/courses/${route.courseId}/${route.lessonId}/`;
}

// Every route in every locale: the home page, each course overview, and each lesson.
export function allRoutes(list: readonly Course[] = courses): Route[] {
  return SUPPORTED_LOCALES.flatMap((locale) => [
    { kind: 'home' as const, locale },
    ...list.flatMap((course) => [
      { kind: 'course' as const, locale, courseId: course.id },
      ...flattenLessons(course.outline).map((lesson) => ({
        kind: 'lesson' as const,
        locale,
        courseId: course.id,
        lessonId: lesson.id,
      })),
    ]),
  ]);
}

// The route for a URL path, or null when no page is served there. Accepts the path with or without a trailing slash.
export function parseRoute(pathname: string, list: readonly Course[] = courses): Route | null {
  const segments = pathname.split('/').filter((segment) => segment !== '');
  // Only a non-default locale has a prefix. A first segment that is neither a locale nor "courses" serves nothing.
  let locale: Locale = DEFAULT_LOCALE;
  const [first] = segments;
  if (first !== undefined && first !== 'courses') {
    if (!isLocale(first) || first === DEFAULT_LOCALE) return null;
    locale = first;
    segments.shift();
  }

  if (segments.length === 0) return { kind: 'home', locale };
  if (segments[0] !== 'courses' || segments.length > 3) return null;

  const course = list.find((candidate) => candidate.id === segments[1]);
  if (!course) return null;
  if (segments.length === 2) return { kind: 'course', locale, courseId: course.id };

  const lesson = flattenLessons(course.outline).find((candidate) => candidate.id === segments[2]);
  return lesson ? { kind: 'lesson', locale, courseId: course.id, lessonId: lesson.id } : null;
}

// The same page in another locale: same course and lesson, different locale.
export function switchLocale(route: Route, target: Locale): Route {
  return { ...route, locale: target };
}
