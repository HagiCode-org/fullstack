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
| `npm test` | Run the `node:test` suites for payload staging, domain warmup, the deploy workflow contract, the shadcn foundation, the course data and routes, interface strings, reading progress, and the component tier guard. No dependencies are needed |

`verify` fails and names the missing item when the build output does not match the foundation: the exact Hagilight pins, the home page head and footer, the discovery files, the favicon, internal link targets, and the absence of forbidden files in `public/`. It also checks every page of every locale: the page exists, declares its own `lang`, has one canonical, lists the ten `hreflang` alternates and `x-default` pointing at the matching pages, ships no island or hydration script, and links only to pages that exist.

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
- The `cn()` class-merge helper lives in `src/lib/utils.ts`. The `npx shadcn add` output for the primitives added in the course change imports `cn` from the `cn` package and not from `@/lib/utils`; see the note under [Components and reuse](#components-and-reuse) before changing that.
- Design tokens and the dark variant live in `src/styles/global.css`. The active theme is `data-theme` on `<html>`: dark values sit under `:root[data-theme="dark"]` and again under a `prefers-color-scheme` block for a visitor with no stored choice. The two copies must list the same tokens; `npm test` checks that.
- Components render to static HTML at build time through `@astrojs/react`. Do not add a `client:*` directive unless a change deliberately adds client-side behaviour. `npm run verify` fails if the build ships an island or hydration script for the seed components.
- `repos/web` is the reference for the configuration and the component style. Do not edit `repos/web` from this repository.

The seed components are `button` and `card`. `npm test` checks the configuration, the helper, the seed components, their declared dependencies, the tokens and the base-layer rules. `npm run verify` checks the card marker, the token definitions and the `bg-card` utility in the built stylesheet.

## Site configuration

- `src/config/site.ts` holds the site name, the description, the default locale `en-US`, and the ten supported locales (`SUPPORTED_LOCALES`) with their native names. The page title, description metadata, and page heading read from this file.
- `astro.config.mjs` holds the production origin `https://fullstack.hagicode.com`, the base path `/`, and the i18n setup with the same ten locales and `prefixDefaultLocale: false`. `npm test` fails if the two lists differ.

## Courses

The site lists courses from one registry. A course is data: its outline and titles are TypeScript, and its lesson bodies are Markdown.

### Course data layout

```text
src/courses/
  types.ts                 # Course, OutlineNode, LessonNode, GroupNode
  registry.ts              # the only list of courses, plus the outline helpers
  integrity.ts             # data rules that npm test and npm run verify both run
  demo-foundations/
    outline.ts             # one Course: id, demo flag, ten-locale titles, nested outline
    content/<locale>/<lessonId>.md
  demo-sampler/
    outline.ts
    content/<locale>/<lessonId>.md
```

`demo-foundations` has a nested group and seven lessons; `demo-sampler` is flat with two lessons. Both are demo content and say so in every locale title.

### Adding a course

1. Create `src/courses/<course-id>/outline.ts` and export a `Course`. The id must match `[a-z0-9-]+` and stay the same in every locale.
2. Give every course and every group and lesson a title for all ten locales. The type enforces this; the integrity rules name any gap.
3. Give every lesson an `en-US` body, at `src/courses/<course-id>/content/en-US/<lessonId>.md`.
4. Add the course to the `courses` array in `src/courses/registry.ts`.

The course list, the course switcher, the course routes, and the progress data all come from the registry, so no page or layout needs an edit. `npm test` checks the data, and `npm run verify` checks the built pages.

### Adding a translated lesson body

Add `src/courses/<course-id>/content/<locale>/<lessonId>.md` with the locale code as the folder name, for example `content/de-DE/what-is-fullstack.md`. Write it in the same Markdown as the `en-US` body and use `##` for headings, because the page already has one `h1`.

A lesson with no body in the page's locale shows the `en-US` body and a notice, written in that locale, that it is shown in English. A missing `en-US` body fails the integrity check and the build. A body whose locale or lesson does not exist fails the integrity check too.

### Routes

Every page is generated from `allRoutes()` in `src/lib/routes.ts`. `en-US` is unprefixed; each other locale is served under its code:

| Page | `en-US` | `zh-CN` |
| --- | --- | --- |
| Home | `/` | `/zh-CN/` |
| Course overview | `/courses/<course>/` | `/zh-CN/courses/<course>/` |
| Lesson | `/courses/<course>/<lesson>/` | `/zh-CN/courses/<course>/<lesson>/` |

Groups have no page. A lesson id is unique within its course, so the lesson route is unambiguous.

### Interface strings

The text of the interface lives in `src/i18n/ui.ts`, one complete table per locale. `UiStrings` makes a missing key a type error, and `npm test` rejects an empty value. Placeholders such as `{read}` and `{total}` are filled with `formatText()` from `src/lib/format.ts`.

### Components and reuse

Course UI is built in three tiers, and the boundaries are checked by `scripts/__tests__/course-components.test.mjs`:

- **Tier 1, `src/components/ui/`:** shadcn primitives. Add one only with `npx shadcn add <name>`, for example `npx shadcn add badge`. Never edit a generated file by hand.
- **Tier 2, `src/components/course/`:** one component per pattern, composed from tier 1, `cn()`, and `lucide-react`. A tier 2 file imports only tier 1, `@/lib`, `react`, `lucide-react`, and sibling tier 2 files. Put a variant in a prop, not in a copy.
- **Tier 3, pages and layout:** `src/pages/[...route].astro`, `src/layouts/BaseLayout.astro`, and `src/components/ProgressRuntime.astro`. They arrange tier 2 components and pass them data. They contain no hand-built card, button, disclosure, notice, or progress markup.

The five primitives added by the course change (`badge`, `progress`, `separator`, `alert`, `breadcrumb`) came from the current shadcn registry, which imports `cn` from the `cn` npm package and adds that package to `package.json`. The helper in `src/lib/utils.ts` is the one the seed components use, and both behave the same. Pointing the new primitives at `@/lib/utils` and dropping the `cn` dependency is a separate decision, and it should be made in one change that also touches `repos/web` if the two sites are to stay aligned.

No component uses a `client:*` directive. The course UI is static HTML, and the only client code is the script in `ProgressRuntime.astro`. Interactive Radix components such as `DropdownMenu`, `Collapsible`, or `Accordion` are not used, because they need hydration. Use `<details>` through `Disclosure`.

### Reading progress

Progress is stored in the reader's browser only, under the key `hagicode-fullstack:progress`. The record holds course ids, lesson ids, and the time a lesson was read. It never holds a locale, so every language on the origin shares it. Nothing is sent to a server, a cookie, or a third-party service.

A lesson is read when its end scrolls into view, or when the reader activates the mark control, which can also mark it unread. A stored record with an unknown version or unreadable JSON counts as empty and is replaced by the next change. If the browser blocks storage or a write fails, every page still works, and the reader sees a notice that progress cannot be saved.

Clearing the site data in the browser clears the progress.

### Theme

The header's toggle switches the page between a light and a dark theme. The choice is stored in the reader's browser under `hagicode-fullstack:theme`, as `light` or `dark`, and it applies to every course and locale on the origin. Any other stored value is ignored.

Without a valid stored choice the theme follows `prefers-color-scheme`, so a first visit looks the same as it did before the toggle existed. A small inline script in `<head>` sets `data-theme` before the stylesheet paints, so a stored dark choice never flashes a light page. A press flips the theme on the current page at once, and other open tabs of the site follow through the `storage` event. While nothing is stored, the page also follows changes to the system setting.

The toggle starts hidden and `ThemeRuntime.astro` shows it, so a page without scripting has no dead control. With scripting off, the theme follows the system and the icon that matches it is shown. If the browser blocks storage, a press still switches the current page and no notice is shown.

The `dark:` variant follows the same state, so shadcn components switch with the page. It is written as an attribute selector plus a `prefers-color-scheme` branch for the no-attribute case, and the build emits both.

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
