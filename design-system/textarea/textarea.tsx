import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Textarea - token-driven multi-line field. Shares --field-* tokens with Input.
 * Error is driven by aria-invalid so visual ≡ a11y state. Vertical resize only.
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, rows = 3, "aria-invalid": ariaInvalid, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={error || ariaInvalid || undefined}
      className={cn(
        "w-full resize-y font-[inherit] outline-none",
        "rounded-[var(--field-radius)] px-[var(--space-3)] py-[var(--space-2)]",
        "text-[length:var(--font-size-base)] leading-[var(--line-normal)]",
        "border border-[var(--field-border)] bg-[var(--field-bg)] text-[var(--field-text)]",
        "placeholder:text-[var(--field-placeholder)]",
        "transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
        "hover:border-[var(--field-border-hover)]",
        "focus-visible:border-[var(--field-border-focus)] focus-visible:shadow-[var(--field-focus-ring)]",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--field-bg-disabled)]",
        "aria-[invalid=true]:border-[var(--field-border-error)]",
        "aria-[invalid=true]:focus-visible:shadow-[var(--field-focus-ring-error)]",
        className
      )}
      {...props}
    />
  )
)
Textarea.displayName = "Textarea"

export { Textarea }
