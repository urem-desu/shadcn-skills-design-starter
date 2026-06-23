import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

/**
 * `ToggleGroup` — a set of two-state buttons. `type="single"` behaves like a
 * radio set; `type="multiple"` toggles independently. The `type` prop is a
 * discriminated union, so stories are composed rather than arg-driven.
 */
const meta: Meta<typeof ToggleGroup> = {
  title: "Components/Toggle Group",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A set of two-state buttons. `type=\"single\"` behaves like a radio set; `type=\"multiple\"` toggles independently.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ToggleGroup>

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={["bold"]}>
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Outline: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="b">
      <ToggleGroupItem value="a">One</ToggleGroupItem>
      <ToggleGroupItem value="b">Two</ToggleGroupItem>
      <ToggleGroupItem value="c">Three</ToggleGroupItem>
    </ToggleGroup>
  ),
}
