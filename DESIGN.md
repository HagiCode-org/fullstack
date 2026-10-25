---
name: HagiCode Fullstack
description: A step-by-step tutorial site for becoming a fullstack engineer in the AI era, built as a quiet, text-first workbook that reads without scripting.
colors:
  background: "#f7f9fc"
  foreground: "#202938"
  muted-foreground: "#526174"
  link-blue: "#1d4ed8"
  card: "oklch(1 0 0)"
  primary: "#1d4ed8"
  primary-foreground: "#ffffff"
  surface-quiet: "#edf2fb"
  border: "#dce4f1"
  code-surface: "#eef3fc"
  code-foreground: "#17243a"
  code-border: "#d7e1f1"
  code-inline-surface: "#e7eefb"
  code-inline-foreground: "#1d3f8a"
  ring: "#3164d3"
  destructive: "oklch(0.577 0.245 27.325)"
  background-dark: "#0d1422"
  foreground-dark: "#e5ebf5"
  muted-foreground-dark: "#aab8ce"
  link-blue-dark: "#8fb0ff"
  card-dark: "#141e30"
  primary-dark: "#8fb0ff"
  primary-foreground-dark: "#101a2a"
  surface-quiet-dark: "#1b283d"
  border-dark: "#293851"
  input-dark: "#33445f"
  ring-dark: "#8fb0ff"
  code-surface-dark: "#142239"
  code-foreground-dark: "#e5edf9"
  code-border-dark: "#30435f"
  code-inline-surface-dark: "#22314a"
  code-inline-foreground-dark: "#bfd0ff"
  destructive-dark: "oklch(0.704 0.191 22.216)"
typography:
  display:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "clamp(2rem, 7vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.375
  body:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
  caption:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  gutter: "16px"
  reading-column: "42rem"
  wide-column: "64rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    height: "32px"
    padding: "0 10px"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    height: "32px"
    padding: "0 10px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "16px"
  badge-secondary:
    backgroundColor: "{colors.surface-quiet}"
    textColor: "{colors.primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    height: "20px"
    padding: "2px 8px"
  alert:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "8px 10px"
  outline-link-current:
    backgroundColor: "{colors.surface-quiet}"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "6px 8px"
---

# Design System: HagiCode Fullstack

## Overview

**Creative North Star: "The Plain Workbook"**

HagiCode Fullstack is a tutorial, so the lesson text is the product and everything else is margin. The system looks like a well-set workbook: white page, near-black ink, a single blue reserved for links, and thin grey rules that organise the page without decorating it. Nothing glows, nothing floats. A reader arrives to read a lesson, tick it off, and move to the next one.

The interface earns trust by working before anything else loads. Every page is static HTML; the course switcher, language switcher and outline are native `details` elements and real links, and the only client script restores read marks and the continue target from this browser. Components are built so that the page reads in full without that script, and so that its absence is invisible rather than broken. Dark mode follows the visitor's `prefers-color-scheme` until they press the header's theme toggle, and the choice is remembered in this browser.

The system is built on shadcn/ui (`radix-nova` style, `neutral` base colour, CSS variables) rendered to static HTML. It inherits the shadcn vocabulary of tokens, radii and `data-slot` hooks, and keeps the site-specific pieces small: a reading column, a lesson layout with a sticky outline, and a progress vocabulary of count, bar and read marker.

**Key Characteristics:**
- Text first: a 42rem reading column, body line-height 1.7, one `h1` per page.
- Achromatic surfaces with one blue (link-blue) for links and focus; the neutral ramp carries all hierarchy.
- Flat depth: surfaces are separated by a hairline ring or border, never by shadow.
- State is never colour alone: read state is an icon swap plus screen-reader text; the current lesson is bold plus a surface plus `aria-current`.
- Works without scripting; progress UI is hidden or neutral until `ProgressRuntime` fills it in.
- Ten locales: every label must tolerate long German, French or Russian strings and CJK without breaking the layout.

## Colors

A cool-tinted workbook: an ink-blue action colour and pale blue-gray surfaces make links, progress, selection and code easier to find without turning the lesson into a dashboard. Light values are the normative tokens; the `-dark` entries are composed separately for the blue-black page.

