import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/docs/page-header"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { componentList } from "@/lib/component-list"

export const metadata: Metadata = { title: "Components" }

export default function ComponentsIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Components"
        description={`${componentList.length} components installed via the shadcn CLI and themed entirely by the kit's semantic tokens — one page per component, mirroring the Figma kit.`}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {componentList.map((c) => (
          <Link key={c.slug} href={`/docs/components/${c.slug}`} className="group">
            <Card className="h-full transition-colors hover:border-ring">
              <CardHeader>
                <CardTitle className="text-sm group-hover:text-foreground">{c.name}</CardTitle>
                <CardDescription className="text-xs">{c.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
