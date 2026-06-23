"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Field — accessible form-field layout wrapper.
 * Composes Label, a control slot (Input / Select / Textarea / etc.),
 * optional hint text, and optional error message. Error suppresses hint.
 * No Radix primitive; no component-scoped seams — reads shared field/text tokens.
 */
interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  htmlFor?: string
  hint?: string
  error?: string
  required?: boolean
  id?: string
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ label, htmlFor, hint, error, required, className, children, id, ...props }, ref) => {
    const descId = id ? `${id}-desc` : undefined
    return (
      <div ref={ref} className={cn("flex flex-col gap-[var(--space-1-5)]", className)} {...props}>
        {label && (
          <label
            htmlFor={htmlFor}
            className="text-[length:var(--font-size-sm)] font-[var(--font-weight-medium)] leading-[var(--line-tight)] text-[var(--text-primary)]"
          >
            {label}
            {required && (
              <span className="ml-[var(--space-0-5)] text-[var(--text-destructive)]" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        {children}
        {error ? (
          <p
            id={descId}
            role="alert"
            aria-live="polite"
            className="text-[length:var(--font-size-xs)] leading-[var(--line-normal)] text-[var(--text-destructive)]"
          >
            {error}
          </p>
        ) : hint ? (
          <p
            id={descId}
            className="text-[length:var(--font-size-xs)] leading-[var(--line-normal)] text-[var(--text-secondary)]"
          >
            {hint}
          </p>
        ) : null}
      </div>
    )
  }
)
Field.displayName = "Field"

export { Field }
