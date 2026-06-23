import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Slider } from "@/components/ui/slider"

const meta = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    docs: {
      description: {
        component:
          "An input where the user selects a value from within a range. Supports single and range (multi-thumb) values.",
      },
    },
  },
  args: { min: 0, max: 100, step: 1, disabled: false },
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
  render: (args) => (
    <div className="w-72">
      <Slider defaultValue={[50]} aria-label="Volume" {...args} />
    </div>
  ),
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {}

export const Range: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-72">
      <Slider defaultValue={[25, 75]} aria-label="Price range" />
    </div>
  ),
}

export const Stepped: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-72">
      <Slider defaultValue={[40]} step={10} aria-label="Stepped" />
    </div>
  ),
}

export const Disabled: Story = { args: { disabled: true } }
