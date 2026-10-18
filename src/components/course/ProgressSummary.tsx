import { Progress } from "@/components/ui/progress"
import { formatText } from "@/lib/format"
import { cn } from "@/lib/utils"
import { hookProps } from "./hooks"

interface ProgressSummaryProps {
  courseId: string
  groupId?: string
  total: number
  progressText: string
  compact?: boolean
}

// Read count as text and as a bar. The page renders it with nothing read; ProgressRuntime fills in the stored progress.
export function ProgressSummary({ courseId, groupId, total, progressText, compact = false }: ProgressSummaryProps) {
  const text = formatText(progressText, { read: 0, total })
  const scope = groupId ? hookProps("groupId", groupId) : {}
  return (
    <span className={cn("flex min-w-0 flex-col", compact ? "gap-1 text-xs" : "gap-2 text-sm")}>
      <span className="text-muted-foreground" {...hookProps("progressCount")} {...hookProps("courseId", courseId)} {...scope}>
        {text}
      </span>
      <Progress
        className={compact ? "h-1" : "h-1.5"}
        aria-label={text}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        data-state="loading"
        data-value={0}
        {...hookProps("progressBar")}
        {...hookProps("courseId", courseId)}
        {...scope}
      />
    </span>
  )
}
