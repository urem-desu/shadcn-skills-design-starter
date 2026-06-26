import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { axeIgnore } from "@/.storybook/a11y"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "@/components/ui/item"
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
    // Scoped axe exception: ItemGroup renders role="list" but the kit's Item
    // primitive does not mark its rows role="listitem". Fixing it means editing
    // the CLI-managed components/ui/item.tsx, which project rules keep CLI-owned,
    // so aria-required-children is disabled here only.
    a11y: axeIgnore("aria-required-children"),
  },
}

export default meta
type Story = StoryObj<typeof Item>

export const Showcase: Story = {
  render: () => <ItemDemo />,
}

/** An item with a `ItemFooter` beneath its content. */
export const WithFooter: Story = {
  render: () => (
    <Item variant="outline" className="max-w-sm flex-col items-stretch">
      <ItemContent>
        <ItemTitle>Weekly report</ItemTitle>
        <ItemDescription>Generated every Monday at 9am.</ItemDescription>
      </ItemContent>
      <ItemFooter>Last run 2 days ago</ItemFooter>
    </Item>
  ),
}
