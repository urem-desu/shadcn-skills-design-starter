import { Badge } from "@/components/ui/badge"
import { Swatch } from "@/components/docs/swatch"
import { CopyButton } from "@/components/docs/copy-button"
import { Code } from "@/components/docs/page-header"
import type { EnrichedColor } from "@/lib/design-tokens"

function ModeChip({
  label,
  value,
  alias,
}: {
  label: string
  value: string
  alias: string | null
}) {
  return (
    <div className="flex items-center gap-3">
      <Swatch color={value} title={value} className="size-10 shrink-0" />
      <div className="flex flex-col gap-0.5">
        <span className="text-[0.6875rem] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className="font-mono text-xs text-foreground">{value}</span>
        {alias ? (
          <span className="font-mono text-[0.6875rem] text-muted-foreground">{alias}</span>
        ) : null}
      </div>
    </div>
  )
}

/** One semantic token: dual light/dark preview, var name, utility, purpose. */
export function ColorTokenRow({ token }: { token: EnrichedColor }) {
  return (
    <div className="grid grid-cols-1 items-start gap-4 rounded-lg border border-border bg-card p-4 sm:grid-cols-[1fr_auto] md:grid-cols-[minmax(0,1fr)_1fr_auto]">
      <div className="flex min-w-0 flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <Code>{token.cssVar}</Code>
          <CopyButton value={token.cssVar} label={`Copy ${token.cssVar}`} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="font-mono text-[0.6875rem]">
            {token.utility}
          </Badge>
        </div>
        {token.purpose ? (
          <p className="text-xs text-muted-foreground">{token.purpose}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-6">
        <ModeChip label="Light" value={token.light} alias={token.lightAlias} />
        <ModeChip label="Dark" value={token.dark} alias={token.darkAlias} />
      </div>
    </div>
  )
}
