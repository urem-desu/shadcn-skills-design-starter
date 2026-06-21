import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Checkbox - token-driven, thin custom control. A real <input type=checkbox>
 * sits on top (transparent, keeps native keyboard + a11y); a drawn box overlay
 * (pointer-events:none) shows the border/fill; check + indeterminate dash are two
 * <path> in ONE <svg> toggled by :checked / :indeterminate (identical stroke).
 * Control-only - pair with <Label>.
 */
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  indeterminate?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, indeterminate, ...props }, ref) => {
    const innerRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement)
    React.useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = !!indeterminate
    }, [indeterminate])

    return (
      <span className={cn("relative inline-grid size-[var(--control-box-size)] shrink-0 place-items-center align-middle", className)}>
        <input
          ref={innerRef}
          type="checkbox"
          className="peer absolute inset-0 m-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none grid size-full place-items-center rounded-[var(--checkbox-radius)]",
            "border-[1.5px] border-[var(--control-box-border)] bg-[var(--control-box-bg)]",
            "transition-[background-color,border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
            "peer-checked:border-[var(--control-checked-bg)] peer-checked:bg-[var(--control-checked-bg)]",
            "peer-indeterminate:border-[var(--control-checked-bg)] peer-indeterminate:bg-[var(--control-checked-bg)]",
            "peer-focus-visible:shadow-[var(--focus-ring)] peer-disabled:opacity-50",
            "peer-aria-[invalid=true]:border-[var(--border-error)]",
            "peer-checked:[&_.check]:opacity-100 peer-indeterminate:[&_.dash]:opacity-100"
          )}
        >
          <svg viewBox="0 0 16 16" fill="none" strokeLinecap="round" strokeLinejoin="round"
               className="size-[.62rem] stroke-[var(--control-checked-mark)] [stroke-width:2]">
            <path className="check opacity-0" d="M13 4.5 6.5 11.5 3 8" />
            <path className="dash opacity-0" d="M3.5 8h9" />
          </svg>
        </span>
      </span>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
