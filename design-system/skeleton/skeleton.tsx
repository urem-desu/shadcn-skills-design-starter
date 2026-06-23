import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Skeleton — loading placeholder with shimmer animation.
 * Zero seams: reads surface-sunken (base) and border-default (shimmer highlight)
 * from semantic tokens. Shape (height, width, border-radius) is always supplied
 * by the caller via className.
 */
const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-[var(--radius-md)] bg-[var(--surface-sunken)]",
        className
      )}
      {...props}
    />
  )
)
Skeleton.displayName = "Skeleton"

export { Skeleton }
