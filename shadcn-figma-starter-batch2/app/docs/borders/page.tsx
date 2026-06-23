import type { Metadata } from "next"
import { PageHeader, Code } from "@/components/docs/page-header"
import { CopyButton } from "@/components/docs/copy-button"
import { borderWidths, strokeWidths, opacity } from "@/lib/design-tokens"

export const metadata: Metadata = { title: "Borders & Effects" }

// Checkerboard for transparency preview
const CHECKER =
  "repeating-conic-gradient(var(--muted) 0% 25%, var(--background) 0% 50%) 50% / 8px 8px"

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex flex-col gap-4 scroll-mt-6">
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
        description="Border widths for layout and component edges, icon stroke weights, and the opacity scale. Border color is always --border; never a raw color value."
      />

      {/* ── Border widths ─────────────────────────────────────────────── */}
      <Section title="Border width" id="border-width">
        <div className="overflow-hidden rounded-lg border border-border">
          {/* Column header */}
          <div className="grid grid-cols-[auto_auto_1fr] gap-4 border-b border-border bg-muted/40 px-4 py-2">
            <span className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
              Utility
            </span>
            <span className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
              Value
            </span>
            <span className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
              Preview
            </span>
          </div>

          {borderWidths.map((b, i) => (
            <div
              key={b.utility}
              className={`group grid grid-cols-[auto_auto_1fr] items-center gap-4 px-4 py-4 transition-colors hover:bg-accent/30 ${i > 0 ? "border-t border-border" : ""}`}
            >
              {/* Utility */}
              <div className="flex items-center gap-1.5">
                <Code>{b.utility}</Code>
                <CopyButton
                  value={b.utility}
                  className="opacity-0 group-hover:opacity-100"
                />
              </div>

              {/* Value */}
              <span className="w-12 font-mono text-xs tabular-nums text-muted-foreground">
                {b.px}px
              </span>

              {/* Full-width line preview — much clearer than a small square */}
              <div className="flex items-center">
                {b.px === 0 ? (
                  <span className="text-xs text-muted-foreground">No border</span>
                ) : (
                  <div
                    className="w-full rounded-[1px] bg-primary"
                    style={{ height: `${b.px}px` }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Stroke widths (icons) + Opacity ─────────────────────────── */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Stroke widths — SVG icon preview */}
        <Section title="Stroke width (icons)" id="stroke-width">
          <div className="overflow-hidden rounded-lg border border-border">
            {strokeWidths.map((s, i) => (
              <div
                key={s.utility}
                className={`group flex items-center gap-4 px-4 py-2.5 transition-colors hover:bg-accent/30 ${i > 0 ? "border-t border-border" : ""}`}
              >
                {/* SVG icon preview — circle at this stroke width */}
                <div className="flex size-8 shrink-0 items-center justify-center text-foreground">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth={s.value} />
                  </svg>
                </div>

                {/* Utility + copy */}
                <div className="flex flex-1 items-center gap-1.5">
                  <Code>{s.utility}</Code>
                  <CopyButton
                    value={s.utility}
                    className="opacity-0 group-hover:opacity-100"
                  />
                </div>

                {/* Numeric value */}
                <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Opacity — wider swatches with checkerboard */}
        <Section title="Opacity" id="opacity">
          <div className="overflow-hidden rounded-lg border border-border">
            {opacity.map((o, i) => (
              <div
                key={o.utility}
                className={`group flex items-center gap-4 px-4 py-2.5 transition-colors hover:bg-accent/30 ${i > 0 ? "border-t border-border" : ""}`}
              >
                {/* Swatch with checkerboard revealing transparency */}
                <div className="relative h-6 w-16 shrink-0 overflow-hidden rounded-sm ring-1 ring-border/50">
                  <div className="absolute inset-0" style={{ background: CHECKER }} aria-hidden />
                  <div
                    className="absolute inset-0 bg-primary"
                    style={{ opacity: o.value / 100 }}
                  />
                </div>

                {/* Utility + copy */}
                <div className="flex flex-1 items-center gap-1.5">
                  <Code>{o.utility}</Code>
                  <CopyButton
                    value={o.utility}
                    className="opacity-0 group-hover:opacity-100"
                  />
                </div>

                {/* Percentage */}
                <span className="w-10 shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground">
                  {o.value}%
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}
