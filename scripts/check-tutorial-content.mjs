#!/usr/bin/env node
// Checks the en-US lesson bodies, their frontmatter (minutes, outcome, terms), the glossary files and the sources ledger
// of one course, or of every course. Exit 0 when everything passes, 1 when anything fails, 2 for bad arguments.
//
// Usage: node scripts/check-tutorial-content.mjs --course <course-id> | --all [--today YYYY-MM-DD]
import { realpathSync } from 'node:fs';

import {
  LESSON_LOCALE,
  MAX_MINUTES,
  MAX_TERMS,
  MIN_MINUTES,
  MIN_WORDS,
  REPO_ROOT,
  externalUrlsIn,
  glossaryPath,
  headingsOf,
  isOneSentence,
  ledgerFailures,
  ledgerUrlsFor,
  lessonBodyPath,
  loadRegistries,
  officialEntryFor,
  readLedger,
  readOfficialHosts,
  readTextIfExists,
  sectionAfter,
  splitFrontmatter,
  todayIsoDay,
  wordCount,
  isIsoDay,
} from './lib/content.mjs';


const CHECK_HEADING = ['Check yourself', 'What you learned'];
const NEXT_HEADINGS = ['What comes next', 'Where to learn next'];
const MIN_CHECK_ITEMS = 3;

// Checks one lesson's text. Returns { failures, frontmatter } where frontmatter is the parsed block or null.
export function checkLesson({ courseId, lesson, next, isLast, courseLessonTitles, text, ledgerUrls, hosts }) {
  const label = `${courseId}/${lesson.id}`;
  const failures = [];
  const { data: frontmatter, body } = splitFrontmatter(text);

  if (/^>\s*\*\*Draft/mu.test(body)) failures.push(`${label}: still marked "> **Draft:**" (outline, not a finished lesson)`);
  const placeholder = body.match(/\b(TODO|TBD|FIXME)\b/u);
  if (placeholder) failures.push(`${label}: contains a placeholder "${placeholder[1]}"`);

  const words = wordCount(body);
  if (words < MIN_WORDS) failures.push(`${label}: body has ${words} words; at least ${MIN_WORDS} are required`);

  if (frontmatter === null) {
    failures.push(`${label}: no frontmatter; minutes, outcome and terms are required`);
  } else {
    const minutes = frontmatter.minutes;
    const minutesValid =
      typeof minutes === 'string' && /^\d+$/u.test(minutes) && Number(minutes) >= MIN_MINUTES && Number(minutes) <= MAX_MINUTES;
    if (!minutesValid) {
      failures.push(`${label}: minutes must be an integer from ${MIN_MINUTES} to ${MAX_MINUTES}, found ${JSON.stringify(minutes)}`);
    }
    if (!isOneSentence(frontmatter.outcome)) {
      failures.push(`${label}: outcome must be one non-empty sentence (what you will get from this lesson)`);
    }
    if (!Array.isArray(frontmatter.terms)) {
      failures.push(`${label}: terms must be a list of glossary ids (use [] when the lesson introduces none)`);
    } else {
      if (frontmatter.terms.length > MAX_TERMS) {
        failures.push(`${label}: introduces ${frontmatter.terms.length} terms; at most ${MAX_TERMS} are allowed`);
      }
      if (new Set(frontmatter.terms).size !== frontmatter.terms.length) failures.push(`${label}: terms repeats an id`);
      for (const term of frontmatter.terms) {
        if (typeof term !== 'string' || !/^[a-z0-9-]+$/u.test(term)) failures.push(`${label}: term id ${JSON.stringify(term)} must match [a-z0-9-]+`);
      }
    }
  }

  const headings = headingsOf(body);
  const learned = headings.find((heading) => CHECK_HEADING.includes(heading.text));
  if (!learned) {
    failures.push(`${label}: needs a "What you learned" or "Check yourself" section`);
  } else {
    const items = sectionAfter(body, learned).split(/\r?\n/u).filter((line) => /^\s*(?:[-*+]|\d+\.)\s+/u.test(line)).length;
    if (items < MIN_CHECK_ITEMS) failures.push(`${label}: the "${learned.text}" section needs at least ${MIN_CHECK_ITEMS} check items, found ${items}`);
  }

  const allowedHeadings = isLast ? NEXT_HEADINGS : NEXT_HEADINGS.slice(0, 1);
  const nextHeading = headings.find((heading) => allowedHeadings.includes(heading.text));
  if (!nextHeading) {
    failures.push(`${label}: needs a "${allowedHeadings.join('" or "')}" section`);
  } else {
    const section = sectionAfter(body, nextHeading);
    if (next && !section.includes(next.title)) {
      failures.push(`${label}: "${nextHeading.text}" does not name the next lesson "${next.title}"`);
    }
    const boldNames = [...section.matchAll(/\*\*([^*\n]+)\*\*/gu)].map((match) => match[1].trim());
    for (const name of boldNames) {
      if (courseLessonTitles.includes(name) && name !== next?.title) {
        const expected = next ? `"${next.title}"` : 'no lesson (this is the last lesson)';
        failures.push(`${label}: "${nextHeading.text}" names lesson "${name}", but it should name ${expected}`);
      }
    }
  }

  const reported = new Set();
  for (const url of externalUrlsIn(text)) {
    if (reported.has(url)) continue;
    reported.add(url);
    if (officialEntryFor(url, hosts) === null) {
      failures.push(`${label}: ${url} is not an https link on the official host whitelist (sources/official-hosts.json)`);
    } else if (!ledgerUrls.has(url)) {
      failures.push(`${label}: ${url} is not registered in sources/${courseId}.json for this lesson`);
    }
  }

  return { failures, frontmatter };
}

// Checks a whole course from data the caller has read. Pure: no file access.
// input: { courseId, courseOutcome, lessons: [{ id, title }], texts: { [lessonId]: string | null },
//          ledger: { exists, data, error }, glossary: { exists, entries, error }, hosts, today }
export function checkCourseContent(input) {
  const { courseId, lessons, texts, ledger, glossary, hosts, today } = input;
  const failures = [];
  const lessonIds = lessons.map((lesson) => lesson.id);
  const titles = lessons.map((lesson) => lesson.title[LESSON_LOCALE]);

  if (!isOneSentence(input.courseOutcome)) {
    failures.push(`${courseId}: course outcome (what students get from the course) must be one non-empty sentence`);
  }
  if (lessons.length === 0) failures.push(`${courseId}: the course has no lessons`);

  // Each lesson's text, frontmatter and the urls it may link to.
  const parsed = new Map();
  for (const [index, lesson] of lessons.entries()) {
    const text = texts[lesson.id];
    if (text === null || text === undefined) {
      failures.push(`${courseId}/${lesson.id}: lesson body src/courses/${courseId}/content/${LESSON_LOCALE}/${lesson.id}.md does not exist`);
      continue;
    }
    const ledgerUrls = ledgerUrlsFor(ledger.data, lesson.id);
    const result = checkLesson({
      courseId,
      lesson,
      next: lessons[index + 1] ? { id: lessons[index + 1].id, title: lessons[index + 1].title[LESSON_LOCALE] } : null,
      isLast: index === lessons.length - 1,
      courseLessonTitles: titles,
      text,
      ledgerUrls,
      hosts,
    });
    failures.push(...result.failures);
    parsed.set(lesson.id, result.frontmatter);
  }

  // The sources ledger.
  if (!ledger.exists) {
    failures.push(`sources/${courseId}.json does not exist`);
  } else if (ledger.error) {
    failures.push(`sources/${courseId}.json is not valid JSON: ${ledger.error}`);
  } else {
    failures.push(...ledgerFailures(ledger.data, { courseId, lessonIds, hosts, today }));
  }

  // The glossary, and the term links between lessons and glossary entries.
  const termsDeclared = [...parsed.entries()].flatMap(([lessonId, frontmatter]) =>
    Array.isArray(frontmatter?.terms) ? frontmatter.terms.map((term) => ({ lessonId, term })) : [],
  );
  if (!glossary.exists) {
    for (const { lessonId, term } of termsDeclared) {
      failures.push(`${courseId}/${lessonId}: term "${term}" cannot be checked: src/glossary/${courseId}.json does not exist`);
    }
    return failures;
  }
  if (glossary.error) {
    failures.push(`src/glossary/${courseId}.json is not valid JSON: ${glossary.error}`);
    return failures;
  }
  if (!Array.isArray(glossary.entries)) {
    failures.push(`src/glossary/${courseId}.json must be a JSON array of entries`);
    return failures;
  }

  const ids = new Set();
  for (const entry of glossary.entries) {
    const label = `${courseId} glossary "${entry?.id}"`;
    if (typeof entry?.id !== 'string' || !/^[a-z0-9-]+$/u.test(entry.id)) {
      failures.push(`${courseId} glossary: an entry has no valid id (must match [a-z0-9-]+)`);
      continue;
    }
    if (ids.has(entry.id)) failures.push(`${label}: id is used more than once in the course`);
    ids.add(entry.id);
    if (!nonEmptyLine(entry.term?.[LESSON_LOCALE])) failures.push(`${label}: term needs an en-US text on one line`);
    for (const field of ['definition', 'analogy']) {
      if (!isOneSentence(entry[field]?.[LESSON_LOCALE])) failures.push(`${label}: ${field} needs one en-US sentence`);
    }
    if (!lessonIds.includes(entry.introducedIn)) {
      failures.push(`${label}: introducedIn "${entry.introducedIn}" is not a lesson of the course`);
    } else {
      const owner = parsed.get(entry.introducedIn);
      if (!Array.isArray(owner?.terms) || !owner.terms.includes(entry.id)) {
        failures.push(`${label}: lesson "${entry.introducedIn}" does not list "${entry.id}" in its terms`);
      }
    }
  }
  for (const { lessonId, term } of termsDeclared) {
    const entry = glossary.entries.find((candidate) => candidate?.id === term);
    if (!entry) {
      failures.push(`${courseId}/${lessonId}: term "${term}" is not in src/glossary/${courseId}.json`);
    } else if (entry.introducedIn !== lessonId) {
      failures.push(`${courseId}/${lessonId}: term "${term}" has introducedIn "${entry.introducedIn}", which must point back to this lesson`);
    }
  }
  return failures;
}

