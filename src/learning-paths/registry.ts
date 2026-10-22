import type { LearningPath, ResolvedStep } from './types.ts';

// The only list of learning paths. It starts empty: a path needs its courses to exist in the course registry first.
export const learningPaths: readonly LearningPath[] = [];

export function getLearningPath(id: string, list: readonly LearningPath[] = learningPaths): LearningPath | undefined {
  return list.find((path) => path.id === id);
}

// Every course the path can lead to, in path order: a course step's course, then each option of a choice step.
// Options keep their declared order, and a course listed twice keeps only its first position.
export function pathCourseIds(path: LearningPath): string[] {
  const ids = path.steps.flatMap((step) => (step.kind === 'course' ? [step.courseId] : step.options.map((option) => option.courseId)));
  return [...new Set(ids)];
}

// One entry per step, in declared order. A course step always resolves to its course. A choice step resolves to
// the chosen course only when it is one of the step's options; otherwise it stays open (null). Never a default.
export function resolvePath(path: LearningPath, choices: Readonly<Record<string, string>>): ResolvedStep[] {
  return path.steps.map((step) => {
    if (step.kind === 'course') return { step, courseId: step.courseId };
    const chosen = choices[step.id];
    const isOption = step.options.some((option) => option.courseId === chosen);
    return { step, courseId: isOption ? chosen : null };
  });
}
