// The glossary page body: one section per course, each term with its one-sentence definition and analogy. Every term has
// an id (courseId-termId) that the term links in lesson text point at.
export interface GlossaryListEntry {
  anchor: string
  term: string
  definition: string
  analogy: string
}

export interface GlossaryListGroup {
  courseId: string
  title: string
  entries: GlossaryListEntry[]
}

interface GlossaryListProps {
  groups: GlossaryListGroup[]
  analogyLabel: string
  emptyText: string
}

export function GlossaryList({ groups, analogyLabel, emptyText }: GlossaryListProps) {
  if (groups.length === 0) return <p className="m-0 text-muted-foreground">{emptyText}</p>
  return (
    <div className="flex flex-col gap-12">
      {groups.map((group) => (
        <section key={group.courseId} aria-labelledby={`glossary-${group.courseId}`} className="flex flex-col gap-6">
          <h2 id={`glossary-${group.courseId}`} className="m-0 text-xl font-semibold leading-snug">
            {group.title}
          </h2>
          {group.entries.map((entry) => (
            <div key={entry.anchor} id={entry.anchor} className="flex scroll-mt-16 flex-col gap-1">
              <h3 className="m-0 text-lg font-semibold leading-snug">{entry.term}</h3>
              <p className="m-0 text-foreground">{entry.definition}</p>
              <p className="m-0 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{analogyLabel}</span> {entry.analogy}
              </p>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
