// @ts-check
/**
 * Single source of truth pipeline.
 *
 * Reads the authoritative Figma variable export and emits
 * `lib/design-tokens.generated.ts`, then VERIFIES the 35 semantic colors
 * against `app/globals.css`. Any drift between design (export) and code
 * (globals.css) fails the build. Never hand-edit the generated file or a
 * token value — re-export from Figma and re-run `npm run tokens`.
 *
 * Usage: node scripts/generate-tokens.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")

const EXPORT_PATH =
  process.env.FIGMA_EXPORT ??
  "/Users/yuri/Desktop/uremdesu/figma-plugin/variables-export.json"
const GLOBALS_PATH = resolve(ROOT, "app/globals.css")
const OUT_PATH = resolve(ROOT, "lib/design-tokens.generated.ts")

// ─── helpers ────────────────────────────────────────────────────────────────

/** {r,g,b,a} in 0..1 → "#rrggbb" (a==1) or "rgb(r g b / a)" — matches globals.css. */
function formatColor({ r, g, b, a }) {
  const to255 = (n) => Math.round(n * 255)
  const [R, G, B] = [to255(r), to255(g), to255(b)]
  if (a === 1) {
    const hex = [R, G, B].map((n) => n.toString(16).padStart(2, "0")).join("")
    return `#${hex}`
  }
  return `rgb(${R} ${G} ${B} / ${parseFloat(a.toFixed(2))})`
}

/** Figma half-step naming uses a comma decimal separator: "gap-2,5" → "2.5". */
const commaToDot = (s) => s.replace(/,/g, ".")

function firstMode(v) {
  const modes = Object.keys(v.valuesByMode)
  return v.valuesByMode[modes[0]]
}

// ─── load export ──────────────────────────────────────────────────────────────

if (!existsSync(EXPORT_PATH)) {
  console.error(`✗ Figma export not found: ${EXPORT_PATH}`)
  console.error(`  Set FIGMA_EXPORT=/path/to/variables-export.json and retry.`)
  process.exit(1)
}

const data = JSON.parse(readFileSync(EXPORT_PATH, "utf8"))
const byCollection = (name) =>
  data.variables.filter((v) => v.collectionName === name)

// ─── Tier 2 — semantic colors (shadcn/ui, Light + Dark) ───────────────────────

const semanticColors = byCollection("shadcn/ui")
  .filter((v) => v.resolvedType === "COLOR")
  .map((v) => {
    const light = v.valuesByMode["Light mode"]
    const dark = v.valuesByMode["Dark mode"]
    return {
      name: v.name,
      cssVar: `--${v.name}`,
      light: formatColor(light.value),
      dark: formatColor(dark.value),
      lightAlias: light.alias ?? null,
      darkAlias: dark.alias ?? null,
    }
  })

// ─── Tier 1 — raw palette (tw/colors) ─────────────────────────────────────────

const palette = byCollection("tw/colors")
  .filter((v) => v.resolvedType === "COLOR")
  .map((v) => {
    const [ramp, step] = v.name.includes("/")
      ? v.name.split("/")
      : [v.name, null]
    return { name: v.name, ramp, step, hex: formatColor(firstMode(v).value) }
  })

// ─── Tier 3 — scales ──────────────────────────────────────────────────────────

const RADIUS_STEPS = ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "full"]
const radiusScale = byCollection("border-radius")
  .filter((v) => {
    const m = /^rounded-(.+)$/.exec(v.name)
    return m && RADIUS_STEPS.includes(m[1])
  })
  .map((v) => ({ utility: v.name, px: firstMode(v).value }))
  .sort((a, b) => a.px - b.px)

// base spacing scale from the `gap` collection (non-directional steps only)
const spacingScale = byCollection("gap")
  .filter((v) => /^gap-\d/.test(v.name) && !/^gap-[xy]-/.test(v.name))
  .map((v) => ({
    step: commaToDot(v.name.replace(/^gap-/, "")),
    px: firstMode(v).value,
  }))
  .sort((a, b) => a.px - b.px)

const font = byCollection("font")
const pickFont = (prefix) =>
  font
    .filter((v) => v.name.startsWith(prefix))
    .map((v) => ({ name: v.name.slice(prefix.length), value: firstMode(v).value }))

const fontFamilies = pickFont("familly/") // note: Figma kit spells it "familly"
const fontSizes = pickFont("size/")
  .map((s) => ({ ...s, px: s.value }))
  .sort((a, b) => a.px - b.px)
const fontWeights = pickFont("weight/").sort((a, b) => a.value - b.value)
const fontStyles = pickFont("style/")
const tracking = pickFont("tracking/").map((t) => ({
  name: t.name,
  px: t.value,
  em: parseFloat((t.value / 16).toFixed(4)),
}))
const leading = pickFont("leading/")
  .map((l) => ({ ...l, px: l.value }))
  .sort((a, b) => a.px - b.px)

