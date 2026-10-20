import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { SUPPORTED_LOCALES } from '../../src/config/site.ts';
import { dockerForBeginners } from '../../src/courses/docker-for-beginners/outline.ts';
import { buildProgressIsland } from '../../src/lib/progressIsland.ts';
import { treeOf } from '../../src/lib/courseView.ts';

const titles = (text) => Object.fromEntries(SUPPORTED_LOCALES.map((locale) => [locale, text]));
const lesson = (id) => ({ kind: 'lesson', id, title: titles(id) });
const group = (id, children) => ({ kind: 'group', id, title: titles(id), children });
// A group nested in a group, so the tree and the preview are checked on a deeper outline than the real courses have.
const nestedCourse = () => ({
  id: 'nested',
  title: titles('Nested'),
  demo: false,
  outline: [
    group('basics', [lesson('one'), group('tooling', [lesson('two'), lesson('three')])]),
    group('building', [lesson('four')]),
    group('shipping', [lesson('five')]),
  ],
});
const flatCourse = () => ({ id: 'flat', title: titles('Flat'), demo: false, outline: [lesson('one'), lesson('two')] });

describe('progress island', () => {
  it('lists each course in reading order with its groups and hrefs in the page locale', () => {
    const island = buildProgressIsland('ja-JP', { courseId: 'docker-for-beginners' });
    assert.equal(island.courseId, 'docker-for-beginners');
    const docker = island.courses['docker-for-beginners'];
    assert.deepEqual(docker.lessons.slice(0, 4), ['what-is-docker', 'install-docker', 'your-first-container', 'run-nginx']);
    assert.deepEqual(docker.groups['connect-services'], ['docker-networks', 'docker-compose']);
    assert.deepEqual(docker.groups['get-started'], ['what-is-docker', 'install-docker', 'your-first-container']);
    assert.equal(docker.hrefs['docker-compose'], '/ja-JP/courses/docker-for-beginners/docker-compose/');
  });

  it('carries the progress texts for the page locale', () => {
    assert.equal(buildProgressIsland('en-US').texts.progressText, '{read} of {total} read');
  });
});

describe('course tree view', () => {
  it('keeps group nesting and uses titles of the requested locale', () => {
    const tree = treeOf(nestedCourse(), 'zh-CN', (id) => `/zh-CN/courses/nested/${id}/`);
    const basics = tree.find((node) => node.id === 'basics');
    assert.equal(basics.children.find((node) => node.id === 'tooling').kind, 'group');
    assert.equal(basics.children[0].href, '/zh-CN/courses/nested/one/');
    assert.equal(treeOf(flatCourse(), 'en-US', () => '#').length, 2);
    const docker = treeOf(dockerForBeginners, 'zh-CN', (id) => `/${id}/`);
    assert.equal(docker[0].title, dockerForBeginners.outline[0].title['zh-CN']);
  });
});

describe('previewSections', () => {
  const hrefFor = (id) => `/${id}/`;

  it('groups lessons by top-level group and flattens nested groups', async () => {
    const { previewSections } = await import('../../src/lib/courseView.ts');
    const { sections, truncated } = previewSections(nestedCourse(), 'en-US', hrefFor, 99);
    assert.equal(truncated, false);
    assert.ok(sections.length >= 2 && sections.every((section) => section.title));
    assert.equal(sections.reduce((sum, section) => sum + section.lessons.length, 0), 5);
  });

  it('puts top-level lessons in one untitled section', async () => {
    const { previewSections } = await import('../../src/lib/courseView.ts');
    const { sections } = previewSections(flatCourse(), 'en-US', hrefFor, 8);
    assert.equal(sections.length, 1);
    assert.equal(sections[0].title, undefined);
    assert.equal(sections[0].lessons.length, 2);
  });

  it('stops at the limit and says it truncated', async () => {
    const { previewSections } = await import('../../src/lib/courseView.ts');
    const { sections, truncated } = previewSections(nestedCourse(), 'en-US', hrefFor, 3);
    assert.equal(truncated, true);
    assert.equal(sections.reduce((sum, section) => sum + section.lessons.length, 0), 3);
  });
});
