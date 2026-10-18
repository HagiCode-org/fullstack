import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const workflowPath = path.join(root, '.github', 'workflows', 'fullstack-deploy-gh-pages.yml');
const contractDir = path.join(root, '.github', 'gh-pages');

// The workflow is checked as text, since the repository has no YAML parser. Each job block runs from its
// two-space header to the next job header, which keeps assertions scoped to the job they describe.
function jobBlock(text, name) {
  const headers = [...text.matchAll(/^ {2}([a-z-]+):$/gmu)];
  const index = headers.findIndex((match) => match[1] === name);
  assert.notEqual(index, -1, `workflow has no ${name} job`);
  const start = headers[index].index;
  const end = headers[index + 1]?.index ?? text.length;
  return text.slice(start, end);
}

// Drop full-line // comments, which the Wrangler contract uses, before JSON.parse.
function parseJsonc(text) {
  return JSON.parse(text.replace(/^\s*\/\/.*$/gmu, ''));
}

const workflow = await readFile(workflowPath, 'utf8');
const build = jobBlock(workflow, 'build');
const deploy = jobBlock(workflow, 'deploy');

describe('fullstack deploy workflow contract', () => {
  it('starts on a push to main and on manual dispatch only', () => {
    assert.match(workflow, /^on:\n {2}push:\n {4}branches:\n {6}- main\n {2}workflow_dispatch:\n/mu);
    assert.doesNotMatch(workflow, /^ {2}pull_request(_target)?:/mu);
  });

  it('serializes runs without cancelling a run in progress', () => {
    assert.match(workflow, /^concurrency:\n {2}group: fullstack-deploy-gh-pages\n {2}cancel-in-progress: false$/mu);
  });

  it('keeps the top-level token read-only', () => {
    assert.match(workflow, /^permissions:\n {2}contents: read$/mu);
  });

  it('verifies the build before staging the payload', () => {
    assert.match(build, /run: npm run verify\b/u);
    assert.match(build, /HAGILIGHT_BUILD_BRANCH: \$\{\{ github\.ref_name \}\}/u);
    assert.match(build, /run: node scripts\/assemble-gh-pages-payload\.mjs/u);
    assert.ok(build.indexOf('npm run verify') < build.indexOf('assemble-gh-pages-payload'));
  });

  it('keeps the build job read-only and uploads the staged payload', () => {
    assert.match(build, /^ {4}permissions:\n {6}contents: read$/mu);
    assert.doesNotMatch(build, /contents: write/u);
    assert.match(build, /uses: actions\/upload-artifact@v4/u);
    assert.match(build, /if-no-files-found: error/u);
  });

  it('publishes only after the build job succeeds', () => {
    assert.match(deploy, /^ {4}needs: build$/mu);
  });

  it('publishes a single orphan commit without Jekyll processing', () => {
    assert.match(deploy, /^ {4}permissions:\n {6}contents: write$/mu);
    assert.match(deploy, /publish_branch: gh-pages/u);
    assert.match(deploy, /force_orphan: true/u);
    assert.match(deploy, /enable_jekyll: false/u);
  });

  it('warms the domains after publication', () => {
    assert.match(deploy, /run: npm run deploy:warmup -- --summary-markdown/u);
    assert.ok(deploy.indexOf('peaceiris/actions-gh-pages@v4') < deploy.indexOf('deploy:warmup'));
  });

  it('attaches the deploy job to the fullstack production environment', () => {
    assert.match(deploy, /^ {4}environment:\n {6}name: fullstack-production\n {6}url: https:\/\/fullstack\.hagicode\.com$/mu);
  });

  it('summarizes the outcome even when an earlier step fails', () => {
    assert.match(deploy, /if: always\(\)/u);
    assert.match(deploy, /already published before warmup verification failed/u);
  });
});

describe('fullstack Cloudflare contract files', () => {
  it('esa.jsonc names the fullstack site and serves ./dist with no-op install and build', async () => {
    const esa = parseJsonc(await readFile(path.join(contractDir, 'esa.jsonc'), 'utf8'));

    assert.equal(esa.name, 'hagicode fullstack');
    assert.equal(esa.installCommand, 'echo nice');
    assert.equal(esa.buildCommand, 'echo nice');
    assert.equal(esa.assets.directory, './dist');
  });

  it('wrangler.jsonc names the fullstack worker and serves ./dist as static assets', async () => {
    const wrangler = parseJsonc(await readFile(path.join(contractDir, 'wrangler.jsonc'), 'utf8'));

    assert.equal(wrangler.name, 'fullstack');
    assert.equal(wrangler.assets.directory, './dist');
    assert.equal(typeof wrangler.compatibility_date, 'string');
  });
});
