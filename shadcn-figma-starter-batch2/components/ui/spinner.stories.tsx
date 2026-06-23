import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Spinner } from "@/components/ui/spinner"

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An indicator for a loading state. Inherits `currentColor`; size via utility classes. Add an accessible label when standalone.",
      },
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Spinner aria-label="Loading" role="status" />,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-foreground">
      <Spinner className="size-3" aria-label="Loading" role="status" />
      <Spinner className="size-4" aria-label="Loading" role="status" />
      <Spinner className="size-6" aria-label="Loading" role="status" />
      <Spinner className="size-8" aria-label="Loading" role="status" />
    </div>
  ),
}
