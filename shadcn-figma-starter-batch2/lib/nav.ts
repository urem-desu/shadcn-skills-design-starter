/** Docs navigation — consumed by the sidebar and the overview landing. */
export type NavItem = { title: string; href: string; description: string }
export type NavSection = { title: string; items: NavItem[] }

export const nav: NavSection[] = [
  {
    title: "Foundations",
    items: [
      { title: "Colors", href: "/docs/colors", description: "35 semantic tokens, light & dark, with palette aliases" },
      { title: "Palette", href: "/docs/palette", description: "The 244 raw Tailwind primitives the kit aliases" },
      { title: "Typography", href: "/docs/typography", description: "Families, sizes, weights, tracking & leading" },
      { title: "Radius", href: "/docs/radius", description: "The static border-radius scale" },
      { title: "Spacing", href: "/docs/spacing", description: "The 4px-based spacing scale" },
      { title: "Borders & Effects", href: "/docs/borders", description: "Border widths, stroke widths & opacity" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Overview", href: "/docs/components", description: "All 54 components in the kit, by category" },
      { title: "Buttons & Actions", href: "/docs/components/actions", description: "Button, button group, toggle, badge, kbd" },
      { title: "Forms & Inputs", href: "/docs/components/forms", description: "Inputs, select, checkbox, radio, slider, field & form" },
      { title: "Overlays", href: "/docs/components/overlays", description: "Dialog, sheet, drawer, popover, menus, command" },
      { title: "Navigation", href: "/docs/components/navigation", description: "Tabs, breadcrumb, pagination, navigation & menubar" },
      { title: "Data Display", href: "/docs/components/data-display", description: "Table, card, accordion, carousel, chart, avatar" },
      { title: "Feedback & Status", href: "/docs/components/feedback", description: "Alert, progress, skeleton, spinner, sonner, empty" },
      { title: "Layout", href: "/docs/components/layout", description: "Aspect ratio, separator, scroll area, resizable, sidebar" },
    ],
  },
]

export const allNavItems: NavItem[] = nav.flatMap((s) => s.items)

/** Component category pages (everything under /docs/components/*). */
export const componentCategories = nav[1].items.filter((i) => i.href !== "/docs/components")