const borderWidths = byCollection("border-width")
  .filter((v) => /^border(-\d+)?$/.test(v.name))
  .map((v) => ({ utility: v.name, px: firstMode(v).value }))
  .sort((a, b) => a.px - b.px)

const strokeWidths = byCollection("stroke-width")
  .map((v) => ({ utility: commaToDot(v.name), value: firstMode(v).value }))
  .sort((a, b) => a.value - b.value)

const opacity = byCollection("opacity")
  .map((v) => ({ utility: v.name, value: firstMode(v).value }))
  .sort((a, b) => a.value - b.value)

// ─── emit generated module ────────────────────────────────────────────────────

const j = (x) => JSON.stringify(x, null, 2)
const banner = `// ⚠ GENERATED — do not edit. Source: Figma export "${data.format}".
// Regenerate with \`npm run tokens\`. Values are verified against app/globals.css.
`

const out = `${banner}
export type SemanticColor = {
  name: string
  cssVar: string
  light: string
  dark: string
  lightAlias: string | null
  darkAlias: string | null
}
export type PaletteColor = { name: string; ramp: string; step: string | null; hex: string }
export type ScaleStep = { utility: string; px: number }
export type SpacingStep = { step: string; px: number }
export type NamedValue = { name: string; value: string | number }
export type FontSize = { name: string; value: number; px: number }
export type Tracking = { name: string; px: number; em: number }
export type Leading = { name: string; value: number; px: number }
export type StrokeWidth = { utility: string; value: number }
export type OpacityStep = { utility: string; value: number }

export const figmaExportFormat = ${j(data.format)} as const
export const tokenCounts = {
  total: ${data.variables.length},
  semanticColors: ${semanticColors.length},
  palette: ${palette.length},
} as const

export const semanticColors: SemanticColor[] = ${j(semanticColors)}
export const palette: PaletteColor[] = ${j(palette)}
export const radiusScale: ScaleStep[] = ${j(radiusScale)}
export const spacingScale: SpacingStep[] = ${j(spacingScale)}
export const fontFamilies: NamedValue[] = ${j(fontFamilies)}
export const fontSizes: FontSize[] = ${j(fontSizes)}
export const fontWeights: NamedValue[] = ${j(fontWeights)}
export const fontStyles: NamedValue[] = ${j(fontStyles)}
export const tracking: Tracking[] = ${j(tracking)}
export const leading: Leading[] = ${j(leading)}
export const borderWidths: ScaleStep[] = ${j(borderWidths)}
export const strokeWidths: StrokeWidth[] = ${j(strokeWidths)}
export const opacity: OpacityStep[] = ${j(opacity)}
`

writeFileSync(OUT_PATH, out)
console.log(`✓ Wrote ${OUT_PATH.replace(ROOT + "/", "")}`)
console.log(
  `  semantic=${semanticColors.length} palette=${palette.length} ` +
    `radius=${radiusScale.length} spacing=${spacingScale.length} ` +
    `sizes=${fontSizes.length} weights=${fontWeights.length}`
)

// ─── verify semantic colors against globals.css ───────────────────────────────

function parseCssBlock(css, selector) {
  // grab the first {...} block following the selector
  const re = new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([^}]*)\\}`)
  const body = re.exec(css)?.[1] ?? ""
  /** @type {Record<string,string>} */
  const map = {}
  for (const line of body.split("\n")) {
    const m = /^\s*(--[\w-]+):\s*([^;]+);/.exec(line.replace(/\/\*.*?\*\//g, ""))
    if (m) map[m[1].trim()] = m[2].trim()
  }
  return map
}

const css = readFileSync(GLOBALS_PATH, "utf8")
const rootMap = parseCssBlock(css, ":root")
const darkMap = parseCssBlock(css, ".dark")

const mismatches = []
for (const t of semanticColors) {
  if (rootMap[t.cssVar] !== t.light)
    mismatches.push([t.cssVar, "light", t.light, rootMap[t.cssVar] ?? "(absent)"])
  if (darkMap[t.cssVar] !== t.dark)
    mismatches.push([t.cssVar, "dark", t.dark, darkMap[t.cssVar] ?? "(absent)"])
}

if (mismatches.length) {
  console.error(`\n✗ ${mismatches.length} token(s) drift between export and globals.css:`)
  for (const [v, mode, exp, got] of mismatches)
    console.error(`  ${v} (${mode}): export=${exp}  globals.css=${got}`)
  console.error(`\nResolve by re-syncing globals.css from Figma (DESIGN.md §2.2).`)
  process.exit(1)
}
console.log(`✓ Verified ${semanticColors.length} semantic colors match app/globals.css (0 drift)`)
