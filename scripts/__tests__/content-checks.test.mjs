import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { after, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import { checkCourseContent, checkCourseOnDisk, checkLesson } from '../check-tutorial-content.mjs';
import {
  externalUrlsIn,
  isOneSentence,
  ledgerFailures,
  officialEntryFor,
  parseFrontmatter,
  parseOfficialHosts,
  splitFrontmatter,
  wordCount,
} from '../lib/content.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const TODAY = '2026-11-22';
const hosts = parseOfficialHosts(readFileSync(path.join(root, 'sources', 'official-hosts.json'), 'utf8'));
const scratch = [];
after(() => {
  for (const dir of scratch) rmSync(dir, { recursive: true, force: true });
});

// A body long enough to pass the word count, with no links.
const FILLER = Array.from({ length: 40 }, () => 'This paragraph explains one simple idea about containers and keeps the reader calm.').join('\n\n');

function lessonText({
  minutes = '20',
  outcome = 'You will run a test container and read its output.',
  terms = '[container]',
  extra = '',
  learned = '## What you learned\n\n- one\n- two\n- three\n',
  next = '## What comes next\n\nGo on to **Docker networks**, where containers reach each other by name.\n',
  draft = false,
  body = FILLER,
  frontmatter = true,
} = {}) {
  const head = frontmatter
    ? `---\nminutes: ${minutes}\noutcome: "${outcome}"\nterms: ${terms}\n---\n\n`
    : '';
  return `${head}${draft ? '> **Draft:** this lesson is an outline.\n\n' : ''}# Container basics\n\n${body}\n\n${extra}${learned}\n${next}`;
}

const lessonA = { id: 'container-basics', title: { 'en-US': 'Container basics' } };
const lessonB = { id: 'docker-networks', title: { 'en-US': 'Docker networks' } };
const lessonC = { id: 'wrap-up', title: { 'en-US': 'Wrap up' } };
const courseLessonTitles = ['Container basics', 'Docker networks', 'Wrap up'];
const nextOfA = { id: 'docker-networks', title: 'Docker networks' };

function checkA(text, overrides = {}) {
  return checkLesson({
    courseId: 'demo',
    lesson: lessonA,
    next: nextOfA,
    isLast: false,
    courseLessonTitles,
    text,
    ledgerUrls: new Set(),
    hosts,
    ...overrides,
  }).failures;
}

const linkedText = (url) => lessonText({ body: `${FILLER}\n\nRead [the guide](${url}) for more.` });

describe('frontmatter and markdown helpers', () => {
  it('parses scalars, inline lists and block lists', () => {
    assert.deepEqual(parseFrontmatter('minutes: 20\noutcome: "Hi there."\nterms: [a, b]'), {
      minutes: '20',
      outcome: 'Hi there.',
      terms: ['a', 'b'],
    });
    assert.deepEqual(parseFrontmatter('terms:\n  - a\n  - b\nminutes: 12'), { terms: ['a', 'b'], minutes: '12' });
    assert.deepEqual(parseFrontmatter('terms: []'), { terms: [] });
  });

  it('reports no frontmatter for a plain body', () => {
    assert.equal(splitFrontmatter('# Title\n\nbody').data, null);
  });

  it('judges one sentence: one line and at most one sentence mark', () => {
    assert.equal(isOneSentence('You will run one container.'), true);
    assert.equal(isOneSentence('You will run one container. Then you stop it.'), false);
    assert.equal(isOneSentence('Line one\nline two.'), false);
    assert.equal(isOneSentence(''), false);
    assert.equal(isOneSentence(undefined), false);
  });

  it('counts words across the body', () => {
    assert.equal(wordCount('one two\nthree'), 3);
  });

  it('finds external urls and ignores local and single-label hosts', () => {
    const text = 'See https://docs.docker.com/x. Also http://localhost:8080 and http://app:3000 and https://127.0.0.1/.';
    assert.deepEqual(externalUrlsIn(text), ['https://docs.docker.com/x']);
  });

  it('matches whitelist entries by host and by path prefix', () => {
    assert.ok(officialEntryFor('https://developer.mozilla.org/en-US/docs/Web', hosts));
    assert.ok(officialEntryFor('https://github.com/deepseek-ai/deepseek-harness', hosts));
    assert.equal(officialEntryFor('https://github.com/someone/else', hosts)?.tool, 'GitHub', 'github.com is GitHub’s own host (unrestricted by path)');
    assert.equal(officialEntryFor('https://github.com/someone/else', hosts.filter((entry) => entry.tool !== 'GitHub')), null, 'without the GitHub entry, github.com is refused');
    assert.equal(officialEntryFor('https://github-com.example/x', hosts), null);
    assert.equal(officialEntryFor('http://docs.docker.com/', hosts), null, 'plain http is not an official link');
    assert.equal(officialEntryFor('https://docs.docker.com.evil.example/', hosts), null);
  });
});

describe('official host whitelist file', () => {
  const entries = hosts;

  it('gives every entry the tool it belongs to', () => {
    for (const entry of entries) assert.ok(entry.tool && entry.tool.trim(), `entry ${entry.host} names no tool`);
  });

  it('includes MDN, the dsh repository path and the vendor hosts named in the goal', () => {
    const hostsSeen = new Set(entries.map((entry) => entry.host));
    for (const required of ['developer.mozilla.org', 'docs.docker.com', 'hub.docker.com', 'nodejs.org', 'www.postgresql.org', 'nginx.org', 'docs.portainer.io', 'developers.cloudflare.com', 'help.aliyun.com', 'code.claude.com', 'developers.openai.com', 'pi.dev', 'agent.minimax.io', 'docs.bigmodel.cn', 'codebuddy.ai']) {
      assert.ok(hostsSeen.has(required), `missing ${required}`);
    }
    assert.ok(entries.some((entry) => entry.host === 'github.com' && entry.pathPrefixes?.includes('/deepseek-ai/')));
  });

  it('rejects a file whose entry has no tool', () => {
    assert.throws(() => parseOfficialHosts(JSON.stringify({ entries: [{ host: 'x.example' }] })), /no tool/);
  });
});

describe('lesson checks', () => {
  it('passes a complete lesson', () => {
    assert.deepEqual(checkA(lessonText()), []);
  });

  it('fails a lesson still marked as a draft', () => {
    assert.ok(checkA(lessonText({ draft: true })).some((message) => message.includes('Draft')));
  });

  it('fails placeholder text', () => {
    assert.ok(checkA(lessonText({ body: `${FILLER}\n\nTODO: write this part.` })).some((message) => message.includes('placeholder')));
  });

  it('fails a body under 450 words', () => {
    const short = lessonText({ body: 'Only a few words here.' });
    assert.ok(checkA(short).some((message) => message.includes('words; at least 450')));
  });

  it('fails a lesson with no frontmatter', () => {
    assert.ok(checkA(lessonText({ frontmatter: false })).some((message) => message.includes('no frontmatter')));
  });

  for (const minutes of ['9', '46', '20.5', '"abc"']) {
    it(`fails minutes ${minutes}`, () => {
      const text = lessonText({ minutes: minutes.replace(/"/gu, '') });
      const message = checkA(text).find((line) => line.includes('minutes must be'));
      assert.ok(message, `minutes ${minutes} should fail`);
    });
  }

  it('accepts the minute bounds 10 and 45', () => {
    assert.equal(checkA(lessonText({ minutes: '10' })).some((line) => line.includes('minutes')), false);
    assert.equal(checkA(lessonText({ minutes: '45' })).some((line) => line.includes('minutes')), false);
  });

  it('fails an outcome that is two sentences', () => {
    assert.ok(checkA(lessonText({ outcome: 'You will run it. Then you stop it.' })).some((line) => line.includes('outcome must be one')));
  });

  it('fails more than three terms', () => {
    assert.ok(checkA(lessonText({ terms: '[a, b, c, d]' })).some((line) => line.includes('at most 3')));
  });

  it('fails a lesson without a "What you learned" or "Check yourself" section', () => {
    const text = lessonText({ learned: '' });
    assert.ok(checkA(text).some((line) => line.includes('What you learned')));
  });

  it('fails a check section with fewer than three items', () => {
    const text = lessonText({ learned: '## What you learned\n\n- one\n- two\n' });
    assert.ok(checkA(text).some((line) => line.includes('at least 3 check items, found 2')));
  });

  it('fails when "What comes next" is missing from a lesson that has a next lesson', () => {
    const text = lessonText({ next: '' });
    assert.ok(checkA(text).some((line) => line.includes('"What comes next" section')));
  });

  it('fails when "What comes next" names a different lesson than the next one', () => {
    const text = lessonText({ next: '## What comes next\n\nGo on to **Wrap up**, the final lesson.\n' });
    const messages = checkA(text);
    assert.ok(messages.some((line) => line.includes('names lesson "Wrap up"')), messages.join('\n'));
  });

  it('fails when "What comes next" does not mention the next lesson at all', () => {
    const text = lessonText({ next: '## What comes next\n\nKeep practising at your own pace.\n' });
    assert.ok(checkA(text).some((line) => line.includes('does not name the next lesson "Docker networks"')));
  });

  it('accepts "Where to learn next" for the last lesson, and fails it when it names a course lesson', () => {
    const last = { courseId: 'demo', lesson: lessonC, next: null, isLast: true, courseLessonTitles, ledgerUrls: new Set(), hosts };
    const ok = checkLesson({ ...last, text: lessonText({ next: '## Where to learn next\n\nThe official documentation is the best place.\n' }) });
    assert.deepEqual(ok.failures, []);
    const bad = checkLesson({ ...last, text: lessonText({ next: '## Where to learn next\n\nRevisit **Container basics** first.\n' }) });
    assert.ok(bad.failures.some((line) => line.includes('names lesson "Container basics"')));
  });

  it('fails a link to a host that is not on the whitelist', () => {
    const messages = checkA(linkedText('https://example.com/page'), { ledgerUrls: new Set(['https://example.com/page']) });
    assert.ok(messages.some((line) => line.includes('not an https link on the official host whitelist')));
  });

  it('fails a plain http link even to an official host', () => {
    const messages = checkA(linkedText('http://docs.docker.com/get-started/'), { ledgerUrls: new Set(['http://docs.docker.com/get-started/']) });
    assert.ok(messages.some((line) => line.includes('not an https link')));
  });

  it('fails an official link that is not registered in the ledger', () => {
    const messages = checkA(linkedText('https://docs.docker.com/get-started/'));
    assert.ok(messages.some((line) => line.includes('not registered in sources/demo.json')));
  });

  it('passes an official link that is registered', () => {
    const messages = checkA(linkedText('https://docs.docker.com/get-started/'), { ledgerUrls: new Set(['https://docs.docker.com/get-started/']) });
    assert.deepEqual(messages, []);
  });
});

describe('course checks', () => {
  const today = TODAY;
  const courseOutcome = 'You will run containers on your own computer.';
  const glossaryEntry = {
    id: 'container',
    term: { 'en-US': 'Container' },
    definition: { 'en-US': 'A running package of a program and the files it needs.' },
    analogy: { 'en-US': 'Like a lunchbox that carries one whole meal.' },
    introducedIn: 'container-basics',
  };
  const ledgerGood = {
    lessons: {
      'container-basics': { checkedOn: today, facts: [{ claim: 'Start a container', url: 'https://docs.docker.com/get-started/' }] },
      'docker-networks': { checkedOn: today, facts: [{ claim: 'Networks', url: 'https://docs.docker.com/engine/network/' }] },
    },
  };
  const textA = lessonText({ terms: '[container]', next: '## What comes next\n\nGo on to **Docker networks**, the next lesson.\n', extra: 'Read [the guide](https://docs.docker.com/get-started/).\n\n' });
  const textB = lessonText({
    minutes: '15',
    outcome: 'You will connect two containers by name.',
    terms: '[]',
    next: '## Where to learn next\n\nSee [the network guide](https://docs.docker.com/engine/network/) for more.\n',
  });

  function course(overrides = {}) {
    return {
      courseId: 'demo',
      courseOutcome,
      lessons: [lessonA, lessonB],
      texts: { [lessonA.id]: textA, [lessonB.id]: textB },
      ledger: { exists: true, data: ledgerGood, error: null },
      glossary: { exists: true, entries: [glossaryEntry], error: null },
      hosts,
      today,
      ...overrides,
    };
  }

  it('passes a complete course with a ledger and a glossary', () => {
    const failures = checkCourseContent(course());
    assert.deepEqual(failures, [], failures.join('\n'));
  });

  it('fails a course outcome that is not one sentence', () => {
    assert.ok(checkCourseContent(course({ courseOutcome: '' })).some((line) => line.includes('course outcome')));
  });

  it('fails a lesson whose body file is missing', () => {
    const failures = checkCourseContent(course({ texts: { [lessonA.id]: textA, [lessonB.id]: null } }));
    assert.ok(failures.some((line) => line.includes('docker-networks') && line.includes('does not exist')));
  });

  it('fails a term that is declared but missing from the course glossary file', () => {
    const failures = checkCourseContent(course({ glossary: { exists: true, entries: [], error: null } }));
    assert.ok(failures.some((line) => line.includes('term "container" is not in src/glossary/demo.json')));
  });

  it('fails a declared term when the glossary dir or file does not exist, and says why', () => {
    const failures = checkCourseContent(course({ glossary: { exists: false, entries: null, error: null } }));
    assert.ok(failures.some((line) => line.includes('cannot be checked') && line.includes('src/glossary/demo.json does not exist')));
  });

  it('does not require a glossary file when no lesson declares terms', () => {
    const noTerms = lessonText({ terms: '[]', next: '## What comes next\n\nGo on to **Docker networks**, the next lesson.\n' });
    const failures = checkCourseContent(
      course({
        texts: { [lessonA.id]: noTerms, [lessonB.id]: textB },
        ledger: { exists: true, data: ledgerGood, error: null },
        glossary: { exists: false, entries: null, error: null },
      }),
    );
    assert.deepEqual(failures, [], failures.join('\n'));
  });

  it('fails a term whose introducedIn points to another lesson', () => {
    const wrong = { ...glossaryEntry, introducedIn: 'docker-networks' };
    const failures = checkCourseContent(course({ glossary: { exists: true, entries: [wrong], error: null } }));
    assert.ok(failures.some((line) => line.includes('must point back to this lesson') || line.includes('introducedIn "docker-networks"')));
  });

  it('fails a glossary entry whose definition is two sentences', () => {
    const bad = { ...glossaryEntry, definition: { 'en-US': 'A package. It runs programs.' } };
    const failures = checkCourseContent(course({ glossary: { exists: true, entries: [bad], error: null } }));
    assert.ok(failures.some((line) => line.includes('definition needs one en-US sentence')));
  });

  it('fails a glossary entry with an id used twice', () => {
    const failures = checkCourseContent(course({ glossary: { exists: true, entries: [glossaryEntry, glossaryEntry], error: null } }));
    assert.ok(failures.some((line) => line.includes('used more than once')));
  });

  it('fails when the ledger is missing', () => {
    const failures = checkCourseContent(course({ ledger: { exists: false, data: null, error: null } }));
    assert.ok(failures.includes('sources/demo.json does not exist'));
  });

  it('fails a ledger date that is more than 90 days old', () => {
    const old = { lessons: { ...ledgerGood.lessons, 'container-basics': { ...ledgerGood.lessons['container-basics'], checkedOn: '2026-08-01' } } };
    const failures = ledgerFailures(old, { courseId: 'demo', lessonIds: ['container-basics', 'docker-networks'], hosts, today });
    assert.ok(failures.some((line) => line.includes('more than 90 days old')));
  });

  it('fails a ledger date in the future', () => {
    const future = { lessons: { ...ledgerGood.lessons, 'container-basics': { ...ledgerGood.lessons['container-basics'], checkedOn: '2026-12-31' } } };
    const failures = ledgerFailures(future, { courseId: 'demo', lessonIds: ['container-basics', 'docker-networks'], hosts, today });
    assert.ok(failures.some((line) => line.includes('later than today')));
  });

  it('fails a ledger lesson with no facts, and a fact on a non-official host', () => {
    const bad = {
      lessons: {
        'container-basics': { checkedOn: today, facts: [] },
        'docker-networks': { checkedOn: today, facts: [{ claim: 'x', url: 'https://www.example.org/x' }] },
      },
    };
    const failures = ledgerFailures(bad, { courseId: 'demo', lessonIds: ['container-basics', 'docker-networks'], hosts, today });
    assert.ok(failures.some((line) => line.includes('container-basics') && line.includes('at least one fact')));
    assert.ok(failures.some((line) => line.includes('is not an https url on the official host whitelist')));
  });

  it('fails a ledger that records a lesson the course does not have', () => {
    const extra = { lessons: { ...ledgerGood.lessons, ghost: { checkedOn: today, facts: [{ claim: 'x', url: 'https://docs.docker.com/' }] } } };
    const failures = ledgerFailures(extra, { courseId: 'demo', lessonIds: ['container-basics', 'docker-networks'], hosts, today });
    assert.ok(failures.some((line) => line.includes('records lesson "ghost"')));
  });

  it('reads a course from disk: a missing body and a missing glossary are reported, not thrown', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'chk-content-'));
    scratch.push(dir);
    const contentDir = path.join(dir, 'src', 'courses', 'demo', 'content', 'en-US');
    mkdirSync(contentDir, { recursive: true });
    writeFileSync(path.join(contentDir, 'container-basics.md'), textA);
    mkdirSync(path.join(dir, 'sources'), { recursive: true });
    writeFileSync(path.join(dir, 'sources', 'official-hosts.json'), JSON.stringify({ entries: hosts }));
    writeFileSync(path.join(dir, 'sources', 'demo.json'), JSON.stringify(ledgerGood));
    const failures = checkCourseOnDisk(
      dir,
      { id: 'demo', outcome: courseOutcome, lessons: [lessonA, lessonB] },
      { hosts, today },
    );
    assert.ok(failures.some((line) => line.includes('docker-networks') && line.includes('does not exist')));
    assert.ok(!failures.some((line) => line.includes('container-basics: https://docs.docker.com/get-started/ is not registered')));
  });
});
