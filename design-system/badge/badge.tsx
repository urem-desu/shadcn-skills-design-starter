import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Badge - token-driven status/label chip matching the Figma kit (Type: Default,
 * Secondary, Destructive, Outline). Non-interactive <span> by default; render as
 * a link/button via `asChild`. Colors resolve to --badge-* tokens in theme.css;
 * dark mode is handled at the semantic tier (no per-variant dark overrides).
 */
const badgeVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center gap-[var(--space-1)] overflow-hidden whitespace-nowrap",
    "rounded-[var(--badge-radius)] border border-transparent px-[var(--space-2)] py-[var(--space-0-5)]",
    "text-[length:var(--font-size-xs)] font-[var(--badge-font-weight)] leading-[var(--line-tight)]",
    "[&_svg]:size-[var(--icon-xs)] [&_svg]:shrink-0 [&_svg]:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: "bg-[var(--badge-default-bg)] text-[var(--badge-default-text)]",
        secondary: "bg-[var(--badge-secondary-bg)] text-[var(--badge-secondary-text)]",
        destructive: "bg-[var(--badge-destructive-bg)] text-[var(--badge-destructive-text)]",
        outline: "border-[var(--badge-outline-border)] text-[var(--badge-outline-text)]",
      },
    },
    defaultVariants: { variant: "default" },
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
    return <Comp ref={ref} data-slot="badge" data-variant={variant} className={cn(badgeVariants({ variant }), className)} {...props} />
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
