import { Badge } from "@/components/ui/badge"
import { Code } from "@/components/docs/page-header"
import { cn } from "@/lib/utils"

/** A single component demo: title, source path, live preview, token chips. */
export function Showcase({
  name,
  source,
  tokens,
  className,
  children,
}: {
  name: string
  source: string
  tokens?: string[]
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={cn("flex scroll-mt-20 flex-col gap-4", className)} id={name.toLowerCase().replace(/\s+/g, "-")}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-foreground">{name}</h2>
        <Code>{source}</Code>
      </div>
      <div className="flex min-h-24 flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-6">
        {children}
      </div>
      {tokens && tokens.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Tokens:</span>
          {tokens.map((t) => (
            <Badge key={t} variant="outline" className="font-mono text-[0.6875rem]">
              {t}
            </Badge>
          ))}
        </div>
      ) : null}
    </section>
  )
}
