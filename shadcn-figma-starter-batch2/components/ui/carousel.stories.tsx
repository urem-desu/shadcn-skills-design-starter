import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A carousel with motion and swipe, built on Embla. `orientation` can be horizontal or vertical.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Carousel>

export const Horizontal: Story = {
  render: () => (
    <Carousel className="w-64" opts={{ align: "start" }}>
      <CarouselContent>
        {Array.from({ length: 5 }, (_, i) => (
          <CarouselItem key={i}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6 text-3xl font-semibold">
                {i + 1}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Advance and rewind with the buttons and arrow keys", async () => {
      const next = canvas.getByRole("button", { name: /next slide/i })
      const prev = canvas.getByRole("button", { name: /previous slide/i })
      // At the start the Previous control is disabled.
      await expect(prev).toBeDisabled()
      await userEvent.click(next)
      await waitFor(() => expect(prev).toBeEnabled())
      // Arrow keys route through the carousel region's capture handler.
      next.focus()
      await userEvent.keyboard("{ArrowLeft}")
      await waitFor(() => expect(prev).toBeDisabled())
      await userEvent.keyboard("{ArrowRight}")
      await waitFor(() => expect(prev).toBeEnabled())
      // A non-arrow key while the carousel is focused exercises the implicit
      // "else" branch (key is neither ArrowLeft nor ArrowRight) in handleKeyDown.
      await userEvent.keyboard("{Escape}")
      await userEvent.click(prev)
      await waitFor(() => expect(prev).toBeDisabled())
    })
  },
}

/** `setApi` exposes the Embla instance to the parent (here, the current slide). */
export const WithApi: Story = {
  render: () => {
    function Harness() {
      const [api, setApi] = React.useState<CarouselApi>()
      const [current, setCurrent] = React.useState(0)
      React.useEffect(() => {
        if (!api) return
        setCurrent(api.selectedScrollSnap() + 1)
        api.on("select", () => setCurrent(api.selectedScrollSnap() + 1))
      }, [api])
      return (
        <div className="grid gap-2">
          <Carousel className="w-64" setApi={setApi} opts={{ align: "start" }}>
            <CarouselContent>
              {Array.from({ length: 4 }, (_, i) => (
                <CarouselItem key={i}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 text-3xl font-semibold">
                      {i + 1}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <p className="text-center text-sm text-muted-foreground" data-testid="slide">
            Slide {current} of 4
          </p>
        </div>
      )
    }
    return <Harness />
  },
}

/** Error boundary proving `useCarousel` throws outside a `<Carousel />`. */
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
  // A sub-component used outside <Carousel> calls the internal useCarousel hook,
  // which throws — exercising that guard.
  render: () => (
    <Catch>
      <CarouselNext />
    </Catch>
  ),
  beforeEach() {
    const original = console.error
    console.error = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0].includes("must be used within a <Carousel />")) return
      original.apply(console, args)
    }
    return () => { console.error = original }
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("alert")).toHaveTextContent(
      /must be used within a <Carousel \/>/i,
    )
  },
}

export const Vertical: Story = {
  render: () => (
    <Carousel orientation="vertical" className="w-64" opts={{ align: "start" }}>
      <CarouselContent className="h-64">
        {Array.from({ length: 5 }, (_, i) => (
          <CarouselItem key={i} className="basis-1/2">
            <Card>
              <CardContent className="flex items-center justify-center p-6 text-2xl font-semibold">
                {i + 1}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const UnmountCleanup: Story = {
  render: () => {
    function HarnessWithUnmount() {
      const [show, setShow] = React.useState(true)
      return (
        <div className="flex flex-col items-center gap-4">
          {show && (
            <Carousel className="w-64" opts={{ align: "start" }}>
              <CarouselContent>
                {Array.from({ length: 3 }, (_, i) => (
                  <CarouselItem key={i}>
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6 text-3xl font-semibold">
                        {i + 1}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
          <button onClick={() => setShow(false)}>Unmount carousel</button>
        </div>
      )
    }
    return <HarnessWithUnmount />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /unmount carousel/i }))
    await waitFor(() =>
      expect(canvas.queryByRole("region")).not.toBeInTheDocument(),
    )
  },
}
