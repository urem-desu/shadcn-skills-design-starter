import { cn } from "@/lib/utils"

// Checkerboard so token alpha (e.g. --background-color, dark --sidebar-border)
// reads as transparency rather than a flat color.
const CHECKER =
  "repeating-conic-gradient(var(--muted) 0% 25%, var(--background) 0% 50%) 50% / 12px 12px"

/**
 * A color chip. `color` is a resolved value from the generated token registry
 * (verified == globals.css), so the chip equals what the app renders. Rendered
 * inline (not via a Tailwind palette class) because it is the artifact being
 * documented.
 */
export function Swatch({
  color,
  className,
  title,
}: {
  color: string
  className?: string
  title?: string
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-border/60",
        className
      )}
      title={title}
    >
      <div className="absolute inset-0" style={{ background: CHECKER }} aria-hidden />
      <div className="absolute inset-0" style={{ backgroundColor: color }} />
    </div>
  )
}
