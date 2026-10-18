import { Button } from "@/components/ui/button"
import type { NavLink } from "./types"

interface LessonNavProps {
  previous?: NavLink
  next?: NavLink
  back: NavLink
}

// Previous and next lesson in reading order. Where a neighbour is missing, the back-to-course link takes its place.
export function LessonNav({ previous, next, back }: LessonNavProps) {
  const left = previous ?? back
  const right = next ?? (previous ? back : undefined)
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="min-w-0">{left && <NavButton link={left} rel={previous ? "prev" : undefined} />}</div>
      <div className="flex min-w-0 justify-end">{right && <NavButton link={right} rel={next ? "next" : undefined} />}</div>
    </div>
  )
}

function NavButton({ link, rel }: { link: NavLink; rel?: string }) {
  return (
    <Button asChild variant="outline" className="h-auto w-full flex-col items-start gap-0.5 py-2 whitespace-normal">
      <a href={link.href} rel={rel}>
        <span className="text-xs font-normal text-muted-foreground">{link.caption}</span>
        <span className="text-sm font-medium text-foreground">{link.title}</span>
      </a>
    </Button>
  )
}
