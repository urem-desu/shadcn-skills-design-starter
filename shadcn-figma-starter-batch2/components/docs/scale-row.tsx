import { CopyButton } from "@/components/docs/copy-button"
import { Code } from "@/components/docs/page-header"
import { cn } from "@/lib/utils"

/** A scale entry (radius/spacing/border) with a visual sample + value. */
export function ScaleRow({
  utility,
  value,
  preview,
}: {
  utility: string
  value: string
  preview: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-3">
      <div className="flex h-14 w-40 shrink-0 items-center justify-center overflow-hidden">
        {preview}
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Code>{utility}</Code>
        <CopyButton value={utility} />
      </div>
      <span className="shrink-0 font-mono text-sm text-muted-foreground">{value}</span>
    </div>
  )
}

/** Visual building blocks for the scale pages. */
export function RadiusPreview({ px }: { px: number }) {
  const r = px >= 9999 ? 28 : px
  return (
    <div
      className="size-12 border-2 border-primary bg-primary/10"
      style={{ borderRadius: `${r}px` }}
    />
  )
}

export function SpacingPreview({ px }: { px: number }) {
  return (
    <div className="flex w-full items-center">
      <div className="h-4 bg-primary" style={{ width: `${Math.max(px, 1)}px` }} />
    </div>
  )
}

export function BorderPreview({ px }: { px: number }) {
  return (
    <div
      className={cn("size-12 rounded-md bg-card", px === 0 && "opacity-40")}
      style={{ border: `${px}px solid var(--primary)` }}
    />
  )
}
