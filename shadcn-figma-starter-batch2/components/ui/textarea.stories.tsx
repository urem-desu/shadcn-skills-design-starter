import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: "Displays a multi-line form textarea with the shared field tokens.",
      },
    },
  },
  args: { placeholder: "Type your message…", disabled: false },
  argTypes: {
    disabled: { control: "boolean" },
    rows: { control: { type: "number", min: 2, max: 12 } },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="msg">Your message</Label>
      <Textarea id="msg" placeholder="Type your message…" />
    </div>
  ),
}

export const Disabled: Story = { args: { disabled: true, value: "Read only" } }

export const Invalid: Story = { args: { "aria-invalid": true, defaultValue: "Too short" } }
