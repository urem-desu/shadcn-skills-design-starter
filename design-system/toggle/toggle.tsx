"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Toggle — Radix-based pressable on/off button.
 * Variants: default (ghost) and outline.
 * Sizes: sm / md / lg.
 * Zero seams: reads action-secondary, interactive-selected-*, border-default,
 * control-sm/md/lg, icon-sm/md, space-* from existing tokens.
 */

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-[var(--space-2)]",
    "rounded-[var(--radius-md)]",
    "text-[length:var(--font-size-sm)] font-[var(--font-weight-medium)]",
    "text-[var(--text-secondary)]",
    "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
    "hover:bg-[var(--action-secondary)] hover:text-[var(--text-primary)]",
    "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=on]:bg-[var(--interactive-selected-bg)]",
    "data-[state=on]:text-[var(--interactive-selected-text)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        outline: [
          "border border-[var(--border-default)] bg-transparent",
          "hover:bg-[var(--action-secondary)]",
        ].join(" "),
      },
      size: {
        sm: "h-[var(--control-sm)] px-[var(--space-2)] text-[length:var(--font-size-xs)]",
        md: "h-[var(--control-md)] px-[var(--space-3)]",
        lg: "h-[var(--control-lg)] px-[var(--space-4)] text-[length:var(--font-size-base)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size }), className)}
    {...props}
  />
))
Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
export type { ToggleProps }
