import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';

import {
  SITE_EVENT_STRING_MAX_LENGTH,
  SITE_POSTHOG_EVENTS,
  captureSiteEvent,
} from '../../src/lib/posthog-events.ts';

// Hagilight-managed super properties. A site table must never list them, and a caller must never send them.
const SUPER_PROPERTIES = ['site_id', 'site_framework', 'hagilight_version', 'locale', 'page_type'];

// A PostHog stub that records every capture and every opt-out check.
function fakePostHog({ loaded = true, optedOut = false, throws = false } = {}) {
  const calls = { captures: [], optOutChecks: 0 };
  return {
    calls,
    __loaded: loaded,
    capture(event, properties) {
      if (throws) throw new Error('capture failed');
      calls.captures.push({ event, properties });
    },
    has_opted_out_capturing() {
      calls.optOutChecks += 1;
      return optedOut;
    },
  };
}

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
function setWindow(value) {
  Object.defineProperty(globalThis, 'window', { value, configurable: true, writable: true });
}
afterEach(() => {
  if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow);
  else delete globalThis.window;
});

describe('site event capture wrapper', () => {
  it('sends an allowed event with its allowlisted properties', () => {
    const ph = fakePostHog();
    captureSiteEvent('lesson_marked_read', { course: 'docker-for-beginners', lesson: 'what-is-docker' }, { posthog: ph });
    assert.deepEqual(ph.calls.captures, [
      { event: 'lesson_marked_read', properties: { course: 'docker-for-beginners', lesson: 'what-is-docker' } },
    ]);
  });

  it('sends nothing for an event name that is not in the table', () => {
    const ph = fakePostHog();
    captureSiteEvent('page_viewed', { course: 'a' }, { posthog: ph });
    captureSiteEvent('constructor', {}, { posthog: ph });
    captureSiteEvent('__proto__', {}, { posthog: ph });
    assert.equal(ph.calls.captures.length, 0);
  });

  it('drops a property whose key is not in the allowlist', () => {
    const ph = fakePostHog();
    captureSiteEvent('course_completed', { course: 'a', lesson: 'l1', notes: 'free text' }, { posthog: ph });
    assert.deepEqual(ph.calls.captures[0].properties, { course: 'a' });
  });

  it('drops non-primitive values, including null, arrays and objects', () => {
    const ph = fakePostHog();
    captureSiteEvent('lesson_marked_read', { course: { id: 'a' }, lesson: ['l1'] }, { posthog: ph });
    captureSiteEvent('course_completed', { course: null }, { posthog: ph });
    assert.deepEqual(ph.calls.captures[0].properties, {});
    assert.deepEqual(ph.calls.captures[1].properties, {});
  });

  it('drops a value of the wrong primitive type for its key', () => {
    const ph = fakePostHog();
    captureSiteEvent('course_completed', { course: 42 }, { posthog: ph });
    assert.deepEqual(ph.calls.captures[0].properties, {});
  });

  it('caps a string at 128 characters', () => {
    const ph = fakePostHog();
    captureSiteEvent('lesson_marked_read', { course: 'c', lesson: 'x'.repeat(200) }, { posthog: ph });
    assert.equal(SITE_EVENT_STRING_MAX_LENGTH, 128);
    assert.equal(ph.calls.captures[0].properties.lesson.length, 128);
  });

  it('drops the super-property keys even when the caller passes them', () => {
    const ph = fakePostHog();
    const input = Object.fromEntries([['course', 'a'], ...SUPER_PROPERTIES.map((key) => [key, 'value'])]);
    captureSiteEvent('course_completed', input, { posthog: ph });
    assert.deepEqual(ph.calls.captures[0].properties, { course: 'a' });
  });

  it('sends nothing when window.posthog is undefined, and does not throw', () => {
    setWindow({});
    assert.doesNotThrow(() => captureSiteEvent('course_completed', { course: 'a' }));
    delete globalThis.window;
    assert.doesNotThrow(() => captureSiteEvent('course_completed', { course: 'a' }));
  });

  it('reads window.posthog when no PostHog option is passed', () => {
    const ph = fakePostHog();
    setWindow({ posthog: ph });
    captureSiteEvent('course_completed', { course: 'a' });
    assert.equal(ph.calls.captures.length, 1);
  });

  it('hands the event to the stub without checking opt-out while __loaded is not true', () => {
    const ph = fakePostHog({ loaded: false, optedOut: true });
    captureSiteEvent('course_completed', { course: 'a' }, { posthog: ph });
    assert.equal(ph.calls.captures.length, 1);
    assert.equal(ph.calls.optOutChecks, 0);
  });

  it('sends nothing once loaded and the visitor has opted out', () => {
    const ph = fakePostHog({ loaded: true, optedOut: true });
    captureSiteEvent('course_completed', { course: 'a' }, { posthog: ph });
    assert.equal(ph.calls.captures.length, 0);
    assert.equal(ph.calls.optOutChecks, 1);
  });

  it('returns normally when capture throws', () => {
    const ph = fakePostHog({ throws: true });
    assert.doesNotThrow(() => captureSiteEvent('course_completed', { course: 'a' }, { posthog: ph }));
  });

  it('sends nothing when the consent gate says no, and sends when it says yes', () => {
    const ph = fakePostHog();
    captureSiteEvent('course_completed', { course: 'a' }, { posthog: ph, isAllowed: () => false });
    assert.equal(ph.calls.captures.length, 0);
    captureSiteEvent('course_completed', { course: 'a' }, { posthog: ph, isAllowed: () => true });
    assert.equal(ph.calls.captures.length, 1);
  });
});

describe('site event table', () => {
  it('names every event snake_case with the object first and lists no super property', () => {
    for (const [name, keys] of Object.entries(SITE_POSTHOG_EVENTS)) {
      assert.match(name, /^[a-z]+(_[a-z]+)+$/u, `event name ${name}`);
      for (const key of Object.keys(keys)) {
        assert.ok(!SUPER_PROPERTIES.includes(key), `${name} lists super property ${key}`);
      }
    }
  });

  it('lists exactly the reviewed keys for each event', () => {
    const keysByEvent = Object.fromEntries(
      Object.entries(SITE_POSTHOG_EVENTS).map(([name, keys]) => [name, Object.keys(keys)]),
    );
    assert.deepEqual(keysByEvent, {
      lesson_marked_read: ['course', 'lesson'],
      course_completed: ['course'],
    });
  });

  it('sends only the allowlisted keys for a representative input with URLs, free text and super properties', () => {
    const input = {
      course: 'docker-for-beginners',
      lesson: 'what-is-docker',
      url: 'https://fullstack.hagicode.com/courses/docker-for-beginners/what-is-docker?ref=x#top',
      pathname: '/en/courses/docker-for-beginners/what-is-docker',
      notes: 'a private note the reader typed',
      title: 'Free text title',
      search: 'docker run',
      ...Object.fromEntries(SUPER_PROPERTIES.map((key) => [key, 'value'])),
    };
    for (const [name, keys] of Object.entries(SITE_POSTHOG_EVENTS)) {
      const ph = fakePostHog();
      captureSiteEvent(name, input, { posthog: ph });
      assert.equal(ph.calls.captures.length, 1, `${name} sent once`);
      const sent = ph.calls.captures[0].properties;
      assert.deepEqual(Object.keys(sent).sort(), Object.keys(keys).sort(), `${name} keys`);
      for (const value of Object.values(sent)) {
        assert.ok(!String(value).includes('http') && !String(value).includes('private'), `${name} value ${value}`);
      }
    }
  });
});
