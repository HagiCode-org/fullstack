import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import { courses, flattenLessons } from '../../src/courses/registry.ts';
import { dockerForBeginners } from '../../src/courses/docker-for-beginners/outline.ts';
import { findCourseFailures } from '../../src/courses/integrity.ts';
import { readBodyKeys } from '../course-bodies.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const coursesDir = path.join(root, 'src', 'courses');
const contentDir = path.join(coursesDir, 'docker-for-beginners', 'content', 'en-US');
const bodies = readBodyKeys(coursesDir);
const lessonIds = flattenLessons(dockerForBeginners.outline).map((lesson) => lesson.id);
// Lessons that may link to the community tools' own documentation. Every other lesson links only to core hosts.
const communityLessons = new Set(['manage-with-portainer', 'more-community-containers']);
const CORE_HOSTS = ['docs.docker.com', 'hub.docker.com', 'www.docker.com', 'nginx.org', 'www.postgresql.org', 'nodejs.org'];
const COMMUNITY_HOSTS = [
  'docs.portainer.io',
  'www.portainer.io',
  'dozzle.dev',
  'uptime.kuma.pet',
  'www.adminer.org',
  'www.pgadmin.org',
  'nginxproxymanager.com',
];

// A missing body reads as empty, so each check fails with a message that names the lesson.
const readBody = (id) => {
  const file = path.join(contentDir, `${id}.md`);
  return existsSync(file) ? readFileSync(file, 'utf8') : '';
};
const fencedBlocks = (text) => [...text.matchAll(/^```[^\n]*\n([\s\S]*?)^```/gmu)].map((match) => match[1]);
// Addresses on the reader's own computer, such as http://localhost:8080, point at the reader's services, not at documentation.
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);
const isLocal = (url) => LOCAL_HOSTS.has(new URL(url).hostname);
// Links that name a remote site, written in the prose. Code blocks and inline code hold commands and config, so they are skipped.
// Trailing markdown punctuation is not part of the address.
const proseOf = (text) => text.replace(/^```[\s\S]*?^```/gmu, '').replace(/`[^`\n]*`/gu, '');
const linksIn = (text) => [...proseOf(text).matchAll(/https?:\/\/[^\s)>\]"'`*<]+/gu)]
  .map((match) => match[0].replace(/[.,;:]+$/u, ''))
  .filter((url) => !isLocal(url));

describe('docker-for-beginners registration', () => {
  it('is registered as a real course, not a demo', () => {
    assert.ok(courses.includes(dockerForBeginners), 'docker-for-beginners is not in the course registry');
    assert.equal(dockerForBeginners.demo, false);
  });

  it('lists the twelve lessons in learning order', () => {
    assert.deepEqual(lessonIds, [
      'what-is-docker',
      'install-docker',
      'your-first-container',
      'run-nginx',
      'run-postgres',
      'run-nodejs',
      'docker-networks',
      'docker-compose',
      'manage-with-portainer',
      'more-community-containers',
      'troubleshooting',
      'clean-up-and-next-steps',
    ]);
  });

  it('passes the course integrity check with its bodies', () => {
    assert.deepEqual(findCourseFailures(courses, bodies), []);
  });
});

describe('docker-for-beginners lesson bodies', () => {
  for (const id of lessonIds) {
    it(`lesson "${id}" has an en-US body`, () => {
      assert.ok(bodies.has(`docker-for-beginners/en-US/${id}`), `lesson "${id}" has no en-US body`);
    });

    it(`lesson "${id}" links to official documentation over https`, () => {
      const urls = linksIn(readBody(id));
      assert.ok(urls.some((url) => url.startsWith('https://')), `lesson "${id}" has no https documentation link`);
      const insecure = urls.filter((url) => !url.startsWith('https://'));
      assert.deepEqual(insecure, [], `lesson "${id}" links without https: ${insecure.join(', ')}`);
    });

    it(`lesson "${id}" links only to allowed hosts`, () => {
      const allowed = new Set(communityLessons.has(id) ? [...CORE_HOSTS, ...COMMUNITY_HOSTS] : CORE_HOSTS);
      const rejected = linksIn(readBody(id)).filter((url) => !allowed.has(new URL(url).hostname));
      assert.deepEqual(rejected, [], `lesson "${id}" links to hosts outside its allowlist: ${rejected.join(', ')}`);
    });

    it(`lesson "${id}" uses no legacy docker-compose command or backslash continuation in shell blocks`, () => {
      for (const block of fencedBlocks(readBody(id))) {
        for (const line of block.split('\n')) {
          assert.doesNotMatch(line, /(^|[\s$>])docker-compose(\s|$)/u, `lesson "${id}" uses the legacy docker-compose command: ${line.trim()}`);
          assert.doesNotMatch(line, /\\\s*$/u, `lesson "${id}" continues a command with a backslash: ${line.trim()}`);
        }
      }
    });
  }

  it('gives install-docker a section for each operating system', () => {
    const text = readBody('install-docker');
    for (const system of ['Windows', 'macOS', 'Linux']) {
      assert.match(text, new RegExp(`^## ${system}$`, 'mu'), `install-docker is missing the "## ${system}" section`);
    }
  });

  for (const id of communityLessons) {
    it(`lesson "${id}" states the Docker-socket security note before any socket mount`, () => {
      const text = readBody(id);
      const note = text.search(/security note/iu);
      assert.notEqual(note, -1, `lesson "${id}" has no Docker-socket security note`);
      const socket = text.indexOf('docker.sock');
      if (socket !== -1) {
        assert.ok(note < socket, `lesson "${id}" mounts the Docker socket before its security note`);
      }
    });
  }
});
