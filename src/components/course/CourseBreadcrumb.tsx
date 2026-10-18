import { Fragment } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { Crumb } from "./types"

interface CourseBreadcrumbProps {
  items: Crumb[]
  label: string
}

// Home, course, and lesson. The last item is the current page and is not a link.
export function CourseBreadcrumb({ items, label }: CourseBreadcrumbProps) {
  return (
    <Breadcrumb aria-label={label} className="mb-3">
      <BreadcrumbList>
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <Fragment key={`${index}-${item.label}`}>
              <BreadcrumbItem>
                {last || item.href === undefined ? (
                  <BreadcrumbPage aria-current={last ? "page" : undefined}>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!last && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
