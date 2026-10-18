import type { Locale } from '../config/site.ts';
import { neighbours } from '../courses/registry.ts';
import type { Course, OutlineNode } from '../courses/types.ts';

// The outline as the tree component renders it: titles in one locale, and a link for each lesson.
export type TreeItem =
  | { kind: 'lesson'; id: string; title: string; href: string }
  | { kind: 'group'; id: string; title: string; children: TreeItem[] };

export interface LessonLink {
  href: string;
  caption: string;
  title: string;
}

export function treeOf(course: Course, locale: Locale, hrefFor: (lessonId: string) => string): TreeItem[] {
  const convert = (nodes: readonly OutlineNode[]): TreeItem[] =>
    nodes.map((node) =>
      node.kind === 'lesson'
        ? { kind: 'lesson', id: node.id, title: node.title[locale], href: hrefFor(node.id) }
        : { kind: 'group', id: node.id, title: node.title[locale], children: convert(node.children) },
    );
  return convert(course.outline);
}

// Previous and next lesson links for a lesson page. A missing neighbour gives null, so the caller can put the back link in its place.
export function neighbourLinks(
  course: Course,
  locale: Locale,
  lessonId: string,
  hrefFor: (lessonId: string) => string,
  captions: { previous: string; next: string },
): { previous: LessonLink | null; next: LessonLink | null } {
  const { previous, next } = neighbours(course, lessonId);
  const link = (lesson: { id: string; title: Record<Locale, string> } | null, caption: string): LessonLink | null =>
    lesson ? { href: hrefFor(lesson.id), caption, title: lesson.title[locale] } : null;
  return {
    previous: link(previous, captions.previous),
    next: link(next, captions.next),
  };
}
