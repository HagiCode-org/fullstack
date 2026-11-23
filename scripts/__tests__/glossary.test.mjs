import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import { SUPPORTED_LOCALES } from '../../src/config/site.ts';
import { courses } from '../../src/courses/registry.ts';
import { glossaryAnchor, glossaryGroups, glossaryText, parseGlossary, termLinkHref } from '../../src/lib/glossary.ts';
import { allRoutes, parseRoute, routePath } from '../../src/lib/routes.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const glossaryDir = path.join(root, 'src', 'glossary');
const titles = (text) => Object.fromEntries(SUPPORTED_LOCALES.map((locale) => [locale, text]));
const sentence = (text) => ({ 'en-US': text });
const entry = (id, extra = {}) => ({
  id,
  term: sentence(`Term ${id}`),
  definition: sentence(`A definition of ${id}.`),
  analogy: sentence(`Like ${id} in daily life.`),
  introducedIn: 'lesson-one',
  ...extra,
});

describe('glossary data files', () => {
  it('has one valid JSON array per course, and no file for an unknown course', () => {
    const registryIds = courses.map((course) => course.id);
    for (const id of registryIds) {
      const file = path.join(glossaryDir, `${id}.json`);
      assert.ok(existsSync(file), `src/glossary/${id}.json is missing`);
      assert.doesNotThrow(() => parseGlossary(id, JSON.parse(readFileSync(file, 'utf8'))), `${id} glossary is not valid`);
    }
    const stray = readdirSync(glossaryDir).filter((name) => name.endsWith('.json') && !registryIds.includes(name.replace(/\.json$/u, '')));
    assert.deepEqual(stray, [], 'glossary files must be named after a course id in the registry');
  });
});

describe('parseGlossary', () => {
  it('accepts a well-formed course glossary', () => {
    assert.equal(parseGlossary('fixture', [entry('container'), entry('image')]).length, 2);
    assert.deepEqual(parseGlossary('fixture', []), []);
  });

  it('rejects a value that is not an array, naming the file', () => {
    assert.throws(() => parseGlossary('fixture', {}), /src\/glossary\/fixture\.json must be a JSON array/u);
  });

  it('names each problem: missing English term, bad or duplicate id, missing lesson', () => {
    let message = '';
    try {
      parseGlossary('fixture', [
        entry('container', { term: {} }),
        entry('Bad Id'),
        entry('image'),
        entry('image'),
        entry('volume', { introducedIn: '' }),
      ]);
    } catch (error) {
      message = error.message;
    }
    assert.match(message, /entry 1 \("container"\) needs a non-empty "term" text for en-US/u);
    assert.match(message, /entry 2 needs an id matching \[a-z0-9-\]\+/u);
    assert.match(message, /id "image" is used more than once/u);
    assert.match(message, /entry 5 \("volume"\) needs the id of the lesson that introduces it/u);
  });

  it('rejects a text that is blank or spans lines', () => {
    assert.throws(() => parseGlossary('fixture', [entry('a', { definition: sentence('two\nlines') })]), /"definition" text for en-US/u);
  });
});

describe('glossaryText', () => {
  it('uses the locale text when there is one', () => {
    assert.deepEqual(glossaryText({ 'en-US': 'Container', 'zh-CN': '容器' }, 'zh-CN'), { value: '容器', fallback: false });
  });

  it('falls back to English, and says so, when the locale has no text', () => {
    assert.deepEqual(glossaryText({ 'en-US': 'Container' }, 'de-DE'), { value: 'Container', fallback: true });
    assert.deepEqual(glossaryText({ 'en-US': 'Container' }, 'en-US'), { value: 'Container', fallback: false });
  });
});

