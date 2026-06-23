import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

const meta = {
  title: "Components/Label",
  component: Label,
  parameters: {
    docs: {
      description: {
        component:
          "Renders an accessible label associated with a control via `htmlFor`. Dims with its peer when the control is disabled.",
      },
    },
  },
  args: { children: "Label text" },
  argTypes: { children: { control: "text" } },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => <Label htmlFor="x" {...args} />,
}

export const WithInput: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="name">Full name</Label>
      <Input id="name" placeholder="Ada Lovelace" />
    </div>
  ),
}

export const WithCheckbox: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}
