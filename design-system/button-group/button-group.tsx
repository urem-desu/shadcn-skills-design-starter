import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * ButtonGroup - layout primitive that fuses adjacent buttons / inputs / select
 * triggers into a single connected unit by stripping inner corners and
 * collapsing duplicated borders. Hybrid: zero --button-group-* tokens; the
 * gap-between-nested-groups uses --space-2, and the focused child stacks
 * above neighbours so the existing button focus ring remains fully visible.
 */
const buttonGroupVariants = cva(
  [
    "flex w-fit items-stretch",
    // when a ButtonGroup contains another ButtonGroup, separate them by 8px
    "has-[>[data-slot=button-group]]:gap-[var(--space-2)]",
    // focus stacking: focused child raises above neighbours so the 2px+2px ring isn't clipped
    "[&>*]:focus-visible:relative [&>*]:focus-visible:z-10",
    // inputs flex to fill (text + button addon pattern)
    "[&>input]:flex-1",
  ],
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: { orientation: "horizontal" },
  }
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation ?? "horizontal"}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div"
  return (
    <Comp
      data-slot="button-group-text"
      className={cn(
        "inline-flex items-center gap-[var(--space-2)]",
        "rounded-[var(--radius-md)] border border-[var(--border-default)]",
        "bg-[var(--action-secondary)] text-[var(--text-primary)]",
        "px-[var(--space-4)] text-[length:var(--font-size-sm)] font-[var(--font-weight-medium)]",
        "shadow-[var(--shadow-sm)]",
        "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[var(--icon-sm)]",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <div
      data-slot="button-group-separator"
      data-orientation={orientation}
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "relative m-0 self-stretch bg-[var(--border-default)] shrink-0",
        orientation === "vertical" ? "w-px h-auto" : "h-px w-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
