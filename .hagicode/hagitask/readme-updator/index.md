---
public: true
multilingual: false
style: product
---

# README requirements

## Product focus

- Introduce HagiCode Fullstack at https://fullstack.hagicode.com as a step-by-step tutorial site for people who want to become fullstack engineers in the AI era.
- Describe what learners get today: a course catalog with a course switcher, lesson pages with outlines, the first full course `docker-for-beginners` (twelve lessons in five groups) plus draft course skeletons that follow it, ten interface languages with an English fallback notice for untranslated lessons, reading progress that stays in the browser, and a light and dark theme toggle.
- Be honest about status: only `docker-for-beginners` has finished lesson content, the other courses are drafts, and learning paths are not published yet. Do not promise content that does not exist.
- Address learners and beginners first; do not center the README on maintainers.
- Lead with the learning value before any technical detail.

## Required content

- Open with a short product introduction and a prominent link to the public site.
- Describe the available courses with their real status, the reading experience (lesson pages, progress marks, language and theme choices), and what is still to come.
- Keep the course names, lesson counts and locale list consistent with `src/courses/` and `src/config/site.ts`.
- Mention a license only if the repository contains evidence of one.

## Exclusions

- Exclude tokens, secret values, internal hosts, machine-specific paths and private links.
- Do not list features or courses the site does not show.
- Keep repository maintenance instructions out of the README: repository layout, commands table, internal architecture, Hagilight and shadcn/ui setup, course and learning-path authoring, CI, build and deployment internals, and contribution workflow.
