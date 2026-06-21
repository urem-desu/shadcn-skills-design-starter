import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Select — token-driven native <select> styled as a field (shares --field-*
 * tokens with Input/Textarea). Native select = full keyboard + mobile pickers
 * for free. A custom chevron overlays the control (pointer-events:none).
 * Error is driven by aria-invalid. For a richly-styled listbox, compose Radix
 * Select on top of the same tokens.
 */
export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  error?: boolean
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, "aria-invalid": ariaInvalid, ...props }, ref) => (
    <div className="relative inline-flex w-full max-w-[280px]">
      <select
        ref={ref}
        aria-invalid={error || ariaInvalid || undefined}
        className={cn(
          "w-full cursor-pointer appearance-none font-[inherit] outline-none",
          "h-[var(--control-md)] rounded-[var(--field-radius)] pl-[var(--space-3)]",
          "pr-[calc(var(--icon-sm)+var(--space-3)*2)] text-[length:var(--font-size-base)]",
          "border border-[var(--field-border)] bg-[var(--field-bg)] text-[var(--field-text)]",
          "transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
          "hover:border-[var(--field-border-hover)]",
          "focus-visible:border-[var(--field-border-focus)] focus-visible:shadow-[var(--field-focus-ring)]",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--field-bg-disabled)]",
          "aria-[invalid=true]:border-[var(--field-border-error)]",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute end-[var(--space-3)] top-1/2 size-[var(--icon-sm)] -translate-y-1/2 text-[var(--text-secondary)]"
      />
    </div>
  )
)
Select.displayName = "Select"

export { Select }
