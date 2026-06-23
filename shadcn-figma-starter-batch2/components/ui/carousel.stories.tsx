import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Carousel,
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
