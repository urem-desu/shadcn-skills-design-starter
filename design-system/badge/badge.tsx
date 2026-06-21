import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Badge — token-driven status/label chip. Non-interactive by default; render as
 * a link/button via `asChild`. Colors resolve to --badge-* tokens which carry
 * dark-mode variants in theme.css (chips stay legible on dark surfaces).
 */
const badgeVariants = cva(
  [
    "inline-flex items-center gap-[var(--space-1)] whitespace-nowrap",
    "rounded-[var(--badge-radius)] px-[var(--space-2)] py-[var(--space-0-5)]",
    "text-[length:var(--font-size-xs)] font-[var(--badge-font-weight)] leading-[var(--line-tight)]",
    "[&_svg]:size-[var(--icon-xs)] [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        neutral: "bg-[var(--badge-neutral-bg)] text-[var(--badge-neutral-text)]",
        primary: "bg-[var(--badge-primary-bg)] text-[var(--badge-primary-text)]",
        success: "bg-[var(--badge-success-bg)] text-[var(--badge-success-text)]",
        warning: "bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)]",
        error: "bg-[var(--badge-error-bg)] text-[var(--badge-error-text)]",
        outline: "border border-[var(--border-strong)] text-[var(--text-primary)]",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span"
    return <Comp ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
