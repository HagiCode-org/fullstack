import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { demoFoundations } from '../../src/courses/demo-foundations/outline.ts';
import { demoSampler } from '../../src/courses/demo-sampler/outline.ts';
import { buildProgressIsland } from '../../src/lib/progressIsland.ts';
import { treeOf } from '../../src/lib/courseView.ts';

describe('progress island', () => {
  it('lists each course in reading order with its groups and hrefs in the page locale', () => {
    const island = buildProgressIsland('ja-JP', { courseId: 'demo-foundations' });
    assert.equal(island.courseId, 'demo-foundations');
    assert.deepEqual(island.courses['demo-sampler'].lessons, ['first-steps', 'next-steps']);
    assert.deepEqual(island.courses['demo-foundations'].groups.tooling, ['setting-up-your-tools', 'version-control-basics']);
    assert.deepEqual(island.courses['demo-foundations'].groups.basics.slice(0, 2), ['what-is-fullstack', 'how-the-web-works']);
    assert.equal(island.courses['demo-sampler'].hrefs['next-steps'], '/ja-JP/courses/demo-sampler/next-steps/');
  });

  it('carries the progress texts for the page locale', () => {
    assert.equal(buildProgressIsland('en-US').texts.progressText, '{read} of {total} read');
  });
});

describe('course tree view', () => {
  it('keeps group nesting and uses titles of the requested locale', () => {
    const tree = treeOf(demoFoundations, 'zh-CN', (id) => `/zh-CN/courses/demo-foundations/${id}/`);
    const basics = tree.find((node) => node.id === 'basics');
    assert.equal(basics.title, '基础');
    assert.equal(basics.children.find((node) => node.id === 'tooling').kind, 'group');
    const first = basics.children[0];
    assert.equal(first.href, '/zh-CN/courses/demo-foundations/what-is-fullstack/');
    assert.equal(treeOf(demoSampler, 'en-US', () => '#').length, 2);
  });
});

describe('previewSections', () => {
  const hrefFor = (id) => `/${id}/`;

  it('groups lessons by top-level group and flattens nested groups', async () => {
    const { previewSections } = await import('../../src/lib/courseView.ts');
    const { sections, truncated } = previewSections(demoFoundations, 'en-US', hrefFor, 99);
    assert.equal(truncated, false);
    assert.ok(sections.length >= 2 && sections.every((section) => section.title));
    assert.equal(sections.reduce((sum, section) => sum + section.lessons.length, 0), 7);
  });

  it('puts top-level lessons in one untitled section', async () => {
    const { previewSections } = await import('../../src/lib/courseView.ts');
    const { sections } = previewSections(demoSampler, 'en-US', hrefFor, 8);
    assert.equal(sections.length, 1);
    assert.equal(sections[0].title, undefined);
    assert.equal(sections[0].lessons.length, 2);
  });

  it('stops at the limit and says it truncated', async () => {
    const { previewSections } = await import('../../src/lib/courseView.ts');
    const { sections, truncated } = previewSections(demoFoundations, 'en-US', hrefFor, 3);
    assert.equal(truncated, true);
    assert.equal(sections.reduce((sum, section) => sum + section.lessons.length, 0), 3);
  });
});
