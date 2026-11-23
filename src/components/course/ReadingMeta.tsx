// The reading time and the outcome of a lesson or a course, under its title. Each part is shown only when it has a value,
// and the whole block renders nothing when neither does.
interface ReadingMetaProps {
  // The time line, already formatted for the locale ("Estimated time: 20 min"). Undefined when there is no time.
  minutesText?: string
  outcomeLabel: string
  // One sentence. Undefined or blank when there is none.
  outcome?: string
}

export function ReadingMeta({ minutesText, outcomeLabel, outcome }: ReadingMetaProps) {
  const hasOutcome = typeof outcome === "string" && outcome.trim() !== ""
  if (minutesText === undefined && !hasOutcome) return null
  return (
    <div className="mb-6 flex max-w-2xl flex-col gap-2 text-sm">
      {minutesText !== undefined && <p className="m-0 text-muted-foreground">{minutesText}</p>}
      {hasOutcome && (
        <p className="m-0 text-foreground">
          <span className="font-semibold">{outcomeLabel}</span> {outcome}
        </p>
      )}
    </div>
  )
}
