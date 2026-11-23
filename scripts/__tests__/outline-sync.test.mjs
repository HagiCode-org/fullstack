import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  chineseBase,
  courseFailures,
  courseIdForSegment,
  lessonOrGroupForSegment,
  normalizeRegistryNodes,
  parseOutline,
  pathFailures,
  resolvePaths,
  splitHeading,
  stripCjkSuffix,
} from '../check-outline-sync.mjs';

// A small OUTLINE in the same layout as the real one: a course table, a path table and course sections.
const OUTLINE = `# Outline

## 课程路线

| # | 类型 | 课程 id | 课程 | 课时(含选修) | 状态 |
|---|------|---------|------|--------------|------|
| 1 | 主线 | \`alpha\` | Alpha / 阿尔法 | 2(选修 1) | 📝 |
| 2 | 选修 | \`beta\` | Beta / 贝塔 | 1(选修 1) | 📝 |

### 学习路径

| 路径 id | 名称 | 步骤 |
|---------|------|------|
| \`quick\` | 快速 | 阿尔法 → 贝塔 |
| \`more\` | 更多 | 快速的全部课程 →贝塔 / 阿尔法 |

## 课程大纲

### 1. Alpha(阿尔法)

- 课程 id:\`alpha\`
- 类型:主线

#### 分组:Start(开始)  \`start\`

##### First lesson(第一课)  \`first\`

- **标记**:🆕 新增,尚无正文

##### Second (optional)(第二课（选做）)  \`second\`

- **标记**:🔹 选修

### 2. Beta(贝塔)

- 课程 id:\`beta\`
- 类型:🔹 选修

##### Only lesson(唯一一课)  \`only\`

- **标记**:🔹 选修
`;

// The registry that matches OUTLINE above.
const MATCHING_COURSES = [
  {
    id: 'alpha',
    elective: false,
    lessons: normalizeRegistryNodes([
      {
        kind: 'group',
        id: 'start',
        children: [
          { kind: 'lesson', id: 'first', title: { 'en-US': 'First lesson' } },
          { kind: 'lesson', id: 'second', title: { 'en-US': 'Second (optional)' }, elective: true },
        ],
      },
    ]),
  },
  {
    id: 'beta',
    elective: true,
    lessons: normalizeRegistryNodes([{ kind: 'lesson', id: 'only', title: { 'en-US': 'Only lesson' }, elective: true }]),
  },
];
const MATCHING_PATHS = [
  { id: 'quick', title: { 'zh-CN': '快速' }, steps: [{ kind: 'course', courseId: 'alpha' }, { kind: 'course', courseId: 'beta' }] },
  {
    id: 'more',
    title: { 'zh-CN': '更多' },
    steps: [
      { kind: 'course', courseId: 'alpha' },
      { kind: 'course', courseId: 'beta' },
      { kind: 'choice', options: [{ courseId: 'beta' }, { courseId: 'alpha' }] },
    ],
  },
];

const clone = (value) => JSON.parse(JSON.stringify(value));

describe('parsing OUTLINE.md', () => {
  const outline = parseOutline(OUTLINE);

  it('reads the course table rows, types and counts', () => {
    assert.deepEqual(
      outline.courseTable.map((row) => [row.id, row.type, row.lessonCount, row.electiveLessonCount]),
      [
        ['alpha', '主线', 2, 1],
        ['beta', '选修', 1, 1],
      ],
    );
  });

  it('reads the path table', () => {
    assert.deepEqual(outline.pathTable.map((row) => row.id), ['quick', 'more']);
  });

  it('reads course sections with groups, lesson ids and elective markers', () => {
    const alpha = outline.sections.find((section) => section.id === 'alpha');
    assert.equal(alpha.elective, false);
    assert.equal(alpha.outline[0].kind, 'group');
    assert.deepEqual(
      alpha.outline[0].children.map((lesson) => [lesson.id, lesson.title, lesson.elective]),
      [
        ['first', 'First lesson', false],
        ['second', 'Second (optional)', true],
      ],
    );
    const beta = outline.sections.find((section) => section.id === 'beta');
    assert.equal(beta.elective, true);
    assert.equal(beta.outline[0].elective, true);
  });

  it('keeps the English title of a heading whose Chinese part has nested brackets', () => {
    assert.equal(stripCjkSuffix('Save a checkpoint (commit)(保存一个存档点（提交）)'), 'Save a checkpoint (commit)');
    assert.equal(stripCjkSuffix('Path B (mainland China): Publish(路径 B（中国大陆）：发布)'), 'Path B (mainland China): Publish');
    assert.equal(stripCjkSuffix('Plain title'), 'Plain title');
  });
});

describe('course comparison', () => {
  const outline = parseOutline(OUTLINE);

  it('passes when the registry matches the outline', () => {
    assert.deepEqual(courseFailures(outline, clone(MATCHING_COURSES)), []);
  });

  it('fails when lessons are in another order', () => {
    const courses = clone(MATCHING_COURSES);
    courses[0].lessons[0].children.reverse();
    assert.ok(courseFailures(outline, courses).some((line) => line.includes('lesson ids or order differ')));
  });

  it('fails a lesson that is missing from the registry', () => {
    const courses = clone(MATCHING_COURSES);
    courses[0].lessons[0].children.pop();
    assert.ok(courseFailures(outline, courses).some((line) => line.includes('lesson ids or order differ')));
  });

  it('fails a lesson whose elective flag disagrees', () => {
    const courses = clone(MATCHING_COURSES);
    courses[0].lessons[0].children[1].elective = false;
    assert.ok(courseFailures(outline, courses).some((line) => line.includes('lesson "second": OUTLINE.md elective is true, registry elective is false')));
  });

  it('fails a course marked 选修 in the outline that the registry does not mark', () => {
    const courses = clone(MATCHING_COURSES);
    courses[1].elective = false;
    assert.ok(courseFailures(outline, courses).some((line) => line.includes('course "beta": OUTLINE.md elective is true, registry elective is false')));
  });

  it('fails an en-US title that differs from the outline', () => {
    const courses = clone(MATCHING_COURSES);
    courses[0].lessons[0].children[0].title = 'First step';
    assert.ok(courseFailures(outline, courses).some((line) => line.includes('en-US title "First step" in the registry')));
  });

  it('fails a course order that differs', () => {
    const courses = clone(MATCHING_COURSES).reverse();
    assert.ok(courseFailures(outline, courses).some((line) => line.includes('course order or set differs')));
  });

  it('fails a course the outline lists but the registry lacks', () => {
    assert.ok(courseFailures(outline, [clone(MATCHING_COURSES[0])]).some((line) => line.includes('course "beta" is in OUTLINE.md but not in the course registry')));
  });

  it('fails a group whose lessons moved out of it', () => {
    const courses = clone(MATCHING_COURSES);
    const [group] = courses[0].lessons;
    courses[0].lessons = [group.children[0], { ...group, children: [group.children[1]] }];
    assert.ok(courseFailures(outline, courses).some((line) => line.includes('group structure differs')));
  });

  it('fails when the course table count disagrees with the sections', () => {
    const broken = parseOutline(OUTLINE.replace('| 2(选修 1) |', '| 3(选修 1) |'));
    assert.ok(courseFailures(broken, clone(MATCHING_COURSES)).some((line) => line.includes('course table says 3 lessons')));
  });

  it('fails when the elective lesson count in the table disagrees', () => {
    const broken = parseOutline(OUTLINE.replace('| 2(选修 1) |', '| 2(选修 2) |'));
    assert.ok(courseFailures(broken, clone(MATCHING_COURSES)).some((line) => line.includes('course table says 2 elective lessons')));
  });

  it('fails when the table type disagrees with the section', () => {
    const broken = parseOutline(OUTLINE.replace('| 1 | 主线 | `alpha`', '| 1 | 选修 | `alpha`'));
    assert.ok(courseFailures(broken, clone(MATCHING_COURSES)).some((line) => line.includes('the table says type "选修"')));
  });
});

describe('learning path comparison', () => {
  const outline = parseOutline(OUTLINE);

  it('resolves steps, choices and the 全部课程 reference', () => {
    const resolved = resolvePaths(outline.pathTable, outline.courseTable);
    assert.deepEqual(resolved[1].steps, [
      { kind: 'course', courseId: 'alpha' },
      { kind: 'course', courseId: 'beta' },
      { kind: 'choice', options: ['beta', 'alpha'] },
    ]);
    assert.deepEqual(resolved[1].unmatched, []);
  });

  it('matches course names by exact name, by id, or by the part of a name before its colon', () => {
    const rows = [{ id: 'gh', names: ['GitHub: Branches and Pull Requests', 'GitHub 协作:分支与 Pull Request'] }];
    assert.equal(courseIdForSegment('GitHub 协作', rows), 'gh');
    assert.equal(courseIdForSegment('GitHub', rows), 'gh', 'the part before the colon names the course');
    assert.equal(courseIdForSegment('gh', rows), 'gh');
    assert.equal(courseIdForSegment('Git', rows), null, 'a fragment that stops mid-word does not match');
  });

  it('passes when the registry paths match the outline', () => {
    assert.deepEqual(pathFailures(resolvePaths(outline.pathTable, outline.courseTable), clone(MATCHING_PATHS)), []);
  });

  it('fails a step that names no course, such as a lesson or topic', () => {
    const table = parsePathsWithStep('发布进阶 / 阿尔法');
    const failures = pathFailures(resolvePaths(table, outline.courseTable), clone(MATCHING_PATHS));
    assert.ok(failures.some((line) => line.includes('step "发布进阶" names no course')));
  });

  it('fails a registry path whose steps differ', () => {
    const paths = clone(MATCHING_PATHS);
    paths[0].steps.reverse();
    assert.ok(pathFailures(resolvePaths(outline.pathTable, outline.courseTable), paths).some((line) => line.includes('steps differ')));
  });

  it('fails a path the outline lists but the registry lacks', () => {
    const failures = pathFailures(resolvePaths(outline.pathTable, outline.courseTable), [clone(MATCHING_PATHS[0])]);
    assert.ok(failures.some((line) => line.includes('path "more" is in OUTLINE.md but not in the learning-path registry')));
    assert.ok(failures.some((line) => line.includes('learning path ids differ')));
  });

  it('fails a path name that differs', () => {
    const paths = clone(MATCHING_PATHS);
    paths[0].title['zh-CN'] = '入门';
    assert.ok(pathFailures(resolvePaths(outline.pathTable, outline.courseTable), paths).some((line) => line.includes('name "入门" in the registry')));
  });
});

describe('lesson and group steps in the path table', () => {
  // The resolved steps of the quick path when its steps cell is `steps`, with OUTLINE's course sections available.
  const resolveQuick = (steps) => {
    const outline = parseOutline(OUTLINE.replace('| `quick` | 快速 | 阿尔法 → 贝塔 |', `| \`quick\` | 快速 | ${steps} |`));
    return resolvePaths(outline.pathTable, outline.courseTable, outline.sections)[0];
  };

  it('reads the Chinese part of group and lesson headings and leaves the bracket of a nested title intact', () => {
    const outline = parseOutline(OUTLINE);
    const alpha = outline.sections.find((section) => section.id === 'alpha');
    assert.equal(alpha.outline[0].chinese, '开始');
    assert.deepEqual(alpha.outline[0].children.map((lesson) => lesson.chinese), ['第一课', '第二课（选做）']);
  });

  it('resolves a 不分先后 steps cell to one step per item, with no choice', () => {
    const resolved = resolveQuick('阿尔法 / 第一课 / 开始(不分先后,按需选学)');
    assert.deepEqual(resolved.steps, [
      { kind: 'course', courseId: 'alpha' },
      { kind: 'lesson', courseId: 'alpha', lessonId: 'first' },
      { kind: 'group', courseId: 'alpha', groupId: 'start' },
    ]);
    assert.deepEqual(resolved.unmatched, []);
  });

  it('resolves an arrow step to a lesson, and a name that ends with a group name to that group', () => {
    const resolved = resolveQuick('第一课 → 学习开始 → 贝塔');
    assert.deepEqual(resolved.steps, [
      { kind: 'lesson', courseId: 'alpha', lessonId: 'first' },
      { kind: 'group', courseId: 'alpha', groupId: 'start' },
      { kind: 'course', courseId: 'beta' },
    ]);
  });

  it('leaves a segment that names no course, lesson or group unmatched', () => {
    const resolved = resolveQuick('阿尔法 / 不存在的内容 (不分先后)');
    assert.deepEqual(resolved.steps, [{ kind: 'course', courseId: 'alpha' }]);
    assert.deepEqual(resolved.unmatched, ['不存在的内容']);
  });

  it('matches nothing when a name is shared by two lessons or groups, and prefers an exact name to a suffix', () => {
    const entries = [
      { kind: 'group', courseId: 'a', id: 'x', name: '开始' },
      { kind: 'lesson', courseId: 'b', id: 'y', name: '开始' },
    ];
    assert.equal(lessonOrGroupForSegment('开始', entries), null);
    assert.equal(lessonOrGroupForSegment('学习开始', entries), null);
    const mixed = [
      { kind: 'lesson', courseId: 'a', id: 'x', name: '进阶' },
      { kind: 'group', courseId: 'b', id: 'y', name: '发布进阶' },
    ];
    assert.equal(lessonOrGroupForSegment('发布进阶', mixed).id, 'y');
    assert.equal(lessonOrGroupForSegment('进阶', mixed).id, 'x');
  });

  it('reads the Chinese name a path row can use, without the bracket of a group that is marked optional', () => {
    assert.equal(chineseBase('进阶(选修)'), '进阶');
    assert.equal(chineseBase('第二课（选做）'), '第二课');
    assert.equal(chineseBase('小组协作'), '小组协作');
    assert.equal(chineseBase(null), null);
    assert.deepEqual(splitHeading('Advanced (optional)(进阶(选修))'), { english: 'Advanced (optional)', chinese: '进阶(选修)' });
    assert.deepEqual(splitHeading('Plain title'), { english: 'Plain title', chinese: null });
  });

  it('passes a registry whose lesson and group steps match the outline', () => {
    const resolved = resolveQuick('第一课 → 开始');
    const registry = [{
      id: 'quick',
      title: { 'zh-CN': '快速' },
      steps: [
        { kind: 'lesson', courseId: 'alpha', lessonId: 'first' },
        { kind: 'group', courseId: 'alpha', groupId: 'start' },
      ],
    }];
    assert.deepEqual(pathFailures([resolved], registry), []);
  });

  it('fails a registry lesson step that names a different lesson than the outline', () => {
    const resolved = resolveQuick('第一课 → 贝塔');
    const registry = [{
      id: 'quick',
      title: { 'zh-CN': '快速' },
      steps: [
        { kind: 'lesson', courseId: 'alpha', lessonId: 'second' },
        { kind: 'course', courseId: 'beta' },
      ],
    }];
    assert.ok(pathFailures([resolved], registry).some((line) => line.includes('steps differ') && line.includes('lesson:alpha/second')));
  });
});

// A one-path table whose steps cell is `steps`, using the same course table as OUTLINE.
function parsePathsWithStep(steps) {
  const text = OUTLINE.replace('| `quick` | 快速 | 阿尔法 → 贝塔 |', `| \`quick\` | 快速 | ${steps} |`);
  return parseOutline(text).pathTable;
}
