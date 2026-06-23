"use client"

import { CopyButton } from "@/components/docs/copy-button"
import type { EnrichedColor } from "@/lib/design-tokens"

// Checkerboard reveals transparency (e.g. sidebar-border in dark uses rgba).
const CHECKER =
  "repeating-conic-gradient(var(--muted) 0% 25%, var(--background) 0% 50%) 50% / 8px 8px"

/**
 * One mode column: swatch on top, hex value + palette alias below.
 * Vertical layout lets the column header align cleanly above both.
 */
function ModeCell({
  color,
  alias,
}: {
  color: string
  alias: string | null
}) {
  return (
    <div className="flex w-32 flex-col gap-1.5">
      {/* Swatch — full width of the cell */}
      <div className="relative h-10 w-full overflow-hidden rounded-md border border-border/60">
        <div className="absolute inset-0" style={{ background: CHECKER }} aria-hidden />
        <div className="absolute inset-0" style={{ backgroundColor: color }} />
      </div>

      {/* Hex + alias below the swatch */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-0.5">
          <span className="font-mono text-xs text-foreground tabular-nums">{color}</span>
          <CopyButton
            value={color}
            label={`Copy ${color}`}
            className="size-5 opacity-0 transition-opacity group-hover/row:opacity-100"
          />
        </div>
        {alias ? (
          <span className="font-mono text-[0.6875rem] text-muted-foreground">{alias}</span>
        ) : null}
      </div>
    </div>
  )
}

/**
 * Token row — [info col] [light col] [dark col]
 * Both mode columns are fixed w-32 so the table header aligns exactly.
 */
export function ColorTokenRow({ token }: { token: EnrichedColor }) {
  return (
    <div className="group/row grid grid-cols-1 gap-3 border-b border-border px-4 py-3.5 last:border-b-0 hover:bg-accent/30 transition-colors md:grid-cols-[minmax(0,1fr)_8rem_8rem] md:items-start">
      {/* Left: semantic info */}
      <div className="flex min-w-0 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground">
            {token.cssVar}
          </code>
          <CopyButton
            value={token.cssVar}
            label={`Copy ${token.cssVar}`}
            className="size-5 opacity-0 transition-opacity group-hover/row:opacity-100"
          />
          <span className="rounded-sm border border-border bg-background px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted-foreground">
            {token.utility}
          </span>
        </div>
        {token.purpose ? (
          <p className="text-[0.75rem] leading-normal text-muted-foreground">{token.purpose}</p>
        ) : null}
      </div>

      {/* Light mode */}
      <div className="flex flex-col gap-1">
        <span className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground md:hidden">
          Light
        </span>
        <ModeCell color={token.light} alias={token.lightAlias} />
      </div>

      {/* Dark mode */}
      <div className="flex flex-col gap-1">
        <span className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground md:hidden">
          Dark
        </span>
        <ModeCell color={token.dark} alias={token.darkAlias} />
      </div>
    </div>
  )
}
