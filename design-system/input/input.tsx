import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Input — token-driven single-line field. Every value resolves to a --field-*
 * component token (see design-system/theme.css). Error is driven by aria-invalid
 * so the visual state and the a11y state can never diverge.
 *
 * Native `size` is omitted (it collides with the visual size variant); use
 * `inputSize` for height/typography.
 */
const inputVariants = cva(
  [
    "flex w-full rounded-[var(--field-radius)] bg-[var(--field-bg)] text-[var(--field-text)]",
    "border border-[var(--field-border)]",
    "placeholder:text-[var(--field-placeholder)]",
    "transition-[color,border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
    "outline-none",
    "hover:border-[var(--field-border-hover)]",
    "focus-visible:border-[var(--field-border-focus)] focus-visible:shadow-[var(--field-focus-ring)]",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--field-bg-disabled)]",
    "read-only:bg-[var(--field-bg-disabled)]",
    // error state — single source of truth is aria-invalid
    "aria-[invalid=true]:border-[var(--field-border-error)]",
    "aria-[invalid=true]:focus-visible:shadow-[var(--field-focus-ring-error)]",
    "file:border-0 file:bg-transparent file:text-[length:var(--font-size-sm)] file:font-[var(--font-weight-medium)]",
  ],
  {
    variants: {
      inputSize: {
        sm: "h-[var(--control-sm)] px-[var(--space-3)] text-[length:var(--font-size-sm)]",
        md: "h-[var(--control-md)] px-[var(--space-3)] text-[length:var(--font-size-base)]",
        lg: "h-[var(--control-lg)] px-[var(--space-4)] text-[length:var(--font-size-lg)]",
      },
    },
    defaultVariants: { inputSize: "md" },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /** Visual error state — sets aria-invalid and the error tokens. */
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, error, type = "text", "aria-invalid": ariaInvalid, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      aria-invalid={error || ariaInvalid || undefined}
      className={cn(inputVariants({ inputSize }), className)}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { Input, inputVariants }
