import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Displays rich content in a portal, anchored to a trigger.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="grid gap-3">
          <p className="text-sm font-medium">Dimensions</p>
          <div className="grid gap-2">
            <Label htmlFor="w">Width</Label>
            <Input id="w" defaultValue="100%" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Open the popover, then close it", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /open dimensions/i }))
      await expect(await screen.findByText("Dimensions")).toBeInTheDocument()
      await userEvent.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByText("Dimensions")).not.toBeInTheDocument())
    })
  },
}

/**
 * Uses `PopoverAnchor` to position the panel against a separate element (not the
 * trigger), plus the `PopoverHeader` / `PopoverTitle` / `PopoverDescription` slots.
 */
export const WithAnchorAndHeader: Story = {
  render: () => (
    <Popover>
      <PopoverAnchor className="rounded-md border px-3 py-2 text-sm">
        Panel anchors to this box
      </PopoverAnchor>
      <div className="mt-2">
        <PopoverTrigger asChild>
          <Button variant="outline">Open details</Button>
        </PopoverTrigger>
      </div>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the layout dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Open the popover, then close it", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /open details/i }))
      await expect(await screen.findByText("Dimensions")).toBeInTheDocument()
      await expect(screen.getByText(/layout dimensions/i)).toBeInTheDocument()
      await userEvent.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByText("Dimensions")).not.toBeInTheDocument())
    })
  },
}
