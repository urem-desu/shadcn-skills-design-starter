"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Item — versatile list row: icon slot, text slot (title + optional description),
 * and optional trailing slot (badge, action, meta text). Reads shared semantic
 * tokens throughout; zero component-scoped seams.
 */
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  trailing?: React.ReactNode
  interactive?: boolean
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ icon, title, description, trailing, interactive = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-[var(--space-3)] px-[var(--space-4)] py-[var(--space-3)]",
        interactive && [
          "cursor-pointer select-none rounded-[var(--radius-md)]",
          "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
          "hover:bg-[var(--action-secondary)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
          "active:bg-[var(--action-secondary-active)]",
        ],
        className
      )}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? "button" : undefined}
      {...props}
    >
      {icon && (
        <div
          aria-hidden="true"
          className="flex size-[var(--icon-md)] flex-none items-center justify-center text-[var(--text-secondary)] [&_svg]:size-[var(--icon-md)]"
        >
          {icon}
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-0-5)]">
        <span className="truncate text-[length:var(--font-size-sm)] font-[var(--font-weight-medium)] leading-[var(--line-tight)] text-[var(--text-primary)]">
          {title}
        </span>
        {description && (
          <span className="truncate text-[length:var(--font-size-xs)] leading-[var(--line-normal)] text-[var(--text-secondary)]">
            {description}
          </span>
        )}
      </div>
      {trailing && (
        <div className="flex flex-none items-center gap-[var(--space-2)] text-[var(--text-secondary)]">
          {trailing}
        </div>
      )}
    </div>
  )
)
Item.displayName = "Item"

export { Item }
