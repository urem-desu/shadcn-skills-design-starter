import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowRight, Loader2, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

/**
 * `Button` — the primary action atom. Six visual variants and eight sizes,
 * all token-driven. Use the Controls panel to mix `variant`, `size`, and state.
 */
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "Displays a button or a component that looks like a button. Variant encodes intent (primary, destructive, secondary, ghost, link); size encodes density. Destructive actions must use `variant=\"destructive\"`, never the default.",
      },
    },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "Visual style encoding the action's intent.",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
      description: "Control height / density. `icon*` sizes render a square icon button.",
      table: { defaultValue: { summary: "default" } },
    },
    disabled: { control: "boolean", description: "Disables interaction; 50% opacity." },
    asChild: {
      control: "boolean",
      description: "Render the child element as the button (e.g. an anchor) via Radix Slot.",
    },
    children: { control: "text", description: "Button label / content." },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/** Interactive playground — drive every prop from the Controls panel. */
export const Playground: Story = {}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Next">
        <ArrowRight />
      </Button>
    </div>
  ),
}

export const WithIcon: Story = {
  args: { children: undefined },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args}>
        Continue <ArrowRight />
      </Button>
      <Button {...args} variant="destructive">
        <Trash2 /> Delete
      </Button>
    </div>
  ),
}

/** Async / loading: spinner + `aria-busy` while the action is in flight. */
export const Loading: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Button disabled aria-busy="true">
      <Loader2 className="animate-spin" /> Saving…
    </Button>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
}

/** `asChild` renders a real anchor that looks like a button — keeps link semantics. */
export const AsLink: Story = {
  args: { asChild: true, children: undefined },
  render: (args) => (
    <Button {...args}>
      <a href="#">Anchor button</a>
    </Button>
  ),
}
