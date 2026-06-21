import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Button — token-driven (3-tier): every visual value resolves to a CSS variable
 * from theme.css (component → semantic → primitive). No hardcoded colors, px,
 * radii, durations, or font values.
 *
 * - Colors come from Tailwind `@theme` utilities (bg-button-primary, …) that map
 *   to --button-* component tokens.
 * - Geometry/typography/motion come from arbitrary-value utilities that read the
 *   control/spacing/font/radius/motion CSS vars directly.
 */
const buttonVariants = cva(
  // base: layout, type, radius, motion, focus ring, disabled — all tokenized
  [
    "inline-flex items-center justify-center gap-[var(--space-2)] whitespace-nowrap align-middle",
    "rounded-[var(--button-radius)] font-[var(--button-font-weight)]",
    "transition-[background-color,color,box-shadow,border-color]",
    "duration-[var(--button-transition-duration)] ease-[var(--button-transition-ease)]",
    "outline-none focus-visible:shadow-[var(--button-focus-ring)]",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:cursor-not-allowed",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "select-none",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-button-primary text-button-primary-foreground hover:bg-button-primary-hover active:bg-button-primary-active",
        secondary:
          "bg-button-secondary text-button-secondary-foreground hover:bg-button-secondary-hover active:bg-button-secondary-active",
        ghost:
          "bg-transparent text-button-ghost-foreground hover:bg-button-ghost-hover active:bg-button-ghost-active",
        destructive:
          "bg-button-destructive text-button-destructive-foreground hover:bg-button-destructive-hover active:bg-button-destructive-active",
        link: "bg-transparent text-button-link underline-offset-4 hover:text-button-link-hover hover:underline",
      },
      size: {
        sm: "h-[var(--control-sm)] px-[var(--space-3)] text-[length:var(--font-size-sm)] [&_svg]:size-[var(--icon-sm)]",
        md: "h-[var(--control-md)] px-[var(--space-4)] text-[length:var(--font-size-base)] [&_svg]:size-[var(--icon-md)]",
        lg: "h-[var(--control-lg)] px-[var(--space-6)] text-[length:var(--font-size-lg)] [&_svg]:size-[var(--icon-lg)]",
        icon: "size-[var(--control-md)] [&_svg]:size-[var(--icon-md)]",
      },
      selected: {
        true: "",
        false: "",
      },
    },
    // Selected (toggle) overrides background to the selected token, per variant.
    compoundVariants: [
      {
        selected: true,
        variant: ["primary", "secondary", "ghost", "destructive"],
        class:
          "bg-button-selected text-button-selected-foreground border border-button-selected-border hover:bg-button-selected",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      selected: false,
    },
  }
)

type ButtonBaseProps = {
  /** Render through to a child element (e.g. an <a>) via Radix Slot. */
  asChild?: boolean
  /** Async state: shows a spinner, sets aria-busy, blocks interaction. */
  loading?: boolean
  /** Optional label announced/shown while loading (defaults to children). */
  loadingText?: string
  /** Toggle/segmented selected state — sets aria-pressed + selected tokens. */
  selected?: boolean
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, "selected">,
    ButtonBaseProps {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loadingText,
      selected = false,
      disabled,
      children,
      type,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading

    return (
      <Comp
        ref={ref}
        // native <button> gets a real type; Slot forwards to its child element
        type={asChild ? undefined : (type ?? "button")}
        className={cn(buttonVariants({ variant, size, selected }), className)}
        disabled={asChild ? undefined : isDisabled}
        aria-disabled={asChild ? isDisabled || undefined : undefined}
        aria-busy={loading || undefined}
        aria-pressed={selected || undefined}
        data-loading={loading || undefined}
        data-selected={selected || undefined}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            <span>{loadingText ?? children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
