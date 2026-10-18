import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import { SUPPORTED_LOCALES } from '../../src/config/site.ts';
import { courses } from '../../src/courses/registry.ts';
import { selectLessonBody } from '../../src/lib/lessonBody.ts';
import { allRoutes, parseRoute, routePath, switchLocale } from '../../src/lib/routes.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const routes = allRoutes();
// The page identity of a route with the locale removed, so the same page compares equal across locales.
const pageOf = (route) => [route.kind, route.courseId ?? '', route.lessonId ?? ''].join('|');
const lessonRoute = (locale) => ({ kind: 'lesson', locale, courseId: 'demo-foundations', lessonId: 'what-is-fullstack' });

describe('route model', () => {
  it('serves the identical page set in all ten locales once the prefix is removed', () => {
    const sets = SUPPORTED_LOCALES.map((locale) => routes.filter((route) => route.locale === locale).map(pageOf).sort());
    assert.equal(sets[0].length > 0, true);
    for (const [index, set] of sets.entries()) {
      assert.deepEqual(set, sets[0], `page set for ${SUPPORTED_LOCALES[index]} differs from en-US`);
    }
  });

  it('builds the default locale without a prefix and other locales under their code', () => {
    assert.equal(routePath({ kind: 'home', locale: 'en-US' }), '/');
    assert.equal(routePath({ kind: 'home', locale: 'zh-CN' }), '/zh-CN/');
    assert.equal(routePath(lessonRoute('en-US')), '/courses/demo-foundations/what-is-fullstack/');
    assert.equal(routePath(lessonRoute('zh-CN')), '/zh-CN/courses/demo-foundations/what-is-fullstack/');
  });

  it('never produces a route for a group', () => {
    const groupIds = courses.flatMap((course) => collectGroupIds(course.outline));
    assert.ok(groupIds.length > 0);
    for (const route of routes) {
      if (route.kind === 'lesson') assert.ok(!groupIds.includes(route.lessonId), `${route.lessonId} is a group`);
    }
    assert.equal(parseRoute('/courses/demo-foundations/basics/'), null);
    assert.equal(parseRoute('/courses/demo-foundations/tooling/'), null);
  });

  it('keeps the course and lesson when switching locale', () => {
    assert.deepEqual(switchLocale(lessonRoute('en-US'), 'ja-JP'), lessonRoute('ja-JP'));
    assert.equal(routePath(switchLocale(lessonRoute('zh-Hant'), 'en-US')), '/courses/demo-foundations/what-is-fullstack/');
  });

  it('parses every generated path back to the same route', () => {
    for (const route of routes) {
      assert.deepEqual(parseRoute(routePath(route)), route, routePath(route));
      assert.deepEqual(parseRoute(routePath(route).replace(/\/$/u, '')), route, routePath(route));
    }
  });

  it('serves nothing under an unsupported prefix or the explicit default prefix', () => {
    assert.equal(parseRoute('/xx-XX/courses/demo-sampler/first-steps/'), null);
    assert.equal(parseRoute('/en-US/'), null);
    assert.equal(parseRoute('/en-US/courses/demo-sampler/'), null);
    assert.equal(parseRoute('/courses/demo-sampler/no-such-lesson/'), null);
  });

  it('keeps astro.config.mjs and SUPPORTED_LOCALES in step', async () => {
    const config = await readFile(path.join(root, 'astro.config.mjs'), 'utf8');
    const configured = config.match(/locales:\s*\[([^\]]*)\]/u)?.[1].match(/'[^']+'/gu).map((code) => code.slice(1, -1));
    assert.deepEqual(configured, [...SUPPORTED_LOCALES]);
  });
});

function collectGroupIds(nodes) {
  return nodes.flatMap((node) => (node.kind === 'group' ? [node.id, ...collectGroupIds(node.children)] : []));
}

describe('lesson body selection', () => {
  const bodies = new Map([
    ['demo-foundations/en-US/what-is-fullstack', 'english'],
    ['demo-foundations/de-DE/what-is-fullstack', 'deutsch'],
    ['demo-foundations/en-US/how-the-web-works', 'english only'],
  ]);
  const find = (id) => bodies.get(id);

  it('returns the page locale body without a fallback flag when it exists', () => {
    assert.deepEqual(selectLessonBody(find, 'demo-foundations', 'what-is-fullstack', 'de-DE'), { body: 'deutsch', fallback: false });
  });

  it('returns the en-US body with the fallback flag when the locale has none', () => {
    assert.deepEqual(selectLessonBody(find, 'demo-foundations', 'how-the-web-works', 'de-DE'), { body: 'english only', fallback: true });
  });

  it('returns null when no body exists in any locale', () => {
    assert.equal(selectLessonBody(find, 'demo-foundations', 'missing', 'de-DE'), null);
  });
});
