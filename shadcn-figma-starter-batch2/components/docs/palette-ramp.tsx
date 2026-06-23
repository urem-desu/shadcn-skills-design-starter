"use client"

import * as React from "react"
import { Clipboard, Check, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CopyButton } from "@/components/docs/copy-button"
import type { PaletteColor } from "@/lib/design-tokens"
import { type ColorFormat, formatColor } from "@/lib/color-utils"

interface PaletteRampProps {
  ramp: string
  colors: PaletteColor[]
  aliasMap?: Map<string, string[]>
  format: ColorFormat
  onFormatChange: (f: ColorFormat) => void
}

const FORMATS: { value: ColorFormat; label: string }[] = [
  { value: "className", label: "className" },
  { value: "hex",       label: "hex" },
  { value: "rgb",       label: "rgb" },
  { value: "hsl",       label: "hsl" },
  { value: "oklch",     label: "oklch" },
]

/** Relative luminance from a hex color (0–1). */
function luminance(hex: string): number {
  try {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  } catch {
    return 1
  }
}

function SwatchCard({
  color,
  hasAlias,
  format,
}: {
  color: PaletteColor
  hasAlias: boolean
  format: ColorFormat
}) {
  const [copied, setCopied] = React.useState(false)
  const lum = luminance(color.hex)
  const textColor = lum > 0.45 ? "#000000" : "#ffffff"
  const isVeryLight = lum > 0.88
  const step = color.step ?? color.name.split("/")[1] ?? color.name

  const displayValue = formatColor(color.hex, format, color.ramp, color.step)

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(displayValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group relative flex aspect-[3/1] w-full flex-1 flex-col gap-2 rounded-sm sm:aspect-[2/3] sm:h-auto sm:w-auto sm:max-w-[4.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
      aria-label={`Copy ${displayValue}`}
    >
      {/* Clipboard / check icon */}
      {copied ? (
        <span className="absolute right-2 top-2 z-10 pointer-events-none" aria-hidden>
          <Check className="size-3.5" style={{ color: textColor }} strokeWidth={2.5} />
        </span>
      ) : (
        <span className="absolute right-2 top-2 z-10 pointer-events-none opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>
          <Clipboard className="size-3.5" style={{ color: textColor }} />
        </span>
      )}

      {/* Semantic alias dot */}
      {hasAlias && !copied && (
        <span className="absolute left-2 top-2 z-10 pointer-events-none" aria-hidden>
          <span className="block size-1.5 rounded-full bg-white/80 ring-1 ring-black/20" />
        </span>
      )}

      {/* Color block */}
      <div
        className={`w-full flex-1 rounded-md md:rounded-lg${isVeryLight ? " ring-1 ring-inset ring-border" : ""}`}
        style={{ backgroundColor: color.hex }}
        aria-hidden
      />

      {/* Label — single line, truncated */}
      <div className="w-full overflow-hidden">
        {copied ? (
          <>
            <span className="hidden w-full truncate whitespace-nowrap text-center font-mono text-[0.6rem] tabular-nums text-muted-foreground lg:block">
              {displayValue}
            </span>
            <span className="block truncate whitespace-nowrap text-center font-mono text-xs tabular-nums text-muted-foreground lg:hidden">
              Copied
            </span>
          </>
        ) : (
          <>
            <span className="hidden w-full truncate whitespace-nowrap text-center font-mono text-[0.6rem] tabular-nums text-muted-foreground transition-colors group-hover:text-foreground lg:block">
              {displayValue}
            </span>
            <span className="block truncate whitespace-nowrap text-center font-mono text-xs tabular-nums text-muted-foreground transition-colors group-hover:text-foreground lg:hidden">
              {step}
            </span>
          </>
        )}
      </div>
    </button>
  )
}

/** One Tier-1 ramp with its own format picker in the header. */
export function PaletteRamp({ ramp, colors, aliasMap, format, onFormatChange }: PaletteRampProps) {
  const aliasedColors = aliasMap
    ? colors.filter((c) => (aliasMap.get(c.name)?.length ?? 0) > 0)
    : []

  return (
    <div
      id={`ramp-${ramp}`}
      className="rounded-lg shadow-sm ring-1 ring-border bg-card"
    >
      {/* Ramp header: name + format picker */}
      <div className="flex items-center gap-2 p-2 pb-0">
        <div className="flex-1 pl-1">
          <h2 className="text-sm font-medium capitalize text-foreground">{ramp}</h2>
        </div>

        {/* Format picker — per ramp but drives global state */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex h-7 items-center gap-1 rounded-md border border-border bg-background px-2 text-xs text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="text-muted-foreground text-[0.6875rem]">Format:</span>
              <code className="font-mono text-[0.6875rem]">{format}</code>
              <ChevronDown className="size-3 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {FORMATS.map((f) => {
              const sample = colors[Math.floor(colors.length / 2)]
              const sampleVal = sample
                ? formatColor(sample.hex, f.value, sample.ramp, sample.step)
                : ""
              return (
                <DropdownMenuItem
                  key={f.value}
                  onSelect={() => onFormatChange(f.value)}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-sm font-semibold shrink-0">{f.label}</span>
                    <span className="font-mono text-xs text-muted-foreground truncate">{sampleVal}</span>
                  </div>
                  {format === f.value && (
                    <Check className="size-3.5 shrink-0 text-foreground" />
                  )}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Swatch row */}
      <div className="flex flex-col gap-1 p-2 sm:flex-row sm:gap-2">
        {colors.map((c) => (
          <SwatchCard
            key={c.name}
            color={c}
            hasAlias={(aliasMap?.get(c.name)?.length ?? 0) > 0}
            format={format}
          />
        ))}
      </div>

      {/* Semantic alias annotations */}
      {aliasedColors.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-t border-border px-3 py-2.5">
          {aliasedColors.map((c) => {
            const aliases = aliasMap!.get(c.name)!
            const step = c.step ?? c.name.split("/")[1] ?? c.name
            return (
              <div
                key={c.name}
                className="group/alias flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1"
              >
                <div
                  className="size-3 shrink-0 rounded-sm ring-1 ring-border/50"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="font-mono text-[0.625rem] font-medium text-foreground">
                  {step}
                </span>
                <span className="text-[0.5rem] text-muted-foreground">→</span>
                <div className="flex flex-wrap gap-0.5">
                  {aliases.map((a) => (
                    <div key={a} className="flex items-center gap-0.5">
                      <code className="rounded-sm bg-primary/10 px-1 font-mono text-[0.5625rem] text-primary">
                        --{a}
                      </code>
                      <CopyButton
                        value={`--${a}`}
                        label={`Copy --${a}`}
                        className="size-3.5 opacity-0 group-hover/alias:opacity-100"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
