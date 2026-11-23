import type { Locale } from '../config/site.ts';

// A lesson is a reading page. Its id is unique within its course and the same in every locale.
export interface LessonNode {
  kind: 'lesson';
  id: string;
  title: Record<Locale, string>;
  // Optional lessons (选修) are marked on the site with an elective badge. Anything but true is not elective.
  elective?: boolean;
}

// A group only organises lessons. It has a title and children but no page of its own.
export interface GroupNode {
  kind: 'group';
  id: string;
  title: Record<Locale, string>;
  children: OutlineNode[];
}

export type OutlineNode = LessonNode | GroupNode;

export interface Course {
  id: string;
  title: Record<Locale, string>;
  // Demo courses carry a demo label on the course list and in their titles.
  demo: boolean;
  // Optional courses (选修) sit outside the main line and carry an elective badge. Anything but true is not elective.
  elective?: boolean;
  // One English sentence: what the reader gets after finishing the course. Optional so a course in progress still builds.
  outcome?: string;
  outline: OutlineNode[];
}
