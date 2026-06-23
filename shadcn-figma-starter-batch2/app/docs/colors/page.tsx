import type { Metadata } from "next"
import { Sun, Moon } from "lucide-react"
import { PageHeader } from "@/components/docs/page-header"
import { ColorTokenRow } from "@/components/docs/color-token-row"
import {
  colorTokensByGroup,
  tokenCounts,
  type ColorGroup,
  type EnrichedColor,
} from "@/lib/design-tokens"

export const metadata: Metadata = { title: "Colors" }

// ─── Group metadata ──────────────────────────────────────────────────────────

const GROUP_META: Record<
  ColorGroup,
  { description: string; accentClass: string }
> = {
  "Core surface": {
    description:
      "The foundational layer — page, card, and popover surfaces with their text colors. Every screen starts here.",
    accentClass: "bg-foreground",
  },
  "Brand & intent": {
    description:
      "Communicates action and status: primary CTA, secondary alternatives, muted contexts, accent highlights, and destructive danger.",
    accentClass: "bg-primary",
  },
  "Forms & focus": {
    description:
      "Controls every edge of an interactive field: the border at rest, the fill, and the focus ring.",
    accentClass: "bg-ring",
  },
  Charts: {
    description:
      "Five sequential blue tones for data visualization. Use them in order so series remain distinguishable.",
    accentClass: "bg-[var(--chart-3)]",
  },
  Sidebar: {
    description:
      "Navigation rail tokens — kept separate from the page surface so the rail reads distinctly at any viewport.",
    accentClass: "bg-sidebar-primary",
  },
  Extras: {
    description: "Kit-specific tokens for overlays, scrims, and semantic surfaces not covered by standard shadcn.",
    accentClass: "bg-muted-foreground",
  },
}

// ─── Pair detection ──────────────────────────────────────────────────────────

/**
 * Find surface+foreground pairs within a token list.
 * Special case: "background" pairs with "foreground" (no -foreground suffix).
 */
function findPairs(
  tokens: EnrichedColor[]
): Array<{ surface: EnrichedColor; fg: EnrichedColor }> {
  const byName = new Map(tokens.map((t) => [t.name, t]))
  return tokens
    .filter((t) => !t.name.endsWith("-foreground"))
    .flatMap((surface) => {
      const fgName =
        surface.name === "background" ? "foreground" : `${surface.name}-foreground`
      const fg = byName.get(fgName)
      return fg ? [{ surface, fg }] : []
    })
}

// ─── Pair preview ────────────────────────────────────────────────────────────

/**
 * Shows how surface+foreground pairs actually render — the most informative
 * thing you can show for a color token: text legibility on the paired surface.
 */
