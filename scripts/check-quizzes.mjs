#!/usr/bin/env node
// Checks the review quizzes in quizzes/<course-id>/<lesson-id>.md.
//   --structure        every lesson has exactly one quiz, no orphan quiz or course folder, and each header matches the
//                      course and lesson in the registry. Works while lesson bodies are still drafts.
//   --course <id>      --structure for one course, plus the question checks against its lesson bodies.
//   --all              --structure for every course, plus the question checks.
// Exit 0 when everything passes, 1 when anything fails, 2 for bad arguments.
import { existsSync, readdirSync, realpathSync } from 'node:fs';
import { join } from 'node:path';

import {
  LESSON_LOCALE,
  REPO_ROOT,
  headingsOf,
  lessonBodyPath,
  loadRegistries,
  readTextIfExists,
} from './lib/content.mjs';

const MIN_QUESTIONS = 3;
const OPTION_LETTERS = ['A', 'B', 'C', 'D'];
const MIN_EXPLANATION_CHARS = 15;

// The header lines: the course and lesson the quiz belongs to. Returns { courseId, lessonId, lessonTitle } with null for any
// line that is missing or malformed.
export function parseQuizHeader(text) {
  const course = /^- 课程[:：](.+?)[（(]`([a-z0-9-]+)`[)）]\s*$/mu.exec(text);
  const lesson = /^- 课时[:：](.+?)[（(]`([a-z0-9-]+)`[)）]\s*$/mu.exec(text);
  return {
    courseId: course ? course[2] : null,
    lessonTitle: lesson ? lesson[1].trim() : null,
    lessonId: lesson ? lesson[2] : null,
  };
}

// Header checks only: course id, lesson id and en-US title against the outline.
export function checkQuizHeader(text, { courseId, lessonId, lessonTitle }) {
  const label = `quizzes/${courseId}/${lessonId}.md`;
  const header = parseQuizHeader(text);
  const failures = [];
  if (header.courseId === null) failures.push(`${label}: header line "- 课程:…(\`course-id\`)" is missing`);
  else if (header.courseId !== courseId) failures.push(`${label}: header names course "${header.courseId}", expected "${courseId}"`);
  if (header.lessonId === null) failures.push(`${label}: header line "- 课时:…(\`lesson-id\`)" is missing`);
  else if (header.lessonId !== lessonId) failures.push(`${label}: header names lesson "${header.lessonId}", expected "${lessonId}"`);
  else if (header.lessonTitle !== lessonTitle) {
    failures.push(`${label}: header title "${header.lessonTitle}" does not match the en-US title "${lessonTitle}"`);
  }
  return failures;
}

