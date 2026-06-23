"use client"

import * as React from "react"
import { PaletteRamp } from "@/components/docs/palette-ramp"
import type { PaletteColor } from "@/lib/design-tokens"
import { type ColorFormat } from "@/lib/color-utils"

interface PalettePageClientProps {
  ramps: { ramp: string; colors: PaletteColor[] }[]
  aliasMap: Map<string, string[]>
}

export function PalettePageClient({ ramps, aliasMap }: PalettePageClientProps) {
  const [format, setFormat] = React.useState<ColorFormat>("className")

  return (
    <div className="grid gap-8">
      {ramps.map(({ ramp, colors }) => (
        <PaletteRamp
          key={ramp}
          ramp={ramp}
          colors={colors}
          aliasMap={aliasMap}
          format={format}
          onFormatChange={setFormat}
        />
      ))}
    </div>
  )
}
