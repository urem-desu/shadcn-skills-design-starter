"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { parseDate } from "chrono-node"
import { format } from "date-fns"
import { faIR, getDateLib } from "react-day-picker/persian"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const jalaliDateLib = getDateLib()

/** Persian / Hijri / Jalali calendar — kit styling, jalali date system, RTL, Persian numerals. */
export function PersianCalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      locale={faIR}
      dir="rtl"
      numerals="arabext"
      dateLib={jalaliDateLib}
      className="rounded-md border"
    />
  )
}

/** Date of birth picker — labelled trigger + dropdown-caption calendar in a popover. */
export function DobPickerDemo() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="dob" className="px-1">Date of birth</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="dob" className="w-48 justify-between font-normal">
            {date ? format(date, "PPP") : "Select a date"}
            <ChevronDownIcon className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(d) => {
              setDate(d)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

/** Date and time picker — a date popover beside a native time input. */
export function DateTimePickerDemo() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  return (
    <div className="flex items-end gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="dt-date" className="px-1">Date of birth</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" id="dt-date" className="w-40 justify-between font-normal">
              {date ? format(date, "PPP") : "Select a date"}
              <ChevronDownIcon className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(d) => {
                setDate(d)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="dt-time" className="px-1">Time</Label>
        <Input type="time" id="dt-time" step="1" defaultValue="10:30:00" className="w-fit" />
      </div>
    </div>
  )
}

/** Natural language picker — type a phrase, chrono-node parses it into a date. */
export function NaturalLanguagePickerDemo() {
  const [value, setValue] = React.useState("In 2 days")
  const [date, setDate] = React.useState<Date | undefined>(() => parseDate("In 2 days") ?? undefined)
  const [month, setMonth] = React.useState<Date | undefined>(date)
  return (
    <div className="flex w-72 flex-col gap-3">
      <Label htmlFor="nl-date" className="px-1">Schedule Date</Label>
      <Input
        id="nl-date"
        value={value}
        placeholder="Tomorrow or next week"
        className="bg-background"
        onChange={(e) => {
          setValue(e.target.value)
          const parsed = parseDate(e.target.value)
          if (parsed) {
            setDate(parsed)
            setMonth(parsed)
          }
        }}
      />
      <p className="px-1 text-sm text-muted-foreground">
        Your post will be published on{" "}
        {date ? <span className="font-medium">{format(date, "PPP")}</span> : "…"}.
      </p>
      <Calendar
        mode="single"
        selected={date}
        month={month}
        onMonthChange={setMonth}
        onSelect={(d) => {
          setDate(d)
          if (d) setValue(format(d, "PPP"))
        }}
        className="rounded-md border"
      />
    </div>
  )
}

const formSchema = z.object({ dob: z.date() })

/** Date field inside a validated react-hook-form. */
export function FormDatePickerDemo() {
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="flex w-full max-w-sm flex-col gap-4">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" className="w-60 justify-between font-normal">
                      {field.value ? format(field.value, "PPP") : "Pick a date"}
                      <ChevronDownIcon className="size-4" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-fit">Submit</Button>
      </form>
    </Form>
  )
}
