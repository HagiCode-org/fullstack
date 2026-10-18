import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { SUPPORTED_LOCALES } from '../../src/config/site.ts';
import { formatText } from '../../src/lib/format.ts';
import { UI_STRINGS } from '../../src/i18n/ui.ts';

// Returns one message per problem, each naming the locale and key, so a failing run says what to fix.
export function findUiStringFailures(table, locales = SUPPORTED_LOCALES) {
  const failures = [];
  const [reference] = locales;
  const referenceKeys = Object.keys(table[reference] ?? {});
  for (const locale of locales) {
    const entries = table[locale];
    if (!entries) {
      failures.push(`locale ${locale} has no interface strings`);
      continue;
    }
    for (const key of referenceKeys) {
      if (!(key in entries)) {
        failures.push(`${locale} is missing the interface string "${key}"`);
      } else if (typeof entries[key] !== 'string' || entries[key].trim() === '') {
        failures.push(`${locale} has an empty interface string "${key}"`);
      }
    }
    for (const key of Object.keys(entries)) {
      if (!referenceKeys.includes(key)) {
        failures.push(`${locale} has the interface string "${key}" that ${reference} does not define`);
      }
    }
  }
  return failures;
}

describe('interface strings', () => {
  it('define a non-empty value for every key in all ten locales', () => {
    assert.equal(SUPPORTED_LOCALES.length, 10);
    assert.deepEqual(findUiStringFailures(UI_STRINGS), []);
  });

  it('keep the placeholders the components fill in', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const strings = UI_STRINGS[locale];
      assert.ok(strings.progressText.includes('{read}') && strings.progressText.includes('{total}'), `${locale} progressText needs {read} and {total}`);
      assert.ok(strings.lessonCountText.includes('{total}'), `${locale} lessonCountText needs {total}`);
    }
  });

  it('names a locale that is missing a key', () => {
    const table = structuredClone(UI_STRINGS);
    delete table['ko-KR'].fallbackNotice;
    const failures = findUiStringFailures(table);
    assert.deepEqual(failures, ['ko-KR is missing the interface string "fallbackNotice"']);
  });

  it('names an empty value', () => {
    const table = structuredClone(UI_STRINGS);
    table['de-DE'].readLabel = '  ';
    assert.deepEqual(findUiStringFailures(table), ['de-DE has an empty interface string "readLabel"']);
  });

  it('names a locale that has no table at all', () => {
    const table = structuredClone(UI_STRINGS);
    delete table['ru-RU'];
    assert.deepEqual(findUiStringFailures(table), ['locale ru-RU has no interface strings']);
  });
});

describe('formatText', () => {
  it('fills named placeholders and leaves unknown ones visible', () => {
    assert.equal(formatText('{read} of {total} read', { read: 2, total: 5 }), '2 of 5 read');
    assert.equal(formatText('{read} of {total}', { read: 2 }), '2 of {total}');
  });
});
