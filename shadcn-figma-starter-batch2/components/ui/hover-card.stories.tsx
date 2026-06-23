import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const meta: Meta<typeof HoverCard> = {
  title: "Components/Hover Card",
  component: HoverCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "For sighted users to preview content behind a link on hover. Not keyboard-triggered — never put essential-only content here.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <p className="text-sm font-semibold">Next.js</p>
        <p className="text-sm text-muted-foreground">
          The React framework — created and maintained by Vercel.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const Open: Story = {
  render: () => (
    <HoverCard open>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <p className="text-sm">Forced open for documentation.</p>
      </HoverCardContent>
    </HoverCard>
  ),
}
