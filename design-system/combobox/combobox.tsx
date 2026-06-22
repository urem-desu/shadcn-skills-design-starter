"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/design-system/button/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/design-system/command/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/design-system/popover/popover"

/**
 * Combobox - token-driven single-select with searchable list. Thin composition
 * of <Popover> (floating surface) + <Command> (ARIA Combobox/Listbox + cmdk
 * filtering). Zero --combobox-* tokens; every visual decision comes from the
 * composed primitives.
 */

export interface ComboboxItem {
  value: string
  label: React.ReactNode
  /** Extra search terms (cmdk filters on label + keywords). */
  keywords?: string[]
  disabled?: boolean
}

interface ComboboxProps {
  items: ComboboxItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: React.ReactNode
  triggerClassName?: string
  contentClassName?: string
  side?: React.ComponentProps<typeof PopoverContent>["side"]
  align?: React.ComponentProps<typeof PopoverContent>["align"]
  disabled?: boolean
  id?: string
  "aria-label"?: string
}

function Combobox({
  items,
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  triggerClassName,
  contentClassName,
  side = "bottom",
  align = "start",
  disabled,
  id,
  ...ariaProps
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue ?? "")
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolled

  const selectedLabel = React.useMemo(
    () => items.find((i) => i.value === value)?.label,
    [items, value]
  )

  const onSelect = (next: string) => {
    const newValue = next === value ? "" : next
    if (!isControlled) setUncontrolled(newValue)
    onValueChange?.(newValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={ariaProps["aria-label"]}
          disabled={disabled}
          data-slot="combobox-trigger"
          className={cn(
            "w-full justify-between font-[var(--font-weight-regular)]",
            !value && "text-[var(--text-tertiary)]",
            triggerClassName
          )}
        >
          <span className="truncate">{selectedLabel ?? placeholder}</span>
          <ChevronsUpDown className="shrink-0 opacity-50" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        data-slot="combobox-content"
        className={cn("p-0 w-[var(--radix-popover-trigger-width)]", contentClassName)}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  keywords={item.keywords}
                  disabled={item.disabled}
                  onSelect={onSelect}
                >
                  {item.label}
                  <Check
                    aria-hidden="true"
                    className={cn(
                      "ml-auto size-[var(--icon-sm)]",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// Slot overrides - re-export composed primitives so consumers can swap the
// trigger or content node without losing the Combobox shape.
const ComboboxTrigger = PopoverTrigger
const ComboboxContent = PopoverContent

export { Combobox, ComboboxTrigger, ComboboxContent }
