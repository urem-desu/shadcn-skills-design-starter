"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

/**
 * Tabs — Radix-based tab strip with panel. Zero seams: all values map to
 * existing semantic / primitive tokens. The active trigger uses
 * interactive-selected-* tokens; focus uses the shared focus-ring.
 */

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-[var(--control-md)] items-center justify-center gap-[var(--space-1)]",
      "rounded-[var(--radius-md)] bg-[var(--surface-sunken)]",
      "p-[var(--space-1)] text-[var(--text-secondary)]",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap",
      "rounded-[var(--radius-sm)] px-[var(--space-3)] py-[var(--space-1-5)]",
      "text-[length:var(--font-size-sm)] font-[var(--font-weight-medium)]",
      "transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]",
      "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-[var(--surface-card)]",
      "data-[state=active]:text-[var(--text-primary)]",
      "data-[state=active]:shadow-[var(--shadow-sm)]",
      "data-[state=inactive]:text-[var(--text-secondary)]",
      "data-[state=inactive]:hover:text-[var(--text-primary)]",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-[var(--space-2)]",
      "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
      "focus-visible:rounded-[var(--radius-md)]",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
