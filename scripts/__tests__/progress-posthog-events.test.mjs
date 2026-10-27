import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';

import { PROGRESS_STORAGE_KEY, createProgressStore } from '../../src/lib/progress.ts';

// A Storage-like object backed by a Map, so a test can read exactly what the store wrote.
class FakeStorage {
  constructor() {
    this.map = new Map();
  }
  getItem(key) {
    return this.map.has(key) ? this.map.get(key) : null;
  }
  setItem(key, value) {
    this.map.set(key, String(value));
  }
}

class DeniedStorage {
  getItem() {
    throw new Error('access denied');
  }
  setItem() {
    throw new Error('access denied');
  }
}

class FullStorage extends FakeStorage {
  setItem() {
    throw new Error('quota exceeded');
  }
}

const COURSE = 'docker-for-beginners';
const LESSONS = ['l1', 'l2', 'l3'];

// Installs a PostHog stub as window.posthog and records each capture; the stub is removed after each test.
function withPostHog({ loaded = true, optedOut = false, throws = false } = {}) {
  const captures = [];
  const posthog = {
    __loaded: loaded,
    capture(event, properties) {
      if (throws) throw new Error('capture failed');
      captures.push({ event, properties });
    },
    has_opted_out_capturing: () => optedOut,
  };
  globalThis.window = { posthog };
  return captures;
}

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
afterEach(() => {
  if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow);
  else delete globalThis.window;
});

const names = (captures) => captures.map((capture) => capture.event);

describe('progress writer sends the two progress events', () => {
  it('sends lesson_marked_read on the first mark with course and lesson only', () => {
    const captures = withPostHog();
    const store = createProgressStore(new FakeStorage());
    store.markRead(COURSE, 'l1', LESSONS);
    assert.deepEqual(captures, [
      { event: 'lesson_marked_read', properties: { course: COURSE, lesson: 'l1' } },
    ]);
  });

  it('sends nothing when the lesson is already marked', () => {
    const captures = withPostHog();
    const store = createProgressStore(new FakeStorage());
    store.markRead(COURSE, 'l1', LESSONS);
    store.markRead(COURSE, 'l1', LESSONS);
    assert.deepEqual(names(captures), ['lesson_marked_read']);
  });

  it('sends nothing when progress is only restored on load', () => {
    const storage = new FakeStorage();
    const captures = withPostHog();
    const writer = createProgressStore(storage);
    writer.markRead(COURSE, 'l1', LESSONS);
    writer.markRead(COURSE, 'l2', LESSONS);
    captures.length = 0;

    createProgressStore(storage);
    assert.equal(captures.length, 0);
  });

  it('sends lesson_marked_read and course_completed when the last lesson is marked', () => {
    const captures = withPostHog();
    const store = createProgressStore(new FakeStorage());
    store.markRead(COURSE, 'l1', LESSONS);
    store.markRead(COURSE, 'l2', LESSONS);
    assert.deepEqual(names(captures), ['lesson_marked_read', 'lesson_marked_read']);

    store.markRead(COURSE, 'l3', LESSONS);
    assert.deepEqual(captures.slice(2), [
      { event: 'lesson_marked_read', properties: { course: COURSE, lesson: 'l3' } },
      { event: 'course_completed', properties: { course: COURSE } },
    ]);
  });

  it('sends course_completed again only after the course became incomplete and complete again', () => {
    const captures = withPostHog();
    const store = createProgressStore(new FakeStorage());
    for (const lesson of LESSONS) store.markRead(COURSE, lesson, LESSONS);
    store.markUnread(COURSE, 'l3');
    store.markRead(COURSE, 'l3', LESSONS);
    assert.equal(names(captures).filter((name) => name === 'course_completed').length, 2);
  });

  it('sends nothing when a complete course is reloaded', () => {
    const storage = new FakeStorage();
    const writer = createProgressStore(storage);
    for (const lesson of LESSONS) writer.markRead(COURSE, lesson, LESSONS);

    const captures = withPostHog();
    const reader = createProgressStore(storage);
    reader.markRead(COURSE, 'l3', LESSONS);
    assert.equal(captures.length, 0);
  });

  it('sends nothing when storage is blocked or throws, and does not crash', () => {
    for (const storage of [null, new DeniedStorage(), new FullStorage()]) {
      const captures = withPostHog();
      const store = createProgressStore(storage);
      assert.doesNotThrow(() => {
        for (const lesson of LESSONS) store.markRead(COURSE, lesson, LESSONS);
      });
      assert.equal(captures.length, 0);
      assert.ok(LESSONS.every((lesson) => store.isRead(COURSE, lesson)), 'progress still works in memory');
    }
  });

  it('keeps storing progress when PostHog is missing or opted out', () => {
    const storage = new FakeStorage();
    const store = createProgressStore(storage);
    store.markRead(COURSE, 'l1', LESSONS);
    assert.ok(storage.getItem(PROGRESS_STORAGE_KEY).includes('"l1"'));

    const captures = withPostHog({ optedOut: true });
    store.markRead(COURSE, 'l2', LESSONS);
    assert.equal(captures.length, 0);
    assert.ok(storage.getItem(PROGRESS_STORAGE_KEY).includes('"l2"'));
  });

  it('does not let a throwing capture stop the mark from being stored', () => {
    const storage = new FakeStorage();
    withPostHog({ throws: true });
    const store = createProgressStore(storage);
    assert.doesNotThrow(() => store.markRead(COURSE, 'l1', LESSONS));
    assert.ok(store.isRead(COURSE, 'l1'));
    assert.ok(storage.getItem(PROGRESS_STORAGE_KEY).includes('"l1"'));
  });
});
