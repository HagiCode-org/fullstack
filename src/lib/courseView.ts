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

export interface PreviewSection {
  title?: string;
  lessons: { id: string; title: string; href: string }[];
}

// The first lessons of a course for the home page, grouped by top-level group. Lessons that sit outside any group form
// one untitled section, and a nested group's lessons count towards its top-level group. The preview stops at `limit`
// lessons and says so, so a long course does not grow its card without bound.
export function previewSections(
  course: Course,
  locale: Locale,
  hrefFor: (lessonId: string) => string,
  limit: number,
): { sections: PreviewSection[]; truncated: boolean } {
  const lessonsOf = (nodes: readonly OutlineNode[]): { id: string; title: string; href: string }[] =>
    nodes.flatMap((node) =>
      node.kind === 'lesson'
        ? [{ id: node.id, title: node.title[locale], href: hrefFor(node.id) }]
        : lessonsOf(node.children),
    );
  const sections: PreviewSection[] = [];
  let loose: PreviewSection | null = null;
  for (const node of course.outline) {
    if (node.kind === 'group') {
      sections.push({ title: node.title[locale], lessons: lessonsOf(node.children) });
    } else {
      if (!loose) {
        loose = { lessons: [] };
        sections.push(loose);
      }
      loose.lessons.push(...lessonsOf([node]));
    }
  }
  let room = limit;
  const kept: PreviewSection[] = [];
  for (const section of sections) {
    if (room === 0) break;
    const lessons = section.lessons.slice(0, room);
    room -= lessons.length;
    if (lessons.length > 0) kept.push({ ...section, lessons });
  }
  const shown = kept.reduce((sum, section) => sum + section.lessons.length, 0);
  const total = sections.reduce((sum, section) => sum + section.lessons.length, 0);
  return { sections: kept, truncated: shown < total };
}
