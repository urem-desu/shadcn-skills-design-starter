import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AspectRatio } from "@/components/ui/aspect-ratio"

const meta = {
  title: "Components/Aspect Ratio",
  component: AspectRatio,
  parameters: {
    docs: {
      description: {
        component: "Constrains content to a desired width-to-height ratio.",
      },
    },
  },
  args: { ratio: 16 / 9 },
  argTypes: { ratio: { control: { type: "number", step: 0.1 } } },
  render: (args) => (
    <div className="w-80">
      <AspectRatio {...args} className="rounded-lg bg-muted">
        <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
          {args.ratio?.toFixed?.(2)} : 1
        </div>
      </AspectRatio>
    </div>
  ),
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Widescreen: Story = {}
export const Square: Story = { args: { ratio: 1 } }
export const Portrait: Story = { args: { ratio: 3 / 4 } }
