import type { Metadata } from "next"
import { PageHeader } from "@/components/docs/page-header"
import { ScaleRow, RadiusPreview } from "@/components/docs/scale-row"
import { radiusScale } from "@/lib/design-tokens"

export const metadata: Metadata = { title: "Radius" }

export default function RadiusPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Radius"
        description="The kit's static border-radius scale (fixed rem per step) from the Figma border-radius collection. rounded-lg (8px) is the kit default."
      />
      <div className="flex flex-col gap-3">
        {radiusScale.map((r) => (
          <ScaleRow
            key={r.utility}
            utility={r.utility}
            value={r.px >= 9999 ? "9999px" : `${r.px}px`}
            preview={<RadiusPreview px={r.px} />}
          />
        ))}
      </div>
    </>
  )
}
