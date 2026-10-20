import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import { SUPPORTED_LOCALES } from '../../src/config/site.ts';
import { courses, flattenLessons, getCourse, lessonCount, neighbours, ancestorsOf } from '../../src/courses/registry.ts';
import { dockerForBeginners } from '../../src/courses/docker-for-beginners/outline.ts';
import { findCourseFailures } from '../../src/courses/integrity.ts';
import { readBodyKeys } from '../course-bodies.mjs';

const coursesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'src', 'courses');
const bodies = readBodyKeys(coursesDir);
const lessonIds = (course) => flattenLessons(course.outline).map((lesson) => lesson.id);
const titles = (text) => Object.fromEntries(SUPPORTED_LOCALES.map((locale) => [locale, text]));
const lesson = (id) => ({ kind: 'lesson', id, title: titles(id) });
const group = (id, children) => ({ kind: 'group', id, title: titles(id), children });
// Small fixture course that every negative case copies and then breaks in one place.
const fixtureCourse = () => ({
  id: 'fixture',
  title: titles('Fixture'),
  demo: true,
  outline: [group('alpha', [lesson('one'), lesson('two')]), lesson('three')],
});
const fixtureBodies = () => new Set(['fixture/en-US/one', 'fixture/en-US/two', 'fixture/en-US/three']);

// A group nested in a group, plus a flat course, so the helpers are checked on both shapes.
const nestedCourse = () => ({
  id: 'nested',
  title: titles('Nested'),
  demo: false,
  outline: [group('basics', [lesson('one'), group('tooling', [lesson('two'), lesson('three')])]), group('building', [lesson('four')])],
});
const flatCourse = () => ({ id: 'flat', title: titles('Flat'), demo: false, outline: [lesson('one'), lesson('two')] });

describe('registry helpers', () => {
  it('flattens lessons in outline order, depth first', () => {
    assert.deepEqual(lessonIds(nestedCourse()), ['one', 'two', 'three', 'four']);
    assert.deepEqual(lessonIds(dockerForBeginners).slice(0, 4), ['what-is-docker', 'install-docker', 'your-first-container', 'run-nginx']);
  });

  it('finds neighbours across group boundaries and stops at the ends', () => {
    const course = nestedCourse();
    const across = neighbours(course, 'three');
    assert.equal(across.previous.id, 'two');
    assert.equal(across.next.id, 'four');
    assert.equal(neighbours(course, 'one').previous, null);
    assert.equal(neighbours(course, 'four').next, null);
    assert.deepEqual(neighbours(course, 'missing'), { previous: null, next: null });
  });

  it('lists the groups that contain a lesson, outermost first', () => {
    const course = nestedCourse();
    assert.deepEqual(ancestorsOf(course, 'two').map((node) => node.id), ['basics', 'tooling']);
    assert.deepEqual(ancestorsOf(course, 'four').map((node) => node.id), ['building']);
    assert.deepEqual(ancestorsOf(course, 'missing'), []);
  });

  it('counts lessons without counting groups', () => {
    assert.equal(lessonCount(nestedCourse().outline), 4);
    assert.equal(lessonCount(flatCourse().outline), 2);
    assert.equal(lessonCount(dockerForBeginners.outline), 12);
  });

  it('looks courses up by id', () => {
    assert.equal(getCourse('docker-for-beginners'), dockerForBeginners);
    assert.equal(getCourse('nope'), undefined);
  });
});

describe('course data integrity', () => {
  it('accepts the registry and its bodies', () => {
    assert.deepEqual(findCourseFailures(courses, bodies), []);
  });

  it('has an en-US body for every lesson of every course', () => {
    for (const course of courses) {
      for (const id of lessonIds(course)) {
        assert.ok(bodies.has(`${course.id}/en-US/${id}`), `missing en-US body for ${course.id}/${id}`);
      }
    }
  });

  it('names a lesson that has no en-US body', () => {
    const withoutEnglish = new Set([...bodies].filter((key) => key !== 'docker-for-beginners/en-US/run-nginx'));
    const failures = findCourseFailures(courses, withoutEnglish);
    assert.deepEqual(failures, ['lesson "run-nginx" in course "docker-for-beginners" has no en-US body']);
  });

  it('names a course that lacks a title in one locale', () => {
    const course = fixtureCourse();
    delete course.title['ja-JP'];
    assert.deepEqual(findCourseFailures([course], fixtureBodies()), ['course "fixture" has no title for ja-JP']);
  });

  it('names a node that lacks a title in one locale', () => {
    const course = fixtureCourse();
    course.outline[1].title['de-DE'] = '';
    assert.deepEqual(findCourseFailures([course], fixtureBodies()), [
      'lesson "three" in course "fixture" has no title for de-DE',
    ]);
  });

  it('names a lesson id used twice in one course', () => {
    const course = fixtureCourse();
    course.outline[0].children[1].id = 'one';
    const failures = findCourseFailures([course], fixtureBodies());
    assert.ok(failures.some((message) => message.includes('"one"') && message.includes('"fixture"')), failures.join('; '));
  });

  it('names a group that contains no lesson at any depth', () => {
    const course = fixtureCourse();
    course.outline.push(group('empty', []));
    assert.ok(
      findCourseFailures([course], fixtureBodies()).includes('group "empty" in course "fixture" contains no lesson'),
    );
  });

  it('names a body that matches no lesson or locale', () => {
    const failures = findCourseFailures([fixtureCourse()], new Set([...fixtureBodies(), 'fixture/xx-XX/one']));
    assert.deepEqual(failures, ['body "fixture/xx-XX/one" does not match a supported locale and a lesson of a registered course']);
  });

  it('reads body files from the disk layout', () => {
    const top = readdirSync(coursesDir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
    assert.ok(top.includes('docker-for-beginners'));
  });
});
