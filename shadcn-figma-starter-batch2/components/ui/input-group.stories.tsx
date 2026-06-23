import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { InputGroup } from "@/components/ui/input-group"
import { InputGroupDemo } from "@/components/docs/demos/input-group-demo"

const meta: Meta<typeof InputGroup> = {
  title: "Components/Input Group",
  component: InputGroup,
  parameters: {
    docs: {
      description: {
        component:
          "Attach addons, icons, buttons, or text to an input or textarea — start/end aligned, sharing one focus ring.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof InputGroup>

export const Showcase: Story = {
  render: () => <InputGroupDemo />,
}
