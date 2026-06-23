import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A control that toggles between on and off. Use for instant settings.",
      },
    },
  },
  args: { disabled: false },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="sw" {...args} />
      <Label htmlFor="sw">Airplane mode</Label>
    </div>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Switch id="s1" />
        <Label htmlFor="s1">Off</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="s2" defaultChecked />
        <Label htmlFor="s2">On</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="s3" disabled />
        <Label htmlFor="s3">Disabled</Label>
      </div>
    </div>
  ),
}
