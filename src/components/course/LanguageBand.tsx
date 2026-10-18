import { cn } from "@/lib/utils"
import type { SwitcherItem } from "./types"

interface LanguageBandProps {
  heading: string
  items: SwitcherItem[]
}

// Every language the current page exists in, as plain links to the same page. Each link names its own language, so a
// screen reader switches voice for it; the current one is bold on a surface and carries aria-current.
export function LanguageBand({ heading, items }: LanguageBandProps) {
  return (
    <section aria-labelledby="home-languages-heading" className="grid gap-4 border-t pt-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-8">
      <h2 id="home-languages-heading" className="m-0 text-lg leading-snug font-semibold text-foreground">
        {heading}
      </h2>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              lang={item.id}
              aria-current={item.current ? "true" : undefined}
              className={cn(
                "inline-flex h-8 items-center rounded-lg border px-3 text-sm text-foreground no-underline hover:bg-accent",
                item.current && "bg-accent font-semibold"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
