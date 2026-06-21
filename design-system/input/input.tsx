import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Input - token-driven single-line field. Every value resolves to a --field-*
 * component token (see design-system/theme.css). One size, matching the Figma
 * kit (the kit's Input has no size variants). Error is driven by aria-invalid so
 * the visual state and the a11y state can never diverge.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Visual error state - sets aria-invalid and the error tokens. */
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = "text", "aria-invalid": ariaInvalid, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      aria-invalid={error || ariaInvalid || undefined}
      className={cn(
        "flex h-[var(--control-md)] w-full min-w-0 rounded-[var(--field-radius)] px-[var(--space-3)]",
        "bg-[var(--field-bg)] text-[length:var(--font-size-base)] text-[var(--field-text)]",
        "border border-[var(--field-border)] placeholder:text-[var(--field-placeholder)]",
        "transition-[color,border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)] outline-none",
        "hover:border-[var(--field-border-hover)]",
        "focus-visible:border-[var(--field-border-focus)] focus-visible:shadow-[var(--field-focus-ring)]",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--field-bg-disabled)]",
        "read-only:bg-[var(--field-bg-disabled)]",
        "aria-[invalid=true]:border-[var(--field-border-error)] aria-[invalid=true]:focus-visible:shadow-[var(--field-focus-ring-error)]",
        "file:border-0 file:bg-transparent file:text-[length:var(--font-size-sm)] file:font-[var(--font-weight-medium)] file:text-[var(--field-text)]",
        className
      )}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { Input }
