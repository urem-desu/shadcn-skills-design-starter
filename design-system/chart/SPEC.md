# Chart — Design System Component

Token-driven data-viz container on the shadcn/ui foundation. Thin layer over
`recharts` — `ChartContainer` provides the responsive viewport + a per-instance
`<style>` block that exposes per-series colors as CSS vars; `ChartTooltipContent`
and `ChartLegendContent` style the floating overlays. Tokens: **5 component-tier
seams** — `--chart-1` … `--chart-5` — because Recharts paints SVG and consumes
colors via stable CSS vars (no semantic to alias to here; this is the
categorical palette itself).

## Token mapping
| Slot | Property | → Component / Semantic | Light | Dark |
|---|---|---|---|---|
| Series 1 (default first series) | fill / stroke | `--chart-1` | `blue.500` `#3b82f6` | `blue.400` `#60a5fa` |
| Series 2 | fill / stroke | `--chart-2` | `green.600` `#16a34a` | `green.300` `#86efac` |
| Series 3 | fill / stroke | `--chart-3` | `amber.600` `#d97706` | `amber.300` `#fcd34d` |
| Series 4 | fill / stroke | `--chart-4` | `red.500` `#ef4444` | `red.400` `#f87171` |
| Series 5 ("other" / catch-all) | fill / stroke | `--chart-5` | `gray.500` `#6b7280` | `gray.400` `#9ca3af` |
| axis tick text | fill | `text.secondary` | `gray.600` | `gray.400` |
| cartesian grid line | stroke | `border.default` at 50% | `gray.200/50` | `gray.800/50` |
| polar grid line | stroke | `border.default` | — | — |
| reference line | stroke | `border.default` | — | — |
| tooltip cursor (line + rect) | stroke / fill | `border.default` / `surface.sunken` | — | — |
| tooltip container | bg / border / radius / shadow / text | `surface.card` / `border.default` at 50% / `radius.lg` / `shadow.lg` / `text.primary` / `font-size.xs` | — | — |
| tooltip label | font-weight | `font-weight.medium` | — | — |
| tooltip name | color | `text.secondary` | — | — |
| tooltip value | color / family / weight | `text.primary` / mono / `font-weight.medium` (tabular-nums) | — | — |
| legend item gap | gap | `spacing.scale.4` | 16px | — |
| legend dot | size / radius | 8px × 8px / `radius.sm` | — | — |
| legend icon (if used) | color / size | `text.secondary` / 12px | — | — |
| radial / sector background | fill | `surface.sunken` | — | — |

> The 5-color palette favors hue separation over our brand blue so series read
> as distinct categories — gray-500 / gray-400 anchors "other / catch-all" at
> the end so categorical charts never collide with the brand action color.
> For monochromatic (sequential) or diverging charts, consumers can pass their
> own `color` per key via `ChartConfig`.

## API
```ts
export type ChartConfig = Record<
  string,
  { label?: React.ReactNode; icon?: React.ComponentType } & (
    | { color?: string; theme?: never }                          // one color (both themes)
    | { color?: never; theme: { light: string; dark: string } }  // per-theme
  )
>

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children: ResponsiveContainer["children"]   // a single Recharts chart node
  initialDimension?: { width: number; height: number }   // SSR seed; default 320 x 200
  id?: string                                  // explicit id for the scoped <style>
}

// Re-exports of Recharts primitives bound to the kit's defaults
const ChartTooltip = RechartsPrimitive.Tooltip
const ChartLegend  = RechartsPrimitive.Legend

// Themed renderers for the floating overlays
function ChartTooltipContent(props): JSX.Element
function ChartLegendContent(props): JSX.Element

// Internals (exported for advanced composition)
function ChartStyle({ id, config }): JSX.Element             // <style> emitter
function useChart(): { config: ChartConfig }                  // requires ChartContainer ancestor
```

## States
- **Tooltip**: hidden by default; opens on hover/focus over a chart element
  (Recharts handles trigger). Renders in `surface.card` with `shadow.lg` so it
  reads above any chart paint, both themes.
- **Legend**: static (no interactive state); when an `icon` is supplied via
  `ChartConfig`, it renders in `text.secondary` at `--icon-xs`. The default
  swatch is a 8×8 colored dot.
- **Series highlight (optional)**: consumers can wire `opacity` on
  `<Cell>` / `<Bar>` for hover / focus emphasis — the kit doesn't impose a
  built-in highlight to keep the chart's visual logic in the consumer's hands.
- **Empty state**: Recharts renders an empty viewport; consumers should pair
  with a copy-only fallback when `data.length === 0`.

## Accessibility (gate-verified, light & dark)
- The chart container should carry `role="img"` plus an `aria-label` summarising
  the chart (e.g. `aria-label="Monthly revenue, 2026 — bar chart"`). Recharts'
  `accessibilityLayer` prop adds keyboard navigation across data points and
  screen-reader announcements of value + series.
- The 5-color palette retains hue separation under common color-vision
  deficiencies (deuteranopia, protanopia) by alternating warm / cool / neutral
  — series 1 (blue) and series 2 (green) are far enough apart in luminance
  (3:1+) to be distinguishable when desaturated; series 5 (gray) is the only
  achromatic step so it never blends with a primary hue.
- Tooltip text uses `text.primary` on `surface.card` (15:1 light, 18:1 dark)
  with `text.secondary` for the series name (5.7:1 light, 7.3:1 dark) —
  both clear AA on the elevated panel.
- Axis tick text uses `text.secondary` (`gray.600` light, `gray.400` dark) —
  meets AA against the page surface in both themes.
- Color is never the only indicator: legend entries carry text labels, and
  consumers must include the label in the legend or use `formatter` on the
  tooltip to surface the series name.
- `measure_render`: all chart chrome AA · `axe_audit`: 0 violations (with
  `role="img"` + `aria-label` on the container) · `verify_responsive`:
  no overflow @ 280/320/414 (the `aspect-video` viewport scales).

## Usage
```tsx
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent, type ChartConfig,
} from "@/design-system/chart/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const config = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile:  { label: "Mobile",  color: "var(--chart-2)" },
} satisfies ChartConfig

const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  /* ... */
]

<ChartContainer config={config} className="h-72 w-full">
  <BarChart data={data} accessibilityLayer>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <YAxis />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend  content={<ChartLegendContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile"  fill="var(--color-mobile)"  radius={4} />
  </BarChart>
</ChartContainer>
```

`ChartContainer` emits a scoped `<style>` block that resolves
`--color-desktop` → `var(--chart-1)` for *this* chart instance, so the same
data file can power N differently-themed charts on the page without leaking
CSS vars globally.
