import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BadgeCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          "Displays a badge or a component that looks like a badge. Use variants to encode status — never raw colors.",
      },
    },
  },
  args: { children: "Badge", variant: "default" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
      table: { defaultValue: { summary: "default" } },
    },
    asChild: { control: "boolean" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  ),
}

export const WithIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Badge variant="secondary">
      <BadgeCheck /> Verified
    </Badge>
  ),
}

/** As a link via `asChild` — keeps anchor semantics and hover affordance. */
export const AsLink: Story = {
  args: { asChild: true, children: undefined },
  render: (args) => (
    <Badge {...args}>
      <a href="#">Linked badge</a>
    </Badge>
  ),
}
