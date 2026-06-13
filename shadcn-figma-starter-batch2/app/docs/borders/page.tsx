import type { Metadata } from "next"
import { PageHeader, Code } from "@/components/docs/page-header"
import { ScaleRow, BorderPreview } from "@/components/docs/scale-row"
import { CopyButton } from "@/components/docs/copy-button"
import { borderWidths, strokeWidths, opacity } from "@/lib/design-tokens"

export const metadata: Metadata = { title: "Borders & Effects" }

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  )
}

export default function BordersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Borders & Effects"
        description="Border widths, icon stroke widths, and the opacity scale. Border color is always the --border token; never a raw color."
      />

      <Section title="Border width">
        <div className="flex flex-col gap-3">
          {borderWidths.map((b) => (
            <ScaleRow
              key={b.utility}
              utility={b.utility}
              value={`${b.px}px`}
              preview={<BorderPreview px={b.px} />}
            />
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Section title="Stroke width (icons)">
          <div className="overflow-hidden rounded-lg border border-border">
            {strokeWidths.map((s, i) => (
              <div
                key={s.utility}
                className={`flex items-center justify-between gap-2 bg-card px-4 py-2.5 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <div className="flex items-center gap-1.5">
                  <Code>{s.utility}</Code>
                  <CopyButton value={s.utility} />
                </div>
                <span className="font-mono text-xs text-muted-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Opacity">
          <div className="overflow-hidden rounded-lg border border-border">
            {opacity.map((o, i) => (
              <div
                key={o.utility}
                className={`flex items-center justify-between gap-3 bg-card px-4 py-2.5 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <div className="flex items-center gap-1.5">
                  <Code>{o.utility}</Code>
                  <CopyButton value={o.utility} />
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="size-5 rounded-sm bg-primary"
                    style={{ opacity: o.value / 100 }}
                  />
                  <span className="w-9 text-right font-mono text-xs text-muted-foreground">
                    {o.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}
