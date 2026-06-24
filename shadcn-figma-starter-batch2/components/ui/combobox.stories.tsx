import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ComboboxDemo } from "@/components/docs/demos/combobox-demo"

/**
 * `Combobox` is a composition, not a single primitive — an autocomplete input
 * built from `Popover` (positioning) + `Command` (filterable list). It is
 * documented as a pattern; there is no `components/ui/combobox.tsx` file.
 */
const meta: Meta = {
  title: "Components/Combobox",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "An autocomplete / searchable select built by composing Popover + Command. Shown as basic, popover-status, dropdown-menu, and form-field patterns.",
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Showcase: Story = {
  render: () => <ComboboxDemo />,
}
