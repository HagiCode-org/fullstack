import { cn } from "@/lib/utils"
import { Disclosure } from "./Disclosure"
import type { SwitcherItem } from "./types"

interface SwitcherMenuProps {
  label: string
  items: SwitcherItem[]
  className?: string
}

// Real links to the same page elsewhere, so it works without scripting. The course and language switchers both use it.
// The list floats over the page: under the trigger from sm up, and across the header's width on a phone, where two
// triggers share one row. The header is the positioned ancestor for the phone case.
export function SwitcherMenu({ label, items, className }: SwitcherMenuProps) {
  const current = items.find((item) => item.current)
  return (
    <Disclosure
      className={cn("sm:relative", className)}
      summaryClassName="px-2 hover:bg-accent"
      panelClassName="absolute inset-x-4 top-full z-30 mt-1 max-h-[70dvh] overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground ring-1 ring-foreground/10 sm:inset-x-auto sm:end-0 sm:w-64"
      summary={
        current ? (
          <span className="flex min-w-0 flex-col">
            <span className="text-xs font-normal text-muted-foreground">{label}</span>
            <span className="max-w-32 truncate text-sm sm:max-w-64">{current.label}</span>
          </span>
        ) : (
          <span className="block text-sm">{label}</span>
        )
      }
    >
      <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={cn(
                "block rounded-md px-2 py-1.5 text-sm font-normal text-foreground no-underline hover:bg-accent",
                item.current && "bg-accent font-semibold"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </Disclosure>
  )
}
