import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { courses, flattenLessons, getCourse } from '../../src/courses/registry.ts';
import { PROGRESS_STORAGE_KEY, createProgressStore, emptyRecord } from '../../src/lib/progress.ts';
import { migrateRecord } from '../../src/lib/progressMigration.ts';
import { MOVED_LESSONS, RETIRED_LESSONS } from '../../src/lib/lessonMoves.ts';

// A Storage-like object backed by a Map, so a test can seed the record an older site version left behind.
class FakeStorage {
  constructor(initial = null) {
    this.map = new Map(initial === null ? [] : [[PROGRESS_STORAGE_KEY, JSON.stringify(initial)]]);
  }
  getItem(key) {
    return this.map.has(key) ? this.map.get(key) : null;
  }
  setItem(key, value) {
    this.map.set(key, String(value));
  }
  raw() {
    return JSON.parse(this.map.get(PROGRESS_STORAGE_KEY));
  }
}

const OLD = 'github-desktop-and-github';
const NEW = 'github-collaboration';
const APP_OLD = 'app-with-data';

const record = (courses) => ({ version: 1, courses });

describe('progress migration', () => {
  it('moves a read mark of a moved lesson to its new course', () => {
    const migrated = migrateRecord(record({ [OLD]: { read: { 'work-on-a-branch': 100, 'clone-a-repository': 50 } } }));
    assert.deepEqual(migrated.courses[NEW], { read: { 'work-on-a-branch': 100 } });
    assert.deepEqual(migrated.courses[OLD], { read: { 'clone-a-repository': 50 } });
  });

  it('moves the last-opened pointer when it names a moved lesson', () => {
    const migrated = migrateRecord(record({ [OLD]: { read: {}, last: 'open-a-pull-request' } }));
    assert.equal(migrated.courses[NEW].last, 'open-a-pull-request');
    assert.equal(migrated.courses[OLD]?.last, undefined);
  });

  it('keeps the later mark when a lesson is recorded under both courses', () => {
    const migrated = migrateRecord(
      record({ [OLD]: { read: { 'issues-forks-and-open-source': 200 } }, [NEW]: { read: { 'issues-forks-and-open-source': 300 } } }),
    );
    assert.equal(migrated.courses[NEW].read['issues-forks-and-open-source'], 300);
  });

  it('drops records of retired lessons without an error', () => {
    const migrated = migrateRecord(
      record({
        [OLD]: { read: { 'actions-and-pages-preview': 10, 'undo-and-restore': 20 }, last: 'actions-and-pages-preview' },
        [APP_OLD]: { read: { 'front-end-back-end-and-database': 30, 'see-the-finished-app': 40 } },
      }),
    );
    assert.deepEqual(migrated.courses[OLD], { read: { 'undo-and-restore': 20 } });
    assert.deepEqual(migrated.courses[APP_OLD], { read: { 'see-the-finished-app': 40 } });
  });

  it('leaves records of unrelated lessons and courses unchanged', () => {
    const input = record({ 'docker-for-beginners': { read: { 'what-is-docker': 5 }, last: 'run-nginx' } });
    assert.deepEqual(migrateRecord(input), input);
  });

  it('returns an empty record for an empty record', () => {
    assert.deepEqual(migrateRecord(emptyRecord()), emptyRecord());
  });

  it('does not change the record it was given', () => {
    const input = record({ [OLD]: { read: { 'work-on-a-branch': 1 } } });
    migrateRecord(input);
    assert.deepEqual(input, record({ [OLD]: { read: { 'work-on-a-branch': 1 } } }));
  });

  it('only moves lessons whose new course exists and holds them', () => {
    const target = getCourse(NEW);
    assert.ok(target, 'the new course is registered');
    const ids = new Set(flattenLessons(target.outline).map((lesson) => lesson.id));
    for (const move of MOVED_LESSONS) {
      assert.equal(move.toCourseId, NEW);
      assert.ok(ids.has(move.lessonId), `${move.lessonId} is in ${NEW}`);
      assert.ok(!flattenLessons(getCourse(OLD).outline).some((lesson) => lesson.id === move.lessonId), `${move.lessonId} left ${OLD}`);
    }
  });

  it('names only lessons that are absent from the current outline', () => {
    for (const retired of RETIRED_LESSONS) {
      const course = courses.find((item) => item.id === retired.courseId);
      if (!course) continue;
      assert.ok(!flattenLessons(course.outline).some((lesson) => lesson.id === retired.lessonId), `${retired.lessonId} is retired`);
    }
  });
});

describe('progress store over migrated records', () => {
  it('shows moved lessons as read in the new course and not in the old one', () => {
    const storage = new FakeStorage(record({ [OLD]: { read: { 'work-on-a-branch': 100 } } }));
    const store = createProgressStore(storage);
    assert.equal(store.isRead(NEW, 'work-on-a-branch'), true);
    assert.equal(store.isRead(OLD, 'work-on-a-branch'), false);
  });

  it('counts only current lessons after a retired lesson was recorded', () => {
    const lessonIds = flattenLessons(getCourse(APP_OLD).outline).map((lesson) => lesson.id);
    const storage = new FakeStorage(record({ [APP_OLD]: { read: { 'front-end-back-end-and-database': 1, 'see-the-finished-app': 2 } } }));
    const store = createProgressStore(storage);
    assert.deepEqual(store.summarize(APP_OLD, lessonIds), { read: 1, total: lessonIds.length });
    assert.equal(store.nextLesson(APP_OLD, lessonIds), lessonIds[1]);
  });

  it('writes the migrated record back on the next change', () => {
    const storage = new FakeStorage(record({ [OLD]: { read: { 'work-on-a-branch': 100 } } }));
    createProgressStore(storage, { now: () => 200 }).markRead(OLD, 'clone-a-repository');
    const saved = storage.raw();
    assert.deepEqual(saved.courses[NEW], { read: { 'work-on-a-branch': 100 } });
    assert.deepEqual(saved.courses[OLD].read, { 'clone-a-repository': 200 });
  });
});
