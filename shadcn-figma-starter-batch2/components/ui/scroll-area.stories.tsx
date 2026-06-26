import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"

import { axeIgnore } from "@/.storybook/a11y"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const meta: Meta<typeof ScrollArea> = {
  title: "Components/Scroll Area",
  component: ScrollArea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Cross-browser custom scrollbars over native scrolling.",
      },
    },
    // Scoped axe exception: the scrollable element is the Radix ScrollArea
    // viewport, which is not focusable by default and is not reachable from story
    // code (props go to the Root, not the Viewport). Making it keyboard focusable
    // means editing the CLI-managed components/ui/scroll-area.tsx, which project
    // rules keep CLI-owned, so scrollable-region-focusable is disabled here only.
    a11y: axeIgnore("scrollable-region-focusable"),
  },
}

export default meta
type Story = StoryObj<typeof ScrollArea>

const tags = Array.from({ length: 30 }, (_, i) => `Tag ${i + 1}`)

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-56 w-56 rounded-md border">
      <div className="p-4">
        <p className="mb-2 text-sm font-medium">Tags</p>
        {tags.map((t) => (
          <div key={t}>
            <div className="py-1 text-sm">{t}</div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-80 rounded-md border whitespace-nowrap">
      <div className="flex gap-3 p-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="flex size-28 shrink-0 items-center justify-center rounded-md bg-muted text-sm"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const WithHorizontalBar: Story = {
  render: () => (
    <ScrollAreaPrimitive.Root className="w-80 overflow-hidden rounded-md border">
      <ScrollAreaPrimitive.Viewport className="h-20 w-full">
        <div className="flex gap-3 p-4 whitespace-nowrap">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="flex size-16 shrink-0 items-center justify-center rounded-md bg-muted text-sm"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation="horizontal" />
    </ScrollAreaPrimitive.Root>
  ),
}
