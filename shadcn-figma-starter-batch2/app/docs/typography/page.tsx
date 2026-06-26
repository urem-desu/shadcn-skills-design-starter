import type { Metadata } from "next"
import { PageHeader, Code } from "@/components/docs/page-header"
import { CopyButton } from "@/components/docs/copy-button"
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  tracking,
  leading,
} from "@/lib/design-tokens"

export const metadata: Metadata = { title: "Typography" }

const FAMILY_VAR: Record<string, string> = {
  sans: "var(--font-sans)",
  mono: "var(--font-mono)",
}

const SIZE_USAGE: Record<string, string> = {
  xs: "Captions, metadata, badges",
  sm: "Secondary text, helper labels",
  base: "Body copy (scale default)",
  lg: "Lead paragraph, intro text",
  xl: "Sub-section headings",
  "2xl": "Section headings",
  "3xl": "Page sub-headings",
  "4xl": "Page headings",
  "5xl": "Display / hero (lg)",
  "6xl": "Display XL",
  "7xl": "Display 2XL",
  "8xl": "Display 3XL",
  "9xl": "Display max",
}

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex flex-col gap-4 scroll-mt-6">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  )
}

export default function TypographyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        description="Font families, a 13-step size scale (Major Third ratio), weights, letter-spacing, and line-height — the atomic type tokens from the Figma font collection."
      />

      {/* Quick nav */}
      <nav aria-label="Type sections" className="flex flex-wrap gap-2">
        {["Families", "Scale", "Weights", "Letter spacing", "Line height"].map((label) => (
          <a
            key={label}
            href={`#type-${label.toLowerCase().replace(/\s+/g, "-")}`}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* ── Font families ──────────────────────────────────────────────── */}
      <Section title="Font families" id="type-families">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fontFamilies.map((f) => (
            <div
              key={f.name}
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <Code>--font-{f.name}</Code>
                    <CopyButton value={`--font-${f.name}`} />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{String(f.value)}</span>
                </div>
                <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-2xs font-medium text-muted-foreground uppercase tracking-wide">
                  {f.name}
                </span>
              </div>
              {/* Large display specimen */}
              <p
                className="text-3xl font-semibold text-foreground leading-tight"
                style={{ fontFamily: FAMILY_VAR[f.name] }}
              >
                Aa Bb Cc
              </p>
              <p
                className="text-sm text-muted-foreground"
                style={{ fontFamily: FAMILY_VAR[f.name] }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
                <br />
                abcdefghijklmnopqrstuvwxyz 0123456789
                <br />
                .,:;!? @#$%^&*(){}[]
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Font size scale — waterfall ───────────────────────────────── */}
      <Section title="Size scale" id="type-scale">
        <div className="overflow-hidden rounded-lg border border-border">
          {fontSizes.map((s, i) => {
            const usage = SIZE_USAGE[s.name]
            const isMicro = s.px <= 16
            return (
              <div
                key={s.name}
                className={`group flex items-start gap-4 px-4 py-3 transition-colors hover:bg-accent/30 ${i > 0 ? "border-t border-border" : ""}`}
              >
                {/* Left: label + usage */}
                <div className="w-40 shrink-0 pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <Code>text-{s.name}</Code>
                    <CopyButton
                      value={`text-${s.name}`}
                      className="opacity-0 group-hover:opacity-100"
                    />
                  </div>
                  {usage && (
                    <p className="mt-0.5 text-[0.625rem] leading-normal text-muted-foreground">
                      {usage}
                    </p>
                  )}
                </div>

                {/* Center: type specimen */}
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p
                    className="truncate text-foreground leading-none"
                    style={{ fontSize: `${s.px}px`, lineHeight: isMicro ? 1.6 : 1.15 }}
                  >
                    {isMicro ? "The quick brown fox jumps over the lazy dog" : s.px >= 60 ? "Design" : "Type scale"}
                  </p>
                </div>

                {/* Right: px value */}
                <div className="shrink-0 pt-0.5 text-right">
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {s.px}px
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* ── Font weights ─────────────────────────────────────────────── */}
      <Section title="Weights" id="type-weights">
        <div className="overflow-hidden rounded-lg border border-border">
          {fontWeights.map((w, i) => (
            <div
              key={w.name}
              className={`group flex items-center gap-4 px-4 py-3 transition-colors hover:bg-accent/30 ${i > 0 ? "border-t border-border" : ""}`}
            >
              {/* Label */}
              <div className="w-40 shrink-0">
                <div className="flex items-center gap-1.5">
                  <Code>font-{w.name}</Code>
                  <CopyButton
                    value={`font-${w.name}`}
                    className="opacity-0 group-hover:opacity-100"
                  />
                </div>
              </div>

              {/* Specimen — same text, same size, different weight */}
              <p
                className="min-w-0 flex-1 truncate text-lg text-foreground"
                style={{ fontWeight: Number(w.value) }}
              >
                The quick brown fox jumps
              </p>

              {/* Numeric value */}
              <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                {w.value}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Letter spacing + Line height (side by side on desktop) ──── */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Letter spacing — visual */}
        <Section title="Letter spacing" id="type-letter-spacing">
          <div className="overflow-hidden rounded-lg border border-border">
            {tracking.map((t, i) => (
              <div
                key={t.name}
                className={`group flex flex-col gap-1.5 px-4 py-3 transition-colors hover:bg-accent/30 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Code>tracking-{t.name}</Code>
                    <CopyButton
                      value={`tracking-${t.name}`}
                      className="opacity-0 group-hover:opacity-100"
                    />
                  </div>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {t.em > 0 ? "+" : ""}{t.em}em
                  </span>
                </div>
                {/* Rendered specimen */}
                <p
                  className="text-sm font-medium text-foreground"
                  style={{ letterSpacing: `${t.em}em` }}
                >
                  HAMBURGERS
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Line height — visual with two-line sample */}
        <Section title="Line height" id="type-line-height">
          <div className="overflow-hidden rounded-lg border border-border">
            {leading.map((l, i) => (
              <div
                key={l.name}
                className={`group flex flex-col gap-1.5 px-4 py-3 transition-colors hover:bg-accent/30 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Code>leading-{l.name}</Code>
                    <CopyButton
                      value={`leading-${l.name}`}
                      className="opacity-0 group-hover:opacity-100"
                    />
                  </div>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {l.px}px
                  </span>
                </div>
                {/* Two-line specimen so the gap is visible */}
                <p
                  className="text-sm text-foreground"
                  style={{ lineHeight: `${l.px}px`, fontSize: "13px" }}
                >
                  The quick brown fox
                  <br />
                  jumps over the lazy dog
                </p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}
