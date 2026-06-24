import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DataTableDemo } from "@/components/docs/demos/data-table-demo"

/**
 * `Data Table` is a composition, not a single primitive — the `Table` primitive
 * wired to TanStack Table for sorting, filtering, column visibility, row
 * selection, and pagination. Documented as a pattern; there is no
 * `components/ui/data-table.tsx` file.
 */
const meta: Meta = {
  title: "Components/Data Table",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A sortable, filterable, paginated table built from the Table primitive + TanStack Table headless state. Includes a search filter, column-visibility menu, row selection, and pager.",
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Showcase: Story = {
  render: () => <DataTableDemo />,
}
