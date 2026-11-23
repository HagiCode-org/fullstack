import { SUPPORTED_LOCALES } from '../config/site.ts';
import type { Course, GroupNode, LessonNode, OutlineNode } from '../courses/types.ts';
import type { GroupStep, LearningPath, LessonStep } from './types.ts';

const ID_PATTERN = /^[a-z0-9-]+$/u;

// Problems in the learning path data, one message per problem, each naming the path, step, field, locale or course at fault.
export function findLearningPathFailures(paths: readonly LearningPath[], courses: readonly Course[]): string[] {
  const failures: string[] = [];
  const pathIds = new Set<string>();
  const coursesById = new Map(courses.map((course) => [course.id, course]));

  for (const path of paths) {
    if (!ID_PATTERN.test(path.id)) {
      failures.push(`path id "${path.id}" must match [a-z0-9-]+`);
    }
    if (pathIds.has(path.id)) {
      failures.push(`path id "${path.id}" is used by more than one path`);
    }
    pathIds.add(path.id);
    for (const field of ['title', 'summary'] as const) {
      for (const locale of SUPPORTED_LOCALES) {
        if (!nonEmpty(path[field]?.[locale])) {
          failures.push(`path "${path.id}" has no ${field} for ${locale}`);
        }
      }
    }
    if (path.steps.length === 0) {
      failures.push(`path "${path.id}" has no steps`);
    }

    const stepIds = new Set<string>();
    // Maps each course named as a whole (course step or choice option) to the first step that names it.
    const courseSteps = new Map<string, string>();
    // Lesson and group steps are checked after this loop, so a whole-course step may come later in the path.
    const partSteps: (LessonStep | GroupStep)[] = [];
    for (const step of path.steps) {
      const label = `step "${step.id}" in path "${path.id}"`;
      if (!ID_PATTERN.test(step.id)) {
        failures.push(`${label} must have an id matching [a-z0-9-]+`);
      }
      if (stepIds.has(step.id)) {
        failures.push(`step id "${step.id}" is used more than once in path "${path.id}"`);
      }
      stepIds.add(step.id);
      if (step.kind === 'lesson' || step.kind === 'group') {
        partSteps.push(step);
        continue;
      }
      if (step.kind === 'choice') {
        if (step.options.length < 2) {
          failures.push(`choice "${step.id}" in path "${path.id}" needs at least two options, found ${step.options.length}`);
        }
        for (const locale of SUPPORTED_LOCALES) {
          if (!nonEmpty(step.title?.[locale])) {
            failures.push(`choice "${step.id}" in path "${path.id}" has no title for ${locale}`);
          }
        }
      }

      const referenced = step.kind === 'course' ? [step.courseId] : step.options.map((option) => option.courseId);
      for (const courseId of referenced) {
        if (!coursesById.has(courseId)) {
          failures.push(`${label} names course "${courseId}" that is not in the course registry`);
        }
        const firstStep = courseSteps.get(courseId);
        if (firstStep === undefined) {
          courseSteps.set(courseId, step.id);
        } else if (firstStep === step.id) {
          failures.push(`${label} lists course "${courseId}" more than once`);
        } else {
          failures.push(`course "${courseId}" is named by more than one step of path "${path.id}"`);
        }
      }
    }

    // A lesson may be named once per path: by a lesson step, by a group step, or by a whole-course step.
    const lessonSteps = new Map<string, string>();
    for (const step of partSteps) {
      const label = `step "${step.id}" in path "${path.id}"`;
      const course = coursesById.get(step.courseId);
      if (!course) {
        failures.push(`${label} names course "${step.courseId}" that is not in the course registry`);
        continue;
      }
      let named: LessonNode[];
      if (step.kind === 'lesson') {
        const lesson = lessonsIn(course.outline).filter((candidate) => candidate.id === step.lessonId);
        if (lesson.length === 0) {
          failures.push(`${label} names lesson "${step.lessonId}" that is not in course "${step.courseId}"`);
          continue;
        }
        named = lesson;
      } else {
        const group = findGroup(course.outline, step.groupId);
        if (!group) {
          failures.push(`${label} names group "${step.groupId}" that is not in course "${step.courseId}"`);
          continue;
        }
        named = lessonsIn(group.children);
        if (named.length === 0) {
          failures.push(`${label} names group "${step.groupId}" that has no lessons`);
          continue;
        }
      }
      const wholeStep = courseSteps.get(step.courseId);
      if (wholeStep !== undefined) {
        failures.push(`${label} names lessons of course "${step.courseId}" that step "${wholeStep}" already takes as a whole course`);
        continue;
      }
      const overlap = named.find((lesson) => lessonSteps.has(`${step.courseId}/${lesson.id}`));
      if (overlap) {
        const firstStep = lessonSteps.get(`${step.courseId}/${overlap.id}`);
        failures.push(`lesson "${step.courseId}/${overlap.id}" is named by more than one step of path "${path.id}" (steps "${firstStep}" and "${step.id}")`);
        continue;
      }
      for (const lesson of named) {
        lessonSteps.set(`${step.courseId}/${lesson.id}`, step.id);
      }
    }
  }

  return failures;
}

// The group with this id anywhere in the outline, or undefined.
function findGroup(nodes: readonly OutlineNode[], groupId: string): GroupNode | undefined {
  for (const node of nodes) {
    if (node.kind !== 'group') continue;
    if (node.id === groupId) return node;
    const inner = findGroup(node.children, groupId);
    if (inner) return inner;
  }
  return undefined;
}

function lessonsIn(nodes: readonly OutlineNode[]): LessonNode[] {
  return nodes.flatMap((node) => (node.kind === 'lesson' ? [node] : lessonsIn(node.children)));
}

function nonEmpty(value: unknown): boolean {
  return typeof value === 'string' && value.trim() !== '';
}
