import type { Metadata } from "next"
import { PageHeader } from "@/components/docs/page-header"
import { ScaleRow, SpacingPreview } from "@/components/docs/scale-row"
import { spacingScale } from "@/lib/design-tokens"

export const metadata: Metadata = { title: "Spacing" }

export default function SpacingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Spacing"
        description="The 4px-based spacing scale (1 unit = 0.25rem) shared by every padding, margin, gap and size utility. Half-steps use a decimal (e.g. 2.5 = 10px)."
      />
      <div className="flex flex-col gap-3">
        {spacingScale.map((s) => (
          <ScaleRow
            key={s.step}
            utility={`p-${s.step} / gap-${s.step} / m-${s.step}`}
            value={`${s.step} · ${s.px}px`}
            preview={<SpacingPreview px={s.px} />}
          />
        ))}
      </div>
    </>
  )
}
