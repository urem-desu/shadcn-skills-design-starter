/**
 * Public token surface for the docs site.
 *
 * Re-exports the GENERATED values (the single source of truth, verified against
 * app/globals.css) and layers on descriptive metadata only — group, purpose,
 * and the primary Tailwind utility. No color VALUE is authored here; values
 * live solely in lib/design-tokens.generated.ts. Purposes mirror DESIGN.md §2.3.
 */
import { semanticColors, type SemanticColor } from "./design-tokens.generated"

export * from "./design-tokens.generated"

export const COLOR_GROUPS = [
  "Core surface",
  "Brand & intent",
  "Forms & focus",
  "Charts",
  "Sidebar",
  "Extras",
] as const
export type ColorGroup = (typeof COLOR_GROUPS)[number]

/** Descriptive metadata per semantic token (text only — no values). */
const META: Record<string, { group: ColorGroup; purpose: string }> = {
  background: { group: "Core surface", purpose: "Page surface (also on body)" },
  foreground: { group: "Core surface", purpose: "Default text color" },
  card: { group: "Core surface", purpose: "Card surface" },
  "card-foreground": { group: "Core surface", purpose: "Text on cards" },
  popover: { group: "Core surface", purpose: "Floating panel surface (popover, dropdown, command)" },
  "popover-foreground": { group: "Core surface", purpose: "Text on floating panels" },

  primary: { group: "Brand & intent", purpose: "Primary action surface" },
  "primary-foreground": { group: "Brand & intent", purpose: "Text on primary" },
  secondary: { group: "Brand & intent", purpose: "Secondary action surface" },
  "secondary-foreground": { group: "Brand & intent", purpose: "Text on secondary" },
  muted: { group: "Brand & intent", purpose: "Muted surface" },
  "muted-foreground": { group: "Brand & intent", purpose: "Helper / secondary text" },
  accent: { group: "Brand & intent", purpose: "Hover / accent surface" },
  "accent-foreground": { group: "Brand & intent", purpose: "Text on accent" },
  destructive: { group: "Brand & intent", purpose: "Errors & destructive actions (single token — bg/text/border)" },

  border: { group: "Forms & focus", purpose: "Default border (applied to * in base layer)" },
  input: { group: "Forms & focus", purpose: "Form control borders / fills" },
  ring: { group: "Forms & focus", purpose: "Focus ring & base outline" },

  "chart-1": { group: "Charts", purpose: "Data series 1" },
  "chart-2": { group: "Charts", purpose: "Data series 2" },
  "chart-3": { group: "Charts", purpose: "Data series 3" },
  "chart-4": { group: "Charts", purpose: "Data series 4" },
  "chart-5": { group: "Charts", purpose: "Data series 5" },

  sidebar: { group: "Sidebar", purpose: "Sidebar surface" },
  "sidebar-foreground": { group: "Sidebar", purpose: "Sidebar text" },
  "sidebar-primary": { group: "Sidebar", purpose: "Active / primary nav item" },
  "sidebar-primary-foreground": { group: "Sidebar", purpose: "Text on active nav item" },
  "sidebar-accent": { group: "Sidebar", purpose: "Sidebar hover / accent" },
  "sidebar-accent-foreground": { group: "Sidebar", purpose: "Text on sidebar accent" },
  "sidebar-border": { group: "Sidebar", purpose: "Sidebar borders / separators" },
  "sidebar-ring": { group: "Sidebar", purpose: "Focus ring inside the sidebar" },

  "background-color": { group: "Extras", purpose: "Overlay / scrim behind modals" },
  "semantic-background": { group: "Extras", purpose: 'Kit "semantic" surface' },
  "semantic-foreground": { group: "Extras", purpose: "Text on semantic surface" },
  "semantic-border": { group: "Extras", purpose: 'Kit "semantic" border' },
}

/** Derive the primary Tailwind utility for a token from its name. */
export function tokenUtility(name: string): string {
  if (name.endsWith("-foreground") || name === "foreground") return `text-${name}`
  if (name === "border" || name.endsWith("-border")) return `border-${name}`
  if (name === "ring" || name.endsWith("-ring")) return `ring-${name}`
  if (name === "input") return `border-${name}`
  return `bg-${name}`
}

export type EnrichedColor = SemanticColor & {
  group: ColorGroup
  purpose: string
  utility: string
}

export const colorTokens: EnrichedColor[] = semanticColors.map((c) => ({
  ...c,
  group: META[c.name]?.group ?? "Extras",
  purpose: META[c.name]?.purpose ?? "",
  utility: tokenUtility(c.name),
}))

/** Color tokens grouped in display order. */
export const colorTokensByGroup: { group: ColorGroup; tokens: EnrichedColor[] }[] =
  COLOR_GROUPS.map((group) => ({
    group,
    tokens: colorTokens.filter((t) => t.group === group),
  })).filter((g) => g.tokens.length > 0)

/** Palette ramps grouped by ramp name, in export order. */
import { palette, type PaletteColor } from "./design-tokens.generated"

export const paletteByRamp: { ramp: string; colors: PaletteColor[] }[] = (() => {
  const order: string[] = []
  const map = new Map<string, PaletteColor[]>()
  for (const c of palette) {
    if (!map.has(c.ramp)) {
      map.set(c.ramp, [])
      order.push(c.ramp)
    }
    map.get(c.ramp)!.push(c)
  }
  return order.map((ramp) => ({ ramp, colors: map.get(ramp)! }))
})()
