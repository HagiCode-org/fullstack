# HagiCode Fullstack

A step-by-step tutorial for people who want to become fullstack engineers in the AI era. Read it at **[fullstack.hagicode.com](https://fullstack.hagicode.com)**.

Start from zero, follow one short lesson at a time, and keep your place as you go. The tutorial is written for learners and beginners, so each course builds on the one before it.

## What you get

- **A course catalog with a course switcher.** Pick a course from the list and jump between courses without losing your way.
- **Lesson pages with outlines.** Each course has an outline of its groups and lessons, previous and next navigation, and a table of contents for the page you are reading.
- **A glossary and reading times.** New terms link to a per-course glossary page, and every lesson and course shows how long it takes and what you will get from it.
- **Reading progress that stays in your browser.** A lesson counts as read when you reach its end or when you mark it yourself, and you can mark it unread again. Progress is stored only in your browser; nothing is sent to a server. Clearing the site data clears your progress. The home page's "Zero to Hero" headline fills in as you read, and is complete when every lesson is read.
- **Ten interface languages.** English, Simplified Chinese, Traditional Chinese, Japanese, Korean, German, French, Spanish, Brazilian Portuguese and Russian. A lesson that has no translation yet is shown in English with a notice saying so.
- **A light and dark theme toggle.** Without a saved choice, the theme follows your system setting.

## PostHog events

When PostHog is loaded and the visitor has not opted out, the progress writer sends two events. Both are sent from the progress store in `src/lib/progress.ts`, through the site's capture wrapper in `src/lib/posthog-events.ts`.

| Event | Properties | Sent when |
|-------|------------|-----------|
| `lesson_marked_read` | `course`, `lesson` (public course and lesson ids) | A lesson is stored as read for the first time, whether the reader marks it or reaches its end. |
| `course_completed` | `course` | A stored mark makes every lesson of the course read, moving the course from incomplete to complete. |

Deduplication rules:

- A lesson that is already stored as read sends nothing when it is marked again.
- Restoring progress on page load, a reload of a complete course and a change from another tab send nothing.
- `course_completed` is sent once per transition. It is sent again only after the course became incomplete (a lesson was marked unread) and then complete again.
- Nothing is sent when storage is blocked or a write fails. Progress still works in memory for that page.
- Events carry only the two ids above, never lesson text, notes, URLs or raw storage contents.
- A click on a link with `data-ga-*` attributes may also produce a `cta_click` event. The business event above is the canonical record of the action; dashboards must not add these events to `cta_click` counts.

## Courses, lessons and learning paths

The tutorial has **12 courses and 97 lessons**: 10 main courses and 2 electives. The main courses are learned in the order below; the electives can be taken after the main course they relate to.

| # | Course | Id | Lessons |
|---|--------|----|---------|
| 1 | Docker for Beginners | `docker-for-beginners` | 15 |
| 2 | GitHub Desktop and GitHub | `github-desktop-and-github` | 5 |
| 3 | Build with an AI Partner | `build-with-ai` | 7 |
| 4 | Your First Website | `first-website` | 9 |
| 5 | Publish Your Website | `publish-your-website` | 10 (5 of them elective) |
| 6 | Your First Web App | `first-web-app` | 8 |
| 7 | An App with a Database | `app-with-data` | 9 |
| 8 | Add AI Features to Your App | `add-ai-features` | 8 |
| 9 | GitHub: Branches and Pull Requests | `github-collaboration` | 3 (1 elective) |
| 10 | Capstone: Build and Launch Your Own App | `capstone-project` | 8 (1 elective) |
| 11 | Run Ready-Made Apps with Docker (elective) | `docker-self-hosted-apps` | 7 |
| 12 | The Same App in Another Language (elective) | `another-language` | 8 |

Each course page shows its estimated total time and what you will get from the course. Each lesson shows its reading time (10 to 45 minutes) and "what you will get" from it. Lessons introduce at most three new terms; each term links to the course's entry on the **glossary page** (`/glossary/`), which lists every course's terms with a one-sentence explanation and an analogy.

Lesson bodies are written in English (en-US) only. Other interface languages show the English lesson with a notice, as described above.

### Learning paths

Three learning paths group the courses into a route (`src/learning-paths/`):

- **Quick start** (`quick-start`): Docker for Beginners, GitHub Desktop and GitHub, Build with an AI Partner, Your First Website and Publish Your Website. Stopping here leaves you with a public website.
- **Build apps** (`build-apps`): everything in Quick start, then Your First Web App, An App with a Database, Add AI Features to Your App, GitHub: Branches and Pull Requests, and the Capstone project.
- **Electives** (`electives`): Run Ready-Made Apps with Docker, The Same App in Another Language, the advanced publishing group (gh-pages, Cloudflare, Alibaba Cloud ESA, custom domain and HTTPS), Issues, Forks and Open Source, and team collaboration. These are taken as needed, in no particular order.

### Sources and checks

Every fact a lesson states is recorded in a source ledger, `sources/<course-id>.json`, with the official page it came from and the date it was checked. `sources/official-hosts.json` lists the official hosts that may be used; each entry names the tool whose site it is. External links in a lesson must use https on a listed host and appear in that lesson's ledger entry.

Run these from the repository root after `pnpm install`:

- `pnpm run check:content` checks every en-US lesson body: the `minutes`, `outcome` and `terms` frontmatter, the minimum length, the self-check or "what you learned" section, the "what comes next" link to the correct lesson, that external links are on the official-host list and in the ledger, and that each course's glossary and ledger files exist and are well formed.
- `pnpm run check:quizzes` checks the review quizzes in `quizzes/<course-id>/<lesson-id>.md`: one quiz per lesson and no orphans, a matching header, at least three questions with four options, one answer each, an explanation, and a "依据" line that names a real heading of the lesson it tests.
- `pnpm run check:sources` fetches every URL in the ledgers live. It needs network access: 404, 410 and hostnames that do not resolve fail, other errors are warnings, and when the network is unavailable it exits with code 3 so the run can be repeated later.
- `node scripts/check-outline-sync.mjs --courses --paths` compares `OUTLINE.md` with the course and learning-path data (counts, lesson ids and order, titles, the elective marks and the path steps).
- `pnpm test` runs the unit tests for the scripts, and `pnpm run verify` builds the site and checks its foundation.

## Package management

- The repository uses pnpm, pinned in `package.json` `packageManager`. Run `corepack enable` once, then `pnpm install`. `pnpm-lock.yaml` is the only lockfile; do not commit `package-lock.json`.
- Settings live in `pnpm-workspace.yaml`. `allowBuilds` lists the dependencies whose install scripts may run (reviewed individually, `false` means reviewed and denied); review any new dependency that has an install script and add it there.
- A local registry mirror belongs in `~/.npmrc` only. Never commit a `registry=` line or a mirror URL; `pnpm run check:registry` (also run in CI) fails on any non-`registry.npmjs.org` `tarball` in the lockfile and on mirror hosts in tracked files.
- Undeclared imports fail under pnpm's strict layout: declare the package instead of hoisting it.
