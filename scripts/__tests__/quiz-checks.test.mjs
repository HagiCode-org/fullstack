import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { checkQuizHeader, checkQuizQuestions, checkQuizStructure, parseQuizHeader } from '../check-quizzes.mjs';

const BODY_HEADINGS = new Set(['Step 1: Run it', 'What you learned']);
const LESSON = { courseId: 'demo', lessonId: 'container-basics', lessonTitle: 'Container basics' };

function question(number, { answer = 'B', options = ['A', 'B', 'C', 'D'], explanation = 'The explanation is long enough to pass.', basis = 'Step 1: Run it', stem = 'Which option is right?' } = {}) {
  const optionLines = options.map((letter, index) => `- ${letter}. Choice ${index + 1}`).join('\n');
  const answerLine = answer === null ? '' : `**答案:${answer}**\n`;
  const explanationLine = explanation === null ? '' : `解析:${explanation}\n`;
  const basisLine = basis === null ? '' : `依据:${basis}\n`;
  return `## 第 ${number} 题\n\n${stem}\n\n${optionLines}\n\n${answerLine}\n${explanationLine}${basisLine}\n`;
}

function quiz(blocks, header = { course: 'demo', lesson: 'container-basics', title: 'Container basics' }) {
  return `# 复习测验:示例\n\n- 课程:示例课程(\`${header.course}\`)\n- 课时:${header.title}(\`${header.lesson}\`)\n- 题型:单选\n\n${blocks.join('\n')}`;
}

const goodQuiz = () => quiz([question(1, { answer: 'B' }), question(2, { answer: 'C' }), question(3, { answer: 'D' })]);

describe('quiz header', () => {
  it('reads the course id, lesson id and en-US title', () => {
    assert.deepEqual(parseQuizHeader(goodQuiz()), { courseId: 'demo', lessonTitle: 'Container basics', lessonId: 'container-basics' });
  });

  it('passes a header that matches the outline', () => {
    assert.deepEqual(checkQuizHeader(goodQuiz(), LESSON), []);
  });

  it('fails a header naming another course', () => {
    const text = quiz([question(1), question(2), question(3)], { course: 'other', lesson: 'container-basics', title: 'Container basics' });
    assert.ok(checkQuizHeader(text, LESSON).some((line) => line.includes('names course "other"')));
  });

  it('fails a header naming another lesson id', () => {
    const text = quiz([question(1), question(2), question(3)], { course: 'demo', lesson: 'old-id', title: 'Container basics' });
    assert.ok(checkQuizHeader(text, LESSON).some((line) => line.includes('names lesson "old-id"')));
  });

  it('fails a header whose en-US title differs from the outline', () => {
    const text = quiz([question(1), question(2), question(3)], { course: 'demo', lesson: 'container-basics', title: 'Containers' });
    assert.ok(checkQuizHeader(text, LESSON).some((line) => line.includes('does not match the en-US title')));
  });

  it('fails a file with no header lines', () => {
    assert.ok(checkQuizHeader('# nothing here\n', LESSON).length >= 2);
  });
});

