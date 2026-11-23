import { Badge } from "@/components/ui/badge"

// The badge that marks an optional course or lesson (选修). The label is the interface string for the page's locale.
export function ElectiveBadge({ label }: { label: string }) {
  return <Badge variant="outline" className="w-fit">{label}</Badge>
}
