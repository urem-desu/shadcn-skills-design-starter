import type { Metadata } from "next"
import { PageHeader, Code } from "@/components/docs/page-header"
import { CopyButton } from "@/components/docs/copy-button"
import { spacingScale, type SpacingStep } from "@/lib/design-tokens"

export const metadata: Metadata = { title: "Spacing" }

const MAX_PX = 384
const RULER_PX = 240

function rulerWidth(px: number): number {
  if (px === 0) return 0
  return Math.max(2, Math.log2(px + 1) / Math.log2(MAX_PX + 1) * RULER_PX)
}

interface SpacingGroup {
  label: string
  description: string
  steps: SpacingStep[]
}

const groups: SpacingGroup[] = [
  {
    label: "Micro",
    description: "Fine-grained gaps: icon padding, inline spacing, border offsets",
    steps: spacingScale.filter((s) => s.px <= 14),
  },
  {
    label: "Component",
    description: "Button padding, input padding, form gaps, card padding",
    steps: spacingScale.filter((s) => s.px >= 16 && s.px <= 48),
  },
  {
    label: "Layout",
    description: "Section gaps, page margins, grid gutters, sidebar widths",
    steps: spacingScale.filter((s) => s.px >= 56),
  },
]

export default function SpacingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Spacing"
        description="A 4px base-unit scale (1 step = 0.25rem). All padding, margin, gap, and size utilities share this grid. The ruler bar shows each step's size relative to the scale maximum."
      />

      <div className="flex flex-col gap-8">
        {groups.map((group) => (
          <section key={group.label} className="flex flex-col gap-3">
            {/* Group header */}
            <div className="flex flex-col gap-0.5">
              <h2 className="text-base font-semibold text-foreground">{group.label}</h2>
              <p className="text-xs text-muted-foreground">{group.description}</p>
            </div>

            {/* Rows */}
            <div className="overflow-hidden rounded-lg border border-border">
              {group.steps.map((s, i) => {
                const visual = rulerWidth(s.px)
                return (
                  <div
                    key={s.step}
                    className={`group flex items-center gap-4 px-4 py-2.5 transition-colors hover:bg-accent/30 ${i > 0 ? "border-t border-border" : ""}`}
                  >
                    {/* Step + copy */}
                    <div className="w-24 shrink-0 flex items-center gap-1.5">
                      <Code>{s.step}</Code>
                      <CopyButton
                        value={`gap-${s.step}`}
                        label={`Copy gap-${s.step}`}
                        className="opacity-0 group-hover:opacity-100"
                      />
                    </div>

                    {/* Ruler track + bar */}
                    <div className="flex flex-1 items-center">
                      <div
                        className="relative h-5 overflow-hidden rounded-sm"
                        style={{ width: `${RULER_PX}px` }}
                      >
                        {/* Track */}
                        <div className="absolute inset-y-0 left-0 right-0 rounded-sm bg-muted/60" />
                        {/* Bar */}
                        {visual > 0 && (
                          <div
                            className="absolute inset-y-0 left-0 rounded-sm bg-primary/70"
                            style={{ width: `${visual}px` }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Px value */}
                    <span className="w-16 shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground">
                      {s.px}px · {(s.px / 4).toFixed(s.px % 4 === 0 ? 0 : 2)}rem
                    </span>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
