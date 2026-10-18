import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ContinueButton } from "./ContinueButton"
import { ProgressSummary } from "./ProgressSummary"

interface CourseCardProps {
  courseId: string
  title: string
  overviewHref: string
  demo: boolean
  demoLabel: string
  lessonCountText: string
  progressText: string
  total: number
  continueHref: string
  continueLabel: string
}

// One course on the home page: its title and overview link, its read count, and the continue action.
export function CourseCard({
  courseId,
  title,
  overviewHref,
  demo,
  demoLabel,
  lessonCountText,
  progressText,
  total,
  continueHref,
  continueLabel,
}: CourseCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="gap-2">
        {demo && <Badge variant="secondary" className="w-fit">{demoLabel}</Badge>}
        <h2 className="text-lg leading-snug font-semibold text-foreground">
          <a href={overviewHref} className="no-underline hover:underline">
            {title}
          </a>
        </h2>
        <span className="text-sm text-muted-foreground">{lessonCountText}</span>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <ProgressSummary courseId={courseId} total={total} progressText={progressText} />
      </CardContent>
      <CardFooter>
        <ContinueButton courseId={courseId} href={continueHref} label={continueLabel} />
      </CardFooter>
    </Card>
  )
}
