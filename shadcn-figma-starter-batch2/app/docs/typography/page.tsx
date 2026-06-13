import type { Metadata } from "next"
import { PageHeader, Code } from "@/components/docs/page-header"
import { TypeSpecimen } from "@/components/docs/type-specimen"
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
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
        description="Font families, sizes, weights, tracking and leading — the atomic type tokens from the Figma font collection."
      />

      <Section title="Font families">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fontFamilies.map((f) => (
            <div key={f.name} className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <Code>--font-{f.name}</Code>
                <span className="font-mono text-xs text-muted-foreground">{String(f.value)}</span>
              </div>
              <p className="text-2xl text-foreground" style={{ fontFamily: FAMILY_VAR[f.name] }}>
                {String(f.value)}
              </p>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: FAMILY_VAR[f.name] }}>
                ABCDEFGHIJKLM abcdefghijklm 0123456789
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Font size">
        <div className="flex flex-col gap-3">
          {fontSizes.map((s) => (
            <TypeSpecimen
              key={s.name}
              utility={`text-${s.name}`}
              px={s.px}
              style={{ fontSize: `${s.px}px`, lineHeight: 1.15 }}
            />
          ))}
        </div>
      </Section>

      <Section title="Font weight">
        <div className="flex flex-col gap-3">
          {fontWeights.map((w) => (
            <TypeSpecimen
              key={w.name}
              utility={`font-${w.name}`}
              px={20}
              meta={String(w.value)}
              style={{ fontSize: "20px", fontWeight: Number(w.value), lineHeight: 1.3 }}
            />
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Section title="Letter spacing">
          <div className="overflow-hidden rounded-lg border border-border">
            {tracking.map((t, i) => (
              <div
                key={t.name}
                className={`flex items-center justify-between gap-2 bg-card px-4 py-2.5 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <div className="flex items-center gap-1.5">
                  <Code>tracking-{t.name}</Code>
                  <CopyButton value={`tracking-${t.name}`} />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {t.em}em · {t.px}px
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Line height">
          <div className="overflow-hidden rounded-lg border border-border">
            {leading.map((l, i) => (
              <div
                key={l.name}
                className={`flex items-center justify-between gap-2 bg-card px-4 py-2.5 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <div className="flex items-center gap-1.5">
                  <Code>leading-{l.name}</Code>
                  <CopyButton value={`leading-${l.name}`} />
                </div>
                <span className="font-mono text-xs text-muted-foreground">{l.px}px</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}