describe('quiz questions', () => {
  it('passes a well-formed quiz', () => {
    assert.deepEqual(checkQuizQuestions(goodQuiz(), { ...LESSON, bodyHeadings: BODY_HEADINGS }), []);
  });

  it('fails a quiz with fewer than three questions', () => {
    const text = quiz([question(1, { answer: 'A' }), question(2, { answer: 'C' })]);
    assert.ok(checkQuizQuestions(text, { ...LESSON, bodyHeadings: BODY_HEADINGS }).some((line) => line.includes('has 2 questions')));
  });

  it('fails a question with three options', () => {
    const text = quiz([question(1, { options: ['A', 'B', 'C'] }), question(2, { answer: 'C' }), question(3, { answer: 'D' })]);
    assert.ok(checkQuizQuestions(text, { ...LESSON, bodyHeadings: BODY_HEADINGS }).some((line) => line.includes('exactly four options')));
  });

  it('fails a question with five options', () => {
    const text = quiz([question(1, { options: ['A', 'B', 'C', 'D', 'E'], answer: 'A' }), question(2, { answer: 'C' }), question(3, { answer: 'D' })]);
    assert.ok(checkQuizQuestions(text, { ...LESSON, bodyHeadings: BODY_HEADINGS }).some((line) => line.includes('exactly four options')));
  });

  it('fails a question with two answer lines', () => {
    const block = question(1, { answer: 'B' }).replace('解析:', '**答案:C**\n解析:');
    const text = quiz([block, question(2, { answer: 'C' }), question(3, { answer: 'D' })]);
    assert.ok(checkQuizQuestions(text, { ...LESSON, bodyHeadings: BODY_HEADINGS }).some((line) => line.includes('exactly one "**答案:X**"')));
  });

  it('fails a question with no answer line', () => {
    const text = quiz([question(1, { answer: null }), question(2, { answer: 'C' }), question(3, { answer: 'D' })]);
    assert.ok(checkQuizQuestions(text, { ...LESSON, bodyHeadings: BODY_HEADINGS }).some((line) => line.includes('found 0')));
  });

  it('fails an explanation shorter than 15 characters', () => {
    const text = quiz([question(1, { explanation: '短' }), question(2, { answer: 'C' }), question(3, { answer: 'D' })]);
    assert.ok(checkQuizQuestions(text, { ...LESSON, bodyHeadings: BODY_HEADINGS }).some((line) => line.includes('explanation has 1 characters')));
  });

  it('fails a question with no 依据 line', () => {
    const text = quiz([question(1, { basis: null }), question(2, { answer: 'C' }), question(3, { answer: 'D' })]);
    assert.ok(checkQuizQuestions(text, { ...LESSON, bodyHeadings: BODY_HEADINGS }).some((line) => line.includes('exactly one "依据:" line')));
  });

  it('fails a 依据 that is not a heading of the lesson body', () => {
    const text = quiz([question(1, { basis: 'Step 9: Not in the lesson' }), question(2, { answer: 'C' }), question(3, { answer: 'D' })]);
    assert.ok(checkQuizQuestions(text, { ...LESSON, bodyHeadings: BODY_HEADINGS }).some((line) => line.includes('is not a heading in src/courses/demo')));
  });

  it('skips the body cross-check when no body headings are given (structure-only use)', () => {
    const text = quiz([question(1, { basis: 'Anything at all' }), question(2, { answer: 'C' }), question(3, { answer: 'D' })]);
    assert.deepEqual(checkQuizQuestions(text, { ...LESSON, bodyHeadings: null }), []);
  });

  it('fails a quiz whose answers are all the same letter', () => {
    const text = quiz([question(1, { answer: 'C' }), question(2, { answer: 'C' }), question(3, { answer: 'C' })]);
    assert.ok(checkQuizQuestions(text, { ...LESSON, bodyHeadings: BODY_HEADINGS }).some((line) => line.includes('every answer is "C"')));
  });

  it('fails an answer that is not one of A–D', () => {
    const text = quiz([question(1, { answer: 'E' }), question(2, { answer: 'C' }), question(3, { answer: 'D' })]);
    assert.ok(checkQuizQuestions(text, { ...LESSON, bodyHeadings: BODY_HEADINGS }).some((line) => line.includes('"E" is not one of A–D')));
  });

  it('fails a question with no question text before its options', () => {
    const block = `## 第 1 题\n\n- A. one\n- B. two\n- C. three\n- D. four\n\n**答案:A**\n解析:The explanation is long enough.\n依据:Step 1: Run it\n`;
    const text = quiz([block, question(2, { answer: 'C' }), question(3, { answer: 'D' })]);
    assert.ok(checkQuizQuestions(text, { ...LESSON, bodyHeadings: BODY_HEADINGS }).some((line) => line.includes('no question text')));
  });
});

describe('quiz structure', () => {
  const courses = [
    { id: 'demo', lessons: [{ id: 'container-basics' }, { id: 'docker-networks' }] },
  ];

  it('passes when every lesson has a quiz and nothing is extra', () => {
    const folders = new Map([['demo', ['container-basics', 'docker-networks']]]);
    assert.deepEqual(checkQuizStructure({ courses, folders }), []);
  });

  it('fails a lesson with no quiz', () => {
    const folders = new Map([['demo', ['container-basics']]]);
    assert.ok(checkQuizStructure({ courses, folders }).some((line) => line.includes('docker-networks.md is missing')));
  });

  it('fails a quiz that matches no lesson (an orphan)', () => {
    const folders = new Map([['demo', ['container-basics', 'docker-networks', 'renamed-away']]]);
    assert.ok(checkQuizStructure({ courses, folders }).some((line) => line.includes('renamed-away.md is an orphan')));
  });

  it('fails a quiz folder for a course that is not in the registry', () => {
    const folders = new Map([['demo', ['container-basics', 'docker-networks']], ['ghost', ['x']]]);
    assert.ok(checkQuizStructure({ courses, folders }).some((line) => line.includes('quizzes/ghost/ is an orphan folder')));
  });

  it('fails a registered course with no quiz folder', () => {
    const folders = new Map();
    assert.ok(checkQuizStructure({ courses, folders }).some((line) => line.includes('quizzes/demo/ does not exist')));
  });

  it('checks only the selected course when one is given', () => {
    const folders = new Map([['demo', ['container-basics']], ['other', []]]);
    const failures = checkQuizStructure({ courses, folders, onlyCourses: ['demo'] });
    assert.ok(failures.some((line) => line.includes('docker-networks.md is missing')));
    assert.ok(!failures.some((line) => line.includes('orphan folder')));
  });
});
