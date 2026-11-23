import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { after, describe, it, mock } from 'node:test';
import { fileURLToPath } from 'node:url';

import { NETWORK_UNAVAILABLE_EXIT, checkUrls, collectTargets, errorCode, exitCodeFor, judgeStatus, main } from '../check-source-links.mjs';
import { parseOfficialHosts } from '../lib/content.mjs';

// No test here reaches the network: every fetch is a fake, and the scratch roots are under the OS temp dir.
const realRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const realHostsText = readFileSync(path.join(realRoot, 'sources', 'official-hosts.json'), 'utf8');
const scratch = [];
after(() => {
  for (const dir of scratch) rmSync(dir, { recursive: true, force: true });
});

// A fake fetch: each url maps to an HTTP status (number) or an Error to throw. An unexpected url fails the test.
function fakeFetch(behaviour) {
  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(url);
    const outcome = behaviour[url];
    if (outcome === undefined) throw new Error(`unexpected fetch of ${url}`);
    if (outcome instanceof Error) throw outcome;
    return { status: outcome, body: null };
  };
  return { fetchImpl, calls };
}

// Mirrors what Node's fetch throws for a socket or DNS error: a TypeError whose cause carries the code.
function netError(code) {
  return Object.assign(new TypeError('fetch failed'), { cause: Object.assign(new Error(`connect ${code}`), { code }) });
}

function scratchRoot(ledgers) {
  const dir = mkdtempSync(path.join(tmpdir(), 'chk-links-'));
  scratch.push(dir);
  mkdirSync(path.join(dir, 'sources'), { recursive: true });
  writeFileSync(path.join(dir, 'sources', 'official-hosts.json'), realHostsText);
  for (const [course, lessons] of Object.entries(ledgers)) {
    writeFileSync(path.join(dir, 'sources', `${course}.json`), JSON.stringify({ lessons }));
  }
  return dir;
}

const fact = (url) => ({ claim: 'a claim', url });
const OK = 'https://docs.docker.com/get-started/';
const GONE = 'https://docs.docker.com/gone/';
const DEAD = 'https://nodejs.org/dead/';
const LIMITED = 'https://hub.docker.com/limited/';
const FLAKY = 'https://www.postgresql.org/flaky/';

describe('status and error classification', () => {
  it('judges HTTP statuses: 2xx/3xx ok, 404/410 fail, 403/429/5xx and other 4xx warn', () => {
    assert.equal(judgeStatus(200).level, 'ok');
    assert.equal(judgeStatus(301).level, 'ok');
    assert.equal(judgeStatus(404).level, 'fail');
    assert.equal(judgeStatus(410).level, 'fail');
    assert.equal(judgeStatus(403).level, 'warn');
    assert.equal(judgeStatus(429).level, 'warn');
    assert.equal(judgeStatus(503).level, 'warn');
    assert.equal(judgeStatus(418).level, 'warn');
  });

  it('reads the error code from the cause, then from the error itself', () => {
    assert.equal(errorCode(netError('ENOTFOUND')), 'ENOTFOUND');
    assert.equal(errorCode(Object.assign(new Error('x'), { code: 'ECONNREFUSED' })), 'ECONNREFUSED');
  });
});

describe('checkUrls with a fake fetch', () => {
  it('marks a 200 as ok and needs no network beyond the request', async () => {
    const { fetchImpl } = fakeFetch({ [OK]: 200 });
    const [result] = await checkUrls([{ url: OK, lessons: ['demo/a'] }], { fetchImpl });
    assert.equal(result.level, 'ok');
    assert.equal(exitCodeFor([result]), 0);
  });

  it('fails a 404 and a 410', async () => {
    const { fetchImpl } = fakeFetch({ [GONE]: 404, [DEAD]: 410 });
    const results = await checkUrls([{ url: GONE, lessons: ['demo/a'] }, { url: DEAD, lessons: ['demo/b'] }], { fetchImpl });
    assert.deepEqual(results.map((result) => result.level), ['fail', 'fail']);
    assert.equal(exitCodeFor(results), 1);
  });

  it('only warns on 403, 429 and 5xx', async () => {
    const { fetchImpl } = fakeFetch({ [OK]: 200, [LIMITED]: 429, [FLAKY]: 503 });
    const results = await checkUrls([{ url: OK, lessons: ['x/a'] }, { url: LIMITED, lessons: ['x/a'] }, { url: FLAKY, lessons: ['x/a'] }], { fetchImpl });
    assert.equal(results.find((result) => result.url === LIMITED).level, 'warn');
    assert.equal(results.find((result) => result.url === FLAKY).level, 'warn');
    assert.equal(exitCodeFor(results), 0, 'warnings alone do not fail the run');
  });

  it('fails a hostname that does not resolve when other requests got a response (NXDOMAIN)', async () => {
    const dead = 'https://nxdomain-chk-test.example.invalid/';
    const { fetchImpl } = fakeFetch({ [OK]: 200, [dead]: netError('ENOTFOUND') });
    const results = await checkUrls([{ url: OK, lessons: ['x/a'] }, { url: dead, lessons: ['x/b'] }], { fetchImpl });
    assert.equal(results.find((result) => result.url === dead).level, 'fail');
    assert.match(results.find((result) => result.url === dead).message, /NXDOMAIN/u);
    assert.equal(exitCodeFor(results), 1);
  });

  it('treats a DNS failure as network trouble, not a dead link, when no request got any response', async () => {
    const { fetchImpl } = fakeFetch({ [OK]: netError('ENOTFOUND'), [GONE]: netError('EAI_AGAIN') });
    const results = await checkUrls([{ url: OK, lessons: ['x/a'] }, { url: GONE, lessons: ['x/a'] }], { fetchImpl });
    assert.deepEqual(results.map((result) => result.level), ['network', 'network']);
    assert.equal(exitCodeFor(results), NETWORK_UNAVAILABLE_EXIT);
  });

  it('treats connection refusals and timeouts as network trouble', async () => {
    const timeout = Object.assign(new Error('The operation was aborted due to timeout'), { name: 'TimeoutError' });
    const { fetchImpl } = fakeFetch({ [OK]: netError('ECONNREFUSED'), [GONE]: timeout });
    const results = await checkUrls([{ url: OK, lessons: ['x/a'] }, { url: GONE, lessons: ['x/a'] }], { fetchImpl });
    assert.ok(results.every((result) => result.level === 'network'));
  });

  it('a real dead link still fails when other links cannot be reached', async () => {
    const { fetchImpl } = fakeFetch({ [GONE]: 404, [OK]: netError('ETIMEDOUT') });
    const results = await checkUrls([{ url: GONE, lessons: ['x/a'] }, { url: OK, lessons: ['x/a'] }], { fetchImpl });
    assert.equal(exitCodeFor(results), 1, 'a confirmed 404 outranks an unreachable network');
  });

  it('checks each url once even when several lessons cite it', async () => {
    const { fetchImpl, calls } = fakeFetch({ [OK]: 200 });
    await checkUrls([{ url: OK, lessons: ['x/a', 'x/b'] }], { fetchImpl });
    assert.equal(calls.length, 1);
  });
});

