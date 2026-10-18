# HagiCode Fullstack

A step-by-step tutorial for people who want to become fullstack engineers in the AI era. The site is built for `fullstack.hagicode.com`.

This repository holds the foundation only: a static Astro project with the shared Hagilight SEO head, footer, favicon, and discovery files. Lesson content, navigation, and additional locales are follow-up work.

## Requirements

- Node.js 24 or newer (`engines.node` is `>=24.0.0`)
- npm

## Commands

Run every command from this directory.

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies from `package-lock.json` |
| `npm run dev` | Start the development server |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | Run `astro check` and `tsc --noEmit` |
| `npm run verify` | Build, then check the foundation facts in `dist/` with `scripts/verify-foundation.mjs` |
| `npm run deploy:payload` | Stage `.deploy/gh-pages` with `esa.jsonc`, `wrangler.jsonc`, and `dist/`. Run after `npm run build`; it fails and names any missing input |
| `npm run deploy:warmup` | Request the worker domain and `fullstack.hagicode.com` with bounded retries. Add `-- --summary-markdown <path>` to write a Markdown summary |
| `npm test` | Run the `node:test` suites for payload staging, domain warmup, the deploy workflow contract, and the shadcn foundation. No dependencies are needed |

`verify` fails and names the missing item when the build output does not match the foundation: the exact Hagilight pins, the home page head and footer, the discovery files, the favicon, internal link targets, and the absence of forbidden files in `public/`.

## Hagilight

The site uses Hagilight as published npm packages, pinned to one exact version with no range operator:

- `@hagicode/hagilight` `0.13.0`: the Astro integration, `SEOHead`, and `Footer`
- `@hagicode/hagilight-core` `0.13.0`: the shared core that both depend on

Keep the two versions identical. `npm run verify` fails if they differ or if the installed copies do not match `package.json`. Do not copy or patch Hagilight source in this repository. Upgrade both packages together in a separate change.

`astro.config.mjs` registers `hagilight()` and `hagilightFavicon()`. The build generates these files, and the repository keeps no hand-written copy of any of them:

- `sitemap-index.xml`
- `robots.txt`
- `rss.xml`
- `llms.txt`
- `.well-known/hagilight.metadata.json`

The shared favicon is linked from `src/layouts/BaseLayout.astro`. Do not add `robots.txt`, `sitemap.xml`, `llms.txt`, or an icon file to `public/`, because Hagilight skips generation or overrides the shared behavior when one exists.

### Build information in the footer

The footer shows `Branch:` and `Commit:` read from Git at build time, and `Built:` with the build timestamp. On a detached HEAD, such as some CI checkouts, the branch can read `unknown`. Set `HAGILIGHT_BUILD_BRANCH` to name the branch:

```sh
HAGILIGHT_BUILD_BRANCH=main npm run build
```

Outside a Git checkout the build still succeeds, and branch and commit read `unknown`.

## shadcn/ui components

The site uses shadcn/ui components. `components.json` mirrors the configuration of `repos/web`: style `radix-nova`, `neutral` base colour, CSS variables, and `lucide` icons. The only difference is the CSS entry, `src/styles/global.css`, because the two sites are separate repositories.

- Add a component from this directory with `npx shadcn add <name>`, for example `npx shadcn add badge`.
- Generated components land in `src/components/ui/`. Import them through the `@/` alias, for example `import { Button } from '@/components/ui/button'`.
- The `cn()` class-merge helper lives in `src/lib/utils.ts`.
- Design tokens and the dark variant live in `src/styles/global.css`. Dark values follow `prefers-color-scheme`, because the site has no theme switch.
- Components render to static HTML at build time through `@astrojs/react`. Do not add a `client:*` directive unless a change deliberately adds client-side behaviour. `npm run verify` fails if the build ships an island or hydration script for the seed components.
- `repos/web` is the reference for the configuration and the component style. Do not edit `repos/web` from this repository.

The seed components are `button` and `card`. `npm test` checks the configuration, the helper, the seed components, their declared dependencies, the tokens and the base-layer rules. `npm run verify` checks the card marker, the token definitions and the `bg-card` utility in the built stylesheet.

## Site configuration

