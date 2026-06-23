"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Input Group — adorned input with prefix and/or suffix addons (icon, text,
 * or button). The outer wrapper provides the border and focus ring so the
 * inner <input> renders borderless. Addons share the field background tint
 * (surface-sunken) and are separated by a 1px border-default rule.
 * No Radix primitive. No component-scoped seams — reads shared field/space tokens.
 */
const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-[var(--control-md)] w-full items-stretch overflow-hidden",
        "rounded-[var(--field-radius)] border border-[var(--field-border)]",
        "bg-[var(--field-bg)] transition-[border-color,box-shadow]",
        "duration-[var(--duration-fast)] ease-[var(--ease-out)]",
        "focus-within:border-[var(--field-border-focus)] focus-within:shadow-[var(--field-focus-ring)]",
        "has-[input:disabled]:opacity-50 has-[input:disabled]:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
)
InputGroup.displayName = "InputGroup"

const InputAddon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-none items-center justify-center px-[var(--space-3)]",
        "bg-[var(--surface-sunken)]",
        "border-r border-[var(--field-border)]",
        "text-[length:var(--font-size-sm)] leading-[var(--line-tight)] text-[var(--text-secondary)]",
        "[&_svg]:size-[var(--icon-sm)] [&_svg]:shrink-0 [&_svg]:text-[var(--text-secondary)]",
        "last:border-r-0 last:border-l",
        className
      )}
      {...props}
    />
  )
)
InputAddon.displayName = "InputAddon"

const InputGroupField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "min-w-0 flex-1 bg-transparent px-[var(--space-3)]",
      "text-[length:var(--font-size-sm)] text-[var(--field-text)]",
      "placeholder:text-[var(--field-placeholder)]",
      "outline-none disabled:cursor-not-allowed",
      className
    )}
    {...props}
  />
))
InputGroupField.displayName = "InputGroupField"

export { InputGroup, InputAddon, InputGroupField }
