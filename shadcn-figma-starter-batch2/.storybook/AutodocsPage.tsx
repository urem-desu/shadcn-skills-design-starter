import * as React from "react"
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
  Source,
  Markdown,
  Unstyled,
  useOf,
} from "@storybook/addon-docs/blocks"

import {
  getComponentDoc,
  type ComponentDoc,
  type PropDef,
  type VariantDef,
  type StateDef,
  type TokenDef,
} from "@/lib/component-docs"

/**
 * Custom Autodocs template, designed as a single-page reference for the
 * Development and QA teams. Above the curated content it shows the standard
 * autodocs (title, description, live preview, Controls playground); below it,
 * the structured `lib/component-docs.ts` content is laid out for fast scanning:
 *
 *   - Header strip: at-a-glance counts (props / variants / states / tokens) +
 *     a copy-ready import statement (dev).
 *   - Live preview + Controls: the interactive API playground (dev).
 *   - Anatomy / Slots: structure (dev).
 *   - Props: the typed API reference (dev).
 *   - Variants / States: the matrices QA verifies (QA).
 *   - Accessibility: keyboard / SR / ARIA behaviours QA must check (QA).
 *   - Guidelines: do / don't (both).
 *   - Tokens: every value traced to a design token (dev).
 *   - Examples: every story.
 *
 * Everything is styled with the project's CSS token variables (var(--border),
 * var(--muted)…) so the docs theme with the kit in light and dark. Section
 * headings are real <h2 id> elements so the docs "On this page" TOC (configured
 * in preview.tsx) can link to them. Icons are inline lucide SVG (currentColor) —
 * no emoji, per the design-system rules.
 */

// ── helpers ──────────────────────────────────────────────────────────────────

function slugFromTitle(title: string | undefined): string {
  if (!title) return ""
  const last = title.split("/").pop() ?? title
  return last
    .replace(/\(.*?\)/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
}

function pascalFromTitle(title: string | undefined): string {
  if (!title) return ""
  const last = title.split("/").pop() ?? title
  return last
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("")
}

function anchorId(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

// ── icons (inline lucide, currentColor) ──────────────────────────────────────

type IconName =
  | "usage"
  | "anatomy"
  | "props"
  | "variants"
  | "states"
  | "a11y"
  | "do"
  | "dont"
  | "tokens"
  | "examples"

const ICON_PATHS: Record<IconName, React.ReactNode> = {
  usage: (
    <>
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </>
  ),
  anatomy: (
    <>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </>
  ),
  props: (
    <>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </>
  ),
  variants: (
    <>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.57 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="M2 12.5 11.17 16.66a2 2 0 0 0 1.66 0L22 12.5" />
      <path d="M2 17 11.17 21.16a2 2 0 0 0 1.66 0L22 17" />
    </>
  ),
  states: (
    <>
      <rect width="20" height="12" x="2" y="6" rx="6" />
      <circle cx="8" cy="12" r="2" />
    </>
  ),
  a11y: (
    <>
      <circle cx="16" cy="4" r="1" />
      <path d="m18 19 1-7-5.87.94" />
      <path d="m5 8 3-3 5.5 3-2.36 3.5" />
      <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
      <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
    </>
  ),
  do: <path d="M20 6 9 17l-5-5" />,
  dont: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  tokens: (
    <>
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.41 2.41 0 0 0 3.408 0l6.58-6.58a2.41 2.41 0 0 0 0-3.408z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </>
  ),
  examples: (
    <>
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </>
  ),
}

function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {ICON_PATHS[name]}
    </svg>
  )
}

// ── styled primitives (token-driven) ─────────────────────────────────────────

function Section({
  icon,
  title,
  accent,
  children,
}: {
  icon: IconName
  title: string
  accent?: string
  children: React.ReactNode
}) {
  return (
    <section style={{ marginTop: "2.75rem" }}>
      <h2
        id={anchorId(title)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          margin: "0 0 0.85rem",
          paddingBottom: "0.5rem",
          borderBottom: "1px solid var(--border)",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "0.01em",
          color: "var(--foreground)",
        }}
      >
        <span style={{ color: accent ?? "var(--muted-foreground)", display: "inline-flex" }}>
          <Icon name={icon} />
        </span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Chip({ value, label }: { value: number; label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: "var(--muted)",
        fontSize: 12,
        color: "var(--muted-foreground)",
      }}
    >
      <strong style={{ color: "var(--foreground)", fontWeight: 600, fontSize: 13 }}>{value}</strong>
      {label}
    </span>
  )
}

const cellStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "9px 12px",
  borderBottom: "1px solid var(--border)",
  verticalAlign: "top",
  fontSize: 13,
  color: "var(--foreground)",
}

const thStyle: React.CSSProperties = {
  ...cellStyle,
  fontWeight: 600,
  color: "var(--muted-foreground)",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  borderBottom: "1px solid var(--border)",
}

