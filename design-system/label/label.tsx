import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Label — token-driven form label. Pairs with a control via `htmlFor`.
 * `peer-disabled:*` dims the label when its associated control is disabled
 * (place the control with `peer` class as the label's sibling).
 */
const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "inline-flex items-center gap-[var(--space-2)] select-none",
      "text-[length:var(--label-size)] font-[var(--label-weight)] text-[var(--label-text)]",
      "leading-[var(--line-tight)]",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }
