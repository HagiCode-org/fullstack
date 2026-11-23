#!/usr/bin/env node
// Compares the design outline OUTLINE.md with the site data.
//   --courses  the course table (count, type), each course's lesson tree (groups, lesson ids, order, en-US titles and the
//              选修 marker) against src/courses/registry.ts.
//   --paths    the learning-path table against src/learning-paths/registry.ts.
// Exit 0 when everything matches, 1 on any difference, 2 for bad arguments.
//
// Elective marker in the data: a course has `elective: true` and a lesson has `elective: true`; anything else is not elective.
//
// Usage: node scripts/check-outline-sync.mjs --courses | --paths  (both flags may be given)
import { readFileSync, realpathSync } from 'node:fs';
import { join } from 'node:path';

import { REPO_ROOT, LESSON_LOCALE, loadRegistries } from './lib/content.mjs';

const PATH_LOCALE = 'zh-CN';
const ALL_PATH_SUFFIX = '的全部课程';

// ---- Parsing OUTLINE.md --------------------------------------------------------------------------------------

// The lines from `start` (a line equal to the heading) up to the next line that starts a heading of the same or higher
// level, or up to `stopAt` when given.
function linesUnder(lines, start, stopAt = null) {
  const first = lines.findIndex((line) => line === start);
  if (first === -1) return [];
  const out = [];
  for (let index = first + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (stopAt ? line.startsWith(stopAt) : /^## /u.test(line)) break;
    out.push(line);
  }
  return out;
}

function cellsOf(row) {
  return row.split('|').slice(1, -1).map((cell) => cell.trim());
}

// The course table under "## 课程路线": number, type, id, names, lesson count and the elective count inside it.
export function parseCourseTable(lines) {
  return linesUnder(lines, '## 课程路线', '### 学习路径')
    .filter((line) => /^\|\s*\d+\s*\|/u.test(line))
    .map((line) => {
      const cells = cellsOf(line);
      const id = /`([a-z0-9-]+)`/u.exec(cells[2] ?? '')?.[1] ?? null;
      const count = /^(\d+)/u.exec(cells[4] ?? '')?.[1];
      const electiveCount = /选修\s*(\d+)/u.exec(cells[4] ?? '')?.[1];
      return {
        number: Number(cells[0]),
        type: cells[1],
        id,
        names: (cells[3] ?? '').split(/\s+\/\s+/u).map((name) => name.trim()),
        lessonCount: count === undefined ? null : Number(count),
        electiveLessonCount: electiveCount === undefined ? 0 : Number(electiveCount),
      };
    });
}

// The learning-path table under "### 学习路径".
export function parsePathTable(lines) {
  return linesUnder(lines, '### 学习路径')
    .filter((line) => /^\|\s*`[a-z0-9-]+`\s*\|/u.test(line))
    .map((line) => {
      const cells = cellsOf(line);
      return { id: /`([a-z0-9-]+)`/u.exec(cells[0])[1], name: cells[1], steps: cells[2] ?? '' };
    });
}

// The course sections under "## 课程大纲": each course's id, its elective flag and its lesson tree.
export function parseCourseSections(lines) {
  const start = lines.findIndex((line) => line === '## 课程大纲');
  if (start === -1) return [];
  const courses = [];
  let course = null;
  let group = null;
  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^## /u.test(line)) break;
    const courseHeading = /^### \d+\.\s/u.exec(line);
    if (courseHeading) {
      course = { id: null, typeText: null, elective: false, outline: [] };
      group = null;
      courses.push(course);
      continue;
    }
    if (course === null) continue;
    const idLine = /^- 课程 id[:：]\s*`([a-z0-9-]+)`/u.exec(line);
    if (idLine) course.id = idLine[1];
    const typeLine = /^- 类型[:：]\s*(.*)$/u.exec(line);
    if (typeLine) {
      course.typeText = typeLine[1].trim();
      course.elective = /选修/u.test(course.typeText);
    }
    const groupLine = /^#### 分组[:：]\s*(.*?)\s+`([a-z0-9-]+)`\s*$/u.exec(line);
    if (groupLine) {
      group = { kind: 'group', id: groupLine[2], children: [] };
      course.outline.push(group);
      continue;
    }
    const lessonLine = /^##### (.*?)\s+`([a-z0-9-]+)`\s*$/u.exec(line);
    if (lessonLine) {
      const title = stripCjkSuffix(lessonLine[1]);
      const elective = lessonMarkedElective(lines, index + 1);
      const node = { kind: 'lesson', id: lessonLine[2], title, elective };
      if (group) group.children.push(node);
      else course.outline.push(node);
    }
  }
  return courses;
}

