import { cn } from "@/lib/utils"
import { Disclosure } from "./Disclosure"
import { ProgressSummary } from "./ProgressSummary"
import { ReadMarker } from "./ReadMarker"
import type { TreeNode } from "./types"

export interface OutlineLabels {
  readText: string
  unreadText: string
  currentText: string
  progressText: string
}

interface OutlineTreeProps {
  courseId: string
  nodes: TreeNode[]
  currentLessonId?: string
  labels: OutlineLabels
  className?: string
}

// Nested groups with lesson links. A group that holds the current lesson starts open; on the overview, where no lesson
// is current, every group starts open.
export function OutlineTree({ courseId, nodes, currentLessonId, labels, className }: OutlineTreeProps) {
  return (
    <div className={cn("text-sm", className)}>
      <TreeList courseId={courseId} nodes={nodes} currentLessonId={currentLessonId} labels={labels} />
    </div>
  )
}

interface TreeListProps {
  courseId: string
  nodes: TreeNode[]
  currentLessonId?: string
  labels: OutlineLabels
}

function TreeList({ courseId, nodes, currentLessonId, labels }: TreeListProps) {
  return (
    <ul className="m-0 flex list-none flex-col gap-1 p-0">
      {nodes.map((node) =>
        node.kind === "lesson" ? (
          <li key={node.id}>
            <LessonLink node={node} current={node.id === currentLessonId} labels={labels} />
          </li>
        ) : (
          <li key={node.id}>
            <GroupItem courseId={courseId} node={node} currentLessonId={currentLessonId} labels={labels} />
          </li>
        )
      )}
    </ul>
  )
}

function GroupItem({ courseId, node, currentLessonId, labels }: { courseId: string; node: Extract<TreeNode, { kind: "group" }>; currentLessonId?: string; labels: OutlineLabels }) {
  const lessonIds = lessonIdsOf(node.children)
  const open = currentLessonId === undefined || lessonIds.includes(currentLessonId)
  return (
    <Disclosure
      open={open}
      className="ps-1"
      summary={
        <span className="flex min-w-0 flex-col gap-1">
          <span>{node.title}</span>
          <ProgressSummary courseId={courseId} groupId={node.id} total={lessonIds.length} progressText={labels.progressText} compact />
        </span>
      }
    >
      <TreeList courseId={courseId} nodes={node.children} currentLessonId={currentLessonId} labels={labels} />
    </Disclosure>
  )
}

function LessonLink({ node, current, labels }: { node: Extract<TreeNode, { kind: "lesson" }>; current: boolean; labels: OutlineLabels }) {
  return (
    <a
      href={node.href}
      aria-current={current ? "page" : undefined}
      className={cn(
        "flex items-start gap-2 rounded-md px-2 py-1.5 text-foreground no-underline hover:bg-accent",
        current && "bg-accent font-semibold"
      )}
    >
      <ReadMarker lessonId={node.id} readText={labels.readText} unreadText={labels.unreadText} />
      <span className="min-w-0 flex-1">{node.title}</span>
      {current && <span className="sr-only">{labels.currentText}</span>}
    </a>
  )
}

function lessonIdsOf(nodes: TreeNode[]): string[] {
  return nodes.flatMap((node) => (node.kind === "lesson" ? [node.id] : lessonIdsOf(node.children)))
}
