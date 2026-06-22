import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * AspectRatio - structural wrapper that constrains its child to a fixed
 * width/height ratio via the native CSS `aspect-ratio` property. Children
 * are absolutely positioned inside so they fill the box without layout shift.
 * Geometry-only: no color, type, spacing, or radius tokens (hybrid rule).
 */
export interface AspectRatioProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Width / height ratio. Default 1 (square). Common: 16/9, 4/3, 3/2, 9/16. */
  ratio?: number
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="aspect-ratio"
      style={{ aspectRatio: String(ratio), ...style }}
      className={cn("relative w-full [&>*]:absolute [&>*]:inset-0 [&>*]:size-full", className)}
      {...props}
    >
      {children}
    </div>
  )
)
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }
