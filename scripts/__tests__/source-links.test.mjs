import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { after, describe, it, mock } from 'node:test';
import { fileURLToPath } from 'node:url';

import { DEFAULT_GAP_MS, NETWORK_UNAVAILABLE_EXIT, checkUrls, collectTargets, errorCode, exitCodeFor, judgeStatus, main } from '../check-source-links.mjs';
import { parseOfficialHosts } from '../lib/content.mjs';

// No test here reaches the network or waits for real time: every fetch is a fake, the clock is virtual, and the scratch roots are under the OS temp dir.
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

// A virtual clock. sleep() parks the caller on a timer and records the wait. run(work) lets the work proceed until it is
// parked, then moves time forward to the earliest timer, until the work finishes. Time only moves when every piece of work is waiting.
function virtualClock() {
  let time = 0;
  let timers = [];
  const sleeps = [];
  return {
    sleeps,
    now: () => time,
    sleep(ms) {
      sleeps.push(ms);
      return new Promise((resolve) => {
        timers.push({ at: time + ms, resolve });
      });
    },
    async run(work) {
      let finished = false;
      const outcome = work.finally(() => {
        finished = true;
      });
      while (!finished) {
        await new Promise((resolve) => setImmediate(resolve));
        if (finished) break;
        assert.ok(timers.length > 0, 'the work is stuck: it waits on nothing');
        timers = timers.sort((a, b) => a.at - b.at);
        const next = timers.shift();
        time = Math.max(time, next.at);
        next.resolve();
      }
      return outcome;
    },
  };
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

// Runs checkUrls on its own virtual clock, so the default pacing applies without any real waiting.
function checkVirtual(targets, fetchImpl, extra = {}) {
  const clock = virtualClock();
  return clock.run(checkUrls(targets, { fetchImpl, clock, ...extra }));
}

// Runs main on its own virtual clock and returns its exit code.
function mainVirtual(argv, root, fetchImpl) {
  const clock = virtualClock();
  return clock.run(main(argv, root, fetchImpl, clock));
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
    const [result] = await checkVirtual([{ url: OK, lessons: ['demo/a'] }], fetchImpl);
    assert.equal(result.level, 'ok');
    assert.equal(exitCodeFor([result]), 0);
  });

  it('fails a 404 and a 410', async () => {
    const { fetchImpl } = fakeFetch({ [GONE]: 404, [DEAD]: 410 });
    const results = await checkVirtual([{ url: GONE, lessons: ['demo/a'] }, { url: DEAD, lessons: ['demo/b'] }], fetchImpl);
    assert.deepEqual(results.map((result) => result.level), ['fail', 'fail']);
    assert.equal(exitCodeFor(results), 1);
  });

  it('only warns on 403, 429 and 5xx', async () => {
    const { fetchImpl } = fakeFetch({ [OK]: 200, [LIMITED]: 429, [FLAKY]: 503 });
    const results = await checkVirtual([{ url: OK, lessons: ['x/a'] }, { url: LIMITED, lessons: ['x/a'] }, { url: FLAKY, lessons: ['x/a'] }], fetchImpl);
    assert.equal(results.find((result) => result.url === LIMITED).level, 'warn');
    assert.equal(results.find((result) => result.url === FLAKY).level, 'warn');
    assert.equal(exitCodeFor(results), 0, 'warnings alone do not fail the run');
  });

  it('fails a hostname that does not resolve when other requests got a response (NXDOMAIN)', async () => {
    const dead = 'https://nxdomain-chk-test.example.invalid/';
    const { fetchImpl } = fakeFetch({ [OK]: 200, [dead]: netError('ENOTFOUND') });
    const results = await checkVirtual([{ url: OK, lessons: ['x/a'] }, { url: dead, lessons: ['x/b'] }], fetchImpl);
    assert.equal(results.find((result) => result.url === dead).level, 'fail');
    assert.match(results.find((result) => result.url === dead).message, /NXDOMAIN/u);
    assert.equal(exitCodeFor(results), 1);
  });

  it('treats a DNS failure as network trouble, not a dead link, when no request got any response', async () => {
    const { fetchImpl } = fakeFetch({ [OK]: netError('ENOTFOUND'), [GONE]: netError('EAI_AGAIN') });
    const results = await checkVirtual([{ url: OK, lessons: ['x/a'] }, { url: GONE, lessons: ['x/a'] }], fetchImpl);
    assert.deepEqual(results.map((result) => result.level), ['network', 'network']);
    assert.equal(exitCodeFor(results), NETWORK_UNAVAILABLE_EXIT);
  });

  it('treats connection refusals and timeouts as network trouble', async () => {
    const timeout = Object.assign(new Error('The operation was aborted due to timeout'), { name: 'TimeoutError' });
    const { fetchImpl } = fakeFetch({ [OK]: netError('ECONNREFUSED'), [GONE]: timeout });
    const results = await checkVirtual([{ url: OK, lessons: ['x/a'] }, { url: GONE, lessons: ['x/a'] }], fetchImpl);
    assert.ok(results.every((result) => result.level === 'network'));
  });

  it('a real dead link still fails when other links cannot be reached', async () => {
    const { fetchImpl } = fakeFetch({ [GONE]: 404, [OK]: netError('ETIMEDOUT') });
    const results = await checkVirtual([{ url: GONE, lessons: ['x/a'] }, { url: OK, lessons: ['x/a'] }], fetchImpl);
    assert.equal(exitCodeFor(results), 1, 'a confirmed 404 outranks an unreachable network');
  });

  it('checks each url once even when several lessons cite it', async () => {
    const { fetchImpl, calls } = fakeFetch({ [OK]: 200 });
    await checkVirtual([{ url: OK, lessons: ['x/a', 'x/b'] }], fetchImpl);
    assert.equal(calls.length, 1);
  });
});

