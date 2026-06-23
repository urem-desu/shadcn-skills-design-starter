"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { toggleVariants } from "@/design-system/toggle/toggle"

/**
 * Toggle Group — Radix-based set of mutually exclusive (single) or multi-select
 * (multiple) toggle buttons. Re-uses toggleVariants from Toggle.
 * Zero seams: reads border-default for the joined-strip border from existing tokens.
 * Supports "joined" layout (pills share a single border) via the default strip
 * appearance; or standalone (each button is independent) via `variant="outline"`.
 */

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "md",
  variant: "default",
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(
      "flex items-center",
      "rounded-[var(--radius-md)] border border-[var(--border-default)]",
      "overflow-hidden",
      className
    )}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant ?? variant,
          size: context.size ?? size,
        }),
        // Strip border-radius — items are flush inside the group border
        "rounded-none",
        // Right-border divider between items (last item gets none)
        "border-r border-[var(--border-default)] last:border-r-0",
        // Remove outline variant's individual border (group border handles it)
        "border-t-0 border-b-0 border-l-0",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
