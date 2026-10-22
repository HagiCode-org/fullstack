import { SUPPORTED_LOCALES } from '../config/site.ts';
import type { Course } from '../courses/types.ts';
import type { LearningPath } from './types.ts';

const ID_PATTERN = /^[a-z0-9-]+$/u;

// Problems in the learning path data, one message per problem, each naming the path, step, field, locale or course at fault.
export function findLearningPathFailures(paths: readonly LearningPath[], courses: readonly Course[]): string[] {
  const failures: string[] = [];
  const pathIds = new Set<string>();
  const courseIds = new Set(courses.map((course) => course.id));

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
    // Maps each course named in this path to the first step that names it.
    const courseSteps = new Map<string, string>();
    for (const step of path.steps) {
      const label = `step "${step.id}" in path "${path.id}"`;
      if (!ID_PATTERN.test(step.id)) {
        failures.push(`${label} must have an id matching [a-z0-9-]+`);
      }
      if (stepIds.has(step.id)) {
        failures.push(`step id "${step.id}" is used more than once in path "${path.id}"`);
      }
      stepIds.add(step.id);
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
        if (!courseIds.has(courseId)) {
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
  }

  return failures;
}

function nonEmpty(value: unknown): boolean {
  return typeof value === 'string' && value.trim() !== '';
}
