// Moves reading progress recorded under an earlier course outline to the current one. Records for retired lessons are
// dropped. The result is a new record; the stored text is rewritten the next time the reader changes anything.
import { currentCourseFor, isRetiredLesson } from './lessonMoves.ts';
import type { CourseProgress, ProgressRecord } from './progress.ts';

export function migrateRecord(record: ProgressRecord): ProgressRecord {
  const courses: Record<string, CourseProgress> = {};
  const entryFor = (courseId: string): CourseProgress => {
    courses[courseId] ??= { read: {} };
    return courses[courseId];
  };

  for (const [courseId, course] of Object.entries(record.courses)) {
    for (const [lessonId, at] of Object.entries(course.read)) {
      if (isRetiredLesson(courseId, lessonId)) continue;
      const entry = entryFor(currentCourseFor(courseId, lessonId));
      // A lesson read under both the old and the new course keeps its latest mark.
      entry.read[lessonId] = Math.max(entry.read[lessonId] ?? at, at);
    }
  }

  for (const [courseId, course] of Object.entries(record.courses)) {
    const last = course.last;
    if (last === undefined || isRetiredLesson(courseId, last)) continue;
    const entry = entryFor(currentCourseFor(courseId, last));
    entry.last ??= last;
  }

  return { version: record.version, courses };
}
