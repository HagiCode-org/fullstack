// Names of the data-* hooks that the course components render and ProgressRuntime.astro reads and writes.
// Both sides take the names from here, so a rename cannot leave the runtime behind the markup.
export const HOOK = {
  courseId: 'data-course-id',
  groupId: 'data-group-id',
  lessonId: 'data-lesson-id',
  progressCount: 'data-progress-count',
  progressBar: 'data-progress-bar',
  readMarker: 'data-read-marker',
  continue: 'data-continue',
  markRead: 'data-mark-read',
  storageNotice: 'data-storage-notice',
  lessonEnd: 'data-lesson-end',
  courseComplete: 'data-course-complete',
} as const;

export type HookName = keyof typeof HOOK;

// Attributes that mark an element with a hook, with an optional value, for spreading onto a JSX element.
export function hookProps(name: HookName, value = ''): Record<string, string> {
  return { [HOOK[name]]: value };
}
