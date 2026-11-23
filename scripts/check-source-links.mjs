#!/usr/bin/env node
// Live check of every url registered in sources/<course>.json. Needs network access.
//   404 / 410 and a hostname that does not resolve (NXDOMAIN) are failures.
//   403, 429, other 4xx and 5xx are warnings.
//   When no request gets any response at all, the network is treated as unavailable: the run prints
//   "network unavailable" and exits with NETWORK_UNAVAILABLE_EXIT (3). Re-run it once the network is back; never skip it.
// Exit codes: 0 all links ok (warnings allowed), 1 at least one link failed or is off the whitelist, 2 bad arguments,
// 3 network unavailable.
// Requests are paced: the start of each request is at least --gap-ms (default 1500, 0 turns pacing off) after the start of
// the previous one, counted across all workers. The local network refuses bursts of new connections, so an unpaced run fails.
//
// Usage: node scripts/check-source-links.mjs [--course <course-id>] [--timeout-ms <ms>] [--gap-ms <ms>]
import { readdirSync, realpathSync } from 'node:fs';
import { join } from 'node:path';

import { REPO_ROOT, officialEntryFor, readLedger, readOfficialHosts } from './lib/content.mjs';

export const NETWORK_UNAVAILABLE_EXIT = 3;
const DNS_CODES = new Set(['ENOTFOUND', 'EAI_NONAME']);
const DEFAULT_TIMEOUT_MS = 20000;
const DEFAULT_CONCURRENCY = 4;
export const DEFAULT_GAP_MS = 1500;
const USER_AGENT = 'hagicode-fullstack-source-check/1.0';
// The clock is injected so tests can move time forward without waiting.
const REAL_CLOCK = {
  now: () => performance.now(),
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
};

// Global request pacing: wait() resolves once at least gapMs has passed since the previous request was started, by any worker.
// The slot is claimed in the same synchronous step that ends the wait, so two workers can never start inside one gap.
// A gap of 0 (or less) returns at once.
export function createPacer(gapMs, clock = REAL_CLOCK) {
  let nextAllowed = 0;
  return {
    async wait() {
      if (!(gapMs > 0)) return;
      while (clock.now() < nextAllowed) await clock.sleep(nextAllowed - clock.now());
      nextAllowed = clock.now() + gapMs;
    },
  };
}

// The error code of a failed fetch: undici puts the socket or DNS error under `cause`.
export function errorCode(error) {
  return error?.cause?.code ?? error?.code ?? error?.name ?? 'UNKNOWN';
}

// Judges one HTTP status. Returns 'ok' | 'warn' | 'fail' and a message.
export function judgeStatus(status) {
  if (status >= 200 && status < 400) return { level: 'ok', message: `HTTP ${status}` };
  if (status === 404 || status === 410) return { level: 'fail', message: `HTTP ${status}: the page is gone` };
  if (status === 403 || status === 429 || status >= 500) return { level: 'warn', message: `HTTP ${status}: may be blocking automated checks` };
  return { level: 'warn', message: `HTTP ${status}: unexpected status` };
}

// Checks each url. fetchImpl and clock are injected so tests never reach the network or wait. Returns one result per url:
// { url, lessons, level: 'ok' | 'warn' | 'fail' | 'network', message }.
export async function checkUrls(
  targets,
  { fetchImpl, timeoutMs = DEFAULT_TIMEOUT_MS, concurrency = DEFAULT_CONCURRENCY, gapMs = DEFAULT_GAP_MS, clock = REAL_CLOCK },
) {
  const raw = [];
  const queue = [...targets];
  const pacer = createPacer(gapMs, clock);
  const worker = async () => {
    while (queue.length > 0) {
      const target = queue.shift();
      await pacer.wait();
      raw.push({ target, outcome: await probe(target.url, fetchImpl, timeoutMs) });
    }
  };
  await Promise.all(Array.from({ length: Math.max(1, concurrency) }, worker));

  const anyResponse = raw.some((item) => item.outcome.responded);
  const results = raw.map(({ target, outcome }) => {
    const base = { url: target.url, lessons: target.lessons };
    if (outcome.responded) return { ...base, ...outcome.judgement, level: outcome.judgement.level };
    if (outcome.dns && anyResponse) return { ...base, level: 'fail', message: 'the hostname does not resolve (NXDOMAIN)' };
    return { ...base, level: 'network', message: `no response (${outcome.code})` };
  });
  return results.sort((a, b) => a.url.localeCompare(b.url));
}

async function probe(url, fetchImpl, timeoutMs) {
  try {
    const response = await fetchImpl(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(timeoutMs),
      headers: { 'user-agent': USER_AGENT, accept: '*/*' },
    });
    await response.body?.cancel?.();
    return { responded: true, judgement: judgeStatus(response.status) };
  } catch (error) {
    const code = errorCode(error);
    return { responded: false, dns: DNS_CODES.has(code), code };
  }
}

// The overall exit code from the results. Failures outrank an unreachable network so a real dead link is never hidden.
export function exitCodeFor(results) {
  if (results.some((result) => result.level === 'fail')) return 1;
  if (results.some((result) => result.level === 'network')) return NETWORK_UNAVAILABLE_EXIT;
  return 0;
}

