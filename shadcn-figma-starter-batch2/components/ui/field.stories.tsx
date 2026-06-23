import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Field } from "@/components/ui/field"
import { FieldDemo } from "@/components/docs/demos/field-demo"

const meta: Meta<typeof Field> = {
  title: "Components/Field",
  component: Field,
  parameters: {
    docs: {
      description: {
        component:
          "Compose accessible form fields: label, control, description, and error wired together. `orientation` can be vertical, horizontal, or responsive.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Field>

export const Showcase: Story = {
  render: () => <FieldDemo />,
}
