import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

/**
 * Card - token-driven surface container (molecule). A bordered, elevated panel
 * that groups related content and actions. Composed of Header / Title /
 * Description / Action / Content / Footer slots. Every value resolves to a
 * --card-* token in theme.css (dark mode swaps at the semantic tier).
 *
 * Non-interactive by default. Pass `interactive` to raise elevation on hover
 * (use only when the whole card is a link/button - wrap with `asChild`).
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        data-slot="card"
        className={cn(
          "flex flex-col gap-[var(--space-4)] py-[var(--space-6)]",
          "rounded-[var(--radius-lg)] border border-[var(--border-default)]",
          "bg-[var(--surface-card)] text-[var(--text-primary)] shadow-[var(--shadow-sm)]",
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min grid-cols-[1fr_auto] items-start gap-x-[var(--space-4)]",
        "px-[var(--space-6)]",
        className
      )}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-title"
      className={cn(
        "text-[length:var(--font-size-lg)] font-[var(--font-weight-semibold)]",
        "leading-[var(--line-tight)] text-[var(--text-primary)]",
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="card-description"
      className={cn(
        "text-[length:var(--font-size-sm)] leading-[var(--line-normal)] text-[var(--text-secondary)]",
        className
      )}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

/** Trailing action (button/menu) in the header - sits in the second column, top-aligned. */
const CardAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
)
CardAction.displayName = "CardAction"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="card-content" className={cn("px-[var(--space-6)]", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn("flex items-center gap-[var(--space-3)] px-[var(--space-6)]", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter }
