import { CopyButton } from "@/components/docs/copy-button"
import { Code } from "@/components/docs/page-header"

const SAMPLE = "The quick brown fox jumps over the lazy dog"

/** A type sample rendered at an explicit px size, with its utility + value. */
export function TypeSpecimen({
  utility,
  px,
  meta,
  style,
}: {
  utility: string
  px: number
  meta?: string
  style: React.CSSProperties
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Code>{utility}</Code>
          <CopyButton value={utility} />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {px}px{meta ? ` · ${meta}` : ""}
        </span>
      </div>
      <p className="truncate text-foreground" style={style}>
        {SAMPLE}
      </p>
    </div>
  )
}
