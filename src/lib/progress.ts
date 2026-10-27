// Reading progress kept in the reader's browser. The record holds course ids and lesson ids only, never a locale,
// so every language on this origin reads and writes the same entries.

import { captureSiteEvent } from './posthog-events.ts';

export const PROGRESS_STORAGE_KEY = 'hagicode-fullstack:progress';
export const PROGRESS_VERSION = 1;

// The part of the Web Storage API the store uses. A test passes a fake; the browser passes window.localStorage.
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface CourseProgress {
  read: Record<string, number>;
  last?: string;
}

export interface ProgressRecord {
  version: typeof PROGRESS_VERSION;
  courses: Record<string, CourseProgress>;
}

export interface ProgressStore {
  // False when storage could not be read or the last write failed. The page then shows the storage notice.
  readonly persisted: boolean;
  load(): ProgressRecord;
  isRead(courseId: string, lessonId: string): boolean;
  // `lessonIds` is the course's lesson list in reading order. It lets the store tell when this mark completes the course.
  markRead(courseId: string, lessonId: string, lessonIds?: readonly string[]): void;
  markUnread(courseId: string, lessonId: string): void;
  setLast(courseId: string, lessonId: string): void;
  // Counts only the lessons in `lessonIds`, so entries for removed lessons do not change the result.
  summarize(courseId: string, lessonIds: readonly string[]): { read: number; total: number };
  // The first unread lesson in outline order, or null when every lesson is read.
  nextLesson(courseId: string, lessonIds: readonly string[]): string | null;
  // Called after every change, local or from another tab. Returns the function that removes the listener.
  subscribe(listener: () => void): () => void;
  // Re-reads storage, for a change another tab made.
  refresh(): void;
}

// How much of the home slogan's hero word is filled for `read` of `total` lessons read across every course, from 0 to 1.
// The curve is concave so the first lessons visibly move the fill, and it stays below 1 until the last lesson is read.
export function heroFill(read: number, total: number): number {
  if (total <= 0 || read <= 0) return 0;
  if (read >= total) return 1;
  return Math.min(0.97, (read / total) ** 0.6);
}

export interface ProgressOptions {
  now?: () => number;
}


export function emptyRecord(): ProgressRecord {
  return { version: PROGRESS_VERSION, courses: {} };
}

// Parses the stored text. Anything unusable, including an unknown version, yields an empty record.
export function parseRecord(text: string | null): ProgressRecord {
  if (text === null) return emptyRecord();
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    return emptyRecord();
  }
  if (!isObject(value) || value.version !== PROGRESS_VERSION || !isObject(value.courses)) return emptyRecord();

  const courses: Record<string, CourseProgress> = {};
  for (const [courseId, course] of Object.entries(value.courses)) {
    if (!isObject(course) || !isObject(course.read)) continue;
    const read: Record<string, number> = {};
    for (const [lessonId, at] of Object.entries(course.read)) {
      if (typeof at === 'number' && Number.isFinite(at)) read[lessonId] = at;
    }
    const entry: CourseProgress = { read };
    if (typeof course.last === 'string') entry.last = course.last;
    courses[courseId] = entry;
  }
  return { version: PROGRESS_VERSION, courses };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Store over a Storage-like object. Storage that throws on access or on write leaves the store working in memory.
export function createProgressStore(storage: StorageLike | null, options: ProgressOptions = {}): ProgressStore {
  const now = options.now ?? Date.now;
  const listeners = new Set<() => void>();
  let record = emptyRecord();
  let persisted = false;

  const readStorage = (): string | null | undefined => {
    if (storage === null) return undefined;
    try {
      return storage.getItem(PROGRESS_STORAGE_KEY);
    } catch {
      return undefined;
    }
  };

  const reload = () => {
    const text = readStorage();
    record = parseRecord(text ?? null);
    persisted = text !== undefined;
  };

  // Returns whether the record reached storage.
  const write = (): boolean => {
    if (storage === null) {
      persisted = false;
      return false;
    }
    try {
      storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(record));
      persisted = true;
      return true;
    } catch {
      persisted = false;
      return false;
    }
  };

  const changed = (): boolean => {
    const saved = write();
    for (const listener of listeners) listener();
    return saved;
  };

  const course = (courseId: string): CourseProgress => {
    record.courses[courseId] ??= { read: {} };
    return record.courses[courseId];
  };

  reload();

  return {
    get persisted() {
      return persisted;
    },
    load: () => record,
    isRead: (courseId, lessonId) => Object.hasOwn(record.courses[courseId]?.read ?? {}, lessonId),
    markRead(courseId, lessonId, lessonIds = []) {
      const wasRead = Object.hasOwn(record.courses[courseId]?.read ?? {}, lessonId);
      const entry = course(courseId);
      entry.read[lessonId] = now();
      const saved = changed();
      // Events fire only for a new mark that reached storage. A blocked or failed write leaves nothing to report.
      if (!saved || wasRead) return;
      captureSiteEvent('lesson_marked_read', { course: courseId, lesson: lessonId });
      const completes = lessonIds.includes(lessonId) && lessonIds.every((id) => Object.hasOwn(entry.read, id));
      if (completes) captureSiteEvent('course_completed', { course: courseId });
    },
    markUnread(courseId, lessonId) {
      const entry = record.courses[courseId];
      if (!entry || !Object.hasOwn(entry.read, lessonId)) return;
      delete entry.read[lessonId];
      changed();
    },
    setLast(courseId, lessonId) {
      course(courseId).last = lessonId;
      changed();
    },
    summarize(courseId, lessonIds) {
      const read = record.courses[courseId]?.read ?? {};
      const done = lessonIds.filter((lessonId) => Object.hasOwn(read, lessonId)).length;
      return { read: done, total: lessonIds.length };
    },
    nextLesson(courseId, lessonIds) {
      const read = record.courses[courseId]?.read ?? {};
      return lessonIds.find((lessonId) => !Object.hasOwn(read, lessonId)) ?? null;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    refresh() {
      reload();
      for (const listener of listeners) listener();
    },
  };
}
