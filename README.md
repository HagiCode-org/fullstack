# HagiCode Fullstack

A step-by-step tutorial for people who want to become fullstack engineers in the AI era. Read it at **[fullstack.hagicode.com](https://fullstack.hagicode.com)**.

Start from zero, follow one short lesson at a time, and keep your place as you go. The tutorial is written for learners and beginners, so each course builds on the one before it.

## What you get

- **A course catalog with a course switcher.** Pick a course from the list and jump between courses without losing your way.
- **Lesson pages with outlines.** Each course has an outline of its groups and lessons, previous and next navigation, and a table of contents for the page you are reading.
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

## Courses and their status

Only the first course has finished lessons. The rest are drafts, and learning paths are not published yet.

### Ready to read

- **Docker for Beginners** (`docker-for-beginners`): twelve lessons in five groups, from what Docker is and installing it to running Nginx, PostgreSQL and Node.js as containers, connecting services with networks and Docker Compose, community tools, troubleshooting, and cleaning up.

### Drafts

These courses follow Docker for Beginners in reading order. Each has an outline and a draft page per lesson, marked with a draft notice. The pages are outlines still to be expanded and fact-checked, not finished lessons.

1. Run Ready-Made Apps with Docker
2. GitHub Desktop and GitHub
3. Build with an AI Partner
4. Your First Website
5. Publish Your Website
6. Your First Web App
7. An App with a Database
8. The Same App in Another Language
9. Add AI Features to Your App
10. Capstone: Build and Launch Your Own App

### Still to come

- Finished lessons for the draft courses
- Learning paths that group courses into an ordered route
