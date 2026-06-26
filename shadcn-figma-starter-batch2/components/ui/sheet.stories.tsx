import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A Dialog that slides in from an edge. `side` controls which edge: right (default), left, top, bottom.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Sheet>

type Side = "top" | "right" | "bottom" | "left"

const SheetExample = ({ side }: { side: Side }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" className="capitalize">
        Open {side}
      </Button>
    </SheetTrigger>
    <SheetContent side={side}>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>Make changes and save when done.</SheetDescription>
      </SheetHeader>
      <SheetFooter>
        <SheetClose asChild>
          <Button>Save</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
)

/** Open the sheet from its trigger, verify it mounts, then close it cleanly. */
const openAndClose: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByRole("button", { name: /open/i }))
  await expect(await screen.findByRole("dialog")).toBeInTheDocument()
  await expect(screen.getByText("Edit profile")).toBeInTheDocument()
  await userEvent.keyboard("{Escape}")
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
}

export const Right: Story = { render: () => <SheetExample side="right" />, play: openAndClose }
export const Left: Story = { render: () => <SheetExample side="left" />, play: openAndClose }
export const Top: Story = { render: () => <SheetExample side="top" />, play: openAndClose }
export const Bottom: Story = { render: () => <SheetExample side="bottom" />, play: openAndClose }
