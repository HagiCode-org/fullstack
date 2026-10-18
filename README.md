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

## Site configuration

- `src/config/site.ts` holds the site name, the description, and the default locale `en-US`. The page title, description metadata, and page heading read from this file.
- `astro.config.mjs` holds the production origin `https://fullstack.hagicode.com`, the base path `/`, and the `en-US` i18n setup with `prefixDefaultLocale: false`.

## Follow-up work

Not part of this foundation:

- Tutorial content and its structure
- Site navigation
- Additional locales
- Analytics and deployment for `fullstack.hagicode.com`
