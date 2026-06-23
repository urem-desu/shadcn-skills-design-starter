import type { Meta, StoryObj } from "@storybook/nextjs-vite"

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

export const Bottom: Story = { render: () => <DrawerExample direction="bottom" /> }
export const Top: Story = { render: () => <DrawerExample direction="top" /> }
export const Right: Story = { render: () => <DrawerExample direction="right" /> }
export const Left: Story = { render: () => <DrawerExample direction="left" /> }
