import type { Meta, StoryObj } from "@storybook/nextjs-vite"

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

export const Right: Story = { render: () => <SheetExample side="right" /> }
export const Left: Story = { render: () => <SheetExample side="left" /> }
export const Top: Story = { render: () => <SheetExample side="top" /> }
export const Bottom: Story = { render: () => <SheetExample side="bottom" /> }
