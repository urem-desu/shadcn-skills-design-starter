"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

/**
 * Progress — animated completion bar. Thin layer over Radix Progress
 * (aria-valuenow/min/max, indeterminate support). Two seams:
 * --progress-h (track height) and --progress-radius (pill ends).
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-[var(--progress-h)] w-full overflow-hidden",
      "rounded-[var(--progress-radius)] bg-[var(--action-secondary)]",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-[var(--action-primary)] transition-all duration-[var(--duration-base)] ease-[var(--ease-out)]"
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