describe('glossaryGroups', () => {
  const fixtureCourses = [
    { id: 'first', title: titles('First course') },
    { id: 'empty', title: titles('No terms') },
    { id: 'second', title: titles('Second course') },
  ];
  const fixtureGlossaries = {
    second: [entry('volume')],
    first: [entry('container'), entry('image', { term: { 'en-US': 'Image', 'zh-CN': '镜像' }, definition: { 'en-US': 'Built from layers.', 'zh-CN': '由层构成。' }, analogy: { 'en-US': 'A photo template.', 'zh-CN': '相片模板。' } })],
  };

  it('groups by course in registry order and leaves out courses without terms', () => {
    const groups = glossaryGroups(fixtureCourses, fixtureGlossaries, 'en-US');
    assert.deepEqual(groups.map((group) => group.courseId), ['first', 'second']);
    assert.deepEqual(groups[0].entries.map((item) => item.anchor), ['first-container', 'first-image']);
    assert.equal(groups[1].title, 'Second course');
  });

  it('shows the locale text and marks English fallbacks per entry', () => {
    const zh = glossaryGroups(fixtureCourses, fixtureGlossaries, 'zh-CN')[0].entries;
    assert.equal(zh[1].term, '镜像');
    assert.equal(zh[1].fallback, false);
    assert.equal(zh[0].term, 'Term container');
    assert.equal(zh[0].fallback, true);
  });

  it('gives no groups when no course has terms', () => {
    assert.deepEqual(glossaryGroups(fixtureCourses, {}, 'ja-JP'), []);
  });

  it('builds anchors of the form <course id>-<term id>', () => {
    assert.equal(glossaryAnchor('docker-for-beginners', 'container'), 'docker-for-beginners-container');
  });
});

describe('term links in lesson text', () => {
  it('writes a term link as a relative link to the entry on the glossary page', () => {
    // Lesson pages sit three levels below the locale root, so the same three steps reach /glossary/ in every locale.
    assert.equal(termLinkHref('docker-for-beginners', 'container'), '../../../glossary/#docker-for-beginners-container');
  });

  // Every glossary link in a lesson body must name a term the course's own glossary defines. verify-foundation checks the
  // built pages too; this check runs under `pnpm test` without a build.
  it('names only terms the course glossary defines, in every lesson body', () => {
    const contentRoot = path.join(root, 'src', 'courses');
    const problems = [];
    for (const course of courses) {
      const dir = path.join(contentRoot, course.id, 'content', 'en-US');
      if (!existsSync(dir)) continue;
      const ids = new Set(JSON.parse(readFileSync(path.join(glossaryDir, `${course.id}.json`), 'utf8')).map((item) => item.id));
      for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
        const text = readFileSync(path.join(dir, file), 'utf8');
        for (const match of text.matchAll(/\]\(\.\.\/\.\.\/\.\.\/glossary\/#([a-z0-9-]+)\)/gu)) {
          const anchor = match[1];
          const termId = anchor.startsWith(`${course.id}-`) ? anchor.slice(course.id.length + 1) : null;
          if (termId === null || !ids.has(termId)) problems.push(`${course.id}/${file} links to #${anchor}, which is not a term of ${course.id}`);
        }
      }
    }
    assert.deepEqual(problems, []);
  });
});

describe('glossary routes', () => {
  it('serves /glossary/ in every locale, with the locale prefix for the others', () => {
    assert.equal(routePath({ kind: 'glossary', locale: 'en-US' }), '/glossary/');
    for (const locale of SUPPORTED_LOCALES) {
      const route = { kind: 'glossary', locale };
      const expected = locale === 'en-US' ? '/glossary/' : `/${locale}/glossary/`;
      assert.equal(routePath(route), expected);
      assert.deepEqual(parseRoute(expected), route, `${expected} must parse back to its route`);
    }
  });

  it('includes one glossary page per locale in the route set', () => {
    const pages = allRoutes().filter((route) => route.kind === 'glossary');
    assert.equal(pages.length, SUPPORTED_LOCALES.length);
  });

  it('serves no glossary page under a path it does not own', () => {
    assert.equal(parseRoute('/en-US/glossary/'), null);
    assert.equal(parseRoute('/glossary/extra/'), null);
  });
});
