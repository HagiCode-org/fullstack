import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { hookProps } from "./hooks"

interface ThemeToggleProps {
  label: string
  className?: string
}

// Starts hidden: without scripting a press would do nothing, so ThemeRuntime shows it. Both icons are in the markup and
// the theme state decides which one is visible, so the right icon is already showing on first paint.
export function ThemeToggle({ label, className }: ThemeToggleProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      className={cn(className)}
      aria-label={label}
      aria-pressed="false"
      title={label}
      hidden
      {...hookProps("themeToggle")}
    >
      <MoonIcon className="theme-toggle__moon" aria-hidden="true" />
      <SunIcon className="theme-toggle__sun" aria-hidden="true" />
    </Button>
  )
}
