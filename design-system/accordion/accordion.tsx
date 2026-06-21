"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Accordion - token-driven vertically stacked disclosure (molecule) built on the
 * Radix Accordion primitive (keyboard model, roving focus, single/multiple modes,
 * data-state for free). Hybrid token model: every value maps to an existing
 * semantic/primitive token, so the Accordion mints NO component tokens - it reads
 * border-default (divider), text-primary (14/500 trigger), text-secondary
 * (chevron + answer), space-4 (padding/gap), radius-sm (focus corner), focus-ring,
 * and duration-base/ease-out directly. Dark mode swaps at the semantic tier.
 * Mirrors the Figma Accordion: stacked items separated by a 1px bottom divider, a
 * left-aligned 14/500 trigger title with a trailing chevron that rotates 180deg on
 * open, and a two-paragraph answer at the secondary text color.
 *
 * type="single" collapsible (FAQ pattern) or type="multiple" - both pass through
 * to the Radix Root.
 */
const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    data-slot="accordion-item"
    className={cn("border-b border-[var(--border-default)]", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={cn(
        "flex flex-1 items-center justify-between gap-[var(--space-4)]",
        "py-[var(--space-4)] text-left",
        "text-[length:var(--font-size-sm)] font-[var(--font-weight-medium)]",
        "leading-[var(--line-normal)] text-[var(--text-primary)]",
        "outline-none transition-colors [transition-duration:var(--duration-base)]",
        "hover:underline",
        "focus-visible:rounded-[var(--radius-sm)] focus-visible:shadow-[var(--focus-ring)]",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        aria-hidden="true"
        className={cn(
          "size-[var(--icon-sm)] shrink-0 text-[var(--text-secondary)]",
          "transition-transform [transition-duration:var(--duration-base)] [transition-timing-function:var(--ease-out)]"
        )}
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    data-slot="accordion-content"
    className={cn(
      "overflow-hidden",
      "text-[length:var(--font-size-sm)] leading-[var(--line-normal)]",
      "text-[var(--text-secondary)]",
      "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
    )}
    {...props}
  >
    <div className={cn("flex flex-col gap-[var(--space-4)] pb-[var(--space-4)]", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