function nonEmptyLine(value) {
  return typeof value === 'string' && value.trim() !== '' && !/[\r\n]/u.test(value);
}

// Reads one course from the repo and checks it.
export function checkCourseOnDisk(root, course, { hosts, today }) {
  const lessons = course.lessons;
  const texts = {};
  for (const lesson of lessons) {
    texts[lesson.id] = readTextIfExists(lessonBodyPath(root, course.id, lesson.id));
  }
  const ledgerRead = readLedger(root, course.id);
  const glossaryFile = glossaryPath(root, course.id);
  const glossaryText = readTextIfExists(glossaryFile);
  let glossaryEntries = null;
  let glossaryError = null;
  if (glossaryText !== null) {
    try {
      glossaryEntries = JSON.parse(glossaryText);
    } catch (error) {
      glossaryError = error.message;
    }
  }
  return checkCourseContent({
    courseId: course.id,
    courseOutcome: course.outcome,
    lessons,
    texts,
    ledger: { exists: ledgerRead.exists, data: ledgerRead.data, error: ledgerRead.error },
    glossary: { exists: glossaryText !== null, entries: glossaryEntries, error: glossaryError },
    hosts,
    today,
  });
}

function parseArgs(argv) {
  const options = { course: null, all: false, today: null };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--all') options.all = true;
    else if (arg === '--course') options.course = argv[(index += 1)] ?? null;
    else if (arg === '--today') options.today = argv[(index += 1)] ?? null;
    else throw new Error(`unknown argument ${arg}`);
  }
  if (options.all === (options.course !== null)) throw new Error('give exactly one of --course <id> or --all');
  if (options.today !== null && !isIsoDay(options.today)) throw new Error('--today must be YYYY-MM-DD');
  return options;
}

export async function main(argv = process.argv.slice(2), root = REPO_ROOT) {
  let options;
  try {
    options = parseArgs(argv);
  } catch (error) {
    console.error(`check-tutorial-content: ${error.message}`);
    console.error('usage: node scripts/check-tutorial-content.mjs --course <course-id> | --all [--today YYYY-MM-DD]');
    return 2;
  }
  const registry = await loadRegistries(root);
  const hosts = readOfficialHosts(root);
  const today = options.today ?? todayIsoDay();
  const selected = options.all
    ? registry.courses
    : registry.courses.filter((course) => course.id === options.course);
  if (selected.length === 0) {
    console.error(`check-tutorial-content: no course "${options.course}" in the course registry`);
    return 2;
  }

  let failed = 0;
  for (const course of selected) {
    const shaped = {
      id: course.id,
      outcome: course.outcome,
      lessons: registry.flattenLessons(course.outline),
    };
    const failures = checkCourseOnDisk(root, shaped, { hosts, today });
    if (failures.length === 0) {
      console.log(`PASS ${course.id} (${shaped.lessons.length} lessons)`);
    } else {
      failed += 1;
      console.log(`FAIL ${course.id} (${failures.length} problems)`);
      for (const failure of failures) console.log(`  - ${failure}`);
    }
  }
  return failed === 0 ? 0 : 1;
}

if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(new URL(import.meta.url).pathname)) {
  main().then((code) => {
    process.exitCode = code;
  });
}
