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

// The site link and the two switchers. It is a header with a link, not a heading, so each page keeps one h1.
export function SiteHeader({ siteName, homeHref, courseLabel, courses, languageLabel, languages }: SiteHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <a href={homeHref} className="text-base font-semibold text-foreground no-underline">
        {siteName}
      </a>
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
        <SwitcherMenu label={courseLabel} items={courses} className="sm:min-w-40" />
        <SwitcherMenu label={languageLabel} items={languages} className="sm:min-w-40" />
      </div>
    </header>
  )
}
