import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MonitorIcon, SmartphoneIcon } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { expect, within } from "storybook/test"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { ChartDemo } from "@/components/docs/demos/chart-demo"

const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
]

const config = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

const iconConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)", icon: MonitorIcon },
  mobile: { label: "Mobile", color: "var(--chart-2)", icon: SmartphoneIcon },
} satisfies ChartConfig

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

/**
 * Tooltip (default `dot` indicator) shown statically via Recharts `defaultIndex`,
 * plus a legend with color swatches. Exercises `ChartTooltipContent` and
 * `ChartLegendContent` without relying on a flaky hover.
 */
export const TooltipAndLegend: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ChartContainer config={config} className="min-h-[240px] w-[440px]">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip active defaultIndex={1} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
}

/**
 * Tooltip indicator variants and formatters: `line` with custom label/value
 * formatters, and `dashed` + `hideLabel` + `hideIndicator` on a single series
 * (the `nestLabel` path). Legend renders its icons from the config.
 */
export const TooltipVariantsAndLegendIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-8">
      <ChartContainer config={config} className="min-h-[200px] w-[440px]">
        <BarChart accessibilityLayer data={data}>
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <ChartTooltip
            active
            defaultIndex={2}
            content={
              <ChartTooltipContent
                indicator="line"
                labelFormatter={(value) => `Month: ${value}`}
                formatter={(value, name) => `${name}: ${value}`}
              />
            }
          />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
      <ChartContainer config={iconConfig} className="min-h-[200px] w-[440px]">
        <BarChart accessibilityLayer data={data}>
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <ChartTooltip
            active
            defaultIndex={3}
            content={<ChartTooltipContent indicator="dashed" hideLabel hideIndicator />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  ),
}

/** Error boundary proving chart parts throw outside a `<ChartContainer />`. */
class Catch extends React.Component<
  { children: React.ReactNode },
  { error: string | null }
> {
  state = { error: null as string | null }
  static getDerivedStateFromError(error: Error) {
    return { error: error.message }
  }
  render() {
    return this.state.error ? <p role="alert">{this.state.error}</p> : this.props.children
  }
}

export const OutsideProvider: Story = {
  // ChartLegendContent calls the internal useChart hook first, which throws.
  render: () => (
    <Catch>
      <ChartLegendContent />
    </Catch>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("alert")).toHaveTextContent(
      /must be used within a <ChartContainer \/>/i,
    )
  },
}
