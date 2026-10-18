import type { ReactNode } from "react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface DisclosureProps {
  summary: ReactNode
  children: ReactNode
  open?: boolean
  className?: string
  id?: string
}

// A native details element, so it opens without scripting. Every disclosure in the course UI is built on this.
export function Disclosure({ summary, children, open = false, className, id }: DisclosureProps) {
  return (
    <details id={id} open={open} className={cn("group/disclosure", className)} data-slot="disclosure">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-md py-1.5 font-medium text-foreground [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 flex-1">{summary}</span>
        <ChevronDownIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-transform group-open/disclosure:rotate-180"
        />
      </summary>
      <div className="pt-2">{children}</div>
    </details>
  )
}