### Primary
- **Action Blue** (`primary`, #1d4ed8; #8fb0ff in dark): the filled button background and read-marker check. It identifies the next step and the completed state.

### Secondary
- **Link Blue** (`link-blue`, #1d4ed8; #8fb0ff in dark): inline links and the global focus outline. Legacy name `--color-accent`. The same hue is used for primary actions and progress; it is never decorative.

### Neutral
- **Paper** (`background`, #f7f9fc; #0d1422 in dark): the page canvas. White cards sit above the cool light canvas; dark surfaces step up in blue rather than in neutral gray.
- **Ink** (`foreground`, #202938; #e5ebf5 in dark): headings, navigation and lesson text emphasis.
- **Soft Ink** (`muted-foreground`, #526174; #aab8ce in dark): paragraph text, captions, counts and breadcrumbs. It remains above AA contrast on the page. Legacy name `--color-muted`.
- **Card White** (`card`, oklch(1 0 0); #141e30 in dark): card and alert surfaces, one tonal step above the page.
- **Quiet Surface** (`surface-quiet`, #edf2fb; #1b283d in dark): hover and current-item backgrounds and secondary badge. The `bg-accent`, `bg-muted` and `bg-secondary` utilities resolve to coordinated blue-gray surfaces.
- **Code Surface** (`code-surface`, #eef3fc; #142239 in dark): fenced blocks. A separate code foreground and hairline keep dense examples legible; inline code uses its own quieter surface. Shiki syntax colors follow the active theme.
- **Hairline** (`border`, #dce4f1; #293851 in dark): the outline button edge and separators. The base layer sets it as the default border colour, so a bare `border` or `border-t` utility already renders in Hairline.
- **Focus Blue** (`ring`, #3164d3; #8fb0ff in dark): the component focus ring. Links use the full Link Blue outline.

### Semantic
- **Alarm Red** (`destructive`, oklch(0.577 0.245 27.325); oklch(0.704 0.191 22.216) in dark): the destructive button and invalid states. The course UI does not use it yet.

### Theme state

The active theme is `data-theme="light"` or `data-theme="dark"` on `<html>`. Tokens, the `dark:` variant and `color-scheme` all read that one attribute. Light values sit on `:root`. Dark values sit under `:root[data-theme="dark"]` and again under `@media (prefers-color-scheme: dark)` for `:root:not([data-theme])`, which covers a visitor with no stored choice and no script. The two dark lists name the same tokens, and `npm test` checks that. The reader's choice is stored as `hagicode-fullstack:theme`. Without a choice the page follows the system.

### Named Rules
**The Blue Role Rule.** Blue carries links, primary actions, focus and progress because each helps the reader move or see state. Pale blue-gray is reserved for surfaces; no extra accent hue is added for decoration.

**The Two Meanings Rule.** In `global.css`, `--color-accent` and `--color-muted` as CSS variables keep their legacy text-colour meaning (link blue and soft ink), while the `accent` and `muted` utilities and shadcn components mean surfaces (Quiet Surface). Read the token's role before reaching for the variable.

**The Token Only Rule.** Components take colour from tokens through utilities (`bg-card`, `text-muted-foreground`, `border`). Raw hex or oklch values do not appear in components.

## Typography

**Display Font:** the system UI stack (`system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif`)
**Body Font:** the same stack
**Label Font:** the system UI stack. **Code Font:** `ui-monospace, monospace`; inline code and fenced examples use the platform's code face so commands and indentation are easy to scan.

**Character:** One native sans stack and no web fonts, so type renders instantly in all ten locales and CJK falls back to PingFang SC or Microsoft YaHei. Headings and body stay in that stack; code uses the platform mono face to make commands and indentation distinct.

### Hierarchy
- **Display** (700 by UA default, clamp(2rem, 7vw, 2.75rem), 1.2): the single page `h1`, with a 1rem bottom margin. A course title, a lesson title, or the slogan on the home page (up to 5rem, tracking -0.03em, the only place the Display step goes above 2.75rem).
- **Title** (600, 1.125rem, 1.375): the course card heading (`h2`). Card titles in `CardTitle` use 1rem at weight 500.
- **Body** (400, 1rem, 1.7): lesson text and base paragraphs, in Soft Ink. Prose lines stay inside the 42rem column, about 65 to 75 characters in Latin text.
- **Label** (500, 0.875rem): buttons, outline links, switcher values, breadcrumb text, alert text.
- **Caption** (400, 0.75rem): the small label above a switcher value, previous/next captions, compact progress counts. Always Soft Ink.

### Named Rules
**The One H1 Rule.** Each page has exactly one `h1`. The site header is a link, not a heading, so it does not compete. On the home page the `h1` is the slogan; the site name lives in the top bar and the document title.

**The Native Stack Rule.** No web font is loaded. Weight and colour carry hierarchy; a decorative display face is not introduced.

## Layout

A workbench: a top bar, an optional sidebar pane, and a main pane that holds one centred content column. The shell is the same on every page; only the sidebar and the column width change.

- **Top bar:** 48px (`h-12`) from `lg`, full width, bottom Hairline, Paper background, sticky at the top while the panes scroll. Site link on the left, the course and language switchers on the right, each with a 16px side gutter. Below `lg` it is not sticky, and below `sm` the switchers drop to a second row that spans the bar.
- **Sidebar pane:** lesson pages only. 18rem wide from `lg`, sticky under the top bar (`top-12`), as tall as the viewport minus the bar, scrolling on its own, with a Hairline right edge and 20px top padding. It holds the course outline. Below `lg` it stacks above the main pane as a collapsed "Outline" disclosure with a Hairline bottom edge; the runtime opens it from `lg`.
- **Main pane:** takes the remaining width (`minmax(0, 1fr)`), with 16px side padding and 32px top and bottom padding, growing to 40px at `lg`. It holds one column centred with `mx-auto`: 42rem (`max-w-2xl`) for a lesson, 48rem (`max-w-3xl`) for a course overview, 64rem (`max-w-5xl`) for the home page. The column is the only place text is measured.
- **Home:** a 64rem column on one 5fr / 7fr split that every section shares. The hero puts the slogan ("Zero to Hero with AI, for everyone"; display up to 5rem, home only), the purpose line and the reader's overall count on the left and a four-step "how it works" track on the right; below it a Courses section stacks one wide card per course, split on the same axis (course, progress and action | a preview of its lessons with read markers, on a muted strip), and a language band closes the page. No sidebar.
- **Course overview:** breadcrumb, title, a progress block capped at `max-w-md` with the continue button, then the outline tree in the main pane. No sidebar, because the outline is the page.
- **Lesson:** sidebar with the outline, main pane with breadcrumb, title, body, mark-as-read and previous/next. `min-w-0` on the article stops wide code from forcing horizontal scroll.
- **Footer:** the shared Hagilight footer sits full width after the panes, as the page's last element. It is not restyled here.
- **Rhythm:** a 4px base from Tailwind's scale. The common steps are 4, 8, 12 and 16px inside components and 24 to 40px between page regions. Primary actions are full width on narrow screens and auto width from `sm`.

### Named Rules
**The One Axis Rule.** Home sections share one 5fr / 7fr split, so the hero, the course cards and the language band line up on a single vertical edge.

**The Rails Stay Put Rule.** The top bar and the sidebar are the fixed frame; the page itself scrolls under them with the browser's own scrolling. Do not turn the main pane into a nested scroll container, because find-in-page, scroll position and the end-of-lesson read mark all depend on the window scrolling.

**The Column Before The Grid Rule.** Content starts from a single measured column. Add the sidebar pane only where the page has a tree to navigate; home and overview content does not become a dashboard.

## Elevation & Depth

Flat by default, with no box shadows anywhere in the system. Depth is carried by tone and edge: cards use a 1px ring of the foreground at 10% opacity (`ring-1 ring-foreground/10`), outline buttons use the Hairline border, alerts use a Hairline border, and in dark mode the card is one tonal step lighter than the page. A card footer sits on a `bg-muted/50` strip separated by a top border.

Interaction is shown by fill and position, not elevation: link and outline rows take the Quiet Surface on hover, the primary button drops to 80% opacity on hover and moves down 1px while pressed, and the disclosure chevron rotates 180° when open.

### Motion
Three moments, all in `global.css`, both off under `prefers-reduced-motion`. The home "how it works" track plays in once on load: each read marker ticks in with a spring, the line to the next one draws on an exponential ease-out, and the step text darkens from Soft Ink to Ink; at rest the track is complete. Cross-document view transitions (`@view-transition`) carry a course title from the home card to the course page's heading through a shared `view-transition-name`, and keep the top bar in place. The home slogan's hero word is a meter: an outline with a Link Blue copy on top, clipped by a hard edge from the left. `--hero-fill` (registered `@property`, 0 to 1) is set by `ProgressRuntime` from the lessons read across every course, through a concave curve (`heroFill` in `progress.ts`) so the first lesson visibly moves it and the last one is what completes it. A returning reader sees it ease from empty to their level on load (1.5s, exponential ease-out); a first-time reader sees nothing move. "Zero to" steps back toward Soft Ink as the fill grows. At 100% the word is solid blue and the count line becomes a completion line. Everything else stays still.

### Named Rules
**The No Shadow Rule.** Do not add `box-shadow` to a component to make it feel raised. If a surface needs separation, give it the ring or the border.

**The Focus Is Visible Rule.** Plain links and unstyled interactive elements get the global 2px Link Blue outline with a 3px offset; shadcn controls get a border of Focus Blue plus a 3px ring at 50% opacity. Never remove an outline without replacing it.

## Shapes

Gently rounded and soft-edged, on one radius scale derived from `--radius` (0.625rem, 10px): 6px small, 8px medium, 10px large, 14px extra large. Controls and alerts use the large step, list rows and switcher links the medium step, cards the extra-large step, and badges are full pills. Progress bars are fully rounded. Borders are always 1px; there are no heavy rules, no clipped corners and no decorative shapes. Icons are Lucide, 16px (`size-4`), decorative and `aria-hidden` unless they carry meaning.


## Components

Components are shadcn/ui primitives in `src/components/ui/` and course components in `src/components/course/`. All render to static HTML; none uses a `client:*` directive. Behaviour hooks for `ProgressRuntime` are data attributes (`hookProps`), so styling never depends on them.

### Buttons
- **Shape:** large radius (10px), 32px high by default (`h-8`), 10px side padding, 14px medium-weight label.
- **Primary** (`default`): Action Blue with white foreground in light mode and dark ink in dark mode, the continue action of a course, full width below `sm`. Hover drops to 80% opacity; pressed moves down 1px.
- **Outline:** Paper background with a Hairline border, used for mark-as-read and previous/next lesson. Hover fills with Quiet Surface; in dark it uses a translucent input fill.
- **Secondary, ghost, destructive, link:** available from the shadcn variants; the course UI does not use them yet.
- **Focus:** border becomes Focus Blue with a 3px ring at 50%. Disabled is 50% opacity with no pointer events.
- **Previous/next:** an outline button that wraps (`whitespace-normal`), left-aligned, with a small caption above the lesson title, so long titles wrap rather than truncate.

### Cards / Containers
- **Corner Style:** extra large (14px).
- **Background:** Card White, with a foreground-at-10% ring instead of a border.
- **Shadow Strategy:** none; see Elevation & Depth.
- **Internal Padding:** 16px (`--card-spacing`); 12px for the `sm` size. A footer drops the bottom padding and sits on a muted strip (`bg-muted/50`) with a Hairline top border.
- **Course card:** optional secondary badge, a title link that underlines on hover, the lesson count in Soft Ink, a progress summary, and the continue button in the footer.

### Chips and Badges
- **Style:** pill (full radius), 20px high, 12px medium label, 8px side padding. Secondary variant is Quiet Surface with its semantic foreground; the course UI uses it for the "demo" marker.

### Progress
- **Bar:** a fully rounded track in Quiet Surface with an Action Blue indicator; 6px high on cards and the overview, 4px in the compact outline. It always sits beneath its own text count, and the count is also the bar's `aria-label`.

### Notices
- **Style:** an alert on Card White with a Hairline border, a 16px circle-alert icon and Ink-coloured 14px text. Used for the fallback-language notice and the storage-unavailable notice; the latter starts `hidden`.

### Navigation
- **Theme toggle:** a ghost icon button, 36px square, in the header. On a phone it sits on the site-name row, and from sm it ends the switchers' row. It shows the moon under the light theme and the sun under the dark one, so the icon names the theme a press switches to. `aria-pressed` carries the state, and its accessible name is the localized `themeToggleLabel`. It starts hidden and `ThemeRuntime.astro` shows it, so a page without scripting has no dead control.
- **Breadcrumb:** Soft Ink 14px wrapping list with chevron separators; the last item is the current page, Ink-coloured and not a link. Links darken to Ink on hover.
- **Top bar:** see Layout. The site link is 16px semibold Ink without underline.
- **Switchers (course, language):** a native disclosure in the top bar. The summary shows a small Soft Ink label above the current value (label only, on one line, when nothing is current, as on the home page) with a chevron, and fills with Quiet Surface on hover. The list floats under the trigger as a popover (Card White, a foreground-at-10% ring, 4px padding, 14px rows, 256px wide, `z-30`); below `sm` it spans the bar. Items are real links; the current one is bold on Quiet Surface with `aria-current`. It closes on a click on the summary or a link, not on an outside click, because there is no script.
- **Outline tree (sidebar):** nested disclosures for groups, each with a compact progress summary; lessons are rows with a read marker and title. The current lesson is bold on Quiet Surface with `aria-current="page"` and screen-reader text. Groups containing the current lesson start open; on the overview every group starts open.

### Slogan meter
The home `h1` (`HomeSlogan`). The lead ("Zero to") and the hero word are separate spans, and the hero word is drawn twice: an outline, and an `aria-hidden` Link Blue copy whose `clip-path` follows `--hero-fill`. The count line under the purpose line carries the same state in words and is hidden at zero. Hard edge only, no gradient. Dense CJK glyphs take a thinner stroke, open tracking and a pale body (zh, ko). Forced-colors shows plain text; reduced motion applies the level without the sweep; without script the fill stays at zero.

### Read Marker (signature component)
An empty circle for unread and a filled check circle in Action Blue for read, swapped by `data-state`, each with its own screen-reader text. It exists so the reader's progress is legible without colour and without sight. Do not replace it with a colour-only dot.

### Lesson body
Rendered Markdown inside the article: unordered and ordered lists get a 1.5rem indent; inline code uses a compact blue-gray chip with a small 6px radius; fenced code sits in a 14px rounded, horizontally scrollable surface with dual-theme syntax colors. The first block sits 1.5rem below the title. Paragraphs inherit Soft Ink.

## Do's and Don'ts

### Do:
- **Do** keep the slogan's hero word the only thing `--hero-fill` drives; translate lead, hero word, sub-line and completion text together in every locale.
- **Do** use the token utilities (`bg-card`, `text-muted-foreground`, `border`, `ring-foreground/10`) and keep dark values in `global.css`, in the `data-theme="dark"` block and its `prefers-color-scheme` copy.
- **Do** keep one `h1` per page and use the Display step only for it.
- **Do** render new components as static HTML with native elements first (`details`, `a`, `button`); add script only through `ProgressRuntime` hooks.
- **Do** pair every state with a second cue besides colour: an icon, weight, text or an ARIA attribute.
- **Do** let labels wrap or truncate deliberately for ten locales; use `min-w-0` in flex and grid children and `whitespace-normal` on buttons that carry titles.
- **Do** keep primary actions full width below `sm` and auto width from `sm`.
- **Do** put a navigable tree in the sidebar pane and let everything else live in the one measured column.
- **Do** add new shadcn primitives with `npx shadcn add <name>` and keep the `radix-nova` style.

### Don't:
- **Don't** make the main pane scroll inside its own box; the window scrolls.
- **Don't** add a third "system" choice to the toggle, or a second toggle elsewhere. It switches light and dark only; until the reader presses it, the theme follows `prefers-color-scheme`.
- **Don't** add `box-shadow`, gradients, glass or decorative imagery to make a surface feel richer.
- **Don't** use Link Blue as a fill or introduce a second accent colour.
- **Don't** use hex, oklch or pixel literals in components when a token or a scale step exists.
- **Don't** rely on `--color-accent` or `--color-muted` as surface colours; they are text colours.
- **Don't** add a `client:*` directive or ship a hydration script for a presentational component.
- **Don't** load a web font or set body copy outside the 42rem reading column.
- **Don't** hand-write `robots.txt`, `sitemap.xml`, `llms.txt` or an icon into `public/`; Hagilight generates them.
