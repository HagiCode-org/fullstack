import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { SUPPORTED_LOCALES } from '../../src/config/site.ts';
import { courses } from '../../src/courses/registry.ts';
import { findLearningPathFailures } from '../../src/learning-paths/integrity.ts';
import { getLearningPath, learningPaths, pathCourseIds, resolvePath } from '../../src/learning-paths/registry.ts';

const titles = (text) => Object.fromEntries(SUPPORTED_LOCALES.map((locale) => [locale, text]));
const courseStep = (id, courseId) => ({ kind: 'course', id, courseId });
const choiceStep = (id, courseIds) => ({
  kind: 'choice',
  id,
  title: titles(id),
  options: courseIds.map((courseId) => ({ courseId })),
});
const AI_COURSES = ['codex', 'claude', 'codebuddy', 'zcode'];
// Fixture course list: every course the fixture path names, each with one lesson so it has the course shape.
const fixtureCourse = (id) => ({
  id,
  title: titles(id),
  demo: true,
  outline: [{ kind: 'lesson', id: 'intro', title: titles('Intro') }],
});
const fixtureCourses = ['github-desktop-and-github', ...AI_COURSES, 'first-website'].map(fixtureCourse);
// The from-scratch fullstack path: one course, a four-way AI software choice, then a course.
const fullstackFromScratch = () => ({
  id: 'fullstack-from-scratch',
  title: titles('Fullstack from scratch'),
  summary: titles('From a blank page to a deployed web app.'),
  demo: true,
  steps: [
    courseStep('github', 'github-desktop-and-github'),
    choiceStep('ai-software', AI_COURSES),
    courseStep('website', 'first-website'),
  ],
});

describe('learning path registry', () => {
  it('finds a path by id and returns undefined for an unknown id', () => {
    const path = fullstackFromScratch();
    const list = [path];
    assert.equal(getLearningPath('fullstack-from-scratch', list), path);
    assert.equal(getLearningPath('nope', list), undefined);
  });

  it('lists one course step then the four options of a choice in declared order', () => {
    const path = { ...fullstackFromScratch(), steps: [courseStep('github', 'github-desktop-and-github'), choiceStep('ai-software', AI_COURSES)] };
    assert.deepEqual(pathCourseIds(path), ['github-desktop-and-github', ...AI_COURSES]);
  });

  it('names only courses that exist in the fixture course list', () => {
    const fixtureIds = new Set(fixtureCourses.map((course) => course.id));
    assert.ok(pathCourseIds(fullstackFromScratch()).every((id) => fixtureIds.has(id)));
  });

  it('lists only the course steps of a path with no choice, in path order', () => {
    const path = { ...fullstackFromScratch(), steps: [courseStep('a', 'first-website'), courseStep('b', 'github-desktop-and-github')] };
    assert.deepEqual(pathCourseIds(path), ['first-website', 'github-desktop-and-github']);
  });
});

describe('learning path integrity', () => {
  it('reports nothing for an empty path list', () => {
    assert.deepEqual(findLearningPathFailures([], fixtureCourses), []);
  });

  it('passes the valid fixture path against the fixture course list', () => {
    assert.deepEqual(findLearningPathFailures([fullstackFromScratch()], fixtureCourses), []);
  });

  it('reports nothing for the registry against the real course registry', () => {
    assert.deepEqual(findLearningPathFailures(learningPaths, courses), []);
  });

  it('names a path id that is not lowercase letters, digits and hyphens', () => {
    const path = { ...fullstackFromScratch(), id: 'Full Stack' };
    assert.deepEqual(findLearningPathFailures([path], fixtureCourses), ['path id "Full Stack" must match [a-z0-9-]+']);
  });

  it('names a path id used by two paths', () => {
    assert.deepEqual(
      findLearningPathFailures([fullstackFromScratch(), fullstackFromScratch()], fixtureCourses),
      ['path id "fullstack-from-scratch" is used by more than one path'],
    );
  });

  it('names a path with no steps', () => {
    const path = { ...fullstackFromScratch(), steps: [] };
    assert.deepEqual(findLearningPathFailures([path], fixtureCourses), ['path "fullstack-from-scratch" has no steps']);
  });

  it('names a path that lacks a title in one locale', () => {
    const path = fullstackFromScratch();
    delete path.title['ja-JP'];
    assert.deepEqual(findLearningPathFailures([path], fixtureCourses), ['path "fullstack-from-scratch" has no title for ja-JP']);
  });

  it('names a path that lacks a summary in one locale', () => {
    const path = fullstackFromScratch();
    path.summary['de-DE'] = '  ';
    assert.deepEqual(findLearningPathFailures([path], fixtureCourses), ['path "fullstack-from-scratch" has no summary for de-DE']);
  });

  it('names a step id that is not lowercase letters, digits and hyphens', () => {
    const path = fullstackFromScratch();
    path.steps[1].id = 'AI Software';
    assert.deepEqual(findLearningPathFailures([path], fixtureCourses), [
      'step "AI Software" in path "fullstack-from-scratch" must have an id matching [a-z0-9-]+',
    ]);
  });

  it('names a step id used by two steps of one path', () => {
    const path = fullstackFromScratch();
    path.steps[2].id = 'github';
    assert.deepEqual(findLearningPathFailures([path], fixtureCourses), [
      'step id "github" is used more than once in path "fullstack-from-scratch"',
    ]);
  });

  it('names a choice with fewer than two options', () => {
    const path = fullstackFromScratch();
    path.steps[1].options = [{ courseId: 'codex' }];
    assert.deepEqual(findLearningPathFailures([path], fixtureCourses), [
      'choice "ai-software" in path "fullstack-from-scratch" needs at least two options, found 1',
    ]);
  });

  it('names a choice step that lacks a title in one locale', () => {
    const path = fullstackFromScratch();
    delete path.steps[1].title['de-DE'];
    assert.deepEqual(findLearningPathFailures([path], fixtureCourses), [
      'choice "ai-software" in path "fullstack-from-scratch" has no title for de-DE',
    ]);
  });

  it('names a course step whose course is not in the course registry', () => {
    const path = fullstackFromScratch();
    path.steps[0].courseId = 'not-a-course';
    assert.deepEqual(findLearningPathFailures([path], fixtureCourses), [
      'step "github" in path "fullstack-from-scratch" names course "not-a-course" that is not in the course registry',
    ]);
  });

  it('names a course named by two steps of one path', () => {
    const path = fullstackFromScratch();
    path.steps[2].courseId = 'github-desktop-and-github';
    assert.deepEqual(findLearningPathFailures([path], fixtureCourses), [
      'course "github-desktop-and-github" is named by more than one step of path "fullstack-from-scratch"',
    ]);
  });

  it('names a course repeated in one choice', () => {
    const path = fullstackFromScratch();
    path.steps[1].options = [{ courseId: 'codex' }, { courseId: 'claude' }, { courseId: 'codex' }];
    assert.deepEqual(findLearningPathFailures([path], fixtureCourses), [
      'step "ai-software" in path "fullstack-from-scratch" lists course "codex" more than once',
    ]);
  });

  it('passes a course shared by two different paths', () => {
    const second = { ...fullstackFromScratch(), id: 'second-path' };
    assert.deepEqual(findLearningPathFailures([fullstackFromScratch(), second], fixtureCourses), []);
  });
});

// The resolved course per step, in order: null where a choice is still open.
const resolvedCourses = (path, choices) => resolvePath(path, choices).map((entry) => entry.courseId);

describe('learning path resolution', () => {
  it('resolves a made choice to the chosen course and keeps the steps around it in order', () => {
    assert.deepEqual(
      resolvedCourses(fullstackFromScratch(), { 'ai-software': 'claude' }),
      ['github-desktop-and-github', 'claude', 'first-website'],
    );
  });

  it('leaves a choice with no made choice open, not defaulted to its first option', () => {
    assert.deepEqual(resolvedCourses(fullstackFromScratch(), {}), ['github-desktop-and-github', null, 'first-website']);
  });

  it('leaves a choice open when the supplied course is not one of its options', () => {
    assert.deepEqual(
      resolvedCourses(fullstackFromScratch(), { 'ai-software': 'python' }),
      ['github-desktop-and-github', null, 'first-website'],
    );
  });

  it('resolves every course step of a path with only course steps, with no choices', () => {
    const path = { ...fullstackFromScratch(), steps: [courseStep('a', 'first-website'), courseStep('b', 'github-desktop-and-github')] };
    assert.deepEqual(resolvedCourses(path, {}), ['first-website', 'github-desktop-and-github']);
  });

  it('returns one entry per step in declared order, carrying the step itself', () => {
    const path = fullstackFromScratch();
    const resolved = resolvePath(path, { 'ai-software': 'zcode' });
    assert.equal(resolved.length, path.steps.length);
    assert.deepEqual(resolved.map((entry) => entry.step), path.steps);
  });
});
