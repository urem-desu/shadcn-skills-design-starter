import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Switch — token-driven toggle. Native <input type=checkbox role="switch"> on top
 * (keeps native keyboard + announces as a switch); drawn track + thumb overlay
 * (pointer-events:none). Off-track uses border-strong for 3:1 non-text contrast.
 * Provide an accessible name via a paired <Label> or aria-label.
 */
export type SwitchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "role">

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => (
    <span
      className={cn(
        "relative inline-block shrink-0 align-middle",
        "h-[var(--switch-track-h)] w-[var(--switch-track-w)]",
        className
      )}
    >
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className="peer absolute inset-0 z-10 m-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        {...props}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[var(--radius-full)] bg-[var(--switch-track-off)]",
          "transition-[background-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
          "peer-checked:bg-[var(--switch-track-on)] peer-focus-visible:shadow-[var(--focus-ring)] peer-disabled:opacity-50"
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-[var(--radius-full)] bg-[var(--switch-thumb)]",
          "left-[var(--space-0-5)] size-[var(--switch-thumb-size)] shadow-sm",
          "transition-[left] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
          "peer-checked:left-[calc(var(--switch-track-w)-var(--switch-thumb-size)-var(--space-0-5))] peer-disabled:opacity-50"
        )}
      />
    </span>
  )
)
Switch.displayName = "Switch"

export { Switch }
