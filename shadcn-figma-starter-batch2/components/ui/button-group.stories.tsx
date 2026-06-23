import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/Button Group",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Groups related buttons into one joined strip. `orientation` can be horizontal (default) or vertical.",
      },
    },
  },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

export const Horizontal: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Day</Button>
      <Button variant="outline">Week</Button>
      <Button variant="outline">Month</Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: Horizontal.render,
}

export const WithSeparatorAndText: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>Sort</ButtonGroupText>
      <ButtonGroupSeparator />
      <Button variant="outline">
        Newest <ChevronDown />
      </Button>
    </ButtonGroup>
  ),
}