// Question checks. bodyHeadings is a Set of the lesson body's heading texts, or null to skip the 依据 cross-check.
export function checkQuizQuestions(text, { courseId, lessonId, bodyHeadings }) {
  const label = `quizzes/${courseId}/${lessonId}.md`;
  const failures = [];
  const parts = text.split(/^## 第 (\d+) 题[ \t]*$/mu);
  const questions = [];
  for (let index = 1; index < parts.length; index += 2) {
    questions.push({ number: Number(parts[index]), block: parts[index + 1] });
  }
  if (questions.length < MIN_QUESTIONS) {
    failures.push(`${label}: has ${questions.length} questions; at least ${MIN_QUESTIONS} are required`);
  }

  const answers = [];
  questions.forEach((question, index) => {
    const where = `${label} question ${index + 1}`;
    if (question.number !== index + 1) failures.push(`${where}: heading says ${question.number}, expected ${index + 1}`);

    const lines = question.block.split(/\r?\n/u);
    const options = lines
      .map((line) => /^- ([A-Za-z])[.．]\s+\S/u.exec(line))
      .filter(Boolean)
      .map((match) => match[1].toUpperCase());
    if (options.length !== 4 || options.join('') !== OPTION_LETTERS.join('')) {
      failures.push(`${where}: needs exactly four options A–D in order, found ${options.length} (${options.join(', ') || 'none'})`);
    }
    const firstOption = lines.findIndex((line) => /^- [A-Za-z][.．]\s+\S/u.test(line));
    if (firstOption <= 0 || lines.slice(0, firstOption).every((line) => line.trim() === '')) {
      failures.push(`${where}: has no question text before its options`);
    }

    const answerMatches = [...question.block.matchAll(/^\*\*答案[:：]\s*([A-Za-z])\*\*\s*$/gmu)];
    if (answerMatches.length !== 1) {
      failures.push(`${where}: needs exactly one "**答案:X**" line, found ${answerMatches.length}`);
    } else {
      const letter = answerMatches[0][1].toUpperCase();
      if (!OPTION_LETTERS.includes(letter)) failures.push(`${where}: answer "${letter}" is not one of A–D`);
      answers.push(letter);
    }

    const explanationStart = question.block.search(/^解析[:：]/mu);
    if (explanationStart === -1) {
      failures.push(`${where}: needs a "解析:" explanation`);
    } else {
      const explanation = question.block
        .slice(explanationStart)
        .split(/\r?\n/u)
        .filter((line) => !/^依据[:：]/u.test(line))
        .join('')
        .replace(/^解析[:：]/u, '');
      const length = explanation.replace(/\s/gu, '').length;
      if (length < MIN_EXPLANATION_CHARS) {
        failures.push(`${where}: explanation has ${length} characters; at least ${MIN_EXPLANATION_CHARS} are required`);
      }
    }

    const basis = [...question.block.matchAll(/^依据[:：]\s*(.+?)\s*$/gmu)].map((match) => match[1]);
    if (basis.length !== 1) {
      failures.push(`${where}: needs exactly one "依据:" line naming the lesson section it tests, found ${basis.length}`);
    } else if (bodyHeadings !== null && !bodyHeadings.has(basis[0])) {
      failures.push(`${where}: 依据 "${basis[0]}" is not a heading in src/courses/${courseId}/content/${LESSON_LOCALE}/${lessonId}.md`);
    }
  });

  if (answers.length >= 2 && new Set(answers).size === 1) {
    failures.push(`${label}: every answer is "${answers[0]}"; vary the position of the correct answer`);
  }
  return failures;
}

// Course-by-course file structure. courses: [{ id, lessons: [{ id }] }]; folders: Map courseDir -> [lessonId, …] (md files only).
export function checkQuizStructure({ courses, folders, onlyCourses = null }) {
  const failures = [];
  const courseIds = new Set(courses.map((course) => course.id));
  const selected = onlyCourses ? courses.filter((course) => onlyCourses.includes(course.id)) : courses;
  for (const course of selected) {
    const files = folders.get(course.id);
    if (!files) {
      failures.push(`quizzes/${course.id}/ does not exist`);
      continue;
    }
    const lessonIds = new Set(course.lessons.map((lesson) => lesson.id));
    for (const lesson of course.lessons) {
      if (!files.includes(lesson.id)) failures.push(`quizzes/${course.id}/${lesson.id}.md is missing`);
    }
    for (const file of files) {
      if (!lessonIds.has(file)) failures.push(`quizzes/${course.id}/${file}.md is an orphan: no lesson "${file}" in course "${course.id}"`);
    }
  }
  if (onlyCourses === null) {
    for (const [dir] of folders) {
      if (!courseIds.has(dir)) failures.push(`quizzes/${dir}/ is an orphan folder: no course "${dir}" in the registry`);
    }
  }
  return failures;
}

function listFolders(root) {
  const folders = new Map();
  const dir = join(root, 'quizzes');
  if (!existsSync(dir)) return folders;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const files = readdirSync(join(dir, entry.name))
      .filter((name) => name.endsWith('.md'))
      .map((name) => name.slice(0, -3));
    folders.set(entry.name, files);
  }
  return folders;
}

