import { SwitcherMenu } from "./SwitcherMenu"
import type { SwitcherItem } from "./types"

interface SiteHeaderProps {
  siteName: string
  homeHref: string
  courseLabel: string
  courses: SwitcherItem[]
  languageLabel: string
  languages: SwitcherItem[]
}

// The workbench's top bar: the site link on the left, the two switchers on the right. On a phone the switchers drop to a second row. From lg it is a 48px bar that
// stays at the top while the panes below scroll. It is a header with a link, not a heading, so each page keeps one h1.
export function SiteHeader({ siteName, homeHref, courseLabel, courses, languageLabel, languages }: SiteHeaderProps) {
  return (
    <header className="relative z-20 border-b border-border bg-background lg:sticky lg:top-0">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 lg:h-12 lg:py-0">
        <a href={homeHref} className="text-base font-semibold text-foreground no-underline">
          {siteName}
        </a>
        <div className="flex shrink-0 items-center gap-1 max-sm:w-full max-sm:justify-between sm:gap-3">
          <SwitcherMenu label={courseLabel} items={courses} />
          <SwitcherMenu label={languageLabel} items={languages} />
        </div>
      </div>
    </header>
  )
}
