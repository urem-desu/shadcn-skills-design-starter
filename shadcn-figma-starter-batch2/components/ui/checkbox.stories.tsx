import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A control that toggles between checked and not checked. Wraps a real input for keyboard + screen-reader support.",
      },
    },
  },
  args: { disabled: false },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="cb" {...args} />
      <Label htmlFor="cb">Subscribe to updates</Label>
    </div>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="a" />
        <Label htmlFor="a">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="b" defaultChecked />
        <Label htmlFor="b">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c" disabled />
        <Label htmlFor="c">Disabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="d" disabled defaultChecked />
        <Label htmlFor="d">Disabled checked</Label>
      </div>
    </div>
  ),
}
