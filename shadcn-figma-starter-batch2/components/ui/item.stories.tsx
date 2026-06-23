import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Item } from "@/components/ui/item"
import { ItemDemo } from "@/components/docs/demos/item-demo"

const meta: Meta<typeof Item> = {
  title: "Components/Item",
  component: Item,
  parameters: {
    docs: {
      description: {
        component:
          "A flexible row primitive — media, content (title + description), and actions. Variants: default, outline, muted. Sizes: default, sm.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Item>

export const Showcase: Story = {
  render: () => <ItemDemo />,
}
