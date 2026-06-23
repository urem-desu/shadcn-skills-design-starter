"use client"

import { Toaster as Sonner } from "sonner"

/**
 * Sonner — toast notification provider.
 * Zero seams: Sonner exposes CSS custom properties (`--normal-bg`, `--normal-border`,
 * `--normal-text`, etc.) that we override to point at our semantic tokens. No
 * component-scoped token file needed. The `theme` prop is passed through to match
 * the page's data-theme attribute.
 *
 * Usage: place <Toaster /> once at the root layout.
 * Trigger toasts with: import { toast } from "sonner"; toast("Message")
 */

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: [
            "group toast",
            "group-[.toaster]:bg-[var(--surface-card)]",
            "group-[.toaster]:text-[var(--text-primary)]",
            "group-[.toaster]:border group-[.toaster]:border-[var(--border-default)]",
            "group-[.toaster]:shadow-[var(--shadow-lg)]",
            "group-[.toaster]:rounded-[var(--radius-lg)]",
          ].join(" "),
          description: "group-[.toast]:text-[var(--text-secondary)]",
          actionButton: [
            "group-[.toast]:bg-[var(--action-primary)]",
            "group-[.toast]:text-[var(--action-primary-text)]",
            "group-[.toast]:rounded-[var(--radius-sm)]",
          ].join(" "),
          cancelButton: [
            "group-[.toast]:bg-[var(--action-secondary)]",
            "group-[.toast]:text-[var(--text-secondary)]",
            "group-[.toast]:rounded-[var(--radius-sm)]",
          ].join(" "),
          success: "group-[.toast]:text-[var(--text-primary)] group-[.toast]:border-[var(--green-300)]",
          error: "group-[.toast]:text-[var(--text-destructive)] group-[.toast]:border-[var(--red-300)]",
          warning: "group-[.toast]:text-[var(--amber-700)] group-[.toast]:border-[var(--amber-300)]",
          info: "group-[.toast]:text-[var(--text-link)] group-[.toast]:border-[var(--blue-200)]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
