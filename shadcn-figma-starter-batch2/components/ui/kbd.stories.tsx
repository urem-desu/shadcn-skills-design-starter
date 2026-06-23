import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Kbd, KbdGroup } from "@/components/ui/kbd"

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Displays textual keyboard input. Group multiple keys with `KbdGroup`.",
      },
    },
  },
  args: { children: "⌘" },
  argTypes: { children: { control: "text" } },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {}

export const Combo: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
}

export const InText: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <p className="text-sm">
      Press{" "}
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>{" "}
      to open the command palette.
    </p>
  ),
}
