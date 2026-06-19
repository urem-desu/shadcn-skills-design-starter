"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { ClientOnly } from "@/components/docs/client-only"
import {
  DateTimePickerDemo,
  DobPickerDemo,
  FormDatePickerDemo,
  NaturalLanguagePickerDemo,
} from "@/components/docs/demos/calendar-demos"

/** Picker with input — type a date or pick it from the popover. */
function SubscriptionDatePicker() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 5, 1))
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [value, setValue] = React.useState(
    format(new Date(2025, 5, 1), "MMMM dd, yyyy")
  )

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="subscription" className="px-1">Subscription Date</Label>
      <div className="relative flex gap-2">
        <Input
          id="subscription"
          value={value}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            setValue(e.target.value)
            const d = new Date(e.target.value)
            if (!Number.isNaN(d.getTime())) {
              setDate(d)
              setMonth(d)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(d) => {
                setDate(d)
                if (d) setValue(format(d, "MMMM dd, yyyy"))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export function DatePickerDemo() {
  return (
    <ClientOnly fallback={<div className="h-80 w-full" />}>
      <div className="flex w-full flex-col gap-6">
        <DobPickerDemo />
        <Separator />
        <SubscriptionDatePicker />
        <Separator />
        <DateTimePickerDemo />
        <Separator />
        <NaturalLanguagePickerDemo />
        <Separator />
        <FormDatePickerDemo />
      </div>
    </ClientOnly>
  )
}
