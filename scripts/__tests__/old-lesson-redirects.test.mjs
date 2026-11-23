import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { SUPPORTED_LOCALES } from '../../src/config/site.ts';
import { flattenLessons, getCourse } from '../../src/courses/registry.ts';
import { MOVED_LESSONS, movedLessonRedirects } from '../../src/lib/lessonMoves.ts';
import { parseRoute, routePath } from '../../src/lib/routes.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const redirects = movedLessonRedirects();

describe('old lesson addresses of moved lessons', () => {
  it('has one redirect per moved lesson per locale', () => {
    assert.equal(Object.keys(redirects).length, MOVED_LESSONS.length * SUPPORTED_LOCALES.length);
  });

  for (const move of MOVED_LESSONS) {
    for (const locale of SUPPORTED_LOCALES) {
      it(`sends ${move.lessonId} in ${locale} from ${move.fromCourseId} to ${move.toCourseId}`, () => {
        const from = routePath({ kind: 'lesson', locale, courseId: move.fromCourseId, lessonId: move.lessonId });
        const to = routePath({ kind: 'lesson', locale, courseId: move.toCourseId, lessonId: move.lessonId });
        assert.equal(redirects[from], to);
        // The old address serves no page, so the redirect never competes with a real page.
        assert.equal(parseRoute(from), null, `${from} is still a page`);
        // The new address is a real lesson page in the new course.
        assert.deepEqual(parseRoute(to), { kind: 'lesson', locale, courseId: move.toCourseId, lessonId: move.lessonId });
      });
    }
  }

  it('finds each moved lesson in its new course and not in the old one', () => {
    for (const move of MOVED_LESSONS) {
      const ids = flattenLessons(getCourse(move.toCourseId).outline).map((lesson) => lesson.id);
      const oldIds = flattenLessons(getCourse(move.fromCourseId).outline).map((lesson) => lesson.id);
      assert.ok(ids.includes(move.lessonId), `${move.lessonId} in ${move.toCourseId}`);
      assert.ok(!oldIds.includes(move.lessonId), `${move.lessonId} still in ${move.fromCourseId}`);
    }
  });

  it('is the redirect table the Astro config uses', async () => {
    const config = (await import(pathToFileURL(path.join(root, 'astro.config.mjs')).href)).default;
    assert.deepEqual(config.redirects, redirects);
  });
});
