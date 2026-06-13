import Link from "next/link"
import { DocsHeader } from "@/components/docs/docs-header"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { nav } from "@/lib/nav"
import { tokenCounts, figmaExportFormat } from "@/lib/design-tokens"

const STATS = [
  { label: "Semantic tokens", value: tokenCounts.semanticColors },
  { label: "Palette primitives", value: tokenCounts.palette },
  { label: "Figma variables", value: tokenCounts.total },
]

export default function Page() {
  return (
    <div className="min-h-svh bg-background">
      <DocsHeader />
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 py-16 md:px-8">
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

        {nav.map((section) => (
          <section key={section.title} className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {section.items.map((item) => (
                <Link key={item.href} href={item.href} className="group">
                  <Card className="h-full transition-colors hover:border-ring">
                    <CardHeader>
                      <CardTitle className="group-hover:text-foreground">
                        {item.title}
                      </CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
