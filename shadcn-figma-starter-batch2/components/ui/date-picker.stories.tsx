import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DatePickerDemo } from "@/components/docs/demos/date-picker-demo"

/**
 * `Date Picker` is a composition, not a single primitive — `Calendar` rendered
 * inside a `Popover`, triggered by a `Button`. Documented as a pattern; there is
 * no `components/ui/date-picker.tsx` file.
 */
const meta: Meta = {
  title: "Components/Date Picker",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A date selection control built by composing Calendar + Popover + Button. The trigger shows the formatted selected date; the popover holds the calendar grid.",
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Showcase: Story = {
  render: () => <DatePickerDemo />,
}
