/** Docs navigation — consumed by the sidebar and the overview landing. */
import type { LucideIcon } from "lucide-react"
import { Palette, Droplet, Type, Frame, Ruler, Square } from "lucide-react"
import { componentList } from "@/lib/component-list"

export type NavItem = { title: string; href: string; description?: string; icon?: LucideIcon }
export type NavSection = { title: string; href?: string; items: NavItem[] }

export const nav: NavSection[] = [
  {
    title: "Foundations",
    items: [
      { title: "Colors", href: "/docs/colors", description: "35 semantic tokens, light & dark, with palette aliases", icon: Palette },
      { title: "Palette", href: "/docs/palette", description: "The 244 raw Tailwind primitives the kit aliases", icon: Droplet },
      { title: "Typography", href: "/docs/typography", description: "Families, sizes, weights, tracking & leading", icon: Type },
      { title: "Radius", href: "/docs/radius", description: "The static border-radius scale", icon: Frame },
      { title: "Spacing", href: "/docs/spacing", description: "The 4px-based spacing scale", icon: Ruler },
      { title: "Borders & Effects", href: "/docs/borders", description: "Border widths, stroke widths & opacity", icon: Square },
    ],
  },
  {
    // Flat, one entry per component — mirrors the Figma kit (no category grouping).
    title: "Components",
    href: "/docs/components",
    items: componentList.map((c) => ({ title: c.name, href: `/docs/components/${c.slug}` })),
  },
]

export const allNavItems: NavItem[] = nav.flatMap((s) => s.items)
