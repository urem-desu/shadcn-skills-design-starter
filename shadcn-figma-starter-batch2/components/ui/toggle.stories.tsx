import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Check } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A two-state button that is either on or off (`aria-pressed`).",
      },
    },
  },
  args: { variant: "default", size: "default", disabled: false, children: "Bold" },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline"] },
    size: { control: "inline-radio", options: ["sm", "default", "lg"] },
    pressed: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => <Toggle aria-label="Toggle bold" {...args} />,
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle aria-label="Default">Default</Toggle>
      <Toggle variant="outline" aria-label="Outline">
        Outline
      </Toggle>
    </div>
  ),
}

export const WithIcon: Story = {
  args: { children: undefined },
  render: (args) => (
    <Toggle aria-label="Toggle done" {...args}>
      <Check /> Done
    </Toggle>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle aria-label="Off">Off</Toggle>
      <Toggle defaultPressed aria-label="On">
        On
      </Toggle>
      <Toggle disabled aria-label="Disabled">
        Disabled
      </Toggle>
    </div>
  ),
}