describe('request pacing', () => {
  // Records the virtual time at which each request starts, and answers 200.
  function timedFetch(clock) {
    const starts = [];
    const fetchImpl = async () => {
      starts.push(clock.now());
      return { status: 200, body: null };
    };
    return { fetchImpl, starts };
  }
  const many = (count) => Array.from({ length: count }, (_, index) => ({ url: `${OK}?n=${index}`, lessons: ['x/a'] }));
  const gapsOf = (starts) => starts.slice(1).map((start, index) => start - starts[index]);

  it('defaults the gap to 1500 ms', () => {
    assert.equal(DEFAULT_GAP_MS, 1500);
  });

  it('starts every request at least the gap after the previous one, across all four workers', async () => {
    const clock = virtualClock();
    const { fetchImpl, starts } = timedFetch(clock);
    await clock.run(checkUrls(many(10), { fetchImpl, clock, gapMs: 1500, concurrency: 4 }));
    assert.equal(starts.length, 10);
    assert.equal(starts[0], 0, 'the first request is not delayed');
    assert.ok(gapsOf(starts).every((gap) => gap >= 1500), `gaps were ${gapsOf(starts)}`);
  });

  it('uses the default gap when none is given', async () => {
    const clock = virtualClock();
    const { fetchImpl, starts } = timedFetch(clock);
    await clock.run(checkUrls(many(3), { fetchImpl, clock }));
    assert.deepEqual(gapsOf(starts), [DEFAULT_GAP_MS, DEFAULT_GAP_MS]);
  });

  it('a gap of 0 turns pacing off: no waiting at all', async () => {
    const clock = virtualClock();
    const { fetchImpl, starts } = timedFetch(clock);
    await clock.run(checkUrls(many(5), { fetchImpl, clock, gapMs: 0 }));
    assert.equal(starts.length, 5);
    assert.deepEqual(clock.sleeps, []);
  });

  it('judging is unchanged under pacing: a 404 still fails, and the second request waited one gap', async () => {
    const clock = virtualClock();
    const { fetchImpl } = fakeFetch({ [GONE]: 404, [OK]: 200 });
    const results = await clock.run(checkUrls([{ url: GONE, lessons: ['x/a'] }, { url: OK, lessons: ['x/a'] }], { fetchImpl, clock, gapMs: 1500 }));
    assert.equal(exitCodeFor(results), 1);
    assert.deepEqual(clock.sleeps, [1500]);
  });

  it('main passes --gap-ms through to the requests', async () => {
    const root = scratchRoot({ demo: { a: { checkedOn: '2026-11-20', facts: [fact(OK), fact(GONE), fact(DEAD)] } } });
    const clock = virtualClock();
    const { fetchImpl, starts } = timedFetch(clock);
    const log = mock.method(console, 'log', () => {});
    try {
      assert.equal(await clock.run(main(['--gap-ms', '250'], root, fetchImpl, clock)), 0);
    } finally {
      log.mock.restore();
    }
    assert.equal(starts.length, 3);
    assert.deepEqual(gapsOf(starts), [250, 250]);
  });

  it('main accepts --gap-ms 0 and then never waits', async () => {
    const root = scratchRoot({ demo: { a: { checkedOn: '2026-11-20', facts: [fact(OK), fact(GONE)] } } });
    const clock = virtualClock();
    const { fetchImpl } = fakeFetch({ [OK]: 200, [GONE]: 200 });
    const log = mock.method(console, 'log', () => {});
    try {
      assert.equal(await clock.run(main(['--gap-ms', '0'], root, fetchImpl, clock)), 0);
    } finally {
      log.mock.restore();
    }
    assert.deepEqual(clock.sleeps, []);
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
      assert.equal(await mainVirtual([], root, fetchImpl), 0);
    } finally {
      log.mock.restore();
    }
  });

  it('exits 1 for a 404 and says so', async () => {
    const root = scratchRoot({ demo: { a: { checkedOn: '2026-11-20', facts: [fact(GONE)] } } });
    const log = quiet();
    try {
      const { fetchImpl } = fakeFetch({ [GONE]: 404 });
      assert.equal(await mainVirtual([], root, fetchImpl), 1);
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
      assert.equal(await mainVirtual([], root, fetchImpl), NETWORK_UNAVAILABLE_EXIT);
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
      assert.equal(await mainVirtual([], root, fetchImpl), 1);
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
      assert.equal(await mainVirtual([], root, fetchImpl), 1);
    } finally {
      log.mock.restore();
    }
  });

  it('exits 2 for an unknown argument', async () => {
    const root = scratchRoot({ demo: { a: { checkedOn: '2026-11-20', facts: [fact(OK)] } } });
    const err = silentErr();
    try {
      assert.equal(await mainVirtual(['--bogus'], root, fakeFetch({}).fetchImpl), 2);
    } finally {
      err.mock.restore();
    }
  });
});