// The English title of a heading such as "Path B (mainland China): …(路径 B（中国大陆）：…)": the trailing bracketed
// group holds the Chinese title, so it is removed. Brackets nest, so the group is found by counting depth.
export function stripCjkSuffix(raw) {
  const text = raw.trim();
  if (!/[)）]$/u.test(text)) return text;
  let depth = 0;
  for (let index = text.length - 1; index >= 0; index -= 1) {
    const char = text[index];
    if (char === ')' || char === '）') depth += 1;
    if (char === '(' || char === '（') depth -= 1;
    if (depth === 0) {
      const inner = text.slice(index + 1, -1);
      return /[一-鿿]/u.test(inner) ? text.slice(0, index).trim() : text;
    }
  }
  return text;
}

// A lesson is elective when its 标记 line, before the next heading, carries the 🔹 mark.
function lessonMarkedElective(lines, from) {
  for (let index = from; index < lines.length; index += 1) {
    if (/^#{1,6} /u.test(lines[index])) return false;
    if (/^- \*\*标记\*\*[:：].*🔹/u.test(lines[index])) return true;
  }
  return false;
}

export function parseOutline(text) {
  const lines = text.split(/\r?\n/u);
  return {
    courseTable: parseCourseTable(lines),
    pathTable: parsePathTable(lines),
    sections: parseCourseSections(lines),
  };
}

// ---- Registry shape ---------------------------------------------------------------------------------------

// The registry's course tree in the same shape as the parsed outline.
export function normalizeRegistryNodes(nodes) {
  return nodes.map((node) =>
    node.kind === 'group'
      ? { kind: 'group', id: node.id, children: normalizeRegistryNodes(node.children) }
      : { kind: 'lesson', id: node.id, title: node.title[LESSON_LOCALE], elective: node.elective === true },
  );
}

function lessonsIn(nodes) {
  return nodes.flatMap((node) => (node.kind === 'lesson' ? [node] : lessonsIn(node.children)));
}

// A compact description of the nesting: groups and their lesson ids, in order.
function shapeOf(nodes) {
  return nodes
    .map((node) => (node.kind === 'group' ? `group:${node.id}[${shapeOf(node.children)}]` : `lesson:${node.id}`))
    .join(' ');
}

// ---- Comparing courses ----------------------------------------------------------------------------------------

// `registryCourses`: [{ id, elective, lessons: normalized tree }]; `outline`: parseOutline result.
export function courseFailures(outline, registryCourses) {
  const failures = [];
  const sections = outline.sections;
  const outlineIds = sections.map((section) => section.id);
  const registryIds = registryCourses.map((course) => course.id);
  if (outlineIds.join(',') !== registryIds.join(',')) {
    failures.push(`course order or set differs: OUTLINE.md [${outlineIds.join(', ')}] vs registry [${registryIds.join(', ')}]`);
  }
  if (outline.courseTable.length !== sections.length) {
    failures.push(`OUTLINE.md course table has ${outline.courseTable.length} rows but ${sections.length} course sections`);
  }

  for (const row of outline.courseTable) {
    const section = sections.find((candidate) => candidate.id === row.id);
    if (!section) {
      failures.push(`OUTLINE.md course table row ${row.number} "${row.id}" has no course section`);
      continue;
    }
    const tableElective = row.type.includes('选修');
    if (tableElective !== section.elective) {
      failures.push(`course "${row.id}": the table says type "${row.type}" but its section says "${section.typeText}"`);
    }
  }

  for (const section of sections) {
    const registry = registryCourses.find((course) => course.id === section.id);
    const label = `course "${section.id}"`;
    if (!registry) {
      failures.push(`${label} is in OUTLINE.md but not in the course registry`);
      continue;
    }
    if (registry.elective !== section.elective) {
      failures.push(`${label}: OUTLINE.md elective is ${section.elective}, registry elective is ${registry.elective}`);
    }

    const outlineLessons = lessonsIn(section.outline);
    const registryLessons = lessonsIn(registry.lessons);
    const outlineIdList = outlineLessons.map((lesson) => lesson.id).join(', ');
    const registryIdList = registryLessons.map((lesson) => lesson.id).join(', ');
    if (outlineIdList !== registryIdList) {
      failures.push(`${label}: lesson ids or order differ. OUTLINE.md [${outlineIdList}] vs registry [${registryIdList}]`);
    }
    if (shapeOf(section.outline) !== shapeOf(registry.lessons)) {
      failures.push(`${label}: group structure differs. OUTLINE.md "${shapeOf(section.outline)}" vs registry "${shapeOf(registry.lessons)}"`);
    }
    const registryById = new Map(registryLessons.map((lesson) => [lesson.id, lesson]));
    for (const lesson of outlineLessons) {
      const other = registryById.get(lesson.id);
      if (!other) continue;
      if (other.title !== lesson.title) {
        failures.push(`${label} lesson "${lesson.id}": en-US title "${other.title}" in the registry, "${lesson.title}" in OUTLINE.md`);
      }
      if (other.elective !== lesson.elective) {
        failures.push(`${label} lesson "${lesson.id}": OUTLINE.md elective is ${lesson.elective}, registry elective is ${other.elective}`);
      }
    }

    const row = outline.courseTable.find((candidate) => candidate.id === section.id);
    if (row) {
      if (row.lessonCount !== outlineLessons.length) {
        failures.push(`${label}: course table says ${row.lessonCount} lessons, OUTLINE.md sections list ${outlineLessons.length}`);
      }
      const electiveLessons = outlineLessons.filter((lesson) => lesson.elective).length;
      if (row.electiveLessonCount !== electiveLessons) {
        failures.push(`${label}: course table says ${row.electiveLessonCount} elective lessons, OUTLINE.md marks ${electiveLessons}`);
      }
    }
    if (registryLessons.length !== outlineLessons.length) {
      failures.push(`${label}: OUTLINE.md has ${outlineLessons.length} lessons, registry has ${registryLessons.length}`);
    }
  }
  return failures;
}

// ---- Comparing learning paths ---------------------------------------------------------------------------------

// Maps one path-table segment to a course id, or null. A segment names a course by its id, or by one of its names
// (the English or Chinese name, or a name followed by a colon and a subtitle).
export function courseIdForSegment(segment, courseTable) {
  const wanted = segment.trim();
  if (wanted === '') return null;
  for (const row of courseTable) {
    if (row.id === wanted) return row.id;
    for (const name of row.names) {
      if (name === wanted) return row.id;
      if (name.startsWith(wanted) && /^[:：]/u.test(name.slice(wanted.length))) return row.id;
    }
  }
  return null;
}

// Resolves each path's steps to course ids. A segment with " / " is a choice. "<path name>的全部课程" expands to that path's steps.
// Segments that name no course are listed in `unmatched`, so a step that is not a course shows up as a failure.
export function resolvePaths(pathRows, courseTable) {
  const resolved = [];
  for (const row of pathRows) {
    const steps = [];
    const unmatched = [];
    const cleaned = row.steps.replace(/[（(][^（()）]*[)）]/gu, '');
    for (const raw of cleaned.split(/\s*→\s*/u).map((part) => part.trim()).filter(Boolean)) {
      if (raw.endsWith(ALL_PATH_SUFFIX)) {
        const prefix = raw.slice(0, -ALL_PATH_SUFFIX.length).trim();
        const earlier = resolved.find((path) => path.name === prefix);
        if (earlier) steps.push(...earlier.steps);
        else unmatched.push(raw);
        continue;
      }
      if (raw.includes('/')) {
        const options = [];
        for (const option of raw.split(/\s*\/\s*/u).map((part) => part.trim())) {
          const courseId = courseIdForSegment(option, courseTable);
          if (courseId === null) unmatched.push(option);
          else options.push(courseId);
        }
        steps.push({ kind: 'choice', options });
        continue;
      }
      const courseId = courseIdForSegment(raw, courseTable);
      if (courseId === null) unmatched.push(raw);
      else steps.push({ kind: 'course', courseId });
    }
    resolved.push({ id: row.id, name: row.name, steps, unmatched });
  }
  return resolved;
}

function describeStep(step) {
  return step.kind === 'course' ? `course:${step.courseId}` : `choice:(${step.options.join('|')})`;
}

export function pathFailures(resolvedPaths, registryPaths) {
  const failures = [];
  const outlineIds = resolvedPaths.map((path) => path.id);
  const registryIds = registryPaths.map((path) => path.id);
  if (outlineIds.join(',') !== registryIds.join(',')) {
    failures.push(`learning path ids differ: OUTLINE.md [${outlineIds.join(', ')}] vs registry [${registryIds.join(', ')}]`);
  }
  for (const path of resolvedPaths) {
    const label = `path "${path.id}"`;
    for (const segment of path.unmatched) {
      failures.push(`${label}: step "${segment}" names no course in OUTLINE.md's course table (learning-path steps are courses)`);
    }
    const registry = registryPaths.find((candidate) => candidate.id === path.id);
    if (!registry) {
      failures.push(`${label} is in OUTLINE.md but not in the learning-path registry`);
      continue;
    }
    if (registry.title?.[PATH_LOCALE] !== path.name) {
      failures.push(`${label}: name "${registry.title?.[PATH_LOCALE]}" in the registry, "${path.name}" in OUTLINE.md (${PATH_LOCALE})`);
    }
    const expected = path.steps.map(describeStep).join(' → ');
    const actual = registry.steps.map((step) => describeStep(step.kind === 'course'
      ? { kind: 'course', courseId: step.courseId }
      : { kind: 'choice', options: step.options.map((option) => option.courseId) })).join(' → ');
    if (expected !== actual) failures.push(`${label}: steps differ. OUTLINE.md "${expected}" vs registry "${actual}"`);
  }
  return failures;
}

// ---- CLI ----------------------------------------------------------------------------------------------------------

function parseArgs(argv) {
  const options = { courses: false, paths: false };
  for (const arg of argv) {
    if (arg === '--courses') options.courses = true;
    else if (arg === '--paths') options.paths = true;
    else throw new Error(`unknown argument ${arg}`);
  }
  if (!options.courses && !options.paths) throw new Error('give --courses, --paths or both');
  return options;
}

export async function main(argv = process.argv.slice(2), root = REPO_ROOT) {
  let options;
  try {
    options = parseArgs(argv);
  } catch (error) {
    console.error(`check-outline-sync: ${error.message}`);
    console.error('usage: node scripts/check-outline-sync.mjs --courses | --paths');
    return 2;
  }
  let text;
  try {
    text = readFileSync(join(root, 'OUTLINE.md'), 'utf8');
  } catch {
    console.error('check-outline-sync: OUTLINE.md does not exist');
    return 2;
  }
  const outline = parseOutline(text);
  const registry = await loadRegistries(root);
  const registryCourses = registry.courses.map((course) => ({
    id: course.id,
    elective: course.elective === true,
    lessons: normalizeRegistryNodes(course.outline),
  }));
  const registryPaths = registry.learningPaths;

  const sections = [];
  if (options.courses) sections.push(['courses', courseFailures(outline, registryCourses)]);
  if (options.paths) sections.push(['paths', pathFailures(resolvePaths(outline.pathTable, outline.courseTable), registryPaths)]);

  let failed = 0;
  for (const [name, failures] of sections) {
    if (failures.length === 0) {
      console.log(`PASS --${name}`);
    } else {
      failed += 1;
      console.log(`FAIL --${name} (${failures.length} differences)`);
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
