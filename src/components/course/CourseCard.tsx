import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ContinueButton } from "./ContinueButton"
import { ProgressSummary } from "./ProgressSummary"
import { ReadMarker } from "./ReadMarker"
import type { PreviewSection } from "./types"

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
  sections: PreviewSection[]
  // Set when the preview shows only the first lessons; the link then leads to the whole outline.
  fullOutlineLabel?: string
  readText: string
  unreadText: string
}

// One course on the home page, as a wide card split in two: the course and its action on the left, and a preview of its
// lessons on the right, each with its read marker. The title carries a view-transition name that the course page's
// heading shares, so the title travels across the navigation in browsers that support it.
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
  sections,
  fullOutlineLabel,
  readText,
  unreadText,
}: CourseCardProps) {
  return (
    <Card className="h-full gap-0 py-0 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <CardContent className="flex flex-col gap-4 px-5 py-5 lg:px-6 lg:py-6">
        <div className="flex flex-col gap-2">
          {demo && <Badge variant="secondary" className="w-fit">{demoLabel}</Badge>}
          <h3 className="m-0 text-xl leading-snug font-semibold text-foreground text-balance" style={{ viewTransitionName: `course-${courseId}` }}>
            <a href={overviewHref} className="no-underline hover:underline">
              {title}
            </a>
          </h3>
          <span className="text-sm text-muted-foreground">{lessonCountText}</span>
        </div>
        <div className="mt-auto flex flex-col gap-4 pt-2">
          <ProgressSummary courseId={courseId} total={total} progressText={progressText} />
          <ContinueButton courseId={courseId} href={continueHref} label={continueLabel} />
        </div>
      </CardContent>
      <CardContent className="flex flex-col gap-4 border-t bg-muted/50 px-5 py-5 lg:border-t-0 lg:border-l lg:px-6 lg:py-6">
        <div className={cn("grid gap-x-6 gap-y-4", sections.length > 1 && "sm:grid-cols-2")}>
          {sections.map((section, index) => (
            <div key={section.title ?? `lessons-${index}`} className="flex min-w-0 flex-col gap-1">
              {section.title && <p className="m-0 ps-2 text-xs font-medium text-muted-foreground">{section.title}</p>}
              <ul className="m-0 flex list-none flex-col gap-0.5 p-0 text-sm">
                {section.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <a href={lesson.href} className="flex items-start gap-2 rounded-md px-2 py-1.5 text-foreground no-underline hover:bg-background">
                      <ReadMarker lessonId={lesson.id} courseId={courseId} readText={readText} unreadText={unreadText} />
                      <span className="min-w-0 flex-1">{lesson.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {fullOutlineLabel && (
          <a href={overviewHref} className="w-fit rounded-md px-2 py-1 text-sm">
            {fullOutlineLabel}
          </a>
        )}
      </CardContent>
    </Card>
  )
}
