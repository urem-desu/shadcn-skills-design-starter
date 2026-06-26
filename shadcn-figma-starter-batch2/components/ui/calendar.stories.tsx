import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, waitFor, within } from "storybook/test"

import { axeIgnore } from "@/.storybook/a11y"
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

export const Single: Story = {
  render: () => <SingleCalendar />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const dayButton = canvas.getAllByRole("button").find(
      (b) => (b as HTMLElement).dataset.day
    ) as HTMLButtonElement | undefined
    if (dayButton) {
      // Direct DOM focus triggers react-day-picker's handleDayFocus →
      // setFocused(day) → re-render → modifiers.focused=true on this cell →
      // useEffect: `if (modifiers.focused) ref.current?.focus()` is exercised.
      dayButton.focus()
      await waitFor(() => expect(document.activeElement?.getAttribute("data-day")).toBeTruthy())
    }
  },
}
export const Range: Story = { render: () => <RangeCalendar /> }

export const DropdownCaption: Story = {
  render: () => (
    <Calendar mode="single" captionLayout="dropdown" className="rounded-md border" />
  ),
}

/** `showWeekNumber` renders the ISO week column. */
export const WeekNumbers: Story = {
  // Scoped axe exception: react-day-picker's WeekNumber custom cell (in the
  // CLI-managed calendar.tsx) renders a <td scope="row" role="rowheader">, and
  // `scope` is only valid on <th>. The fix lives in the kit component, which
  // project rules keep CLI-owned, so scope-attr-valid is disabled here only.
  parameters: { a11y: axeIgnore("scope-attr-valid") },
  render: () => (
    <Calendar mode="single" showWeekNumber className="rounded-md border" />
  ),
}
