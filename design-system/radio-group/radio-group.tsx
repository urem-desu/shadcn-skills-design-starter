"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

/**
 * Radio Group - token-driven set of mutually-exclusive options (only one checked
 * at a time), built on the Radix RadioGroup primitive (role=radiogroup, roving
 * focus with arrow keys, single-selection, data-state). Mirrors the Figma "Radio
 * Group" component: a vertical stack of circular controls, each a 1.5px ring that
 * fills with a centered dot when selected, paired with a label.
 *
 * Hybrid token model: reads the shared custom-control tokens (--control-box-*,
 * --radio-radius, --control-checked-bg) and spacing/motion tokens directly - the
 * same visual control as Checkbox. Dark mode swaps at the semantic tier.
 *
 * RadioGroupItem is control-only; pair each with a <Label htmlFor> for the option
 * text (give the item an id).
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    data-slot="radio-group"
    className={cn("grid gap-[var(--space-3)]", className)}
    {...props}
  />
))
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    data-slot="radio-group-item"
    className={cn(
      "aspect-square size-[var(--control-box-size)] shrink-0 rounded-[var(--radio-radius)]",
      "border-[1.5px] border-[var(--control-box-border)] bg-[var(--control-box-bg)]",
      "outline-none transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
      "focus-visible:shadow-[var(--focus-ring)]",
      "data-[state=checked]:border-[var(--control-checked-bg)]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="grid size-full place-items-center">
      <span className="size-[var(--space-2)] rounded-[var(--radius-full)] bg-[var(--control-checked-bg)]" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
