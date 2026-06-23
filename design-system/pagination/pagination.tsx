import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Pagination — composable page navigation. Parts: Pagination (nav wrapper),
 * PaginationContent (list), PaginationItem (li), PaginationLink (page button),
 * PaginationPrevious / PaginationNext (directional), PaginationEllipsis (…).
 * No Radix primitive. Zero component-scoped seams — reads button + text +
 * space + radius tokens from the shared tier.
 */
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav role="navigation" aria-label="Pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-[var(--space-1)]", className)} {...props} />
  )
)
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />
)
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
  size?: "default" | "icon"
} & React.ComponentProps<"a">

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "inline-flex items-center justify-center",
      "rounded-[var(--button-radius)] border",
      "text-[length:var(--font-size-sm)] font-[var(--font-weight-medium)]",
      "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
      "focus-visible:outline-none focus-visible:shadow-[var(--button-focus-ring)]",
      size === "icon"
        ? "size-[var(--control-sm)]"
        : "h-[var(--control-sm)] px-[var(--space-3)]",
      isActive
        ? "border-[var(--interactive-selected-border)] bg-[var(--interactive-selected-bg)] text-[var(--interactive-selected-text)]"
        : "border-[var(--button-outline-border)] bg-[var(--button-outline-bg)] text-[var(--text-primary)] hover:bg-[var(--button-outline-bg-hover)]",
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="icon"
    className={cn(className)}
    {...props}
  >
    <ChevronLeft className="size-[var(--icon-sm)]" aria-hidden="true" />
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="icon"
    className={cn(className)}
    {...props}
  >
    <ChevronRight className="size-[var(--icon-sm)]" aria-hidden="true" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    aria-hidden="true"
    className={cn(
      "flex size-[var(--control-sm)] items-center justify-center text-[var(--text-secondary)]",
      className
    )}
    {...props}
  >
    <MoreHorizontal className="size-[var(--icon-sm)]" />
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
