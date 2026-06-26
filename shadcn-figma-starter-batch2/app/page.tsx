import Link from "next/link"
import { LayoutGrid } from "lucide-react"
import { DocsHeader } from "@/components/docs/docs-header"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { componentList } from "@/lib/component-list"
import { nav } from "@/lib/nav"
import { tokenCounts, figmaExportFormat } from "@/lib/design-tokens"

const STATS = [
  { label: "Semantic tokens", value: tokenCounts.semanticColors },
  { label: "Palette primitives", value: tokenCounts.palette },
  { label: "Figma variables", value: tokenCounts.total },
]

export default function Page() {
  const foundations = nav[0].items
  const componentCount = componentList.length

  return (
    <SidebarProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <DocsSidebar />
      <SidebarInset>
        <DocsHeader sidebar />
        <main id="main-content" className="min-w-0 flex-1 px-4 py-16 md:px-10">
          <div className="mx-auto flex max-w-4xl flex-col gap-12">
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
            </section>

            <section aria-labelledby="section-foundations" className="flex flex-col gap-3">
              <h2 id="section-foundations" className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
                Foundations
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {foundations.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.href} href={item.href} className="group">
                      <Card className="h-full transition-colors hover:border-ring">
                        <CardHeader className="gap-2">
                          {Icon && <Icon className="size-4 text-muted-foreground" aria-hidden />}
                          <CardTitle className="text-sm group-hover:text-foreground">
                            {item.title}
                          </CardTitle>
                          <CardDescription className="text-xs">{item.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </section>

            <section aria-labelledby="section-components" className="flex flex-col gap-3">
              <h2 id="section-components" className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
                Components
              </h2>
              <Link href="/docs/components" className="group">
                <Card className="transition-colors hover:border-ring">
                  <CardHeader className="gap-2">
                    <LayoutGrid className="size-4 text-muted-foreground" aria-hidden />
                    <CardTitle className="text-sm group-hover:text-foreground">
                      {componentCount} components
                    </CardTitle>
                    <CardDescription className="text-xs">
                      All shadcn/ui components installed via the CLI and themed by the kit&apos;s semantic tokens — one page per component.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </section>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
