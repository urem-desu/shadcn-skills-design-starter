"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Empty — token-driven empty-state layout.
 * Slots: optional icon, required title, optional description, optional
 * action children (e.g. a Button). All geometry reads from the shared token
 * layer; no component-scoped seams needed.
 */
interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ icon, title, description, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-[var(--space-4)]",
        "py-[var(--space-9)] px-[var(--space-6)] text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <div
          aria-hidden="true"
          className="flex size-[var(--icon-lg)] items-center justify-center text-[var(--text-tertiary)] [&_svg]:size-[var(--icon-lg)]"
        >
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-[var(--space-1)]">
        <p className="text-[length:var(--font-size-base)] font-[var(--font-weight-semibold)] leading-[var(--line-tight)] text-[var(--text-primary)]">
          {title}
        </p>
        {description && (
          <p className="max-w-[280px] text-[length:var(--font-size-sm)] leading-[var(--line-normal)] text-[var(--text-secondary)]">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-[var(--space-2)]">{children}</div>
      )}
    </div>
  )
)
Empty.displayName = "Empty"

export { Empty }
