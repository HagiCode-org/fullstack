import { isLocale, SUPPORTED_LOCALES } from '../config/site.ts';
import type { Course, OutlineNode } from './types.ts';

const ID_PATTERN = /^[a-z0-9-]+$/u;

// Problems in the course data, one message per problem, each naming the course, node, locale or body at fault.
// `bodies` holds one key per Markdown body file, shaped `<courseId>/<locale>/<lessonId>`.
export function findCourseFailures(courses: readonly Course[], bodies: ReadonlySet<string>): string[] {
  const failures: string[] = [];
  const courseIds = new Set<string>();
  const lessonKeys = new Set<string>();

  for (const course of courses) {
    if (!ID_PATTERN.test(course.id)) {
      failures.push(`course id "${course.id}" must match [a-z0-9-]+`);
    }
    if (courseIds.has(course.id)) {
      failures.push(`course id "${course.id}" is used by more than one course`);
    }
    courseIds.add(course.id);
    for (const locale of SUPPORTED_LOCALES) {
      if (!nonEmpty(course.title?.[locale])) {
        failures.push(`course "${course.id}" has no title for ${locale}`);
      }
    }

    const nodeIds = new Set<string>();
    const visit = (nodes: readonly OutlineNode[], trail: string[]): number => {
      let lessons = 0;
      for (const node of nodes) {
        const label = `${trail.length ? `${trail.join(' > ')} > ` : ''}${node.kind} "${node.id}" in course "${course.id}"`;
        if (!ID_PATTERN.test(node.id)) {
          failures.push(`${label} must have an id matching [a-z0-9-]+`);
        }
        if (nodeIds.has(node.id)) {
          failures.push(`${node.kind} id "${node.id}" is used more than once in course "${course.id}"`);
        }
        nodeIds.add(node.id);
        for (const locale of SUPPORTED_LOCALES) {
          if (!nonEmpty(node.title?.[locale])) {
            failures.push(`${label} has no title for ${locale}`);
          }
        }

        if (node.kind === 'lesson') {
          lessons += 1;
          lessonKeys.add(`${course.id}/${node.id}`);
          if (!bodies.has(`${course.id}/en-US/${node.id}`)) {
            failures.push(`lesson "${node.id}" in course "${course.id}" has no en-US body`);
          }
          continue;
        }
        const inside = visit(node.children, [...trail, `group "${node.id}"`]);
        if (inside === 0) {
          failures.push(`group "${node.id}" in course "${course.id}" contains no lesson`);
        }
        lessons += inside;
      }
      return lessons;
    };

    if (visit(course.outline, []) === 0) {
      failures.push(`course "${course.id}" has no lessons`);
    }
  }

  for (const key of bodies) {
    const [courseId, locale, lessonId, ...rest] = key.split('/');
    const known = rest.length === 0
      && isLocale(locale)
      && lessonKeys.has(`${courseId}/${lessonId}`);
    if (!known) {
      failures.push(`body "${key}" does not match a supported locale and a lesson of a registered course`);
    }
  }

  return failures;
}

function nonEmpty(value: unknown): boolean {
  return typeof value === 'string' && value.trim() !== '';
}