// Reads the quizzes and their lesson bodies and runs every check the mode asks for. Returns failures per course.
export function checkQuizzesOnDisk(root, courses, { structureOnly, onlyCourses }) {
  const folders = listFolders(root);
  const byCourse = new Map();
  const add = (courseId, failure) => {
    if (!byCourse.has(courseId)) byCourse.set(courseId, []);
    byCourse.get(courseId).push(failure);
  };

  const structure = checkQuizStructure({ courses, folders, onlyCourses });
  for (const failure of structure) {
    const match = /^quizzes\/([^/]+)\//u.exec(failure);
    add(match ? match[1] : '(quizzes)', failure);
  }

  const selected = onlyCourses ? courses.filter((course) => onlyCourses.includes(course.id)) : courses;
  for (const course of selected) {
    for (const lesson of course.lessons) {
      const quizFile = join(root, 'quizzes', course.id, `${lesson.id}.md`);
      const text = readTextIfExists(quizFile);
      if (text === null) continue;
      for (const failure of checkQuizHeader(text, { courseId: course.id, lessonId: lesson.id, lessonTitle: lesson.title }))
        add(course.id, failure);
      if (structureOnly) continue;
      const body = readTextIfExists(lessonBodyPath(root, course.id, lesson.id));
      const bodyHeadings = body === null ? null : new Set(headingsOf(body).map((heading) => heading.text));
      if (bodyHeadings === null) {
        add(course.id, `quizzes/${course.id}/${lesson.id}.md: lesson body src/courses/${course.id}/content/${LESSON_LOCALE}/${lesson.id}.md does not exist, so 依据 cannot be checked`);
      }
      for (const failure of checkQuizQuestions(text, { courseId: course.id, lessonId: lesson.id, bodyHeadings }))
        add(course.id, failure);
    }
  }
  return byCourse;
}

function parseArgs(argv) {
  const options = { mode: null, course: null };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--structure') options.mode = 'structure';
    else if (arg === '--all') options.mode = 'all';
    else if (arg === '--course') {
      options.mode = 'course';
      options.course = argv[(index += 1)] ?? null;
    } else throw new Error(`unknown argument ${arg}`);
  }
  if (options.mode === null) throw new Error('give one of --structure, --course <id> or --all');
  if (options.mode === 'course' && !options.course) throw new Error('--course needs a course id');
  return options;
}

export async function main(argv = process.argv.slice(2), root = REPO_ROOT) {
  let options;
  try {
    options = parseArgs(argv);
  } catch (error) {
    console.error(`check-quizzes: ${error.message}`);
    console.error('usage: node scripts/check-quizzes.mjs --structure | --course <course-id> | --all');
    return 2;
  }
  const registry = await loadRegistries(root);
  const courses = registry.courses.map((course) => ({
    id: course.id,
    lessons: registry.flattenLessons(course.outline).map((lesson) => ({ id: lesson.id, title: lesson.title[LESSON_LOCALE] })),
  }));
  if (options.mode === 'course' && !courses.some((course) => course.id === options.course)) {
    console.error(`check-quizzes: no course "${options.course}" in the course registry`);
    return 2;
  }
  const onlyCourses = options.mode === 'course' ? [options.course] : null;
  const byCourse = checkQuizzesOnDisk(root, courses, { structureOnly: options.mode === 'structure', onlyCourses });

  const reportCourses = onlyCourses ?? courses.map((course) => course.id);
  let failed = 0;
  for (const courseId of [...reportCourses, ...[...byCourse.keys()].filter((key) => !reportCourses.includes(key))]) {
    const failures = byCourse.get(courseId) ?? [];
    if (failures.length === 0) {
      console.log(`PASS ${courseId}`);
    } else {
      failed += 1;
      console.log(`FAIL ${courseId} (${failures.length} problems)`);
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
