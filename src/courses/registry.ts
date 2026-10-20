import { dockerForBeginners } from './docker-for-beginners/outline.ts';
import { dockerSelfHostedApps } from './docker-self-hosted-apps/outline.ts';
import { githubDesktopAndGithub } from './github-desktop-and-github/outline.ts';
import { buildWithAi } from './build-with-ai/outline.ts';
import { firstWebsite } from './first-website/outline.ts';
import { publishYourWebsite } from './publish-your-website/outline.ts';
import { firstWebApp } from './first-web-app/outline.ts';
import { appWithData } from './app-with-data/outline.ts';
import { anotherLanguage } from './another-language/outline.ts';
import { addAiFeatures } from './add-ai-features/outline.ts';
import { capstoneProject } from './capstone-project/outline.ts';
import type { Course, GroupNode, LessonNode, OutlineNode } from './types.ts';

// The only list of courses. The course list, the course switcher, and the course routes all read from here.
export const courses: readonly Course[] = [
  dockerForBeginners,
  dockerSelfHostedApps,
  githubDesktopAndGithub,
  buildWithAi,
  firstWebsite,
  publishYourWebsite,
  firstWebApp,
  appWithData,
  anotherLanguage,
  addAiFeatures,
  capstoneProject,
];

export function getCourse(id: string, list: readonly Course[] = courses): Course | undefined {
  return list.find((course) => course.id === id);
}

// Lessons in reading order: depth-first, so a group's lessons come before the next sibling.
export function flattenLessons(nodes: readonly OutlineNode[]): LessonNode[] {
  return nodes.flatMap((node) => (node.kind === 'lesson' ? [node] : flattenLessons(node.children)));
}

export function lessonCount(nodes: readonly OutlineNode[]): number {
  return flattenLessons(nodes).length;
}

// The lessons before and after a lesson in reading order, skipping groups. Null at either end of the course.
export function neighbours(course: Course, lessonId: string): { previous: LessonNode | null; next: LessonNode | null } {
  const lessons = flattenLessons(course.outline);
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: lessons[index - 1] ?? null,
    next: lessons[index + 1] ?? null,
  };
}

// The groups that contain a lesson, outermost first. Empty when the lesson is not in the course.
export function ancestorsOf(course: Course, lessonId: string): GroupNode[] {
  const search = (nodes: readonly OutlineNode[], trail: GroupNode[]): GroupNode[] | null => {
    for (const node of nodes) {
      if (node.kind === 'lesson') {
        if (node.id === lessonId) return trail;
        continue;
      }
      const found = search(node.children, [...trail, node]);
      if (found) return found;
    }
    return null;
  };
  return search(course.outline, []) ?? [];
}
