import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          "Displays a form input field. Token-driven border, focus ring, and invalid state (`aria-invalid`).",
      },
    },
  },
  args: { placeholder: "Email", type: "text", disabled: false },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}

export const Disabled: Story = { args: { disabled: true, value: "Read only" } }

/** Invalid state uses `aria-invalid` — the destructive ring is token-driven. */
export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "not-an-email" },
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid w-72 gap-3">
      <Input placeholder="Default" />
      <Input placeholder="Focused (click me)" autoFocus />
      <Input aria-invalid defaultValue="Invalid" />
      <Input disabled placeholder="Disabled" />
    </div>
  ),
}
