import type { ReactNode } from "react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface DisclosureProps {
  summary: ReactNode
  children: ReactNode
  open?: boolean
  className?: string
  // Extra classes for the clickable summary row and for the panel below it. The panel keeps its 8px top padding
  // unless panelClassName overrides it, so a menu can turn the panel into a floating surface.
  summaryClassName?: string
  panelClassName?: string
  id?: string
}

// A native details element, so it opens without scripting. Every disclosure in the course UI is built on this.
export function Disclosure({ summary, children, open = false, className, summaryClassName, panelClassName, id }: DisclosureProps) {
  return (
    <details id={id} open={open} className={cn("group/disclosure", className)} data-slot="disclosure">
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center justify-between gap-3 rounded-md py-1.5 font-medium text-foreground [&::-webkit-details-marker]:hidden",
          summaryClassName
        )}
      >
        <span className="min-w-0 flex-1">{summary}</span>
        <ChevronDownIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-transform group-open/disclosure:rotate-180"
        />
      </summary>
      <div className={cn("pt-2", panelClassName)}>{children}</div>
    </details>
  )
}
