import type { Locale } from '../config/site.ts';
import { courses as allCourses, flattenLessons } from '../courses/registry.ts';
import type { Course, OutlineNode } from '../courses/types.ts';
import { uiStringsFor } from '../i18n/ui.ts';
import { routePath } from './routes.ts';

// Data the browser needs to apply stored progress to a page. It is written into the page once, as JSON.
export interface ProgressIsland {
  // The course and lesson of this page, when it has one. The home page has neither.
  courseId?: string;
  lessonId?: string;
  courses: Record<string, IslandCourse>;
  texts: {
    progressText: string;
    startLabel: string;
    continueLabel: string;
    restartLabel: string;
    markReadLabel: string;
    markUnreadLabel: string;
    heroDoneText: string;
  };
}

export interface IslandCourse {
  // Lesson ids in reading order.
  lessons: string[];
  // Lesson ids under each group, including lessons in nested groups.
  groups: Record<string, string[]>;
  // Page href of each lesson in the page's locale, for the continue action.
  hrefs: Record<string, string>;
}

export function buildProgressIsland(
  locale: Locale,
  page: { courseId?: string; lessonId?: string } = {},
  list: readonly Course[] = allCourses,
): ProgressIsland {
  const ui = uiStringsFor(locale);
  const courses: Record<string, IslandCourse> = {};
  for (const course of list) {
    courses[course.id] = {
      lessons: flattenLessons(course.outline).map((lesson) => lesson.id),
      groups: groupLessons(course.outline),
      hrefs: Object.fromEntries(
        flattenLessons(course.outline).map((lesson) => [
          lesson.id,
          routePath({ kind: 'lesson', locale, courseId: course.id, lessonId: lesson.id }),
        ]),
      ),
    };
  }
  return {
    ...page,
    courses,
    texts: {
      progressText: ui.progressText,
      startLabel: ui.startLabel,
      continueLabel: ui.continueLabel,
      restartLabel: ui.restartLabel,
      markReadLabel: ui.markReadLabel,
      markUnreadLabel: ui.markUnreadLabel,
      heroDoneText: ui.homeHeroDone,
    },
  };
}

function groupLessons(nodes: readonly OutlineNode[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  const visit = (list: readonly OutlineNode[]): string[] =>
    list.flatMap((node) => {
      if (node.kind === 'lesson') return [node.id];
      const inside = visit(node.children);
      groups[node.id] = inside;
      return inside;
    });
  visit(nodes);
  return groups;
}