function Table({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div
      style={{
        overflowX: "auto",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius, 0.5rem)",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", margin: 0 }}>
        <thead>
          <tr style={{ background: "var(--muted)" }}>
            {headers.map((h) => (
              <th key={h} style={thStyle}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, i) => (
            <tr key={i}>
              {cells.map((c, j) => (
                <td key={j} style={{ ...cellStyle, borderBottom: i === rows.length - 1 ? "none" : cellStyle.borderBottom }}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Mono({ children, tone }: { children: React.ReactNode; tone?: string }) {
  return (
    <code
      style={{
        fontFamily: "var(--font-mono, ui-monospace, monospace)",
        fontSize: 12,
        padding: "1px 6px",
        borderRadius: 5,
        background: "var(--muted)",
        border: "1px solid var(--border)",
        color: tone ?? "var(--foreground)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </code>
  )
}

function Pre({ children }: { children: string }) {
  return (
    <pre
      style={{
        fontFamily: "var(--font-mono, ui-monospace, monospace)",
        fontSize: 12,
        lineHeight: 1.55,
        overflowX: "auto",
        padding: "1rem 1.1rem",
        borderRadius: "var(--radius, 0.5rem)",
        background: "var(--muted)",
        border: "1px solid var(--border)",
        color: "var(--foreground)",
        margin: 0,
      }}
    >
      {children}
    </pre>
  )
}

function Bullets({
  items,
  icon,
  accent,
}: {
  items: string[]
  icon?: IconName
  accent?: string
}) {
  return (
    <ul style={{ listStyle: icon ? "none" : "disc", paddingLeft: icon ? 0 : "1.2rem", margin: 0 }}>
      {items.map((it) => (
        <li
          key={it}
          style={{
            display: icon ? "flex" : "list-item",
            gap: 9,
            alignItems: "flex-start",
            fontSize: 13,
            lineHeight: 1.6,
            color: "var(--foreground)",
            padding: icon ? "5px 0" : "2px 0",
          }}
        >
          {icon && (
            <span style={{ color: accent ?? "var(--muted-foreground)", marginTop: 2, display: "inline-flex" }}>
              <Icon name={icon} size={15} />
            </span>
          )}
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

// ── structured content ───────────────────────────────────────────────────────

function StructuredDoc({ doc, slug, importName, hasComponent }: {
  doc: ComponentDoc
  slug: string
  importName: string
  hasComponent: boolean
}) {
  const chips: { value: number; label: string }[] = [
    doc.props?.length ? { value: doc.props.length, label: doc.props.length === 1 ? "prop" : "props" } : null,
    doc.variants?.length ? { value: doc.variants.length, label: doc.variants.length === 1 ? "variant" : "variants" } : null,
    doc.states?.length ? { value: doc.states.length, label: doc.states.length === 1 ? "state" : "states" } : null,
    doc.slots?.length ? { value: doc.slots.length, label: doc.slots.length === 1 ? "slot" : "slots" } : null,
    doc.tokens?.length ? { value: doc.tokens.length, label: doc.tokens.length === 1 ? "token" : "tokens" } : null,
  ].filter(Boolean) as { value: number; label: string }[]

  return (
    <Unstyled>
      {/* header strip: chips + import */}
      <div style={{ marginTop: "0.25rem" }}>
        {chips.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hasComponent ? "1rem" : 0 }}>
            {chips.map((c) => (
              <Chip key={c.label} value={c.value} label={c.label} />
            ))}
          </div>
        )}
        {hasComponent && (
          <Source dark language="tsx" code={`import { ${importName} } from "@/components/ui/${slug}"`} />
        )}
      </div>
    </Unstyled>
  )
}

function StructuredSections({ doc }: { doc: ComponentDoc }) {
  return (
    <Unstyled>
      <div>
        {doc.usage && (
          <Section icon="usage" title="Usage">
            <div style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--foreground)" }}>
              <Markdown>{doc.usage}</Markdown>
            </div>
          </Section>
        )}

        {(doc.anatomy || (doc.slots && doc.slots.length > 0)) && (
          <Section icon="anatomy" title="Anatomy">
            {doc.anatomy && <Pre>{doc.anatomy}</Pre>}
            {doc.slots && doc.slots.length > 0 && (
              <div style={{ marginTop: doc.anatomy ? "1rem" : 0 }}>
                <p style={{ margin: "0 0 0.4rem", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--muted-foreground)" }}>
                  Slots
                </p>
                <Bullets items={doc.slots} />
              </div>
            )}
          </Section>
        )}

        {doc.props && doc.props.length > 0 && (
          <Section icon="props" title="Props">
            <Table
              headers={["Prop", "Type", "Default", "Description"]}
              rows={doc.props.map((p: PropDef) => [
                <Mono key="p">{p.prop}</Mono>,
                <Mono key="t" tone="var(--muted-foreground)">{p.type}</Mono>,
                p.default ? <Mono key="d">{p.default}</Mono> : <span style={{ color: "var(--muted-foreground)" }}>—</span>,
                p.description,
              ])}
            />
          </Section>
        )}

        {doc.variants && doc.variants.length > 0 && (
          <Section icon="variants" title="Variants">
            <Table
              headers={["Variant", "When to use"]}
              rows={doc.variants.map((v: VariantDef) => [<Mono key="n">{v.name}</Mono>, v.description])}
            />
          </Section>
        )}

        {doc.states && doc.states.length > 0 && (
          <Section icon="states" title="States">
            <p style={{ margin: "0 0 0.7rem", fontSize: 12.5, color: "var(--muted-foreground)" }}>
              QA: verify each state renders and behaves as described — drive them from the Controls panel above or the dedicated stories below.
            </p>
            <Table
              headers={["State", "Expected behaviour"]}
              rows={doc.states.map((s: StateDef) => [<Mono key="s">{s.state}</Mono>, s.description])}
            />
          </Section>
        )}

        {doc.a11y && doc.a11y.length > 0 && (
          <Section icon="a11y" title="Accessibility">
            <p style={{ margin: "0 0 0.7rem", fontSize: 12.5, color: "var(--muted-foreground)" }}>
              Keyboard, screen-reader, and ARIA behaviours QA should confirm.
            </p>
            <Bullets items={doc.a11y} icon="do" accent="var(--muted-foreground)" />
          </Section>
        )}

        {(doc.do?.length || doc.dont?.length) && (
          <Section icon="usage" title="Guidelines">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1rem",
              }}
            >
              {doc.do && doc.do.length > 0 && (
                <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius, 0.5rem)", padding: "0.9rem 1rem" }}>
                  <p style={{ display: "flex", alignItems: "center", gap: 7, margin: "0 0 0.6rem", fontWeight: 600, fontSize: 13, color: "var(--foreground)" }}>
                    <span style={{ color: "var(--primary)", display: "inline-flex" }}><Icon name="do" /></span>
                    Do
                  </p>
                  <Bullets items={doc.do} icon="do" accent="var(--primary)" />
                </div>
              )}
              {doc.dont && doc.dont.length > 0 && (
                <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius, 0.5rem)", padding: "0.9rem 1rem" }}>
                  <p style={{ display: "flex", alignItems: "center", gap: 7, margin: "0 0 0.6rem", fontWeight: 600, fontSize: 13, color: "var(--foreground)" }}>
                    <span style={{ color: "var(--destructive)", display: "inline-flex" }}><Icon name="dont" /></span>
                    Don&apos;t
                  </p>
                  <Bullets items={doc.dont} icon="dont" accent="var(--destructive)" />
                </div>
              )}
            </div>
          </Section>
        )}

        {doc.tokens && doc.tokens.length > 0 && (
          <Section icon="tokens" title="Design tokens">
            <Table
              headers={["Property", "Token", "Light", "Dark"]}
              rows={doc.tokens.map((t: TokenDef) => [
                t.property,
                <Mono key="tok">{t.token}</Mono>,
                t.light ? <Mono key="l" tone="var(--muted-foreground)">{t.light}</Mono> : <span style={{ color: "var(--muted-foreground)" }}>—</span>,
                t.dark ? <Mono key="d" tone="var(--muted-foreground)">{t.dark}</Mono> : <span style={{ color: "var(--muted-foreground)" }}>—</span>,
              ])}
            />
          </Section>
        )}
      </div>
    </Unstyled>
  )
}

export function AutodocsPage() {
  const resolved = useOf("meta", ["meta"])
  const preparedMeta = (resolved as { preparedMeta?: { title?: string; component?: unknown } }).preparedMeta
  const title = preparedMeta?.title
  const slug = slugFromTitle(title)
  const importName = pascalFromTitle(title)
  const hasComponent = Boolean(preparedMeta?.component)
  const doc = slug ? getComponentDoc(slug) : undefined

  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      {doc && (
        <StructuredDoc doc={doc} slug={slug} importName={importName} hasComponent={hasComponent} />
      )}
      <Primary />
      <Controls />
      {doc && <StructuredSections doc={doc} />}
      <Unstyled>
        <h2
          id="examples"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            margin: "2.75rem 0 0.85rem",
            paddingBottom: "0.5rem",
            borderBottom: "1px solid var(--border)",
            fontSize: 15,
            fontWeight: 600,
            color: "var(--foreground)",
          }}
        >
          <span style={{ color: "var(--muted-foreground)", display: "inline-flex" }}>
            <Icon name="examples" />
          </span>
          Examples
        </h2>
      </Unstyled>
      <Stories includePrimary={false} />
    </>
  )
}
