import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/docs/page-header"
import { Showcase } from "@/components/docs/showcase"
import { componentSlugs, getComponentMeta } from "@/lib/component-list"
import { getShowcase } from "@/components/docs/component-showcases"

export function generateStaticParams() {
  return componentSlugs.map((component) => ({ component }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ component: string }>
}): Promise<Metadata> {
  const { component } = await params
  const meta = getComponentMeta(component)
  return { title: meta ? meta.name : "Component" }
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ component: string }>
}) {
  const { component } = await params
  const meta = getComponentMeta(component)
  const showcase = getShowcase(component)

  if (!meta || !showcase) notFound()

  return (
    <>
      <PageHeader eyebrow="Components" title={meta.name} description={meta.description} />
      <Showcase name={meta.name} source={showcase.source}>
        {showcase.content}
      </Showcase>
    </>
  )
}
