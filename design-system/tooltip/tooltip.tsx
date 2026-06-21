"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

/**
 * Tooltip — token-driven, built on Radix for correct positioning, hover/focus
 * delay, dismissal, and a11y (the trigger gets aria-describedby; content is
 * role=tooltip). Renders on an inverse surface (--tooltip-* tokens) that inverts
 * correctly in dark mode. Self-provides a Provider so it works standalone.
 *
 * The states harness uses a CSS-only equivalent (no Radix runtime) so the bubble
 * can be rendered always-open for contrast gating — both use the same tokens.
 */
const TooltipProvider = TooltipPrimitive.Provider

function Tooltip({ delayDuration = 200, ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root {...props} />
    </TooltipPrimitive.Provider>
  )
}

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 8, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-fit rounded-[var(--tooltip-radius)] px-[var(--space-2-5)] py-[var(--space-1-5)]",
        "bg-[var(--tooltip-bg)] text-[var(--tooltip-text)] text-[length:var(--tooltip-size)] leading-[var(--line-tight)]",
        "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="fill-[var(--tooltip-bg)]" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
