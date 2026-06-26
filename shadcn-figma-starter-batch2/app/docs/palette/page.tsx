import type { Metadata } from "next"
import { PageHeader } from "@/components/docs/page-header"
import { PalettePageClient } from "@/components/docs/palette-page-client"
import { paletteByRamp, tokenCounts, semanticColors } from "@/lib/design-tokens"

export const metadata: Metadata = { title: "Palette" }

function buildAliasMap(): Map<string, string[]> {
  const map = new Map<string, string[]>()
  for (const c of semanticColors) {
    const aliases = new Set<string>()
    if (c.lightAlias) aliases.add(c.lightAlias)
    if (c.darkAlias) aliases.add(c.darkAlias)
    for (const alias of aliases) {
      if (!map.has(alias)) map.set(alias, [])
      const list = map.get(alias)!
      if (!list.includes(c.name)) list.push(c.name)
    }
  }
  return map
}

const aliasMap = buildAliasMap()

export default function PalettePage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Palette"
        description={`${tokenCounts.palette} Tier-1 primitives from the Figma "tw/colors" collection. Components reference semantic tokens — not these raw values. Dots on a step mark primitives aliased by a semantic token.`}
      />

      {/* Quick-nav chips */}
      <nav aria-label="Palette ramps" className="flex flex-wrap gap-2">
        {paletteByRamp.map(({ ramp, colors }) => (
          <a
            key={ramp}
            href={`#ramp-${ramp}`}
            className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span
              className="size-2.5 rounded-full ring-1 ring-border/40"
              style={{
                backgroundColor:
                  colors[Math.floor(colors.length / 2)]?.hex ?? colors[0]?.hex,
              }}
              aria-hidden
            />
            <span className="capitalize">{ramp}</span>
            <span className="text-muted-foreground">{colors.length}</span>
          </a>
        ))}
      </nav>

      {/* Legend */}
      <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2">
        <div className="relative h-5 w-10 shrink-0 overflow-hidden rounded ring-1 ring-border/40">
          <div className="absolute inset-0 bg-primary" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-1.5 rounded-full bg-white/80 ring-1 ring-black/25" />
          </div>
        </div>
        <span className="text-xs text-muted-foreground">
          White dot on a step = that primitive is aliased by a semantic token
        </span>
      </div>

      {/* Format picker + ramp grid (client — format state lives here) */}
      <PalettePageClient ramps={paletteByRamp} aliasMap={aliasMap} />
    </>
  )
}
