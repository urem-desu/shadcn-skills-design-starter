import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Separator } from "@/components/ui/separator"

const meta = {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    docs: {
      description: {
        component:
          "Visually or semantically separates content. `decorative` (default) hides it from the a11y tree; set `decorative={false}` for a semantic divider.",
      },
    },
  },
  args: { orientation: "horizontal", decorative: true },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    decorative: { control: "boolean" },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-72">
      <p className="text-sm">Above</p>
      <Separator {...args} className="my-3" />
      <p className="text-sm">Below</p>
    </div>
  ),
}

export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex h-6 items-center gap-3 text-sm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Guides</span>
      <Separator orientation="vertical" />
      <span>API</span>
    </div>
  ),
}
