"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { cn } from "@/lib/utils"

/**
 * Hover Card — token-driven floating preview triggered by pointer hover or
 * keyboard focus on a trigger link. Thin layer over Radix HoverCard
 * (controlled portal, focus management, escape-to-close). One seam:
 * --hover-card-w (bare px, no scale token at 320).
 */
const HoverCard = HoverCardPrimitive.Root
const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-[var(--hover-card-w)] overflow-hidden",
        "rounded-[var(--radius-lg)] border border-[var(--border-default)]",
        "bg-[var(--surface-card)] p-[var(--space-4)]",
        "text-[var(--text-primary)] shadow-[var(--shadow-lg)]",
        className
      )}
      {...props}
    />
  </HoverCardPrimitive.Portal>
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
