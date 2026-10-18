import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { hookProps } from "./hooks"

interface ContinueButtonProps {
  courseId: string
  href: string
  label: string
  className?: string
}

// The primary action of a course. ProgressRuntime moves its href and label to the next unread lesson.
export function ContinueButton({ courseId, href, label, className }: ContinueButtonProps) {
  return (
    <Button asChild className={cn("w-full sm:w-auto", className)}>
      <a href={href} {...hookProps("continue")} {...hookProps("courseId", courseId)}>
        {label}
      </a>
    </Button>
  )
}
