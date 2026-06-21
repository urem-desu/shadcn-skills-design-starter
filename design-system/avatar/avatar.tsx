import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Avatar - token-driven user image with initials fallback. Self-contained
 * (no Radix dep): the fallback shows until the image loads, then the loaded
 * image covers it. All sizing/color from --avatar-* + sizing tokens.
 */
const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-hidden rounded-[var(--avatar-radius)] bg-[var(--avatar-bg)] align-middle",
  {
    variants: {
      size: {
        sm: "size-[var(--control-sm)]",
        md: "size-[var(--control-md)]",
        lg: "size-[var(--control-lg)]",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  /** Accessible name of the person (used as img alt). */
  name: string
  /** Initials shown before/if the image fails. Defaults to first letters of name. */
  fallback?: string
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, src, name, fallback, ...props }, ref) => {
    const [loaded, setLoaded] = React.useState(false)
    const [errored, setErrored] = React.useState(false)
    const showImg = src && !errored

    return (
      <span ref={ref} className={cn(avatarVariants({ size }), className)} {...props}>
        {/* fallback layer - initials, centered */}
        <span
          aria-hidden={showImg && loaded ? "true" : undefined}
          className="absolute inset-0 flex items-center justify-center text-[length:var(--font-size-sm)] font-[var(--font-weight-medium)] text-[var(--avatar-text)]"
        >
          {fallback ?? initials(name)}
        </span>
        {showImg && (
          <img
            src={src}
            alt={name}
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-[var(--duration-base)]",
              loaded ? "opacity-100" : "opacity-0"
            )}
          />
        )}
      </span>
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar, avatarVariants }
