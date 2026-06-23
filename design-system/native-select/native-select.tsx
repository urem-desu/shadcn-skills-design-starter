import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Native Select — styled native <select> element. The chevron icon is
 * rendered as a non-interactive overlay (pointer-events:none) so the
 * native dropdown still triggers on click. Reads shared --field-* tokens;
 * no component-scoped seams.
 */
const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full">
    <select
      ref={ref}
      className={cn(
        "flex h-[var(--control-md)] w-full appearance-none",
        "rounded-[var(--field-radius)] border border-[var(--field-border)]",
        "bg-[var(--field-bg)] pl-[var(--space-3)] pr-[var(--space-9)]",
        "text-[length:var(--font-size-sm)] text-[var(--field-text)]",
        "transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
        "hover:border-[var(--field-border-hover)]",
        "focus:border-[var(--field-border-focus)] focus:shadow-[var(--field-focus-ring)] focus:outline-none",
        "disabled:cursor-not-allowed disabled:bg-[var(--field-bg-disabled)] disabled:opacity-50",
        className
      )}
      {...props}
    />
    <ChevronDown
      aria-hidden="true"
      className="pointer-events-none absolute right-[var(--space-3)] top-1/2 -translate-y-1/2 size-[var(--icon-sm)] text-[var(--text-secondary)]"
    />
  </div>
))
NativeSelect.displayName = "NativeSelect"

export { NativeSelect }
