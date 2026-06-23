"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

/**
 * Slider — horizontal range input with token-driven track, range fill, and thumb.
 * Two seams: --slider-track-h (track height, 4px) and --slider-thumb-size (16px).
 * Everything else resolves from existing semantic tokens.
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative h-[var(--slider-track-h)] w-full grow overflow-hidden",
        "rounded-[var(--radius-full)] bg-[var(--action-secondary)]"
      )}
    >
      <SliderPrimitive.Range
        className="absolute h-full bg-[var(--action-primary)]"
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block size-[var(--slider-thumb-size)] rounded-[var(--radius-full)]",
        "border-2 border-[var(--action-primary)] bg-[var(--surface-card)]",
        "shadow-[var(--shadow-sm)]",
        "transition-[box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
        "hover:shadow-[var(--shadow-md)]",
        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
