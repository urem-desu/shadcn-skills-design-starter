import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Alert - token-driven inline banner (matches the Figma kit: a bordered card, not
 * a tinted fill). Variants: default (neutral) and destructive (red text). An
 * optional leading icon is passed as a child <svg> and inherits the text color
 * (text-current), so meaning is carried by the icon + copy, never color alone.
 * Values resolve to --alert-* tokens in theme.css; dark swaps at the semantic tier.
 */
const alertVariants = cva(
  [
    "relative grid w-full grid-cols-[0_1fr] items-start gap-y-[var(--space-0-5)]",
    "rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)]",
    "px-[var(--space-4)] py-[var(--space-3)] text-[length:var(--font-size-sm)]",
    "has-[>svg]:grid-cols-[var(--icon-md)_1fr] has-[>svg]:gap-x-[var(--space-3)]",
    "[&>svg]:size-[var(--icon-md)] [&>svg]:translate-y-[var(--space-0-5)] [&>svg]:text-current",
  ],
  {
    variants: {
      variant: {
        default: "text-[var(--text-primary)]",
        destructive:
          "text-[var(--text-destructive)] *:data-[slot=alert-description]:text-[var(--text-destructive)]",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  )
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="alert-title"
      className={cn("col-start-2 min-h-[var(--space-4)] font-[var(--font-weight-medium)] leading-[var(--line-tight)]", className)}
      {...props}
    />
  )
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="alert-description"
      className={cn("col-start-2 grid justify-items-start gap-[var(--space-1)] text-[length:var(--font-size-sm)] text-[var(--text-secondary)] leading-[var(--line-normal)]", className)}
      {...props}
    />
  )
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription, alertVariants }
