import { SUPPORTED_LOCALES } from '../config/site.ts';
import { routePath } from './routes.ts';

// Lessons whose course changed in OUTLINE.md. Reading progress is moved to the new course, and the old lesson address
// redirects to the new one. The lesson id stays the same.
export interface MovedLesson {
  lessonId: string;
  fromCourseId: string;
  toCourseId: string;
}

export const MOVED_LESSONS: readonly MovedLesson[] = [
  { lessonId: 'work-on-a-branch', fromCourseId: 'github-desktop-and-github', toCourseId: 'github-collaboration' },
  { lessonId: 'open-a-pull-request', fromCourseId: 'github-desktop-and-github', toCourseId: 'github-collaboration' },
  { lessonId: 'issues-forks-and-open-source', fromCourseId: 'github-desktop-and-github', toCourseId: 'github-collaboration' },
];

// Lessons that OUTLINE.md retired or merged into another lesson. They have no page any more; their old reading records are
// dropped without an error.
export const RETIRED_LESSONS: readonly { courseId: string; lessonId: string }[] = [
  { courseId: 'github-desktop-and-github', lessonId: 'actions-and-pages-preview' },
  { courseId: 'app-with-data', lessonId: 'front-end-back-end-and-database' },
];

// The course a lesson belongs to now, given the course it was recorded under.
export function currentCourseFor(courseId: string, lessonId: string): string {
  const moved = MOVED_LESSONS.find((move) => move.fromCourseId === courseId && move.lessonId === lessonId);
  return moved ? moved.toCourseId : courseId;
}

export function isRetiredLesson(courseId: string, lessonId: string): boolean {
  return RETIRED_LESSONS.some((retired) => retired.courseId === courseId && retired.lessonId === lessonId);
}

// Old lesson address to new lesson address, in every locale, with trailing slashes as the site writes them.
// Used as the Astro `redirects` table.
export function movedLessonRedirects(): Record<string, string> {
  const redirects: Record<string, string> = {};
  for (const move of MOVED_LESSONS) {
    for (const locale of SUPPORTED_LOCALES) {
      const from = routePath({ kind: 'lesson', locale, courseId: move.fromCourseId, lessonId: move.lessonId });
      const to = routePath({ kind: 'lesson', locale, courseId: move.toCourseId, lessonId: move.lessonId });
      redirects[from] = to;
    }
  }
  return redirects;
}
