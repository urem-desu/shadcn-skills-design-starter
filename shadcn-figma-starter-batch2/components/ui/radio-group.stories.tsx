import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const meta = {
  title: "Components/Radio Group",
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          "A set of checkable buttons where at most one can be checked at a time. Arrow keys move selection.",
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
    orientation: { control: "inline-radio", options: ["vertical", "horizontal"] },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="comfortable" {...args}>
      {["default", "comfortable", "compact"].map((v) => (
        <div key={v} className="flex items-center gap-2">
          <RadioGroupItem value={v} id={v} />
          <Label htmlFor={v} className="capitalize">
            {v}
          </Label>
        </div>
      ))}
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <RadioGroup defaultValue="one" disabled>
      {["one", "two"].map((v) => (
        <div key={v} className="flex items-center gap-2">
          <RadioGroupItem value={v} id={`d-${v}`} />
          <Label htmlFor={`d-${v}`} className="capitalize">
            {v}
          </Label>
        </div>
      ))}
    </RadioGroup>
  ),
}
