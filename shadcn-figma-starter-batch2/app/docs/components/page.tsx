import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/docs/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { componentCategories } from "@/lib/nav"

export const metadata: Metadata = { title: "Components" }

// What each category page showcases (kept in sync with the category pages).
const CONTENTS: Record<string, string[]> = {
  "/docs/components/actions": ["Button", "Button Group", "Toggle", "Toggle Group", "Badge", "Kbd"],
  "/docs/components/forms": [
    "Input", "Input Group", "Input OTP", "Textarea", "Label", "Checkbox", "Radio Group",
    "Switch", "Slider", "Select", "Native Select", "Combobox", "Date Picker", "Calendar",
    "Field", "Form",
  ],
  "/docs/components/overlays": [
    "Dialog", "Alert Dialog", "Sheet", "Drawer", "Popover", "Hover Card", "Tooltip",
    "Dropdown Menu", "Context Menu", "Menubar", "Command",
  ],
  "/docs/components/navigation": ["Tabs", "Breadcrumb", "Pagination", "Navigation Menu"],
  "/docs/components/data-display": [
    "Table", "Avatar", "Card", "Accordion", "Collapsible", "Carousel", "Chart", "Item",
  ],
  "/docs/components/feedback": ["Alert", "Progress", "Skeleton", "Spinner", "Sonner", "Empty"],
  "/docs/components/layout": ["Aspect Ratio", "Separator", "Scroll Area", "Resizable", "Sidebar"],
}

const total = Object.values(CONTENTS).reduce((n, c) => n + c.length, 0)

export default function ComponentsIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Components"
        description={`${total} components installed via the shadcn CLI and themed entirely by the kit's semantic tokens — every one mirrors a page in the Figma kit. Browse by category.`}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {componentCategories.map((cat) => (
          <Link key={cat.href} href={cat.href} className="group">
            <Card className="h-full transition-colors hover:border-ring">
              <CardHeader>
                <CardTitle>{cat.title}</CardTitle>
                <CardDescription>{cat.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-1.5">
                {(CONTENTS[cat.href] ?? []).map((name) => (
                  <Badge key={name} variant="secondary" className="text-[0.6875rem] font-normal">
                    {name}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
