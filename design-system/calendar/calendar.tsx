"use client"

import * as React from "react"
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/design-system/button/button"

/**
 * Calendar - token-driven date picker. Thin config layer over react-day-picker
 * that maps DayPicker's classNames to our 3-tier tokens. Hybrid: zero
 * --calendar-* tokens; the only component-scoped CSS var is --cell-size,
 * and it aliases directly to --control-sm.
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar bg-[var(--surface-card)] p-[var(--space-3)] [--cell-size:var(--control-sm)]",
        "[[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-[var(--space-4)] md:flex-row",
          defaultClassNames.months
        ),
        month: cn(
          "flex w-full flex-col gap-[var(--space-4)]",
          defaultClassNames.month
        ),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-[var(--space-1)]",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant, size: "icon" }),
          "size-[var(--cell-size)] p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant, size: "icon" }),
          "size-[var(--cell-size)] p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-[var(--cell-size)] w-full items-center justify-center px-[var(--cell-size)]",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[var(--cell-size)] w-full items-center justify-center gap-[var(--space-1-5)]",
          "text-[length:var(--font-size-sm)] font-[var(--font-weight-medium)]",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative rounded-[var(--radius-md)] border border-[var(--border-default)] shadow-[var(--shadow-sm)]",
          "has-focus:border-[var(--border-focus)] has-focus:shadow-[var(--focus-ring)]",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 bg-[var(--surface-card)] opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "font-[var(--font-weight-medium)] select-none",
          captionLayout === "label"
            ? "text-[length:var(--font-size-sm)]"
            : "flex h-[var(--control-sm)] items-center gap-[var(--space-1)] rounded-[var(--radius-md)] pr-[var(--space-1)] pl-[var(--space-2)] text-[length:var(--font-size-sm)] [&>svg]:size-[var(--icon-xs)] [&>svg]:text-[var(--text-secondary)]",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 rounded-[var(--radius-md)] text-[length:var(--font-size-xs)] font-[var(--font-weight-regular)] text-[var(--text-secondary)] select-none",
          defaultClassNames.weekday
        ),
        week: cn("mt-[var(--space-2)] flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-[var(--cell-size)] select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[length:var(--font-size-xs)] text-[var(--text-secondary)] select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-[var(--radius-md)]",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-[var(--radius-md)]"
            : "[&:first-child[data-selected=true]_button]:rounded-l-[var(--radius-md)]",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-[var(--radius-md)] bg-[var(--interactive-selected-bg)]",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          "rounded-r-[var(--radius-md)] bg-[var(--interactive-selected-bg)]",
          defaultClassNames.range_end
        ),
        today: cn(
          "rounded-[var(--radius-md)] bg-[var(--action-secondary)] text-[var(--text-primary)] data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-[var(--text-secondary)] aria-selected:text-[var(--text-secondary)]",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-[var(--text-tertiary)] opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={cn(className)}
            {...props}
          />
        ),
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon
                className={cn("size-[var(--icon-sm)]", className)}
                {...props}
              />
            )
          }
          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-[var(--icon-sm)]", className)}
                {...props}
              />
            )
          }
          return (
            <ChevronDownIcon
              className={cn("size-[var(--icon-sm)]", className)}
              {...props}
            />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => (
          <td {...props}>
            <div className="flex size-[var(--cell-size)] items-center justify-center text-center">
              {children}
            </div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // base: square, fill cell, font weight, focus stacking
        "flex aspect-square size-auto w-full min-w-[var(--cell-size)] flex-col gap-[var(--space-1)] leading-none font-[var(--font-weight-regular)]",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10",
        "group-data-[focused=true]/day:shadow-[var(--focus-ring)]",
        // selected single
        "data-[selected-single=true]:bg-[var(--action-primary)] data-[selected-single=true]:text-[var(--text-on-action)] data-[selected-single=true]:rounded-[var(--radius-md)]",
        // range start
        "data-[range-start=true]:bg-[var(--action-primary)] data-[range-start=true]:text-[var(--text-on-action)] data-[range-start=true]:rounded-l-[var(--radius-md)] data-[range-start=true]:rounded-r-none",
        // range middle
        "data-[range-middle=true]:bg-[var(--interactive-selected-bg)] data-[range-middle=true]:text-[var(--interactive-selected-text)] data-[range-middle=true]:rounded-none",
        // range end
        "data-[range-end=true]:bg-[var(--action-primary)] data-[range-end=true]:text-[var(--text-on-action)] data-[range-end=true]:rounded-r-[var(--radius-md)] data-[range-end=true]:rounded-l-none",
        // secondary number caption (e.g. lunar day) - second <span> dims
        "[&>span]:text-[length:var(--font-size-xs)] [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
