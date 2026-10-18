import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { hookProps } from "./hooks"

interface NoticeProps {
  children: ReactNode
  // The storage notice is the one ProgressRuntime shows, so it carries its hook and starts hidden.
  storage?: boolean
  hidden?: boolean
}

// Used for the fallback-language notice and the storage notice. Alert gives both the alert role.
export function Notice({ children, storage = false, hidden = false }: NoticeProps) {
  return (
    <Alert className="text-sm" hidden={hidden} {...(storage ? hookProps("storageNotice") : {})}>
      <CircleAlertIcon aria-hidden="true" />
      <AlertDescription className="text-foreground">{children}</AlertDescription>
    </Alert>
  )
}
