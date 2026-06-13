import type { Metadata } from "next"
import { PageHeader } from "@/components/docs/page-header"
import { ColorTokenRow } from "@/components/docs/color-token-row"
import { colorTokensByGroup, tokenCounts } from "@/lib/design-tokens"

export const metadata: Metadata = { title: "Colors" }

export default function ColorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Colors"
        description={`${tokenCounts.semanticColors} semantic tokens, each defined for light and dark mode and aliased to a Tailwind palette swatch. Use the utility — never a raw color.`}
      />
      {colorTokensByGroup.map(({ group, tokens }) => (
        <section key={group} className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-foreground">{group}</h2>
          <div className="flex flex-col gap-3">
            {tokens.map((token) => (
              <ColorTokenRow key={token.name} token={token} />
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
