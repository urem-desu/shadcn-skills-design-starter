import type { Metadata } from "next"
import { PageHeader } from "@/components/docs/page-header"
import { PaletteRamp } from "@/components/docs/palette-ramp"
import { paletteByRamp, tokenCounts } from "@/lib/design-tokens"

export const metadata: Metadata = { title: "Palette" }

export default function PalettePage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Palette"
        description={`The ${tokenCounts.palette} Tier-1 primitives from the Figma "tw/colors" collection. Semantic tokens alias these — components should reference semantic tokens, not these raw values.`}
      />
      <div className="flex flex-col gap-10">
        {paletteByRamp.map(({ ramp, colors }) => (
          <PaletteRamp key={ramp} ramp={ramp} colors={colors} />
        ))}
      </div>
    </>
  )
}