describe('--gap-ms option parsing (invalid values must be rejected, never read as "pacing off")', () => {
  for (const args of [['--gap-ms', '-1'], ['--gap-ms', 'abc'], ['--gap-ms', ''], ['--gap-ms', '   '], ['--gap-ms', 'Infinity'], ['--gap-ms']]) {
    it(`exits 2 and fetches nothing for ${JSON.stringify(args)}`, async () => {
      const root = scratchRoot({ demo: { a: { checkedOn: '2026-11-20', facts: [fact(OK)] } } });
      const clock = virtualClock();
      const { fetchImpl, calls } = fakeFetch({ [OK]: 200 });
      const err = mock.method(console, 'error', () => {});
      const log = mock.method(console, 'log', () => {});
      try {
        assert.equal(await clock.run(main(args, root, fetchImpl, clock)), 2);
        assert.ok(err.mock.calls.some((call) => String(call.arguments[0]).includes('--gap-ms')), 'the error names the option');
      } finally {
        err.mock.restore();
        log.mock.restore();
      }
      assert.equal(calls.length, 0);
      assert.deepEqual(clock.sleeps, []);
    });
  }

  it('accepts a fractional gap', async () => {
    const root = scratchRoot({ demo: { a: { checkedOn: '2026-11-20', facts: [fact(OK)] } } });
    const log = mock.method(console, 'log', () => {});
    try {
      assert.equal(await mainVirtual(['--gap-ms', '0.5'], root, fakeFetch({ [OK]: 200 }).fetchImpl), 0);
    } finally {
      log.mock.restore();
    }
  });
});