// Collects the registered urls from every ledger in sources/. Returns { targets, offList } where offList names urls that
// are not on the official whitelist (those are not fetched).
export function collectTargets(root, { courseId = null, hosts }) {
  const names = courseId ? [courseId] : listLedgerCourses(root);
  const byUrl = new Map();
  for (const name of names) {
    const ledger = readLedger(root, name);
    if (!ledger.exists) throw new Error(`sources/${name}.json does not exist`);
    if (ledger.error) throw new Error(`sources/${name}.json is not valid JSON: ${ledger.error}`);
    for (const [lessonId, entry] of Object.entries(ledger.data?.lessons ?? {})) {
      for (const fact of entry?.facts ?? []) {
        if (typeof fact?.url !== 'string') continue;
        const where = `${name}/${lessonId}`;
        if (!byUrl.has(fact.url)) byUrl.set(fact.url, new Set());
        byUrl.get(fact.url).add(where);
      }
    }
  }
  const targets = [];
  const offList = [];
  for (const [url, lessons] of byUrl) {
    const entry = { url, lessons: [...lessons].sort() };
    if (officialEntryFor(url, hosts) === null) offList.push(entry);
    else targets.push(entry);
  }
  return { targets, offList };
}

function listLedgerCourses(root) {
  return readdirSync(join(root, 'sources'))
    .filter((name) => name.endsWith('.json') && name !== 'official-hosts.json')
    .map((name) => name.slice(0, -5))
    .sort();
}

// A gap is a number of milliseconds, 0 or more. An empty or missing value is an error, never a silent 0 (which would turn pacing off).
function parseGapMs(raw) {
  const value = typeof raw === 'string' && raw.trim() !== '' ? Number(raw) : Number.NaN;
  if (!Number.isFinite(value) || value < 0) throw new Error('--gap-ms must be a number of milliseconds, 0 or more');
  return value;
}

function parseArgs(argv) {
  const options = { courseId: null, timeoutMs: DEFAULT_TIMEOUT_MS, gapMs: DEFAULT_GAP_MS };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--course') options.courseId = argv[(index += 1)] ?? null;
    else if (arg === '--timeout-ms') options.timeoutMs = Number(argv[(index += 1)]);
    else if (arg === '--gap-ms') options.gapMs = parseGapMs(argv[(index += 1)]);
    else throw new Error(`unknown argument ${arg}`);
  }
  if (options.courseId === null && argv.includes('--course')) throw new Error('--course needs a course id');
  if (!Number.isFinite(options.timeoutMs) || options.timeoutMs <= 0) throw new Error('--timeout-ms must be a positive number');
  return options;
}

export async function main(argv = process.argv.slice(2), root = REPO_ROOT, fetchImpl = globalThis.fetch, clock = REAL_CLOCK) {
  let options;
  let hosts;
  try {
    options = parseArgs(argv);
    hosts = readOfficialHosts(root);
  } catch (error) {
    console.error(`check-source-links: ${error.message}`);
    console.error('usage: node scripts/check-source-links.mjs [--course <course-id>] [--timeout-ms <ms>] [--gap-ms <ms>]');
    return 2;
  }
  let collected;
  try {
    collected = collectTargets(root, { courseId: options.courseId, hosts });
  } catch (error) {
    console.error(`check-source-links: ${error.message}`);
    return 2;
  }
  const { targets, offList } = collected;
  for (const entry of offList) {
    console.log(`FAIL ${entry.url} is not on the official whitelist (${entry.lessons.join(', ')})`);
  }

  if (targets.length > 0) console.log(`pacing: at least ${options.gapMs} ms between the starts of requests`);
  const results = await checkUrls(targets, { fetchImpl, timeoutMs: options.timeoutMs, gapMs: options.gapMs, clock });
  for (const result of results) {
    const tag = { ok: 'OK  ', warn: 'WARN', fail: 'FAIL', network: 'NET ' }[result.level];
    console.log(`${tag} ${result.url} (${result.lessons.join(', ')}): ${result.message}`);
  }
  if (results.length === 0 && offList.length === 0) {
    console.log('FAIL no urls are registered in sources/*.json, so there is nothing to check');
    return 1;
  }
  const ok = results.filter((result) => result.level === 'ok').length;
  const warn = results.filter((result) => result.level === 'warn').length;
  const fail = results.filter((result) => result.level === 'fail').length + offList.length;
  const network = results.filter((result) => result.level === 'network').length;
  console.log(`checked ${results.length} urls: ${ok} ok, ${warn} warnings, ${fail} failed, ${network} without a response`);

  if (fail > 0) return 1;
  if (network > 0 && network === results.length) {
    console.log('network unavailable: no link could be reached; re-run when the network is back. Nothing was skipped.');
    return NETWORK_UNAVAILABLE_EXIT;
  }
  if (network > 0) {
    console.log('network unavailable for some links; re-run when the network is back. Nothing was skipped.');
    return NETWORK_UNAVAILABLE_EXIT;
  }
  return 0;
}

if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(new URL(import.meta.url).pathname)) {
  main().then((code) => {
    process.exitCode = code;
  });
}
