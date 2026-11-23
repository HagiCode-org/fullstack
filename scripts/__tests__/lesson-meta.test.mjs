import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { SUPPORTED_LOCALES } from '../../src/config/site.ts';
import { formatText } from '../../src/lib/format.ts';
import { treeOf } from '../../src/lib/courseView.ts';
import { presentText, totalMinutes, validMinutes } from '../../src/lib/lessonMeta.ts';
import { UI_STRINGS } from '../../src/i18n/ui.ts';

const titles = (text) => Object.fromEntries(SUPPORTED_LOCALES.map((locale) => [locale, text]));
const lesson = (id, extra = {}) => ({ kind: 'lesson', id, title: titles(id), ...extra });
const group = (id, children) => ({ kind: 'group', id, title: titles(id), children });
const course = {
  id: 'fixture',
  title: titles('Fixture'),
  demo: false,
  outline: [group('alpha', [lesson('one', { elective: true }), group('nested', [lesson('two')])]), lesson('three')],
};
const hrefFor = (lessonId) => `/courses/fixture/${lessonId}/`;

describe('reading time of a lesson', () => {
  it('counts only a whole number of minutes', () => {
    assert.equal(validMinutes(20), 20);
    assert.equal(validMinutes(10), 10);
    assert.equal(validMinutes(0), undefined);
    assert.equal(validMinutes(-5), undefined);
    assert.equal(validMinutes(7.5), undefined);
    assert.equal(validMinutes(NaN), undefined);
    assert.equal(validMinutes('20'), undefined);
    assert.equal(validMinutes(undefined), undefined);
  });

  it('adds a course total only when every lesson has a time', () => {
    assert.equal(totalMinutes([10, 20, 15]), 45);
    assert.equal(totalMinutes([10, undefined, 15]), undefined);
    assert.equal(totalMinutes([]), undefined);
  });

  it('shows nothing for an outcome that is blank', () => {
    assert.equal(presentText('  '), undefined);
    assert.equal(presentText(undefined), undefined);
    assert.equal(presentText('You can run a container.'), 'You can run a container.');
  });
});

describe('outline tree with reading times', () => {
  it('carries each lesson time into its node, and leaves the key out when there is none', () => {
    const times = { one: 12, three: 30 };
    const tree = treeOf(course, 'en-US', hrefFor, (id) => times[id]);
    const [alpha, three] = tree;
    const [one, nested] = alpha.children;
    assert.equal(one.minutes, 12);
    assert.equal(one.elective, true);
    assert.ok(!('minutes' in nested.children[0]), 'a lesson without a time has no minutes key');
    assert.equal(three.minutes, 30);
  });

  it('keeps the outline unchanged when no times are given', () => {
    const tree = treeOf(course, 'en-US', hrefFor);
    assert.ok(tree.every((node) => !('minutes' in node)));
    assert.equal(tree[0].children[0].href, '/courses/fixture/one/');
  });
});

describe('interface strings for reading time and outcomes', () => {
  it('fills the minutes placeholder in all ten locales', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const strings = UI_STRINGS[locale];
      for (const key of ['estimatedTimeText', 'outlineMinutesText']) {
        assert.ok(strings[key].includes('{minutes}'), `${locale} ${key} needs {minutes}`);
        assert.equal(formatText(strings[key], { minutes: 20 }).includes('{minutes}'), false, `${locale} ${key} must fill`);
      }
    }
  });

  it('gives every outcome label and glossary string a value in all ten locales', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const strings = UI_STRINGS[locale];
      for (const key of ['lessonOutcomeLabel', 'courseOutcomeLabel', 'glossaryLabel', 'glossaryIntro', 'glossaryEmptyText', 'glossaryAnalogyLabel', 'glossaryFallbackNotice']) {
        assert.ok(typeof strings[key] === 'string' && strings[key].trim() !== '', `${locale} ${key} must have a value`);
      }
    }
  });
});
