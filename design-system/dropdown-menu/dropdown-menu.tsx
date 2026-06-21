"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Dropdown Menu - token-driven menu (molecule) on the Radix DropdownMenu
 * primitive (focus management, typeahead, roving tabindex, Escape/outside-close
 * for free). Surface + items resolve to --dropdown-* / --menu-* tokens in
 * theme.css. Destructive items use the danger token set by INTENT, never primary.
 */
const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup
const DropdownMenuSub = DropdownMenuPrimitive.Sub

const itemBase = [
  "relative flex cursor-default select-none items-center gap-[var(--space-2)]",
  "rounded-[var(--radius-sm)] px-[var(--space-2)] py-[var(--space-1-5)]",
  "text-[length:var(--font-size-sm)] leading-[var(--line-tight)] outline-none",
  "[&_svg]:size-[var(--icon-sm)] [&_svg]:shrink-0",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
].join(" ")

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[var(--dropdown-min-w)] max-w-[var(--dropdown-max-w)] overflow-hidden",
        "rounded-[var(--radius-lg)] border border-[var(--border-default)]",
        "bg-[var(--surface-card)] p-[var(--space-1)] text-[var(--text-primary)] shadow-[var(--shadow-lg)]",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
    variant?: "default" | "destructive"
  }
>(({ className, inset, variant = "default", ...props }, ref) => (
  <DropdownMenuPrimitive.Item
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
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(itemBase, "pl-[var(--space-6)] data-[highlighted]:bg-[var(--action-secondary)]", className)}
    {...props}
  >
    <span className="absolute left-[var(--space-2)] flex size-[var(--icon-sm)] items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(itemBase, "pl-[var(--space-6)] data-[highlighted]:bg-[var(--action-secondary)]", className)}
    {...props}
  >
    <span className="absolute left-[var(--space-2)] flex size-[var(--icon-sm)] items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="size-[var(--space-1-5)] fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-[var(--space-2)] py-[var(--space-1-5)] text-[length:var(--font-size-xs)] font-[var(--font-weight-semibold)] text-[var(--text-secondary)]",
      inset && "pl-[var(--space-6)]",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-[var(--space-1)] my-[var(--space-1)] h-px bg-[var(--border-default)]", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn("ml-auto text-[length:var(--font-size-xs)] tracking-widest text-[var(--text-secondary)]", className)}
    {...props}
  />
)
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
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
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
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
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
