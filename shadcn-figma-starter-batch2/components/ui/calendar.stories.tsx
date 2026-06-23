import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Calendar } from "@/components/ui/calendar"

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A date field built on react-day-picker. `mode` controls single, range, or multiple selection.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

function SingleCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}

function RangeCalendar() {
  const [range, setRange] = React.useState<{ from?: Date; to?: Date } | undefined>()
  return (
    <Calendar
      mode="range"
      selected={range as never}
      onSelect={setRange as never}
      numberOfMonths={2}
      className="rounded-md border"
    />
  )
}

export const Single: Story = { render: () => <SingleCalendar /> }
export const Range: Story = { render: () => <RangeCalendar /> }

export const DropdownCaption: Story = {
  render: () => (
    <Calendar mode="single" captionLayout="dropdown" className="rounded-md border" />
  ),
}
