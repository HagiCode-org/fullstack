import { Button } from "@/components/ui/button"
import { hookProps } from "./hooks"

interface MarkReadButtonProps {
  courseId: string
  lessonId: string
  markReadLabel: string
}

// Starts hidden: without scripting it would do nothing, so ProgressRuntime shows it and sets aria-pressed.
export function MarkReadButton({ courseId, lessonId, markReadLabel }: MarkReadButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      aria-pressed="false"
      hidden
      {...hookProps("markRead")}
      {...hookProps("courseId", courseId)}
      {...hookProps("lessonId", lessonId)}
    >
      {markReadLabel}
    </Button>
  )
}
