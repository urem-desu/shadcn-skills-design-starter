import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ChartContainer } from "@/components/ui/chart"
import { ChartDemo } from "@/components/docs/demos/chart-demo"

const meta: Meta<typeof ChartContainer> = {
  title: "Components/Chart",
  component: ChartContainer,
  parameters: {
    docs: {
      description: {
        component:
          "Charts built on Recharts. `ChartContainer` injects the color-token CSS variables from a `ChartConfig`; tooltips and legends are token-driven.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ChartContainer>

/** Representative chart set (bar / line / area / pie) wired to chart tokens. */
export const Showcase: Story = {
  render: () => <ChartDemo />,
}