- `src/config/site.ts` holds the site name, the description, and the default locale `en-US`. The page title, description metadata, and page heading read from this file.
- `astro.config.mjs` holds the production origin `https://fullstack.hagicode.com`, the base path `/`, and the `en-US` i18n setup with `prefixDefaultLocale: false`.

## Deployment

`.github/workflows/fullstack-deploy-gh-pages.yml` publishes the site. Cloudflare serves the result, not GitHub Pages.

- **Trigger:** a push to `main`, or a manual `workflow_dispatch` for any ref. Pull requests do not publish. Runs are serialized by the `fullstack-deploy-gh-pages` concurrency group, and a run in progress is never cancelled.
- **Build job:** installs from `package-lock.json`, runs `npm run verify`, stages the payload with `npm run deploy:payload`, and uploads it as the `site-gh-pages-payload` artifact. It has read-only permissions. If the build, verification, or staging fails, the workflow stops before `gh-pages` is touched.
- **Deploy job:** downloads the staged payload and publishes it with `peaceiris/actions-gh-pages@v4`. It does not rebuild the site. It runs in the GitHub environment `fullstack-production`, whose URL is `https://fullstack.hagicode.com`.
- **Warmup:** after publication, `npm run deploy:warmup` requests the worker domain and `fullstack.hagicode.com` with 4 attempts, a 3-second delay, and a 10-second timeout. A `2xx` or `3xx` response counts as success. The domains are the `domains` list in `FULLSTACK_WARMUP_CONFIG` in `scripts/warm-deployment-domains.mjs`.

### Payload layout

The root of the `gh-pages` branch holds exactly these items:

```text
esa.jsonc        # from .github/gh-pages/esa.jsonc
wrangler.jsonc   # from .github/gh-pages/wrangler.jsonc
dist/            # the validated build output, including dist/index.html
```

`esa.jsonc` names the site `hagicode fullstack` and serves `./dist`. Its install and build commands are no-ops, because the payload is already built. `wrangler.jsonc` names the worker `fullstack` and serves `./dist` as static assets.

### Permissions

- The workflow declares `contents: read` at the top level. Only the deploy job raises this to `contents: write`, for the `GITHUB_TOKEN` push to `gh-pages`.
- No repository secret is needed beyond the default `GITHUB_TOKEN`.
- The `fullstack-production` environment must exist in the repository settings. Add protection rules there if publication needs approval.

### Hosting setting

The Cloudflare project that serves `fullstack.hagicode.com` must read the `gh-pages` branch of `HagiCode-org/fullstack`. Until it does, publication succeeds but nothing is served, and warmup fails.

### Single-commit branch

Each publication replaces `gh-pages` with one orphan commit that contains only the newest payload (`force_orphan: true`). Jekyll processing is disabled (`enable_jekyll: false`). The branch keeps no history, so it cannot be rolled back by resetting it.

### First deploy checks

1. Confirm the `fullstack-production` environment exists in the repository settings.
2. Confirm that the Cloudflare project reads `gh-pages` from `HagiCode-org/fullstack`, and that its worker name is `fullstack`. The warmup domain `fullstack.472158246.workers.dev` assumes that name under the same account subdomain as the site. If the name differs, change the constant in `scripts/warm-deployment-domains.mjs` before the first production run.
3. Dispatch the workflow manually from `main`, and read the run summary: publication outcome, payload contents, and per-domain warmup.
4. Open `https://fullstack.hagicode.com/` and confirm the home page loads.

If warmup fails after a successful publication, the summary states that the `gh-pages` snapshot was already published before warmup verification failed. The published snapshot stays in place. Fix the hosting or domain issue, then rerun the workflow. Republishing is enough.

### Rollback

Publish a known-good state again. Either revert the offending commit on `main`, or dispatch the workflow for an older ref. CI then rebuilds, verifies, and replaces `gh-pages` with that state. Do not reset or force-push the `gh-pages` branch by hand. Its single-commit history is not kept, and the workflow is the only supported publisher.

## Follow-up work

Not part of this foundation:

- Tutorial content and its structure
- Site navigation
- Additional locales
- Analytics for `fullstack.hagicode.com`
