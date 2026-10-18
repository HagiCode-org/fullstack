import { cn } from "@/lib/utils"
import { Disclosure } from "./Disclosure"
import type { SwitcherItem } from "./types"

interface SwitcherMenuProps {
  label: string
  items: SwitcherItem[]
  className?: string
}

// Real links to the same page elsewhere, so it works without scripting. The course and language switchers both use it.
export function SwitcherMenu({ label, items, className }: SwitcherMenuProps) {
  const current = items.find((item) => item.current)
  return (
    <Disclosure
      className={className}
      summary={
        <span className="flex min-w-0 flex-col">
          <span className="text-xs font-normal text-muted-foreground">{label}</span>
          <span className="truncate text-sm">{current?.label ?? label}</span>
        </span>
      }
    >
      <ul className="m-0 flex list-none flex-col gap-1 p-0">
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