describe('collecting the registered urls', () => {
  it('gathers each url once with every lesson that cites it, and separates off-whitelist urls', () => {
    const root = scratchRoot({
      demo: { a: { checkedOn: '2026-11-20', facts: [fact(OK), fact('https://example.com/x')] }, b: { checkedOn: '2026-11-20', facts: [fact(OK)] } },
    });
    const hosts = parseOfficialHosts(realHostsText);
    const { targets, offList } = collectTargets(root, { hosts });
    assert.deepEqual(targets, [{ url: OK, lessons: ['demo/a', 'demo/b'] }]);
    assert.deepEqual(offList.map((entry) => entry.url), ['https://example.com/x']);
  });

  it('throws when a named ledger is missing', () => {
    const root = scratchRoot({});
    assert.throws(() => collectTargets(root, { courseId: 'nope', hosts: parseOfficialHosts(realHostsText) }), /does not exist/u);
  });
});

describe('main exit codes, with a fake fetch and a scratch repo root', () => {
  const quiet = () => mock.method(console, 'log', () => {});
  const silentErr = () => mock.method(console, 'error', () => {});

  it('exits 0 when every link is ok', async () => {
    const root = scratchRoot({ demo: { a: { checkedOn: '2026-11-20', facts: [fact(OK)] } } });
    const log = quiet();
    try {
      const { fetchImpl } = fakeFetch({ [OK]: 200 });
      assert.equal(await main([], root, fetchImpl), 0);
    } finally {
      log.mock.restore();
    }
  });

  it('exits 1 for a 404 and says so', async () => {
    const root = scratchRoot({ demo: { a: { checkedOn: '2026-11-20', facts: [fact(GONE)] } } });
    const log = quiet();
    try {
      const { fetchImpl } = fakeFetch({ [GONE]: 404 });
      assert.equal(await main([], root, fetchImpl), 1);
      assert.ok(log.mock.calls.some((call) => String(call.arguments[0]).includes('FAIL') && String(call.arguments[0]).includes(GONE)));
    } finally {
      log.mock.restore();
    }
  });

  it('exits 3 with a "network unavailable" message when no link can be reached', async () => {
    const root = scratchRoot({ demo: { a: { checkedOn: '2026-11-20', facts: [fact(OK), fact(GONE)] } } });
    const log = quiet();
    try {
      const { fetchImpl } = fakeFetch({ [OK]: netError('EAI_AGAIN'), [GONE]: netError('EAI_AGAIN') });
      assert.equal(await main([], root, fetchImpl), NETWORK_UNAVAILABLE_EXIT);
      assert.ok(log.mock.calls.some((call) => String(call.arguments[0]).includes('network unavailable')));
    } finally {
      log.mock.restore();
    }
  });

  it('exits 1 for an off-whitelist url without fetching it', async () => {
    const root = scratchRoot({ demo: { a: { checkedOn: '2026-11-20', facts: [fact('https://example.com/x')] } } });
    const log = quiet();
    try {
      const { fetchImpl, calls } = fakeFetch({});
      assert.equal(await main([], root, fetchImpl), 1);
      assert.equal(calls.length, 0);
    } finally {
      log.mock.restore();
    }
  });

  it('exits 1 when no url is registered at all, so an empty run cannot pass', async () => {
    const root = scratchRoot({ demo: { a: { checkedOn: '2026-11-20', facts: [] } } });
    const log = quiet();
    try {
      const { fetchImpl } = fakeFetch({});
      assert.equal(await main([], root, fetchImpl), 1);
    } finally {
      log.mock.restore();
    }
  });

  it('exits 2 for an unknown argument', async () => {
    const root = scratchRoot({ demo: { a: { checkedOn: '2026-11-20', facts: [fact(OK)] } } });
    const err = silentErr();
    try {
      assert.equal(await main(['--bogus'], root, fakeFetch({}).fetchImpl), 2);
    } finally {
      err.mock.restore();
    }
  });
});
