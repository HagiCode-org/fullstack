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
const lessonRoute = (locale) => ({ kind: 'lesson', locale, courseId: 'docker-for-beginners', lessonId: 'what-is-docker' });

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
    assert.equal(routePath(lessonRoute('en-US')), '/courses/docker-for-beginners/what-is-docker/');
    assert.equal(routePath(lessonRoute('zh-CN')), '/zh-CN/courses/docker-for-beginners/what-is-docker/');
  });

  it('never produces a route for a group', () => {
    const groupIds = courses.flatMap((course) => collectGroupIds(course.outline));
    assert.ok(groupIds.length > 0);
    for (const route of routes) {
      if (route.kind === 'lesson') assert.ok(!groupIds.includes(route.lessonId), `${route.lessonId} is a group`);
    }
    assert.equal(parseRoute('/courses/docker-for-beginners/get-started/'), null);
    assert.equal(parseRoute('/courses/docker-for-beginners/run-services/'), null);
  });

  it('keeps the course and lesson when switching locale', () => {
    assert.deepEqual(switchLocale(lessonRoute('en-US'), 'ja-JP'), lessonRoute('ja-JP'));
    assert.equal(routePath(switchLocale(lessonRoute('zh-Hant'), 'en-US')), '/courses/docker-for-beginners/what-is-docker/');
  });

  it('parses every generated path back to the same route', () => {
    for (const route of routes) {
      assert.deepEqual(parseRoute(routePath(route)), route, routePath(route));
      assert.deepEqual(parseRoute(routePath(route).replace(/\/$/u, '')), route, routePath(route));
    }
  });

  it('serves nothing under an unsupported prefix or the explicit default prefix', () => {
    assert.equal(parseRoute('/xx-XX/courses/docker-for-beginners/what-is-docker/'), null);
    assert.equal(parseRoute('/en-US/'), null);
    assert.equal(parseRoute('/en-US/courses/docker-for-beginners/'), null);
    assert.equal(parseRoute('/courses/docker-for-beginners/no-such-lesson/'), null);
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
    ['docker-for-beginners/en-US/what-is-docker', 'english'],
    ['docker-for-beginners/de-DE/what-is-docker', 'deutsch'],
    ['docker-for-beginners/en-US/install-docker', 'english only'],
  ]);
  const find = (id) => bodies.get(id);

  it('returns the page locale body without a fallback flag when it exists', () => {
    assert.deepEqual(selectLessonBody(find, 'docker-for-beginners', 'what-is-docker', 'de-DE'), { body: 'deutsch', fallback: false });
  });

  it('returns the en-US body with the fallback flag when the locale has none', () => {
    assert.deepEqual(selectLessonBody(find, 'docker-for-beginners', 'install-docker', 'de-DE'), { body: 'english only', fallback: true });
  });

  it('returns null when no body exists in any locale', () => {
    assert.equal(selectLessonBody(find, 'docker-for-beginners', 'missing', 'de-DE'), null);
  });
});
