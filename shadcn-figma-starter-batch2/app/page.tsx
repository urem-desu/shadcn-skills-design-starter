import { DocsHeader } from "@/components/docs/docs-header"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { tokenCounts, figmaExportFormat } from "@/lib/design-tokens"

const STATS = [
  { label: "Semantic tokens", value: tokenCounts.semanticColors },
  { label: "Palette primitives", value: tokenCounts.palette },
  { label: "Figma variables", value: tokenCounts.total },
]

export default function Page() {
  return (
    <SidebarProvider>
      <DocsSidebar />
      <SidebarInset>
        <DocsHeader sidebar />
        <main className="min-w-0 flex-1 px-4 py-16 md:px-10">
          <div className="mx-auto flex max-w-4xl flex-col gap-8">
            <section className="flex flex-col gap-4">
              <Badge variant="secondary" className="w-fit font-mono text-xs">
                {figmaExportFormat}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                A Figma-synced design system
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground">
                Every value on this site is extracted once from the Figma variable export and
                verified against <code className="font-mono">app/globals.css</code> — a single
                source of truth for color, type, spacing, and components.
              </p>
              <div className="mt-2 flex flex-wrap gap-8">
                {STATS.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <span className="text-3xl font-bold tabular-nums text-foreground">
                      {s.value.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Browse foundations and all components in the sidebar.
              </p>
            </section>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
