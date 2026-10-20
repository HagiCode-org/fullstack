import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { SUPPORTED_LOCALES } from '../../src/config/site.ts';
import { PROGRESS_STORAGE_KEY, createProgressStore } from '../../src/lib/progress.ts';

// A Storage-like object backed by a Map, so a test can read exactly what the store wrote.
class FakeStorage {
  constructor(initial = {}) {
    this.map = new Map(Object.entries(initial));
  }
  getItem(key) {
    return this.map.has(key) ? this.map.get(key) : null;
  }
  setItem(key, value) {
    this.map.set(key, String(value));
  }
  raw() {
    return this.map.get(PROGRESS_STORAGE_KEY) ?? null;
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
const OUTLINE = ['l1', 'l2', 'l3'];

describe('progress record', () => {
  it('keeps progress across a new store on the same storage', () => {
    const storage = new FakeStorage();
    createProgressStore(storage).markRead(COURSE, 'l1');
    const later = createProgressStore(storage);
    assert.equal(later.isRead(COURSE, 'l1'), true);
    assert.equal(later.persisted, true);
  });

  it('stores course and lesson ids only, with no locale anywhere', () => {
    const storage = new FakeStorage();
    const store = createProgressStore(storage, { now: () => 1760000000000 });
    store.markRead(COURSE, 'l1');
    store.setLast(COURSE, 'l1');
    const record = JSON.parse(storage.raw());
    assert.deepEqual(record, { version: 1, courses: { [COURSE]: { read: { l1: 1760000000000 }, last: 'l1' } } });
    for (const locale of SUPPORTED_LOCALES) {
      assert.ok(!storage.raw().includes(locale), `stored record must not contain ${locale}`);
    }
  });

  it('isolates progress per course', () => {
    const store = createProgressStore(new FakeStorage());
    store.markRead('course-a', 'x');
    assert.deepEqual(store.summarize('course-b', ['x']), { read: 0, total: 1 });
    assert.deepEqual(store.summarize('course-a', ['x']), { read: 1, total: 1 });
  });

  it('ignores entries for lessons that are no longer in the outline', () => {
    const storage = new FakeStorage({
      [PROGRESS_STORAGE_KEY]: JSON.stringify({ version: 1, courses: { [COURSE]: { read: { gone: 1, l1: 1 } } } }),
    });
    const store = createProgressStore(storage);
    assert.deepEqual(store.summarize(COURSE, ['l1', 'l2']), { read: 1, total: 2 });
  });

  it('picks the first unread lesson in outline order, and none when all are read', () => {
    const store = createProgressStore(new FakeStorage());
    store.markRead(COURSE, 'l2');
    assert.equal(store.nextLesson(COURSE, OUTLINE), 'l1');
    store.markRead(COURSE, 'l1');
    assert.equal(store.nextLesson(COURSE, OUTLINE), 'l3');
    store.markRead(COURSE, 'l3');
    assert.equal(store.nextLesson(COURSE, OUTLINE), null);
  });

  it('removes the entry when a lesson is marked unread', () => {
    const storage = new FakeStorage();
    const store = createProgressStore(storage);
    store.markRead(COURSE, 'l1');
    store.markUnread(COURSE, 'l1');
    assert.equal(store.isRead(COURSE, 'l1'), false);
    assert.deepEqual(JSON.parse(storage.raw()).courses[COURSE].read, {});
  });

  it('notifies listeners on change and stops after unsubscribe', () => {
    const store = createProgressStore(new FakeStorage());
    let calls = 0;
    const stop = store.subscribe(() => {
      calls += 1;
    });
    store.markRead(COURSE, 'l1');
    stop();
    store.markRead(COURSE, 'l2');
    assert.equal(calls, 1);
  });

  it('picks up a change written by another store when refreshed', () => {
    const storage = new FakeStorage();
    const reader = createProgressStore(storage);
    let notified = false;
    reader.subscribe(() => {
      notified = true;
    });
    createProgressStore(storage).markRead(COURSE, 'l3');
    reader.refresh();
    assert.equal(reader.isRead(COURSE, 'l3'), true);
    assert.equal(notified, true);
  });
});

describe('progress failure cases', () => {
  it('treats blocked storage as empty and keeps working in memory', () => {
    const store = createProgressStore(new DeniedStorage());
    assert.deepEqual(store.load(), { version: 1, courses: {} });
    assert.equal(store.persisted, false);
    store.markRead(COURSE, 'l1');
    assert.equal(store.isRead(COURSE, 'l1'), true);
  });

  it('treats missing storage as unavailable', () => {
    const store = createProgressStore(null);
    assert.equal(store.persisted, false);
    assert.doesNotThrow(() => store.markRead(COURSE, 'l1'));
  });

  it('keeps the change in memory and reports persisted false when a write fails', () => {
    const store = createProgressStore(new FullStorage());
    assert.doesNotThrow(() => store.markRead(COURSE, 'l1'));
    assert.equal(store.isRead(COURSE, 'l1'), true);
    assert.equal(store.persisted, false);
  });

  it('treats corrupt JSON as empty without throwing', () => {
    const storage = new FakeStorage({ [PROGRESS_STORAGE_KEY]: '{not json' });
    const store = createProgressStore(storage);
    assert.deepEqual(store.load(), { version: 1, courses: {} });
    assert.equal(store.isRead(COURSE, 'l1'), false);
  });

  it('treats an unknown version as empty and overwrites it only on the next write', () => {
    const stored = JSON.stringify({ version: 99, courses: { [COURSE]: { read: { l1: 1 } } } });
    const storage = new FakeStorage({ [PROGRESS_STORAGE_KEY]: stored });
    const store = createProgressStore(storage);
    assert.equal(store.isRead(COURSE, 'l1'), false);
    assert.equal(storage.raw(), stored);
    store.markRead(COURSE, 'l2');
    assert.deepEqual(JSON.parse(storage.raw()).version, 1);
    assert.deepEqual(Object.keys(JSON.parse(storage.raw()).courses[COURSE].read), ['l2']);
  });
});
