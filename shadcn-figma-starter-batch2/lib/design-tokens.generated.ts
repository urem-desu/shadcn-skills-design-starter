// ⚠ GENERATED — do not edit. Source: Figma export "lazyyysync-variables-v1".
// Regenerate with `npm run tokens`. Values are verified against app/globals.css.

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

export const figmaExportFormat = "lazyyysync-variables-v1" as const
export const tokenCounts = {
  total: 1804,
  semanticColors: 35,
  palette: 244,
} as const

export const semanticColors: SemanticColor[] = [
  {
    "name": "background",
    "cssVar": "--background",
    "light": "#ffffff",
    "dark": "#0a0a0a",
    "lightAlias": "white",
    "darkAlias": "neutral/950"
  },
  {
    "name": "foreground",
    "cssVar": "--foreground",
    "light": "#0a0a0a",
    "dark": "#fafafa",
    "lightAlias": "neutral/950",
    "darkAlias": "neutral/50"
  },
  {
    "name": "card",
    "cssVar": "--card",
    "light": "#ffffff",
    "dark": "#171717",
    "lightAlias": "white",
    "darkAlias": "neutral/900"
  },
  {
    "name": "card-foreground",
    "cssVar": "--card-foreground",
    "light": "#0a0a0a",
    "dark": "#fafafa",
    "lightAlias": "neutral/950",
    "darkAlias": "neutral/50"
  },
  {
    "name": "popover",
    "cssVar": "--popover",
    "light": "#ffffff",
    "dark": "#262626",
    "lightAlias": "white",
    "darkAlias": "neutral/800"
  },
  {
    "name": "popover-foreground",
    "cssVar": "--popover-foreground",
    "light": "#0a0a0a",
    "dark": "#fafafa",
    "lightAlias": "neutral/950",
    "darkAlias": "neutral/50"
  },
  {
    "name": "primary",
    "cssVar": "--primary",
    "light": "#171717",
    "dark": "#cbd5e1",
    "lightAlias": "neutral/900",
    "darkAlias": "slate/300"
  },
  {
    "name": "primary-foreground",
    "cssVar": "--primary-foreground",
    "light": "#fafafa",
    "dark": "#171717",
    "lightAlias": "neutral/50",
    "darkAlias": "neutral/900"
  },
  {
    "name": "secondary",
    "cssVar": "--secondary",
    "light": "#f5f5f5",
    "dark": "#262626",
    "lightAlias": "neutral/100",
    "darkAlias": "neutral/800"
  },
  {
    "name": "secondary-foreground",
    "cssVar": "--secondary-foreground",
    "light": "#0a0a0a",
    "dark": "#fafafa",
    "lightAlias": "neutral/950",
    "darkAlias": "neutral/50"
  },
  {
    "name": "muted",
    "cssVar": "--muted",
    "light": "#f5f5f5",
    "dark": "#262626",
    "lightAlias": "neutral/100",
    "darkAlias": "neutral/800"
  },
  {
    "name": "muted-foreground",
    "cssVar": "--muted-foreground",
    "light": "#737373",
    "dark": "#a3a3a3",
    "lightAlias": "neutral/500",
    "darkAlias": "neutral/400"
  },
  {
    "name": "accent",
    "cssVar": "--accent",
    "light": "#f5f5f5",
    "dark": "#404040",
    "lightAlias": "neutral/100",
    "darkAlias": "neutral/700"
  },
  {
    "name": "accent-foreground",
    "cssVar": "--accent-foreground",
    "light": "#171717",
    "dark": "#fafafa",
    "lightAlias": "neutral/900",
    "darkAlias": "neutral/50"
  },
  {
    "name": "destructive",
    "cssVar": "--destructive",
    "light": "#dc2626",
    "dark": "#f87171",
    "lightAlias": "red/600",
    "darkAlias": "red/400"
  },
  {
    "name": "border",
    "cssVar": "--border",
    "light": "#e5e5e5",
    "dark": "#404040",
    "lightAlias": "neutral/200",
    "darkAlias": "neutral/700"
  },
  {
    "name": "input",
    "cssVar": "--input",
    "light": "#e5e5e5",
    "dark": "#1c1917",
    "lightAlias": "neutral/200",
    "darkAlias": "stone/900"
  },
  {
    "name": "ring",
    "cssVar": "--ring",
    "light": "#737373",
    "dark": "#cbd5e1",
    "lightAlias": "neutral/500",
    "darkAlias": "slate/300"
  },
  {
    "name": "chart-1",
    "cssVar": "--chart-1",
    "light": "#5eb1ef",
    "dark": "#5eb1ef",
    "lightAlias": "blue/8",
    "darkAlias": "blue/8"
  },
  {
    "name": "chart-2",
    "cssVar": "--chart-2",
    "light": "#0090ff",
    "dark": "#0090ff",
    "lightAlias": "blue/9",
    "darkAlias": "blue/9"
  },
  {
    "name": "chart-3",
    "cssVar": "--chart-3",
    "light": "#0588f0",
    "dark": "#0588f0",
    "lightAlias": "blue/10",
    "darkAlias": "blue/10"
  },
  {
    "name": "chart-4",
    "cssVar": "--chart-4",
    "light": "#0d74ce",
    "dark": "#0d74ce",
    "lightAlias": "blue/11",
    "darkAlias": "blue/11"
  },
  {
    "name": "chart-5",
    "cssVar": "--chart-5",
    "light": "#113264",
    "dark": "#113264",
    "lightAlias": "blue/12",
    "darkAlias": "blue/12"
  },
  {
    "name": "sidebar",
    "cssVar": "--sidebar",
    "light": "#fafafa",
    "dark": "#171717",
    "lightAlias": "neutral/50",
    "darkAlias": "neutral/900"
  },
  {
    "name": "sidebar-foreground",
    "cssVar": "--sidebar-foreground",
    "light": "#0a0a0a",
    "dark": "#fafafa",
    "lightAlias": "neutral/950",
    "darkAlias": "neutral/50"
  },
  {
    "name": "sidebar-primary",
    "cssVar": "--sidebar-primary",
    "light": "#171717",
    "dark": "#0588f0",
    "lightAlias": "neutral/900",
    "darkAlias": "blue/10"
  },
  {
    "name": "sidebar-primary-foreground",
    "cssVar": "--sidebar-primary-foreground",
    "light": "#fafafa",
    "dark": "#262626",
    "lightAlias": "neutral/50",
    "darkAlias": "neutral/800"
  },
  {
    "name": "sidebar-accent",
    "cssVar": "--sidebar-accent",
    "light": "#f5f5f5",
    "dark": "#262626",
    "lightAlias": "neutral/100",
    "darkAlias": "neutral/800"
  },
  {
    "name": "sidebar-accent-foreground",
    "cssVar": "--sidebar-accent-foreground",
    "light": "#171717",
    "dark": "#fafafa",
    "lightAlias": "neutral/900",
    "darkAlias": "neutral/50"
  },
  {
    "name": "sidebar-border",
    "cssVar": "--sidebar-border",
    "light": "#d4d4d4",
    "dark": "rgb(255 255 255 / 0.8)",
    "lightAlias": "neutral/300",
    "darkAlias": "white/10"
  },
  {
    "name": "sidebar-ring",
    "cssVar": "--sidebar-ring",
    "light": "#737373",
    "dark": "#737373",
    "lightAlias": "neutral/500",
    "darkAlias": "neutral/500"
  },
  {
    "name": "background-color",
    "cssVar": "--background-color",
    "light": "rgb(0 0 0 / 0.3)",
    "dark": "rgb(0 0 0 / 0.3)",
    "lightAlias": "black/5",
    "darkAlias": "black/5"
  },
  {
    "name": "semantic-background",
    "cssVar": "--semantic-background",
    "light": "#6b7280",
    "dark": "#6b7280",
    "lightAlias": "gray/500",
    "darkAlias": "gray/500"
  },
  {
    "name": "semantic-border",
    "cssVar": "--semantic-border",
    "light": "#4b5563",
    "dark": "#4b5563",
    "lightAlias": "gray/600",
    "darkAlias": "gray/600"
  },
  {
    "name": "semantic-foreground",
    "cssVar": "--semantic-foreground",
    "light": "#ffffff",
    "dark": "#ffffff",
    "lightAlias": "white",
    "darkAlias": "white"
  }
]
export const palette: PaletteColor[] = [
  {
    "name": "white",
    "ramp": "white",
    "step": null,
    "hex": "#ffffff"
  },
  {
    "name": "black",
    "ramp": "black",
    "step": null,
    "hex": "#000000"
  },
  {
    "name": "slate/50",
    "ramp": "slate",
    "step": "50",
    "hex": "#f8fafc"
  },
  {
    "name": "slate/100",
    "ramp": "slate",
    "step": "100",
    "hex": "#f1f5f9"
  },
  {
    "name": "slate/200",
    "ramp": "slate",
    "step": "200",
    "hex": "#e2e8f0"
  },
  {
    "name": "slate/300",
    "ramp": "slate",
    "step": "300",
    "hex": "#cbd5e1"
  },
  {
    "name": "slate/400",
    "ramp": "slate",
    "step": "400",
    "hex": "#94a3b8"
  },
  {
    "name": "slate/500",
    "ramp": "slate",
    "step": "500",
    "hex": "#64748b"
  },
  {
    "name": "slate/600",
    "ramp": "slate",
    "step": "600",
    "hex": "#475569"
  },
  {
    "name": "slate/700",
    "ramp": "slate",
    "step": "700",
    "hex": "#334155"
  },
  {
    "name": "slate/800",
    "ramp": "slate",
    "step": "800",
    "hex": "#1e293b"
  },
  {
    "name": "slate/900",
    "ramp": "slate",
    "step": "900",
    "hex": "#0f172a"
  },
  {
    "name": "slate/950",
    "ramp": "slate",
    "step": "950",
    "hex": "#020617"
  },
  {
    "name": "gray/50",
    "ramp": "gray",
    "step": "50",
    "hex": "#f9fafb"
  },
  {
    "name": "gray/100",
    "ramp": "gray",
    "step": "100",
    "hex": "#f3f4f6"
  },
  {
    "name": "gray/200",
    "ramp": "gray",
    "step": "200",
    "hex": "#e5e7eb"
  },
  {
    "name": "gray/300",
    "ramp": "gray",
    "step": "300",
    "hex": "#d1d5db"
  },
  {
    "name": "gray/400",
    "ramp": "gray",
    "step": "400",
    "hex": "#9ca3af"
  },
  {
    "name": "gray/500",
    "ramp": "gray",
    "step": "500",
    "hex": "#6b7280"
  },
  {
    "name": "gray/600",
    "ramp": "gray",
    "step": "600",
    "hex": "#4b5563"
  },
  {
    "name": "gray/700",
    "ramp": "gray",
    "step": "700",
    "hex": "#374151"
  },
  {
    "name": "gray/800",
    "ramp": "gray",
    "step": "800",
    "hex": "#1f2937"
  },
  {
    "name": "gray/900",
    "ramp": "gray",
    "step": "900",
    "hex": "#111827"
  },
  {
    "name": "gray/950",
    "ramp": "gray",
    "step": "950",
    "hex": "#030712"
  },
  {
    "name": "zinc/50",
    "ramp": "zinc",
    "step": "50",
    "hex": "#fafafa"
  },
  {
    "name": "zinc/100",
    "ramp": "zinc",
    "step": "100",
    "hex": "#f4f4f5"
  },
  {
    "name": "zinc/200",
    "ramp": "zinc",
    "step": "200",
    "hex": "#e4e4e7"
  },
  {
    "name": "zinc/300",
    "ramp": "zinc",
    "step": "300",
    "hex": "#d4d4d8"
  },
  {
    "name": "zinc/400",
    "ramp": "zinc",
    "step": "400",
    "hex": "#a1a1aa"
  },
  {
    "name": "zinc/500",
    "ramp": "zinc",
    "step": "500",
    "hex": "#71717a"
  },
  {
    "name": "zinc/600",
    "ramp": "zinc",
    "step": "600",
    "hex": "#52525b"
  },
  {
    "name": "zinc/700",
    "ramp": "zinc",
    "step": "700",
    "hex": "#3f3f46"
  },
  {
    "name": "zinc/800",
    "ramp": "zinc",
    "step": "800",
    "hex": "#27272a"
  },
  {
    "name": "zinc/900",
    "ramp": "zinc",
    "step": "900",
    "hex": "#18181b"
  },
  {
    "name": "zinc/950",
    "ramp": "zinc",
    "step": "950",
    "hex": "#09090b"
  },
  {
    "name": "neutral/50",
    "ramp": "neutral",
    "step": "50",
    "hex": "#fafafa"
  },
  {
    "name": "neutral/100",
    "ramp": "neutral",
    "step": "100",
    "hex": "#f5f5f5"
  },
  {
    "name": "neutral/200",
    "ramp": "neutral",
    "step": "200",
    "hex": "#e5e5e5"
  },
  {
    "name": "neutral/300",
    "ramp": "neutral",
    "step": "300",
    "hex": "#d4d4d4"
  },
  {
    "name": "neutral/400",
    "ramp": "neutral",
    "step": "400",
    "hex": "#a3a3a3"
  },
  {
    "name": "neutral/500",
    "ramp": "neutral",
    "step": "500",
    "hex": "#737373"
  },
  {
    "name": "neutral/600",
    "ramp": "neutral",
    "step": "600",
    "hex": "#525252"
  },
  {
    "name": "neutral/700",
    "ramp": "neutral",
    "step": "700",
    "hex": "#404040"
  },
  {
    "name": "neutral/800",
    "ramp": "neutral",
    "step": "800",
    "hex": "#262626"
  },
  {
    "name": "neutral/900",
    "ramp": "neutral",
    "step": "900",
    "hex": "#171717"
  },
  {
    "name": "neutral/950",
    "ramp": "neutral",
    "step": "950",
    "hex": "#0a0a0a"
  },
  {
    "name": "stone/50",
    "ramp": "stone",
    "step": "50",
    "hex": "#fafaf9"
  },
  {
    "name": "stone/100",
    "ramp": "stone",
    "step": "100",
    "hex": "#f5f5f4"
  },
  {
    "name": "stone/200",
    "ramp": "stone",
    "step": "200",
    "hex": "#e7e5e4"
  },
  {
    "name": "stone/300",
    "ramp": "stone",
    "step": "300",
    "hex": "#d6d3d1"
  },
  {
    "name": "stone/400",
    "ramp": "stone",
    "step": "400",
    "hex": "#a8a29e"
  },
  {
    "name": "stone/500",
    "ramp": "stone",
    "step": "500",
    "hex": "#78716c"
  },
  {
    "name": "stone/600",
    "ramp": "stone",
    "step": "600",
    "hex": "#57534e"
  },
  {
    "name": "stone/700",
    "ramp": "stone",
    "step": "700",
    "hex": "#44403c"
  },
  {
    "name": "stone/800",
    "ramp": "stone",
    "step": "800",
    "hex": "#292524"
  },
  {
    "name": "stone/900",
    "ramp": "stone",
    "step": "900",
    "hex": "#1c1917"
  },
  {
    "name": "stone/950",
    "ramp": "stone",
    "step": "950",
    "hex": "#0c0a09"
  },
  {
    "name": "red/50",
    "ramp": "red",
    "step": "50",
    "hex": "#fef2f2"
  },
  {
    "name": "red/100",
    "ramp": "red",
    "step": "100",
    "hex": "#fee2e2"
  },
  {
    "name": "red/200",
    "ramp": "red",
    "step": "200",
    "hex": "#fecaca"
  },
  {
    "name": "red/300",
    "ramp": "red",
    "step": "300",
    "hex": "#fca5a5"
  },
  {
    "name": "red/400",
    "ramp": "red",
    "step": "400",
    "hex": "#f87171"
  },
  {
    "name": "red/500",
    "ramp": "red",
    "step": "500",
    "hex": "#ef4444"
  },
  {
    "name": "red/600",
    "ramp": "red",
    "step": "600",
    "hex": "#dc2626"
  },
  {
    "name": "red/700",
    "ramp": "red",
    "step": "700",
    "hex": "#b91c1c"
  },
  {
    "name": "red/800",
    "ramp": "red",
    "step": "800",
    "hex": "#991b1b"
  },
  {
    "name": "red/900",
    "ramp": "red",
    "step": "900",
    "hex": "#7f1d1d"
  },
  {
    "name": "red/950",
    "ramp": "red",
    "step": "950",
    "hex": "#450a0a"
  },
  {
    "name": "orange/50",
    "ramp": "orange",
    "step": "50",
    "hex": "#fff7ed"
  },
  {
    "name": "orange/100",
    "ramp": "orange",
    "step": "100",
    "hex": "#ffedd5"
  },
  {
    "name": "orange/200",
    "ramp": "orange",
    "step": "200",
    "hex": "#fed7aa"
  },
  {
    "name": "orange/300",
    "ramp": "orange",
    "step": "300",
    "hex": "#fdba74"
  },
  {
    "name": "orange/400",
    "ramp": "orange",
    "step": "400",
    "hex": "#fb923c"
  },
  {
    "name": "orange/500",
    "ramp": "orange",
    "step": "500",
    "hex": "#f97316"
  },
  {
    "name": "orange/600",
    "ramp": "orange",
    "step": "600",
    "hex": "#ea580c"
  },
  {
    "name": "orange/700",
    "ramp": "orange",
    "step": "700",
    "hex": "#c2410c"
  },
  {
    "name": "orange/800",
    "ramp": "orange",
    "step": "800",
    "hex": "#9a3412"
  },
  {
    "name": "orange/900",
    "ramp": "orange",
    "step": "900",
    "hex": "#7c2d12"
  },
  {
    "name": "orange/950",
    "ramp": "orange",
    "step": "950",
    "hex": "#431407"
  },
  {
    "name": "amber/50",
    "ramp": "amber",
    "step": "50",
    "hex": "#fffbeb"
  },
  {
    "name": "amber/100",
    "ramp": "amber",
    "step": "100",
    "hex": "#fef3c7"
  },
  {
    "name": "amber/200",
    "ramp": "amber",
    "step": "200",
    "hex": "#fde68a"
  },
  {
    "name": "amber/300",
    "ramp": "amber",
    "step": "300",
    "hex": "#fcd34d"
  },
  {
    "name": "amber/400",
    "ramp": "amber",
    "step": "400",
    "hex": "#fbbf24"
  },
  {
    "name": "amber/500",
    "ramp": "amber",
    "step": "500",
    "hex": "#f59e0b"
  },
  {
    "name": "amber/600",
    "ramp": "amber",
    "step": "600",
    "hex": "#d97706"
  },
  {
    "name": "amber/700",
    "ramp": "amber",
    "step": "700",
    "hex": "#b45309"
  },
  {
    "name": "amber/800",
    "ramp": "amber",
    "step": "800",
    "hex": "#92400e"
  },
  {
    "name": "amber/900",
    "ramp": "amber",
    "step": "900",
    "hex": "#78350f"
  },
  {
    "name": "amber/950",
    "ramp": "amber",
    "step": "950",
    "hex": "#451a03"
  },
  {
    "name": "yellow/50",
    "ramp": "yellow",
    "step": "50",
    "hex": "#fefce8"
  },
  {
    "name": "yellow/100",
    "ramp": "yellow",
    "step": "100",
    "hex": "#fef9c3"
  },
  {
    "name": "yellow/200",
    "ramp": "yellow",
    "step": "200",
    "hex": "#fef08a"
  },
  {
    "name": "yellow/300",
    "ramp": "yellow",
    "step": "300",
    "hex": "#fde047"
  },
  {
    "name": "yellow/400",
    "ramp": "yellow",
    "step": "400",
    "hex": "#facc15"
  },
  {
    "name": "yellow/500",
    "ramp": "yellow",
    "step": "500",
    "hex": "#eab308"
  },
  {
    "name": "yellow/600",
    "ramp": "yellow",
    "step": "600",
    "hex": "#ca8a04"
  },
  {
    "name": "yellow/700",
    "ramp": "yellow",
    "step": "700",
    "hex": "#a16207"
  },
  {
    "name": "yellow/800",
    "ramp": "yellow",
    "step": "800",
    "hex": "#854d0e"
  },
  {
    "name": "yellow/900",
    "ramp": "yellow",
    "step": "900",
    "hex": "#713f12"
  },
  {
    "name": "yellow/950",
    "ramp": "yellow",
    "step": "950",
    "hex": "#422006"
  },
  {
    "name": "lime/50",
    "ramp": "lime",
    "step": "50",
    "hex": "#f7fee7"
  },
  {
    "name": "lime/100",
    "ramp": "lime",
    "step": "100",
    "hex": "#ecfccb"
  },
  {
    "name": "lime/200",
    "ramp": "lime",
    "step": "200",
    "hex": "#d9f99d"
  },
  {
    "name": "lime/300",
    "ramp": "lime",
    "step": "300",
    "hex": "#bef264"
  },
  {
    "name": "lime/400",
    "ramp": "lime",
    "step": "400",
    "hex": "#a3e635"
  },
  {
    "name": "lime/500",
    "ramp": "lime",
    "step": "500",
    "hex": "#84cc16"
  },
  {
    "name": "lime/600",
    "ramp": "lime",
    "step": "600",
    "hex": "#65a30d"
  },
  {
    "name": "lime/700",
    "ramp": "lime",
    "step": "700",
    "hex": "#4d7c0f"
  },
  {
    "name": "lime/800",
    "ramp": "lime",
    "step": "800",
    "hex": "#3f6212"
  },
  {
    "name": "lime/900",
    "ramp": "lime",
    "step": "900",
    "hex": "#365314"
  },
  {
    "name": "lime/950",
    "ramp": "lime",
    "step": "950",
    "hex": "#1a2e05"
  },
  {
    "name": "green/50",
    "ramp": "green",
    "step": "50",
    "hex": "#f0fdf4"
  },
  {
    "name": "green/100",
    "ramp": "green",
    "step": "100",
    "hex": "#dcfce7"
  },
  {
    "name": "green/200",
    "ramp": "green",
    "step": "200",
    "hex": "#bbf7d0"
  },
  {
    "name": "green/300",
    "ramp": "green",
    "step": "300",
    "hex": "#86efac"
  },
  {
    "name": "green/400",
    "ramp": "green",
    "step": "400",
    "hex": "#4ade80"
  },
  {
    "name": "green/500",
    "ramp": "green",
    "step": "500",
    "hex": "#22c55e"
  },
  {
    "name": "green/600",
    "ramp": "green",
    "step": "600",
    "hex": "#16a34a"
  },
  {
    "name": "green/700",
    "ramp": "green",
    "step": "700",
    "hex": "#15803d"
  },
  {
    "name": "green/800",
    "ramp": "green",
    "step": "800",
    "hex": "#166534"
  },
  {
    "name": "green/900",
    "ramp": "green",
    "step": "900",
    "hex": "#14532d"
  },
  {
    "name": "green/950",
    "ramp": "green",
    "step": "950",
    "hex": "#052e16"
  },
  {
    "name": "emerald/50",
    "ramp": "emerald",
    "step": "50",
    "hex": "#ecfdf5"
  },
  {
    "name": "emerald/100",
    "ramp": "emerald",
    "step": "100",
    "hex": "#d1fae5"
  },
  {
    "name": "emerald/200",
    "ramp": "emerald",
    "step": "200",
    "hex": "#a7f3d0"
  },
  {
    "name": "emerald/300",
    "ramp": "emerald",
    "step": "300",
    "hex": "#6ee7b7"
  },
  {
    "name": "emerald/400",
    "ramp": "emerald",
    "step": "400",
    "hex": "#34d399"
  },
  {
    "name": "emerald/500",
    "ramp": "emerald",
    "step": "500",
    "hex": "#10b981"
  },
  {
    "name": "emerald/600",
    "ramp": "emerald",
    "step": "600",
    "hex": "#059669"
  },
  {
    "name": "emerald/700",
    "ramp": "emerald",
    "step": "700",
    "hex": "#047857"
  },
  {
    "name": "emerald/800",
    "ramp": "emerald",
    "step": "800",
    "hex": "#065f46"
  },
  {
    "name": "emerald/900",
    "ramp": "emerald",
    "step": "900",
    "hex": "#064e3b"
  },
  {
    "name": "emerald/950",
    "ramp": "emerald",
    "step": "950",
    "hex": "#022c22"
  },
  {
    "name": "teal/50",
    "ramp": "teal",
    "step": "50",
    "hex": "#f0fdfa"
  },
  {
    "name": "teal/100",
    "ramp": "teal",
    "step": "100",
    "hex": "#ccfbf1"
  },
  {
    "name": "teal/200",
    "ramp": "teal",
    "step": "200",
    "hex": "#99f6e4"
  },
  {
    "name": "teal/300",
    "ramp": "teal",
    "step": "300",
    "hex": "#5eead4"
  },
  {
    "name": "teal/400",
    "ramp": "teal",
    "step": "400",
    "hex": "#2dd4bf"
  },
  {
    "name": "teal/500",
    "ramp": "teal",
    "step": "500",
    "hex": "#14b8a6"
  },
  {
    "name": "teal/600",
    "ramp": "teal",
    "step": "600",
    "hex": "#0d9488"
  },
  {
    "name": "teal/700",
    "ramp": "teal",
    "step": "700",
    "hex": "#0f766e"
  },
  {
    "name": "teal/800",
    "ramp": "teal",
    "step": "800",
    "hex": "#115e59"
  },
  {
    "name": "teal/900",
    "ramp": "teal",
    "step": "900",
    "hex": "#134e4a"
  },
  {
    "name": "teal/950",
    "ramp": "teal",
    "step": "950",
    "hex": "#042f2e"
  },
  {
    "name": "cyan/50",
    "ramp": "cyan",
    "step": "50",
    "hex": "#ecfeff"
  },
  {
    "name": "cyan/100",
    "ramp": "cyan",
    "step": "100",
    "hex": "#cffafe"
  },
  {
    "name": "cyan/200",
    "ramp": "cyan",
    "step": "200",
    "hex": "#a5f3fc"
  },
  {
    "name": "cyan/300",
    "ramp": "cyan",
    "step": "300",
    "hex": "#67e8f9"
  },
  {
    "name": "cyan/400",
    "ramp": "cyan",
    "step": "400",
    "hex": "#22d3ee"
  },
  {
    "name": "cyan/500",
    "ramp": "cyan",
    "step": "500",
    "hex": "#06b6d4"
  },
  {
    "name": "cyan/600",
    "ramp": "cyan",
    "step": "600",
    "hex": "#0891b2"
  },
  {
    "name": "cyan/700",
    "ramp": "cyan",
    "step": "700",
    "hex": "#0e7490"
  },
  {
    "name": "cyan/800",
    "ramp": "cyan",
    "step": "800",
    "hex": "#155e75"
  },
  {
    "name": "cyan/900",
    "ramp": "cyan",
    "step": "900",
    "hex": "#164e63"
  },
  {
    "name": "cyan/950",
    "ramp": "cyan",
    "step": "950",
    "hex": "#083344"
  },
  {
    "name": "sky/50",
    "ramp": "sky",
    "step": "50",
    "hex": "#f0f9ff"
  },
  {
    "name": "sky/100",
    "ramp": "sky",
    "step": "100",
    "hex": "#e0f2fe"
  },
  {
    "name": "sky/200",
    "ramp": "sky",
    "step": "200",
    "hex": "#bae6fd"
  },
  {
    "name": "sky/300",
    "ramp": "sky",
    "step": "300",
    "hex": "#7dd3fc"
  },
  {
    "name": "sky/400",
    "ramp": "sky",
    "step": "400",
    "hex": "#38bdf8"
  },
  {
    "name": "sky/500",
    "ramp": "sky",
    "step": "500",
    "hex": "#0ea5e9"
  },
  {
    "name": "sky/600",
    "ramp": "sky",
    "step": "600",
    "hex": "#0284c7"
  },
  {
    "name": "sky/700",
    "ramp": "sky",
    "step": "700",
    "hex": "#0369a1"
  },
  {
    "name": "sky/800",
    "ramp": "sky",
    "step": "800",
    "hex": "#075985"
  },
  {
    "name": "sky/900",
    "ramp": "sky",
    "step": "900",
    "hex": "#0c4a6e"
  },
  {
    "name": "sky/950",
    "ramp": "sky",
    "step": "950",
    "hex": "#082f49"
  },
  {
    "name": "blue/50",
    "ramp": "blue",
    "step": "50",
    "hex": "#eff6ff"
  },
  {
    "name": "blue/100",
    "ramp": "blue",
    "step": "100",
    "hex": "#dbeafe"
  },
  {
    "name": "blue/200",
    "ramp": "blue",
    "step": "200",
    "hex": "#bfdbfe"
  },
  {
    "name": "blue/300",
    "ramp": "blue",
    "step": "300",
    "hex": "#93c5fd"
  },
  {
    "name": "blue/400",
    "ramp": "blue",
    "step": "400",
    "hex": "#60a5fa"
  },
  {
    "name": "blue/500",
    "ramp": "blue",
    "step": "500",
    "hex": "#3b82f6"
  },
  {
    "name": "blue/600",
    "ramp": "blue",
    "step": "600",
    "hex": "#2563eb"
  },
  {
    "name": "blue/700",
    "ramp": "blue",
    "step": "700",
    "hex": "#1d4ed8"
  },
  {
    "name": "blue/800",
    "ramp": "blue",
    "step": "800",
    "hex": "#1e40af"
  },
  {
    "name": "blue/900",
    "ramp": "blue",
    "step": "900",
    "hex": "#1e3a8a"
  },
  {
    "name": "blue/950",
    "ramp": "blue",
    "step": "950",
    "hex": "#172554"
  },
  {
    "name": "indigo/50",
    "ramp": "indigo",
    "step": "50",
    "hex": "#eef2ff"
  },
  {
    "name": "indigo/100",
    "ramp": "indigo",
    "step": "100",
    "hex": "#e0e7ff"
  },
  {
    "name": "indigo/200",
    "ramp": "indigo",
    "step": "200",
    "hex": "#c7d2fe"
  },
  {
    "name": "indigo/300",
    "ramp": "indigo",
    "step": "300",
    "hex": "#a5b4fc"
  },
  {
    "name": "indigo/400",
    "ramp": "indigo",
    "step": "400",
    "hex": "#818cf8"
  },
  {
    "name": "indigo/500",
    "ramp": "indigo",
    "step": "500",
    "hex": "#6366f1"
  },
  {
    "name": "indigo/600",
    "ramp": "indigo",
    "step": "600",
    "hex": "#4f46e5"
  },
  {
    "name": "indigo/700",
    "ramp": "indigo",
    "step": "700",
    "hex": "#4338ca"
  },
  {
    "name": "indigo/800",
    "ramp": "indigo",
    "step": "800",
    "hex": "#3730a3"
  },
  {
    "name": "indigo/900",
    "ramp": "indigo",
    "step": "900",
    "hex": "#312e81"
  },
  {
    "name": "indigo/950",
    "ramp": "indigo",
    "step": "950",
    "hex": "#1e1b4b"
  },
  {
    "name": "violet/50",
    "ramp": "violet",
    "step": "50",
    "hex": "#f5f3ff"
  },
  {
    "name": "violet/100",
    "ramp": "violet",
    "step": "100",
    "hex": "#ede9fe"
  },
  {
    "name": "violet/200",
    "ramp": "violet",
    "step": "200",
    "hex": "#ddd6fe"
  },
  {
    "name": "violet/300",
    "ramp": "violet",
    "step": "300",
    "hex": "#c4b5fd"
  },
  {
    "name": "violet/400",
    "ramp": "violet",
    "step": "400",
    "hex": "#a78bfa"
  },
  {
    "name": "violet/500",
    "ramp": "violet",
    "step": "500",
    "hex": "#8b5cf6"
  },
  {
    "name": "violet/600",
    "ramp": "violet",
    "step": "600",
    "hex": "#7c3aed"
  },
  {
    "name": "violet/700",
    "ramp": "violet",
    "step": "700",
    "hex": "#6d28d9"
  },
  {
    "name": "violet/800",
    "ramp": "violet",
    "step": "800",
    "hex": "#5b21b6"
  },
  {
    "name": "violet/900",
    "ramp": "violet",
    "step": "900",
    "hex": "#4c1d95"
  },
  {
    "name": "violet/950",
    "ramp": "violet",
    "step": "950",
    "hex": "#2e1065"
  },
  {
    "name": "purple/50",
    "ramp": "purple",
    "step": "50",
    "hex": "#faf5ff"
  },
  {
    "name": "purple/100",
    "ramp": "purple",
    "step": "100",
    "hex": "#f3e8ff"
  },
  {
    "name": "purple/200",
    "ramp": "purple",
    "step": "200",
    "hex": "#e9d5ff"
  },
  {
    "name": "purple/300",
    "ramp": "purple",
    "step": "300",
    "hex": "#d8b4fe"
  },
  {
    "name": "purple/400",
    "ramp": "purple",
    "step": "400",
    "hex": "#c084fc"
  },
  {
    "name": "purple/500",
    "ramp": "purple",
    "step": "500",
    "hex": "#a855f7"
  },
  {
    "name": "purple/600",
    "ramp": "purple",
    "step": "600",
    "hex": "#9333ea"
  },
  {
    "name": "purple/700",
    "ramp": "purple",
    "step": "700",
    "hex": "#7e22ce"
  },
  {
    "name": "purple/800",
    "ramp": "purple",
    "step": "800",
    "hex": "#6b21a8"
  },
  {
    "name": "purple/900",
    "ramp": "purple",
    "step": "900",
    "hex": "#581c87"
  },
  {
    "name": "purple/950",
    "ramp": "purple",
    "step": "950",
    "hex": "#3b0764"
  },
  {
    "name": "fuchsia/50",
    "ramp": "fuchsia",
    "step": "50",
    "hex": "#fdf4ff"
  },
  {
    "name": "fuchsia/100",
    "ramp": "fuchsia",
    "step": "100",
    "hex": "#fae8ff"
  },
  {
    "name": "fuchsia/200",
    "ramp": "fuchsia",
    "step": "200",
    "hex": "#f5d0fe"
  },
  {
    "name": "fuchsia/300",
    "ramp": "fuchsia",
    "step": "300",
    "hex": "#f0abfc"
  },
  {
    "name": "fuchsia/400",
    "ramp": "fuchsia",
    "step": "400",
    "hex": "#e879f9"
  },
  {
    "name": "fuchsia/500",
    "ramp": "fuchsia",
    "step": "500",
    "hex": "#d946ef"
  },
  {
    "name": "fuchsia/600",
    "ramp": "fuchsia",
    "step": "600",
    "hex": "#c026d3"
  },
  {
    "name": "fuchsia/700",
    "ramp": "fuchsia",
    "step": "700",
    "hex": "#a21caf"
  },
  {
    "name": "fuchsia/800",
    "ramp": "fuchsia",
    "step": "800",
    "hex": "#86198f"
  },
  {
    "name": "fuchsia/900",
    "ramp": "fuchsia",
    "step": "900",
    "hex": "#701a75"
  },
  {
    "name": "fuchsia/950",
    "ramp": "fuchsia",
    "step": "950",
    "hex": "#4a044e"
  },
  {
    "name": "pink/50",
    "ramp": "pink",
    "step": "50",
    "hex": "#fdf2f8"
  },
  {
    "name": "pink/100",
    "ramp": "pink",
    "step": "100",
    "hex": "#fce7f3"
  },
  {
    "name": "pink/200",
    "ramp": "pink",
    "step": "200",
    "hex": "#fbcfe8"
  },
  {
    "name": "pink/300",
    "ramp": "pink",
    "step": "300",
    "hex": "#f9a8d4"
  },
  {
    "name": "pink/400",
    "ramp": "pink",
    "step": "400",
    "hex": "#f472b6"
  },
  {
    "name": "pink/500",
    "ramp": "pink",
    "step": "500",
    "hex": "#ec4899"
  },
  {
    "name": "pink/600",
    "ramp": "pink",
    "step": "600",
    "hex": "#db2777"
  },
  {
    "name": "pink/700",
    "ramp": "pink",
    "step": "700",
    "hex": "#be185d"
  },
  {
    "name": "pink/800",
    "ramp": "pink",
    "step": "800",
    "hex": "#9d174d"
  },
  {
    "name": "pink/900",
    "ramp": "pink",
    "step": "900",
    "hex": "#831843"
  },
  {
    "name": "pink/950",
    "ramp": "pink",
    "step": "950",
    "hex": "#500724"
  },
  {
    "name": "rose/50",
    "ramp": "rose",
    "step": "50",
    "hex": "#fff1f2"
  },
  {
    "name": "rose/100",
    "ramp": "rose",
    "step": "100",
    "hex": "#ffe4e6"
  },
  {
    "name": "rose/200",
    "ramp": "rose",
    "step": "200",
    "hex": "#fecdd3"
  },
  {
    "name": "rose/300",
    "ramp": "rose",
    "step": "300",
    "hex": "#fda4af"
  },
  {
    "name": "rose/400",
    "ramp": "rose",
    "step": "400",
    "hex": "#fb7185"
  },
  {
    "name": "rose/500",
    "ramp": "rose",
    "step": "500",
    "hex": "#f43f5e"
  },
  {
    "name": "rose/600",
    "ramp": "rose",
    "step": "600",
    "hex": "#e11d48"
  },
  {
    "name": "rose/700",
    "ramp": "rose",
    "step": "700",
    "hex": "#be123c"
  },
  {
    "name": "rose/800",
    "ramp": "rose",
    "step": "800",
    "hex": "#9f1239"
  },
  {
    "name": "rose/900",
    "ramp": "rose",
    "step": "900",
    "hex": "#881337"
  },
  {
    "name": "rose/950",
    "ramp": "rose",
    "step": "950",
    "hex": "#4c0519"
  }
]
export const radiusScale: ScaleStep[] = [
  {
    "utility": "rounded-none",
    "px": 0
  },
  {
    "utility": "rounded-xs",
    "px": 2
  },
  {
    "utility": "rounded-sm",
    "px": 4
  },
  {
    "utility": "rounded-md",
    "px": 6
  },
  {
    "utility": "rounded-lg",
    "px": 8
  },
  {
    "utility": "rounded-xl",
    "px": 12
  },
  {
    "utility": "rounded-2xl",
    "px": 16
  },
  {
    "utility": "rounded-3xl",
    "px": 24
  },
  {
    "utility": "rounded-4xl",
    "px": 32
  },
  {
    "utility": "rounded-full",
    "px": 9999
  }
]
export const spacingScale: SpacingStep[] = [
  {
    "step": "0",
    "px": 0
  },
  {
    "step": "0.5",
    "px": 2
  },
  {
    "step": "1",
    "px": 4
  },
  {
    "step": "1.5",
    "px": 6
  },
  {
    "step": "2",
    "px": 8
  },
  {
    "step": "2.5",
    "px": 10
  },
  {
    "step": "3",
    "px": 12
  },
  {
    "step": "3.5",
    "px": 14
  },
  {
    "step": "4",
    "px": 16
  },
  {
    "step": "5",
    "px": 20
  },
  {
    "step": "6",
    "px": 24
  },
  {
    "step": "7",
    "px": 28
  },
  {
    "step": "8",
    "px": 32
  },
  {
    "step": "9",
    "px": 36
  },
  {
    "step": "10",
    "px": 40
  },
  {
    "step": "11",
    "px": 44
  },
  {
    "step": "12",
    "px": 48
  },
  {
    "step": "14",
    "px": 56
  },
  {
    "step": "16",
    "px": 64
  },
  {
    "step": "20",
    "px": 80
  },
  {
    "step": "24",
    "px": 96
  },
  {
    "step": "28",
    "px": 112
  },
  {
    "step": "32",
    "px": 128
  },
  {
    "step": "36",
    "px": 144
  },
  {
    "step": "40",
    "px": 160
  },
  {
    "step": "44",
    "px": 176
  },
  {
    "step": "48",
    "px": 192
  },
  {
    "step": "52",
    "px": 208
  },
  {
    "step": "56",
    "px": 224
  },
  {
    "step": "60",
    "px": 240
  },
  {
    "step": "64",
    "px": 256
  },
  {
    "step": "72",
    "px": 288
  },
  {
    "step": "80",
    "px": 320
  },
  {
    "step": "96",
    "px": 384
  }
]
export const fontFamilies: NamedValue[] = [
  {
    "name": "sans",
    "value": "Inter"
  },
  {
    "name": "mono",
    "value": "Geist Mono"
  }
]
export const fontSizes: FontSize[] = [
  {
    "name": "xs",
    "value": 12,
    "px": 12
  },
  {
    "name": "sm",
    "value": 14,
    "px": 14
  },
  {
    "name": "base",
    "value": 16,
    "px": 16
  },
  {
    "name": "lg",
    "value": 18,
    "px": 18
  },
  {
    "name": "xl",
    "value": 20,
    "px": 20
  },
  {
    "name": "2xl",
    "value": 24,
    "px": 24
  },
  {
    "name": "3xl",
    "value": 30,
    "px": 30
  },
  {
    "name": "4xl",
    "value": 36,
    "px": 36
  },
  {
    "name": "5xl",
    "value": 48,
    "px": 48
  },
  {
    "name": "6xl",
    "value": 60,
    "px": 60
  },
  {
    "name": "7xl",
    "value": 72,
    "px": 72
  },
  {
    "name": "8xl",
    "value": 96,
    "px": 96
  },
  {
    "name": "9xl",
    "value": 128,
    "px": 128
  }
]
export const fontWeights: NamedValue[] = [
  {
    "name": "thin",
    "value": 100
  },
  {
    "name": "extralight",
    "value": 200
  },
  {
    "name": "light",
    "value": 300
  },
  {
    "name": "normal",
    "value": 400
  },
  {
    "name": "medium",
    "value": 500
  },
  {
    "name": "semibold",
    "value": 600
  },
  {
    "name": "bold",
    "value": 700
  },
  {
    "name": "extrabold",
    "value": 800
  },
  {
    "name": "black",
    "value": 900
  }
]
export const fontStyles: NamedValue[] = [
  {
    "name": "italic",
    "value": "italic"
  },
  {
    "name": "not-italic",
    "value": "normal"
  }
]
export const tracking: Tracking[] = [
  {
    "name": "tighter",
    "px": -0.800000011920929,
    "em": -0.05
  },
  {
    "name": "tight",
    "px": -0.4000000059604645,
    "em": -0.025
  },
  {
    "name": "normal",
    "px": 0,
    "em": 0
  },
  {
    "name": "wide",
    "px": 0.4000000059604645,
    "em": 0.025
  },
  {
    "name": "wider",
    "px": 0.800000011920929,
    "em": 0.05
  },
  {
    "name": "widest",
    "px": 1.600000023841858,
    "em": 0.1
  }
]
export const leading: Leading[] = [
  {
    "name": "3",
    "value": 12,
    "px": 12
  },
  {
    "name": "4",
    "value": 16,
    "px": 16
  },
  {
    "name": "5",
    "value": 20,
    "px": 20
  },
  {
    "name": "6",
    "value": 24,
    "px": 24
  },
  {
    "name": "7",
    "value": 28,
    "px": 28
  },
  {
    "name": "8",
    "value": 32,
    "px": 32
  },
  {
    "name": "9",
    "value": 36,
    "px": 36
  },
  {
    "name": "10",
    "value": 40,
    "px": 40
  },
  {
    "name": "12",
    "value": 48,
    "px": 48
  },
  {
    "name": "15",
    "value": 60,
    "px": 60
  },
  {
    "name": "18",
    "value": 72,
    "px": 72
  },
  {
    "name": "24",
    "value": 96,
    "px": 96
  },
  {
    "name": "32",
    "value": 128,
    "px": 128
  }
]
export const borderWidths: ScaleStep[] = [
  {
    "utility": "border-0",
    "px": 0
  },
  {
    "utility": "border",
    "px": 1
  },
  {
    "utility": "border-2",
    "px": 2
  },
  {
    "utility": "border-4",
    "px": 4
  },
  {
    "utility": "border-8",
    "px": 8
  }
]
export const strokeWidths: StrokeWidth[] = [
  {
    "utility": "stroke-0.5",
    "value": 0.5
  },
  {
    "utility": "stroke-0.75",
    "value": 0.75
  },
  {
    "utility": "stroke-1",
    "value": 1
  },
  {
    "utility": "stroke-1.25",
    "value": 1.25
  },
  {
    "utility": "stroke-1.5",
    "value": 1.5
  },
  {
    "utility": "stroke-1.75",
    "value": 1.75
  },
  {
    "utility": "stroke-2",
    "value": 2
  },
  {
    "utility": "stroke-2.25",
    "value": 2.25
  },
  {
    "utility": "stroke-2.5",
    "value": 2.5
  },
  {
    "utility": "stroke-2.75",
    "value": 2.75
  },
  {
    "utility": "stroke-3",
    "value": 3
  }
]
export const opacity: OpacityStep[] = [
  {
    "utility": "opacity-0",
    "value": 0
  },
  {
    "utility": "opacity-5",
    "value": 5
  },
  {
    "utility": "opacity-10",
    "value": 10
  },
  {
    "utility": "opacity-15",
    "value": 15
  },
  {
    "utility": "opacity-20",
    "value": 20
  },
  {
    "utility": "opacity-25",
    "value": 25
  },
  {
    "utility": "opacity-30",
    "value": 30
  },
  {
    "utility": "opacity-35",
    "value": 35
  },
  {
    "utility": "opacity-40",
    "value": 40
  },
  {
    "utility": "opacity-45",
    "value": 45
  },
  {
    "utility": "opacity-50",
    "value": 50
  },
  {
    "utility": "opacity-55",
    "value": 55
  },
  {
    "utility": "opacity-60",
    "value": 60
  },
  {
    "utility": "opacity-65",
    "value": 65
  },
  {
    "utility": "opacity-70",
    "value": 70
  },
  {
    "utility": "opacity-75",
    "value": 75
  },
  {
    "utility": "opacity-80",
    "value": 80
  },
  {
    "utility": "opacity-85",
    "value": 85
  },
  {
    "utility": "opacity-90",
    "value": 90
  },
  {
    "utility": "opacity-95",
    "value": 95
  },
  {
    "utility": "opacity-100",
    "value": 100
  }
]
