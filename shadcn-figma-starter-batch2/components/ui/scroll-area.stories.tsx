import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ScrollArea } from "@/components/ui/scroll-area"
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
