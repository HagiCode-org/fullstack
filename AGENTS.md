# HagiCode Fullstack Agent Configuration

## Root Configuration

Inherits all behavior from `/AGENTS.md` at the monorepo root. Local rules extend or override the root file for this repository.

## Project Context

`fullstack` is the Astro static site at fullstack.hagicode.com: a step-by-step tutorial for becoming a fullstack engineer in the AI era. It has 12 courses and 97 lessons (10 main courses and 2 electives). Lesson bodies are written in en-US only; the site offers ten interface languages and shows the English lesson with a notice where a translation is missing. Reading progress is stored only in the browser.

## Working Directory

Run commands from `repos/fullstack/`.

## Key Commands

```bash
pnpm run dev                    # astro dev --host 0.0.0.0
pnpm run build                  # astro build (8 GB heap set in the script)
pnpm run check                  # astro check && tsc --noEmit
pnpm run verify                 # build, then scripts/verify-foundation.mjs
pnpm test                       # node --test scripts/__tests__/*.test.mjs
pnpm run check:content          # lesson bodies: frontmatter, length, links, glossary and ledger files
pnpm run check:quizzes          # quizzes/<course>/<lesson>.md: one per lesson, shape, "依据" line
pnpm run check:sources          # fetches every ledger URL live; needs network (exit 3 when offline)
node scripts/check-outline-sync.mjs --courses --paths   # OUTLINE.md against course and learning-path data
pnpm run check:registry         # registry neutrality (also run in CI)
```

Requires Node.js 24 or newer (`engines`).

## Key Paths

- `src/courses/<course-id>/`: `outline.ts` (groups and lessons) and `content/` (en-US lesson bodies).
- `src/glossary/`: per-course glossary terms; lessons introduce at most three new terms each.
- `src/learning-paths/`: the three learning paths (`quick-start`, `build-apps`, `electives`).
- `src/lib/progress.ts`, `src/lib/posthog-events.ts`: reading progress and the two analytics events.
- `src/i18n/`: interface strings for the ten languages.
- `quizzes/<course-id>/<lesson-id>.md`: one review quiz per lesson.
- `sources/<course-id>.json` and `sources/official-hosts.json`: the source ledger and the list of official hosts.
- `OUTLINE.md`: the course route and per-lesson outline. `DESIGN.md`: the visual design rules. `COURSE-REVIEW.md`: the review notes behind the course structure.
- `scripts/`: the checks above, plus `assemble-gh-pages-payload.mjs` and `warm-deployment-domains.mjs` for deployment.
- `.github/gh-pages/`: `esa.jsonc` and `wrangler.jsonc`, the deployment configs.

## Conventions and Hard Rules

- Every fact a lesson states is recorded in its course's ledger in `sources/`. External links must use https on a host listed in `sources/official-hosts.json` and appear in that lesson's ledger entry.
- The outline, the lesson bodies and the quizzes are cross-checked by `check-outline-sync`, `check:content` and `check:quizzes`.
- Analytics: the progress store sends only `lesson_marked_read` and `course_completed`, with public course and lesson ids. Never send lesson text, notes, URLs or raw storage contents. A `data-ga-*` click may also produce `cta_click`; dashboards must not add these events to `cta_click` counts (see `README.md`).
- Progress is kept in the browser only. Blocked storage or a failed write leaves progress working in memory and sends nothing.
- Do not commit `package-lock.json`, `.env` files or a registry mirror URL.

## CI and Deployment

- `.github/workflows/fullstack-deploy-gh-pages.yml`: on push to `main` and on manual dispatch. It runs `pnpm install --frozen-lockfile`, a lockfile stability check, `check:registry`, `verify`, then assembles and uploads the gh-pages payload and warms the deployment domains.

## Package Management

- The repository uses pnpm, pinned in `package.json` `packageManager`. Run `corepack enable` once, then `pnpm install`. `pnpm-lock.yaml` is the only lockfile.
- Settings live in `pnpm-workspace.yaml`. `allowBuilds` lists the dependencies whose install scripts may run (`fsevents: false`); review any new dependency with an install script and add it there.
- A local registry mirror belongs in `~/.npmrc` only. `pnpm run check:registry` fails on any non-`registry.npmjs.org` tarball in the lockfile and on mirror hosts in tracked files.
- Undeclared imports fail under pnpm's strict layout: declare the package instead of hoisting it.

## References

- `README.md`
- `OUTLINE.md`, `DESIGN.md`, `COURSE-REVIEW.md`
