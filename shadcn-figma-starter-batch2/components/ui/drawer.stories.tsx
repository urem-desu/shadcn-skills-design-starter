import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A drawer built on Vaul. `direction` controls the edge: bottom (default, with drag handle), top, left, right.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Drawer>

type Direction = "top" | "bottom" | "left" | "right"

const DrawerExample = ({ direction }: { direction: Direction }) => (
  <Drawer direction={direction}>
    <DrawerTrigger asChild>
      <Button variant="outline" className="capitalize">
        Open {direction}
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Confirm subscription</DrawerTitle>
        <DrawerDescription>You can cancel anytime.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button>Subscribe</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
)

/** Open the drawer, verify it mounts, then dismiss via Cancel (deterministic for Vaul). */
const openAndClose: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByRole("button", { name: /open/i }))
  await expect(await screen.findByText("Confirm subscription")).toBeInTheDocument()
  await userEvent.click(screen.getByRole("button", { name: /cancel/i }))
  await waitFor(() => expect(screen.queryByText("Confirm subscription")).not.toBeInTheDocument())
}

export const Bottom: Story = { render: () => <DrawerExample direction="bottom" />, play: openAndClose }
export const Top: Story = { render: () => <DrawerExample direction="top" />, play: openAndClose }
export const Right: Story = { render: () => <DrawerExample direction="right" />, play: openAndClose }
export const Left: Story = { render: () => <DrawerExample direction="left" />, play: openAndClose }
