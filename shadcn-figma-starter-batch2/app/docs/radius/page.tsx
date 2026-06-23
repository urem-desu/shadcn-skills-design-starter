import type { Metadata } from "next"
import { PageHeader, Code } from "@/components/docs/page-header"
import { CopyButton } from "@/components/docs/copy-button"
import { radiusScale } from "@/lib/design-tokens"

export const metadata: Metadata = { title: "Radius" }

const USAGE: Record<string, string> = {
  "rounded-none": "Tables, code blocks, data grids",
  "rounded-xs": "Tags, inline badges",
  "rounded-sm": "Small buttons, chips",
  "rounded-md": "Inputs, selects",
  "rounded-lg": "Buttons, cards, alerts (kit default)",
  "rounded-xl": "Dropdowns, modals, command palette",
  "rounded-2xl": "Sheets, large panels, popovers",
  "rounded-3xl": "Feature cards, dialog bodies",
  "rounded-4xl": "Hero sections, section containers",
  "rounded-full": "Pills, avatars, toggle switches",
}

export default function RadiusPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Radius"
        description="A 10-step static border-radius scale — from sharp corners to full pill. rounded-lg (8px) is the kit default used by Button, Card, and most interactive controls."
      />

      {/* Visual scale strip — all shapes in one row */}
      <section className="flex flex-col gap-3">
        <p className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
          Scale — none to full
        </p>
        <div className="flex flex-wrap items-end gap-4 rounded-lg border border-border bg-card p-5">
          {radiusScale.map((r) => {
            const displayR = r.px >= 9999 ? 9999 : r.px
            const label = r.utility.replace("rounded-", "")
            return (
              <div key={r.utility} className="flex flex-col items-center gap-2">
                {/* Shape */}
                <div
                  className="size-14 border-2 border-primary bg-primary/10"
                  style={{
                    borderRadius: displayR >= 9999 ? "9999px" : `${displayR}px`,
                  }}
                />
                {/* Label */}
                <div className="flex flex-col items-center gap-0.5">
                  <span className="font-mono text-[0.5625rem] font-medium text-foreground">
                    {label}
                  </span>
                  <span className="font-mono text-[0.5rem] text-muted-foreground">
                    {displayR >= 9999 ? "full" : `${displayR}px`}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Detailed reference table */}
      <section className="flex flex-col gap-3">
        <p className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
          Reference
        </p>
        <div className="overflow-hidden rounded-lg border border-border">
          {/* Column headers */}
          <div className="grid grid-cols-[auto_auto_1fr] gap-4 border-b border-border bg-muted/40 px-4 py-2">
            <span className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
              Utility
            </span>
            <span className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
              Value
            </span>
            <span className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
              Common usage
            </span>
          </div>

          {radiusScale.map((r, i) => {
            const usage = USAGE[r.utility]
            const displayPx = r.px >= 9999 ? "9999px" : `${r.px}px`
            const displayR = r.px >= 9999 ? 9999 : r.px
            return (
              <div
                key={r.utility}
                className={`group grid grid-cols-[auto_auto_1fr] items-center gap-4 px-4 py-3 transition-colors hover:bg-accent/30 ${i > 0 ? "border-t border-border" : ""}`}
              >
                {/* Utility + copy */}
                <div className="flex items-center gap-1.5">
                  <Code>{r.utility}</Code>
                  <CopyButton
                    value={r.utility}
                    className="opacity-0 group-hover:opacity-100"
                  />
                </div>

                {/* Pixel value */}
                <span className="w-16 font-mono text-xs tabular-nums text-muted-foreground">
                  {displayPx}
                </span>

                {/* Shape + usage */}
                <div className="flex items-center gap-3">
                  <div
                    className="size-7 shrink-0 border border-border bg-muted"
                    style={{
                      borderRadius: displayR >= 9999 ? "9999px" : `${displayR}px`,
                    }}
                  />
                  {usage && (
                    <span className="text-xs text-muted-foreground">{usage}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
