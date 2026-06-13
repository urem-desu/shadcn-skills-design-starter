import Link from "next/link"
import { ThemeToggle } from "@/components/docs/theme-toggle"
import { Button } from "@/components/ui/button"

const FIGMA_URL =
  "https://www.figma.com/design/UOQqHNISgc7bbc8yWt8Vj8/-shadcn_ui-components_uremdesu"

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-border bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
        <span className="inline-block size-4 rounded-sm bg-primary" aria-hidden />
        <span>shadcn/ui · Figma kit</span>
      </Link>
      <div className="flex items-center gap-1">
        <Button asChild variant="ghost" size="sm">
          <a href={FIGMA_URL} target="_blank" rel="noreferrer">
            Figma source
          </a>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  )
}
