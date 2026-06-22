"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/design-system/button/button"
import { Calendar } from "@/design-system/calendar/calendar"

/**
 * Date Picker - token-driven (Figma "Date Picker": "A date picker component with
 * range and presets"). The canonical pattern: a Label over an outline Button
 * trigger (formatted date + chevron-down) that opens a Popover holding the
 * Calendar with `captionLayout="dropdown"` (month + year selects in the caption).
 *
 * Composes existing atoms - Button (trigger), Calendar (the grid) - and
 * colocates thin Radix Popover wrappers (promote to the Popover component at
 * #36 when it lands). Hybrid tokens: one seam, `--date-picker-trigger-w`; every
 * other value resolves to an existing semantic/primitive.
 */

/* -- Popover primitives (colocated; token-driven) -------------------------- */
const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 rounded-[var(--radius-lg)] border border-[var(--border-default)]",
        "bg-[var(--surface-card)] p-[var(--space-4)] text-[var(--text-primary)]",
        "shadow-[var(--shadow-md)] outline-none",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

/* -- DatePicker ------------------------------------------------------------ */
export interface DatePickerProps {
  /** Optional label rendered above the trigger. */
  label?: React.ReactNode
  /** Trigger text when no date is selected. */
  placeholder?: string
  /** Controlled selected date. */
  value?: Date
  /** Selection change handler. */
  onChange?: (date: Date | undefined) => void
  /** Format the selected date for the trigger (default: locale date string). */
  format?: (date: Date) => string
  /** Disable the trigger. */
  disabled?: boolean
  /** Stable id wiring label -> trigger (auto-generated if omitted). */
  id?: string
}

export function DatePicker({
  label,
  placeholder = "Select a date",
  value,
  onChange,
  format = (d) => d.toLocaleDateString(),
  disabled,
  id,
}: DatePickerProps) {
  const reactId = React.useId()
  const triggerId = id ?? reactId
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState<Date | undefined>(value)
  const date = value ?? internal

  const select = (d: Date | undefined) => {
    setInternal(d)
    onChange?.(d)
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-[var(--space-2)]">
      {label ? (
        <label
          htmlFor={triggerId}
          className="text-[length:var(--font-size-sm)] font-[var(--font-weight-medium)] text-[var(--text-primary)]"
        >
          {label}
        </label>
      ) : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={triggerId}
            variant="outline"
            disabled={disabled}
            aria-label={label ? undefined : placeholder}
            className="w-[var(--date-picker-trigger-w)] justify-between font-[var(--font-weight-regular)]"
          >
            {date ? format(date) : placeholder}
            <ChevronDownIcon className="text-[var(--text-secondary)]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            onSelect={select}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent }
