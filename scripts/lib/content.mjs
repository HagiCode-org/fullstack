// Shared helpers for the content checks. Pure functions take text or data; the readers take the repo root explicitly.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// The fullstack repo root, derived from this file's location (scripts/lib/), never from the working directory.
export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const LESSON_LOCALE = 'en-US';
export const MIN_WORDS = 450;
export const MIN_MINUTES = 10;
export const MAX_MINUTES = 45;
export const MAX_TERMS = 3;
export const LEDGER_MAX_AGE_DAYS = 90;

// Loads the course and learning-path registries. The registries are TypeScript; Node 24 strips the types on import.
export async function loadRegistries(root = REPO_ROOT) {
  const courses = await import(pathToFileURL(join(root, 'src/courses/registry.ts')).href);
  const paths = await import(pathToFileURL(join(root, 'src/learning-paths/registry.ts')).href);
  return { courses: courses.courses, flattenLessons: courses.flattenLessons, learningPaths: paths.learningPaths };
}

export function readTextIfExists(file) {
  return existsSync(file) ? readFileSync(file, 'utf8') : null;
}

export function lessonBodyPath(root, courseId, lessonId) {
  return join(root, 'src/courses', courseId, 'content', LESSON_LOCALE, `${lessonId}.md`);
}

export function glossaryPath(root, courseId) {
  return join(root, 'src/glossary', `${courseId}.json`);
}

export function ledgerPath(root, courseId) {
  return join(root, 'sources', `${courseId}.json`);
}

export function officialHostsPath(root) {
  return join(root, 'sources', 'official-hosts.json');
}

// ---- Frontmatter -----------------------------------------------------------------------------------------------

// Splits a leading `---` block from the body. `data` is null when the file has no frontmatter.
export function splitFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/u.exec(text);
  if (!match) return { data: null, body: text };
  return { data: parseFrontmatter(match[1]), body: text.slice(match[0].length) };
}

// A small YAML subset: `key: scalar`, `key: [a, b]`, and `key:` followed by `- item` lines. Anything else is ignored,
// so a missing required field shows up as a failure rather than a crash.
export function parseFrontmatter(source) {
  const data = {};
  let listKey = null;
  for (const raw of source.split(/\r?\n/u)) {
    if (raw.trim() === '' || raw.trim().startsWith('#')) continue;
    const item = /^\s+-\s+(.*)$/u.exec(raw);
    if (item && listKey !== null) {
      data[listKey].push(unquote(item[1].trim()));
      continue;
    }
    const pair = /^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/u.exec(raw);
    if (!pair) continue;
    const [, key, value] = pair;
    const trimmed = value.trim();
    if (trimmed === '') {
      data[key] = [];
      listKey = key;
    } else {
      data[key] = scalarOrArray(trimmed);
      listKey = null;
    }
  }
  return data;
}

function scalarOrArray(value) {
  if (value.startsWith('[') && value.endsWith(']')) {
    const inner = value.slice(1, -1).trim();
    return inner === '' ? [] : inner.split(',').map((part) => unquote(part.trim()));
  }
  return unquote(value);
}

function unquote(value) {
  const match = /^(["'])(.*)\1$/u.exec(value);
  return match ? match[2] : value;
}

// ---- Markdown ---------------------------------------------------------------------------------------------------

// Lines outside fenced code blocks, each with its 1-based line number.
function proseLines(text) {
  const result = [];
  let fence = null;
  text.split(/\r?\n/u).forEach((line, index) => {
    const marker = /^\s*(`{3,}|~{3,})/u.exec(line);
    if (fence === null && marker) {
      fence = marker[1];
      return;
    }
    if (fence !== null) {
      if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null;
      return;
    }
    result.push({ line, number: index + 1 });
  });
  return result;
}

// Headings outside code fences: { level, text, number }. `text` is the heading without its markers.
export function headingsOf(body) {
  const headings = [];
  for (const { line, number } of proseLines(body)) {
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/u.exec(line);
    if (match) headings.push({ level: match[1].length, text: match[2].trim(), number });
  }
  return headings;
}

// The lines under a heading, up to the next heading of the same or a higher level.
export function sectionAfter(body, heading) {
  const lines = body.split(/\r?\n/u);
  const start = heading.number;
  const out = [];
  for (let index = start; index < lines.length; index += 1) {
    const match = /^(#{1,6})\s+/u.exec(lines[index]);
    if (match && match[1].length <= heading.level) break;
    out.push(lines[index]);
  }
  return out.join('\n');
}

// Words are whitespace-separated tokens of the body, code included.
export function wordCount(body) {
  return body.split(/\s+/u).filter(Boolean).length;
}

// Hosts that point at the reader's own machine or at a compose service name, not at a website.
export function isLocalHost(hostname) {
  return (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0' ||
    hostname === '[::1]' ||
    !hostname.includes('.')
  );
}

// Every http(s) address written in the body, code included, except local ones. Trailing punctuation is not part of it.
export function externalUrlsIn(text) {
  const urls = [];
  for (const match of text.matchAll(/https?:\/\/[^\s)>\]"'`*<]+/gu)) {
    const url = match[0].replace(/[.,;:]+$/u, '');
    let hostname;
    try {
      hostname = new URL(url).hostname;
    } catch {
      hostname = '';
    }
    if (hostname === '' || isLocalHost(hostname)) continue;
    urls.push(url);
  }
  return urls;
}

// True when the text is one sentence: one line, and at most one sentence-ending mark, at its end.
export function isOneSentence(value) {
  if (typeof value !== 'string') return false;
  const text = value.trim();
  if (text === '' || /[\r\n]/u.test(text)) return false;
  const marks = text.match(/[.!?。！？](?=\s|$)/gu) ?? [];
  return marks.length <= 1;
}

// ---- Official hosts -------------------------------------------------------------------------------------------

// Parses sources/official-hosts.json. Returns { entries } or throws a message naming the problem.
export function parseOfficialHosts(text) {
  const data = JSON.parse(text);
  if (!data || !Array.isArray(data.entries)) throw new Error('official-hosts.json must have an "entries" array');
  for (const [index, entry] of data.entries.entries()) {
    if (typeof entry.host !== 'string' || entry.host === '') throw new Error(`entry ${index} has no host`);
    if (typeof entry.tool !== 'string' || entry.tool.trim() === '') throw new Error(`entry ${entry.host} has no tool`);
    if (entry.pathPrefixes !== undefined && (!Array.isArray(entry.pathPrefixes) || entry.pathPrefixes.length === 0)) {
      throw new Error(`entry ${entry.host} has an empty pathPrefixes list`);
    }
  }
  return data.entries;
}

export function readOfficialHosts(root = REPO_ROOT) {
  const text = readTextIfExists(officialHostsPath(root));
  if (text === null) throw new Error('sources/official-hosts.json does not exist');
  return parseOfficialHosts(text);
}

// The whitelist entry that allows a url, or null. Only https urls can match.
export function officialEntryFor(url, entries) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.protocol !== 'https:') return null;
  const host = parsed.hostname.toLowerCase();
  return (
    entries.find((entry) => {
      if (entry.host.toLowerCase() !== host) return false;
      if (!entry.pathPrefixes) return true;
      return entry.pathPrefixes.some((prefix) => parsed.pathname.startsWith(prefix));
    }) ?? null
  );
}

// ---- Ledger ---------------------------------------------------------------------------------------------------

// Reads sources/<course>.json. Returns { exists, data, error } without throwing.
export function readLedger(root, courseId) {
  const text = readTextIfExists(ledgerPath(root, courseId));
  if (text === null) return { exists: false, data: null, error: null };
  try {
    return { exists: true, data: JSON.parse(text), error: null };
  } catch (error) {
    return { exists: true, data: null, error: error.message };
  }
}

export function isIsoDay(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/u.test(value)) return false;
  const time = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value;
}

export function daysBetween(fromIsoDay, toIsoDay) {
  return Math.round((Date.parse(`${toIsoDay}T00:00:00Z`) - Date.parse(`${fromIsoDay}T00:00:00Z`)) / 86400000);
}

export function todayIsoDay(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

// Problems in one course's ledger, as messages. Lessons not in the course are reported; each lesson needs a checkedOn
// date within the last LEDGER_MAX_AGE_DAYS days (not in the future) and at least one fact with a claim and an official url.
export function ledgerFailures(ledger, { courseId, lessonIds, hosts, today }) {
  const failures = [];
  const prefix = `sources/${courseId}.json`;
  if (!ledger || typeof ledger !== 'object' || typeof ledger.lessons !== 'object' || ledger.lessons === null) {
    return [`${prefix} must have a "lessons" object`];
  }
  for (const key of Object.keys(ledger.lessons)) {
    if (!lessonIds.includes(key)) failures.push(`${prefix} records lesson "${key}", which is not in course "${courseId}"`);
  }
  for (const lessonId of lessonIds) {
    const entry = ledger.lessons[lessonId];
    if (!entry) {
      failures.push(`${prefix} has no entry for lesson "${lessonId}"`);
      continue;
    }
    if (!isIsoDay(entry.checkedOn)) {
      failures.push(`${prefix} lesson "${lessonId}": checkedOn must be a YYYY-MM-DD date, found ${JSON.stringify(entry.checkedOn)}`);
    } else if (daysBetween(entry.checkedOn, today) < 0) {
      failures.push(`${prefix} lesson "${lessonId}": checkedOn ${entry.checkedOn} is later than today (${today})`);
    } else if (daysBetween(entry.checkedOn, today) > LEDGER_MAX_AGE_DAYS) {
      failures.push(`${prefix} lesson "${lessonId}": checkedOn ${entry.checkedOn} is more than ${LEDGER_MAX_AGE_DAYS} days old`);
    }
    if (!Array.isArray(entry.facts) || entry.facts.length === 0) {
      failures.push(`${prefix} lesson "${lessonId}" needs at least one fact`);
      continue;
    }
    entry.facts.forEach((fact, index) => {
      const label = `${prefix} lesson "${lessonId}" fact ${index + 1}`;
      if (!fact || typeof fact.claim !== 'string' || fact.claim.trim() === '') failures.push(`${label} needs a claim`);
      if (!fact || typeof fact.url !== 'string') {
        failures.push(`${label} needs a url`);
        return;
      }
      if (officialEntryFor(fact.url, hosts) === null) {
        failures.push(`${label}: ${fact.url} is not an https url on the official host whitelist (sources/official-hosts.json)`);
      }
    });
  }
  return failures;
}

// Every url a lesson's ledger entry registers, as a Set. Empty when the entry is missing or malformed.
export function ledgerUrlsFor(ledger, lessonId) {
  const entry = ledger?.lessons?.[lessonId];
  if (!entry || !Array.isArray(entry.facts)) return new Set();
  return new Set(entry.facts.map((fact) => fact?.url).filter((url) => typeof url === 'string'));
}
