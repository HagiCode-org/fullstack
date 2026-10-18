import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import { SUPPORTED_LOCALES } from '../../src/config/site.ts';
import { courses, flattenLessons, getCourse, lessonCount, neighbours, ancestorsOf } from '../../src/courses/registry.ts';
import { demoFoundations } from '../../src/courses/demo-foundations/outline.ts';
import { demoSampler } from '../../src/courses/demo-sampler/outline.ts';
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

describe('registry helpers', () => {
  it('flattens lessons in outline order, depth first', () => {
    assert.deepEqual(lessonIds(demoFoundations), [
      'what-is-fullstack',
      'how-the-web-works',
      'setting-up-your-tools',
      'version-control-basics',
      'your-first-page',
      'adding-data',
      'shipping-it',
    ]);
  });

  it('finds neighbours across group boundaries and stops at the ends', () => {
    const across = neighbours(demoFoundations, 'version-control-basics');
    assert.equal(across.previous.id, 'setting-up-your-tools');
    assert.equal(across.next.id, 'your-first-page');
    assert.equal(neighbours(demoFoundations, 'what-is-fullstack').previous, null);
    assert.equal(neighbours(demoFoundations, 'shipping-it').next, null);
    assert.deepEqual(neighbours(demoFoundations, 'missing'), { previous: null, next: null });
  });

  it('lists the groups that contain a lesson, outermost first', () => {
    assert.deepEqual(ancestorsOf(demoFoundations, 'setting-up-your-tools').map((node) => node.id), ['basics', 'tooling']);
    assert.deepEqual(ancestorsOf(demoFoundations, 'your-first-page').map((node) => node.id), ['building']);
    assert.deepEqual(ancestorsOf(demoFoundations, 'missing'), []);
  });

  it('counts lessons without counting groups', () => {
    assert.equal(lessonCount(demoFoundations.outline), 7);
    assert.equal(lessonCount(demoSampler.outline), 2);
  });

  it('looks courses up by id', () => {
    assert.equal(getCourse('demo-sampler'), demoSampler);
    assert.equal(getCourse('nope'), undefined);
  });
});

describe('demo courses', () => {
  it('ship a multi-level outline with a group nested in a group and at least five lessons', () => {
    const top = demoFoundations.outline.filter((node) => node.kind === 'group');
    assert.equal(top.length, 2);
    const nested = top.flatMap((node) => node.children).filter((node) => node.kind === 'group');
    assert.equal(nested.length, 1);
    assert.ok(lessonIds(demoFoundations).length >= 5);
  });

  it('ship a flat outline with at least two lessons and no group', () => {
    assert.ok(demoSampler.outline.every((node) => node.kind === 'lesson'));
    assert.ok(lessonIds(demoSampler).length >= 2);
  });

  it('mark both courses as demo content in every locale title', () => {
    for (const course of [demoFoundations, demoSampler]) {
      assert.equal(course.demo, true);
      for (const locale of SUPPORTED_LOCALES) {
        assert.match(course.title[locale], /[(（].+[)）]$/u, `${course.id} title in ${locale} needs a bracketed demo marker`);
      }
    }
  });
});

describe('course data integrity', () => {
  it('accepts the registry and its bodies', () => {
    assert.deepEqual(findCourseFailures(courses, bodies), []);
  });

  it('has an en-US body for every lesson, and the first demo lesson in all ten locales', () => {
    for (const id of lessonIds(demoFoundations)) {
      assert.ok(bodies.has(`demo-foundations/en-US/${id}`), `missing en-US body for ${id}`);
    }
    for (const locale of SUPPORTED_LOCALES) {
      assert.ok(bodies.has(`demo-foundations/${locale}/what-is-fullstack`), `missing ${locale} body`);
    }
  });

  it('names a lesson that has no en-US body', () => {
    const withoutEnglish = new Set([...bodies].filter((key) => key !== 'demo-foundations/en-US/how-the-web-works'));
    const failures = findCourseFailures(courses, withoutEnglish);
    assert.deepEqual(failures, ['lesson "how-the-web-works" in course "demo-foundations" has no en-US body']);
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
    assert.ok(top.includes('demo-foundations') && top.includes('demo-sampler'));
  });
});
