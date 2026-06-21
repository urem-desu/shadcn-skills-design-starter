import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Radio — token-driven, thin custom control (same pattern as Checkbox): real
 * <input type=radio> on top, drawn circular box overlay, filled dot on :checked.
 * Group radios by passing the same `name`. Control-only — pair with <Label>;
 * wrap a set in <fieldset><legend> for the group name.
 */
export type RadioProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => (
    <span className={cn("relative inline-grid size-[var(--control-box-size)] shrink-0 place-items-center align-middle", className)}>
      <input
        ref={ref}
        type="radio"
        className="peer absolute inset-0 m-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        {...props}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none grid size-full place-items-center rounded-[var(--radio-radius)]",
          "border-[1.5px] border-[var(--control-box-border)] bg-[var(--control-box-bg)]",
          "transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
          "peer-checked:border-[var(--control-checked-bg)]",
          "peer-focus-visible:shadow-[var(--focus-ring)] peer-disabled:opacity-50",
          "peer-checked:[&_.dot]:opacity-100"
        )}
      >
        <span className="dot size-[.5rem] rounded-[var(--radius-full)] bg-[var(--control-checked-bg)] opacity-0 transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-out)]" />
      </span>
    </span>
  )
)
Radio.displayName = "Radio"

export { Radio }
