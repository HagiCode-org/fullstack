import type { Locale } from '../config/site.ts';

// A course step names the one course a learner takes at this point in the path.
export interface CourseStep {
  kind: 'course';
  id: string;
  courseId: string;
}

// One course a learner can take to complete a choice step.
export interface ChoiceOption {
  courseId: string;
}

// A choice step names two or more interchangeable courses. The learner takes exactly one of them.
export interface ChoiceStep {
  kind: 'choice';
  id: string;
  title: Record<Locale, string>;
  options: ChoiceOption[];
}

export type PathStep = CourseStep | ChoiceStep;

// A learning path is an ordered list of steps. Its id is the same in every locale.
export interface LearningPath {
  id: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  // Demo paths carry a demo label, as demo courses do.
  demo: boolean;
  steps: PathStep[];
}

// One entry per step of a resolved path, in declared order. A null courseId means the choice is still open.
export interface ResolvedStep {
  step: PathStep;
  courseId: string | null;
}
