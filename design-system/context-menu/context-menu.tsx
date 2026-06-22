"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Context Menu - token-driven contextual menu triggered by right-click (or
 * long-press on touch). Thin layer over Radix ContextMenu (focus management,
 * typeahead, roving tabindex, Escape/outside-close). Shares surface + item
 * tokens with DropdownMenu — no additional --context-menu-* seams needed.
 */
const ContextMenu = ContextMenuPrimitive.Root
const ContextMenuTrigger = ContextMenuPrimitive.Trigger
const ContextMenuGroup = ContextMenuPrimitive.Group
const ContextMenuSub = ContextMenuPrimitive.Sub
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const itemBase = [
  "relative flex cursor-default select-none items-center gap-[var(--space-2)]",
  "rounded-[var(--radius-sm)] px-[var(--space-2)] py-[var(--space-1-5)]",
  "text-[length:var(--font-size-sm)] leading-[var(--line-tight)] outline-none",
  "[&_svg]:size-[var(--icon-sm)] [&_svg]:shrink-0",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
].join(" ")

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[var(--dropdown-min-w)] max-w-[var(--dropdown-max-w)] overflow-hidden",
        "rounded-[var(--radius-lg)] border border-[var(--border-default)]",
        "bg-[var(--surface-card)] p-[var(--space-1)] text-[var(--text-primary)] shadow-[var(--shadow-lg)]",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
    variant?: "default" | "destructive"
  }
>(({ className, inset, variant = "default", ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    data-variant={variant}
    className={cn(
      itemBase,
      inset && "pl-[var(--space-6)]",
      variant === "default"
        ? "text-[var(--text-primary)] data-[highlighted]:bg-[var(--action-secondary)]"
        : "text-[var(--menu-item-destructive-text)] data-[highlighted]:bg-[var(--menu-item-destructive-bg-hover)] data-[highlighted]:text-[var(--menu-item-destructive-text)]",
      className
    )}
    {...props}
  />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(itemBase, "pl-[var(--space-6)] data-[highlighted]:bg-[var(--action-secondary)]", className)}
    {...props}
  >
    <span className="absolute left-[var(--space-2)] flex size-[var(--icon-sm)] items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(itemBase, "pl-[var(--space-6)] data-[highlighted]:bg-[var(--action-secondary)]", className)}
    {...props}
  >
    <span className="absolute left-[var(--space-2)] flex size-[var(--icon-sm)] items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="size-[var(--space-1-5)] fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-[var(--space-2)] py-[var(--space-1-5)] text-[length:var(--font-size-sm)] font-[var(--font-weight-semibold)] text-[var(--text-primary)]",
      inset && "pl-[var(--space-6)]",
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-[var(--space-1)] my-[var(--space-1)] h-px bg-[var(--border-default)]", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn("ml-auto text-[length:var(--font-size-xs)] tracking-widest text-[var(--text-secondary)]", className)}
    {...props}
  />
)
ContextMenuShortcut.displayName = "ContextMenuShortcut"

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      itemBase,
      "data-[highlighted]:bg-[var(--action-secondary)] data-[state=open]:bg-[var(--action-secondary)]",
      inset && "pl-[var(--space-6)]",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[var(--dropdown-min-w)] overflow-hidden rounded-[var(--radius-lg)]",
      "border border-[var(--border-default)] bg-[var(--surface-card)] p-[var(--space-1)]",
      "text-[var(--text-primary)] shadow-[var(--shadow-lg)]",
      className
    )}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
}
