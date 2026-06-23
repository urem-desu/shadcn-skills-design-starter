import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "An interactive component that expands and collapses a single panel.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: () => (
    <Collapsible className="w-80 grid gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">@peduarte starred 3 repositories</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Toggle">
            <ChevronsUpDown />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-3 py-2 text-sm">@radix-ui/primitives</div>
      <CollapsibleContent className="grid gap-2">
        <div className="rounded-md border px-3 py-2 text-sm">@radix-ui/colors</div>
        <div className="rounded-md border px-3 py-2 text-sm">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const Open: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-80 grid gap-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle details</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-md border px-3 py-2 text-sm text-muted-foreground">
        This panel starts open.
      </CollapsibleContent>
    </Collapsible>
  ),
}
