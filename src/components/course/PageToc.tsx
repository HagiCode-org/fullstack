import { cn } from "@/lib/utils"

export interface TocHeading {
  depth: number
  slug: string
  text: string
}

interface PageTocProps {
  headings: TocHeading[]
  label: string
  className?: string
}

// The "On this page" rail of a lesson: links to the lesson's h2 and h3 headings, with h3 indented under its h2. Plain anchors, so it
// works without scripting. Nothing renders for a lesson with no headings, which leaves the rail empty rather than showing a bare label.
export function PageToc({ headings, label, className }: PageTocProps) {
  const entries = headings.filter((heading) => heading.depth === 2 || heading.depth === 3)
  if (entries.length === 0) return null
  return (
    <nav aria-label={label} className={cn("text-sm", className)} data-slot="page-toc">
      <p className="m-0 mb-2 px-2 text-xs font-medium text-muted-foreground">{label}</p>
      <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
        {entries.map((heading) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              className={cn(
                "block rounded-md px-2 py-1 leading-snug text-muted-foreground no-underline hover:bg-muted hover:text-foreground",
                heading.depth === 3 && "pl-5"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
