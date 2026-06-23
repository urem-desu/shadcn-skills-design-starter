import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Spinner — circular indeterminate loading indicator.
 * Zero seams: reads icon-sm / icon-md / icon-lg from existing sizing tokens.
 * Color defaults to currentColor so it inherits from its parent text color.
 */

type SpinnerSize = "sm" | "md" | "lg"

const sizeMap: Record<SpinnerSize, string> = {
  sm: "size-[var(--icon-sm)]",
  md: "size-[var(--icon-md)]",
  lg: "size-[var(--icon-lg)]",
}

interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: SpinnerSize
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ size = "md", className, ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      role="status"
      aria-label="Loading"
      className={cn(
        "animate-spin",
        sizeMap[size],
        className
      )}
      {...props}
    >
      {/* Full circle track */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
        fill="none"
      />
      {/* Quarter-arc indicator */}
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  )
)
Spinner.displayName = "Spinner"

export { Spinner }
export type { SpinnerProps, SpinnerSize }
