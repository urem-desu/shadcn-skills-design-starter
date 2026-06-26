import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SearchIcon } from "lucide-react"
import { expect, userEvent, within } from "storybook/test"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
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

/**
 * All four addon alignments (inline start/end, block start/end), and the
 * click-to-focus behaviour: clicking an addon focuses the control, unless the
 * click lands on a button (which keeps its own action).
 */
export const Alignments: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <InputGroup>
        <InputGroupAddon align="inline-start" data-testid="addon-icon">
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search…" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Clear search">Clear</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="block-start">
          <InputGroupText>Description</InputGroupText>
        </InputGroupAddon>
        <InputGroupTextarea placeholder="Tell us more…" aria-label="Description" />
        <InputGroupAddon align="block-end" data-testid="block-end-addon">
          <InputGroupText>Markdown supported</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Clicking a plain addon focuses the input", async () => {
      await userEvent.click(canvas.getByTestId("addon-icon"))
      await expect(canvas.getByPlaceholderText("Search…")).toHaveFocus()
    })
    await step("Clicking a button addon keeps its own action (early return)", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /clear search/i }))
    })
    await step("Clicking an addon next to a textarea exercises the null querySelector branch", async () => {
      await userEvent.click(canvas.getByTestId("block-end-addon"))
    })
  },
}