function PairPreviewStrip({
  pairs,
}: {
  pairs: Array<{ surface: EnrichedColor; fg: EnrichedColor }>
}) {
  if (pairs.length === 0) return null

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/30 p-4">
      <p className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
        Applied pairs — surface + foreground rendered
      </p>
      <div className="flex flex-wrap gap-3">
        {pairs.map(({ surface, fg }) => (
          <div key={surface.name} className="flex flex-col gap-1.5">
            {/* Pair label */}
            <span className="font-mono text-[0.6rem] text-muted-foreground">
              {surface.name} / {fg.name}
            </span>
            {/* Light + Dark side by side */}
            <div className="flex overflow-hidden rounded-md border border-border/60">
              {/* Light mode */}
              <div
                className="flex w-20 flex-col items-center justify-center gap-0.5 py-2.5"
                style={{ backgroundColor: surface.light }}
              >
                <span
                  className="text-sm font-bold leading-none"
                  style={{ color: fg.light }}
                >
                  Aa
                </span>
                <span
                  className="font-mono text-[0.45rem] leading-none opacity-60"
                  style={{ color: fg.light }}
                >
                  {surface.light}
                </span>
              </div>
              {/* Divider */}
              <div className="w-px bg-border/60 shrink-0" />
              {/* Dark mode */}
              <div
                className="flex w-20 flex-col items-center justify-center gap-0.5 py-2.5"
                style={{ backgroundColor: surface.dark }}
              >
                <span
                  className="text-sm font-bold leading-none"
                  style={{ color: fg.dark }}
                >
                  Aa
                </span>
                <span
                  className="font-mono text-[0.45rem] leading-none opacity-60"
                  style={{ color: fg.dark }}
                >
                  {surface.dark}
                </span>
              </div>
            </div>
            {/* Mode labels */}
            <div className="flex justify-between px-0.5">
              <span className="flex items-center gap-0.5 text-[0.55rem] text-muted-foreground">
                <Sun className="size-2" aria-hidden /> Light
              </span>
              <span className="flex items-center gap-0.5 text-[0.55rem] text-muted-foreground">
                <Moon className="size-2" aria-hidden /> Dark
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Chart palette strip ─────────────────────────────────────────────────────

function ChartPaletteStrip({
  tokens,
}: {
  tokens: EnrichedColor[]
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/30 p-4">
      <p className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
        Series palette — use in order
      </p>
      <div className="flex gap-0 overflow-hidden rounded-md border border-border/60">
        {tokens.map((t, i) => (
          <div
            key={t.name}
            className="group relative flex flex-1 flex-col items-center justify-end pb-1.5 pt-6"
            style={{ backgroundColor: t.light }}
            title={`${t.name}: ${t.light}`}
          >
            <span className="font-mono text-[0.5rem] font-bold text-white/80 select-none">
              {i + 1}
            </span>
          </div>
        ))}
      </div>
      <p className="text-[0.6875rem] text-muted-foreground">
        All five chart colors share the same value in light and dark mode (fixed palette).
      </p>
    </div>
  )
}

// ─── Column header row ───────────────────────────────────────────────────────

function TableColumnHeader() {
  return (
    <div className="grid grid-cols-1 gap-3 border-b border-border bg-muted/40 px-4 py-2 md:grid-cols-[minmax(0,1fr)_8rem_8rem] md:items-center">
      <span className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
        Token
      </span>
      <span className="hidden items-center gap-1 text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground md:flex">
        <Sun className="size-3" aria-hidden />
        Light mode
      </span>
      <span className="hidden items-center gap-1 text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground md:flex">
        <Moon className="size-3" aria-hidden />
        Dark mode
      </span>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ColorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Colors"
        description={`${tokenCounts.semanticColors} semantic tokens across ${colorTokensByGroup.length} groups — each resolved for light and dark mode and aliased to a Tailwind swatch. Always reference by name; never use raw hex values in component code.`}
      />

      {/* Quick-nav chips */}
      <nav aria-label="Token groups" className="flex flex-wrap gap-2">
        {colorTokensByGroup.map(({ group, tokens }) => {
          const meta = GROUP_META[group]
          return (
            <a
              key={group}
              href={`#group-${group.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <span
                className={`size-2 rounded-full ${meta?.accentClass ?? "bg-muted-foreground"}`}
                aria-hidden
              />
              {group}
              <span className="text-muted-foreground">{tokens.length}</span>
            </a>
          )
        })}
      </nav>

      {/* Token groups */}
      {colorTokensByGroup.map(({ group, tokens }) => {
        const meta = GROUP_META[group]
        const pairs = findPairs(tokens)

        return (
          <section
            key={group}
            id={`group-${group.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex flex-col gap-4 scroll-mt-6"
          >
            {/* Group header */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={`h-4 w-1 rounded-full ${meta?.accentClass ?? "bg-muted-foreground"}`}
                  aria-hidden
                />
                <h2 className="text-lg font-semibold text-foreground">{group}</h2>
                <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[0.6875rem] font-medium text-muted-foreground">
                  {tokens.length} token{tokens.length !== 1 ? "s" : ""}
                </span>
              </div>
              {meta?.description ? (
                <p className="pl-3 text-sm text-muted-foreground">{meta.description}</p>
              ) : null}
            </div>

            {/* Applied pair preview — only for groups with surface+foreground pairs */}
            {pairs.length > 0 && <PairPreviewStrip pairs={pairs} />}

            {/* Chart palette preview */}
            {group === "Charts" && <ChartPaletteStrip tokens={tokens} />}

            {/* Token table */}
            <div className="overflow-hidden rounded-lg border border-border">
              <TableColumnHeader />
              {tokens.map((token) => (
                <ColorTokenRow key={token.name} token={token} />
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}
