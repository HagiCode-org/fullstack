import { CircleCheckIcon, CircleIcon } from "lucide-react"
import { hookProps } from "./hooks"

interface ReadMarkerProps {
  lessonId: string
  readText: string
  unreadText: string
}

// An icon and a text alternative for each state, so read state is never shown by colour alone.
// The page renders the unread state; ProgressRuntime sets data-state to "read" when the lesson is read.
export function ReadMarker({ lessonId, readText, unreadText }: ReadMarkerProps) {
  return (
    <span
      className="group/marker inline-flex shrink-0 items-center text-muted-foreground"
      data-state="unread"
      {...hookProps("readMarker")}
      {...hookProps("lessonId", lessonId)}
    >
      <CircleIcon aria-hidden="true" className="size-4 group-data-[state=read]/marker:hidden" />
      <CircleCheckIcon aria-hidden="true" className="hidden size-4 text-primary group-data-[state=read]/marker:block" />
      <span className="sr-only group-data-[state=read]/marker:hidden">{unreadText}</span>
      <span className="sr-only hidden group-data-[state=read]/marker:inline">{readText}</span>
    </span>
  )
}
