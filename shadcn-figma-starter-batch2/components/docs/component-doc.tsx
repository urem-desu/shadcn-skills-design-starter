import type {
  ComponentDoc,
  PropDef,
  TokenDef,
  StateDef,
  VariantDef,
} from "@/lib/component-docs"

// ─── Section shell ────────────────────────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  )
}

// ─── Anatomy ──────────────────────────────────────────────────────────────────

function Anatomy({ text, slots }: { text?: string; slots?: string[] }) {
  if (!text && !slots) return null
  return (
    <Section title="Anatomy">
      <div className="flex flex-col gap-3">
        {text && (
          <pre className="overflow-x-auto rounded-lg border border-border bg-muted/60 p-4 font-mono text-[0.75rem] leading-relaxed text-foreground">
            {text}
          </pre>
        )}
        {slots && slots.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {slots.map((s) => {
              const [part, ...rest] = s.split(" — ")
              return (
                <li key={s} className="flex flex-wrap gap-1 text-sm">
                  <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground shrink-0">
                    {part?.trim()}
                  </code>
                  {rest.length > 0 && (
                    <span className="text-muted-foreground">{rest.join(" — ")}</span>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Section>
  )
}

// ─── Props table ──────────────────────────────────────────────────────────────

function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <Section title="Props">
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-[0.6875rem] uppercase tracking-wider">
                  Prop
                </th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-[0.6875rem] uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-[0.6875rem] uppercase tracking-wider">
                  Default
                </th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-[0.6875rem] uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {props.map((p, i) => (
                <tr
                  key={p.prop}
                  className={`border-b border-border last:border-b-0 ${i % 2 === 1 ? "bg-muted/20" : ""}`}
                >
                  <td className="px-4 py-3 align-top">
                    <code className="font-mono text-[0.8125rem] text-foreground font-medium">
                      {p.prop}
                    </code>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <code className="font-mono text-[0.75rem] text-primary">
                      {p.type}
                    </code>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {p.default ? (
                      <code className="font-mono text-[0.75rem] text-muted-foreground">
                        {p.default}
                      </code>
                    ) : (
                      <span className="text-muted-foreground/50 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-[0.8125rem] text-muted-foreground leading-normal">
                    {p.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  )
}

// ─── Variants ─────────────────────────────────────────────────────────────────

function VariantsSection({ variants }: { variants: VariantDef[] }) {
  return (
    <Section title="Variants">
      <div className="grid gap-2 sm:grid-cols-2">
        {variants.map((v) => (
          <div
            key={v.name}
            className="flex flex-col gap-1 rounded-lg border border-border bg-card px-3.5 py-3"
          >
            <code className="font-mono text-[0.8125rem] font-medium text-foreground">
              {v.name}
            </code>
            <p className="text-[0.8125rem] text-muted-foreground leading-normal">
              {v.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── States ───────────────────────────────────────────────────────────────────

function StatesSection({ states }: { states: StateDef[] }) {
  return (
    <Section title="States">
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-[0.6875rem] uppercase tracking-wider w-40">
                State
              </th>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-[0.6875rem] uppercase tracking-wider">
                Behavior
              </th>
            </tr>
          </thead>
          <tbody>
            {states.map((s, i) => (
              <tr
                key={s.state}
                className={`border-b border-border last:border-b-0 ${i % 2 === 1 ? "bg-muted/20" : ""}`}
              >
                <td className="px-4 py-3 align-top">
                  <span className="inline-flex items-center rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[0.75rem] text-foreground">
                    {s.state}
                  </span>
                </td>
                <td className="px-4 py-3 align-top text-[0.8125rem] text-muted-foreground leading-normal">
                  {s.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}

// ─── Do / Don't ───────────────────────────────────────────────────────────────

function UsageGuidelines({ doList, dontList }: { doList: string[]; dontList: string[] }) {
  return (
    <Section title="Usage guidelines">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Do
          </p>
          <ul className="flex flex-col gap-2">
            {doList.map((item, i) => (
              <li key={i} className="flex gap-2 text-[0.8125rem] text-muted-foreground leading-normal">
                <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Don't
          </p>
          <ul className="flex flex-col gap-2">
            {dontList.map((item, i) => (
              <li key={i} className="flex gap-2 text-[0.8125rem] text-muted-foreground leading-normal">
                <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-rose-500" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

// ─── Accessibility ────────────────────────────────────────────────────────────

function A11ySection({ notes }: { notes: string[] }) {
  return (
    <Section title="Accessibility">
      <ul className="flex flex-col gap-2 rounded-lg border border-border bg-muted/30 p-4">
        {notes.map((note, i) => (
          <li key={i} className="flex gap-2.5 text-[0.8125rem] text-muted-foreground leading-normal">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-muted-foreground/60" aria-hidden />
            {note}
          </li>
        ))}
      </ul>
    </Section>
  )
}

// ─── Token mapping ────────────────────────────────────────────────────────────

function TokenTable({ tokens }: { tokens: TokenDef[] }) {
  return (
    <Section title="Token mapping">
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-[0.6875rem] uppercase tracking-wider">
                  Property
                </th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-[0.6875rem] uppercase tracking-wider">
                  Token
                </th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-[0.6875rem] uppercase tracking-wider">
                  Light
                </th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-[0.6875rem] uppercase tracking-wider">
                  Dark
                </th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((t, i) => (
                <tr
                  key={`${t.property}-${i}`}
                  className={`border-b border-border last:border-b-0 ${i % 2 === 1 ? "bg-muted/20" : ""}`}
                >
                  <td className="px-4 py-3 align-top text-[0.8125rem] text-foreground">
                    {t.property}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <code className="font-mono text-[0.75rem] text-primary whitespace-nowrap">
                      {t.token}
                    </code>
                  </td>
                  <td className="px-4 py-3 align-top text-[0.75rem] text-muted-foreground font-mono">
                    {t.light ?? "—"}
                  </td>
                  <td className="px-4 py-3 align-top text-[0.75rem] text-muted-foreground font-mono">
                    {t.dark ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  )
}

// ─── Usage example ────────────────────────────────────────────────────────────

function UsageCode({ code }: { code: string }) {
  return (
    <Section title="Usage">
      <pre className="overflow-x-auto rounded-lg border border-border bg-muted/60 p-4 font-mono text-[0.75rem] leading-relaxed text-foreground">
        <code>{code}</code>
      </pre>
    </Section>
  )
}

// ─── Root renderer ────────────────────────────────────────────────────────────

export function ComponentDoc({ doc }: { doc: ComponentDoc }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Anatomy */}
      {(doc.anatomy || doc.slots) && (
        <Anatomy text={doc.anatomy} slots={doc.slots} />
      )}

      {/* Props */}
      {doc.props && doc.props.length > 0 && <PropsTable props={doc.props} />}

      {/* Variants */}
      {doc.variants && doc.variants.length > 0 && (
        <VariantsSection variants={doc.variants} />
      )}

      {/* States */}
      {doc.states && doc.states.length > 0 && (
        <StatesSection states={doc.states} />
      )}

      {/* Usage guidelines */}
      {doc.do && doc.dont && doc.do.length > 0 && doc.dont.length > 0 && (
        <UsageGuidelines doList={doc.do} dontList={doc.dont} />
      )}

      {/* Accessibility */}
      {doc.a11y && doc.a11y.length > 0 && <A11ySection notes={doc.a11y} />}

      {/* Token mapping */}
      {doc.tokens && doc.tokens.length > 0 && <TokenTable tokens={doc.tokens} />}

      {/* Usage example */}
      {doc.usage && <UsageCode code={doc.usage} />}
    </div>
  )
}
