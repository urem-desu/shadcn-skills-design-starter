import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Progress } from "@/components/ui/progress"

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    docs: {
      description: {
        component:
          "Shows completion progress of a task as a bar. Exposes `role=\"progressbar\"` with value semantics.",
      },
    },
  },
  args: { value: 60 },
  argTypes: { value: { control: { type: "range", min: 0, max: 100, step: 1 } } },
  render: (args) => (
    <div className="w-72">
      <Progress aria-label="Upload progress" {...args} />
    </div>
  ),
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Steps: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid w-72 gap-4">
      {[0, 25, 50, 75, 100].map((v) => (
        <Progress key={v} value={v} aria-label={`Step at ${v} percent`} />
      ))}
    </div>
  ),
}
