import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Kbd — keyboard key badge. Semantic <kbd> element styled as a pill with
 * a subtle surface-sunken background and border. Reads shared tokens;
 * zero component-scoped seams.
 */
const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-[var(--radius-sm)] border border-[var(--border-default)]",
        "bg-[var(--surface-sunken)] px-[var(--space-1-5)] py-[var(--space-0-5)]",
        "font-[var(--font-weight-medium)] font-mono text-[length:var(--font-size-xs)]",
        "leading-[var(--line-tight)] text-[var(--text-secondary)]",
        "shadow-[0_1px_0_var(--border-default)]",
        className
      )}
      {...props}
    />
  )
)
Kbd.displayName = "Kbd"

export { Kbd }
