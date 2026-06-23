"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Menubar — persistent top-of-window menu strip (File / Edit / View…).
 * Thin layer over Radix Menubar (roving focus between triggers, keyboard
 * navigation, typeahead, portal menus). Shares all surface + item tokens
 * with DropdownMenu/ContextMenu. One seam: --menubar-trigger-px (bare px,
 * no space token at 12).
 */
const MenubarMenu = MenubarPrimitive.Menu
const MenubarGroup = MenubarPrimitive.Group
const MenubarPortal = MenubarPrimitive.Portal
const MenubarSub = MenubarPrimitive.Sub
const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-[var(--control-sm)] items-center gap-[var(--space-1)]",
      "rounded-[var(--radius-md)] border border-[var(--border-default)]",
      "bg-[var(--surface-card)] px-[var(--space-1)] shadow-[var(--shadow-sm)]",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-[var(--radius-sm)]",
      "px-[var(--menubar-trigger-px)] py-[var(--space-1)]",
      "text-[length:var(--font-size-sm)] font-[var(--font-weight-medium)]",
      "text-[var(--text-primary)] outline-none",
      "hover:bg-[var(--action-secondary)]",
      "focus:bg-[var(--action-secondary)]",
      "data-[state=open]:bg-[var(--action-secondary)]",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const itemBase = [
  "relative flex cursor-default select-none items-center gap-[var(--space-2)]",
  "rounded-[var(--radius-sm)] px-[var(--space-2)] py-[var(--space-1-5)]",
  "text-[length:var(--font-size-sm)] leading-[var(--line-tight)] outline-none",
  "[&_svg]:size-[var(--icon-sm)] [&_svg]:shrink-0",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
].join(" ")

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[var(--dropdown-min-w)] max-w-[var(--dropdown-max-w)] overflow-hidden",
        "rounded-[var(--radius-lg)] border border-[var(--border-default)]",
        "bg-[var(--surface-card)] p-[var(--space-1)]",
        "text-[var(--text-primary)] shadow-[var(--shadow-lg)]",
        className
      )}
      {...props}
    />
  </MenubarPrimitive.Portal>
))
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
    variant?: "default" | "destructive"
  }
>(({ className, inset, variant = "default", ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
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
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(itemBase, "pl-[var(--space-6)] data-[highlighted]:bg-[var(--action-secondary)]", className)}
    {...props}
  >
    <span className="absolute left-[var(--space-2)] flex size-[var(--icon-sm)] items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(itemBase, "pl-[var(--space-6)] data-[highlighted]:bg-[var(--action-secondary)]", className)}
    {...props}
  >
    <span className="absolute left-[var(--space-2)] flex size-[var(--icon-sm)] items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="size-[var(--space-1-5)] fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-[var(--space-2)] py-[var(--space-1-5)] text-[length:var(--font-size-sm)] font-[var(--font-weight-semibold)] text-[var(--text-primary)]",
      inset && "pl-[var(--space-6)]",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-[var(--space-1)] my-[var(--space-1)] h-px bg-[var(--border-default)]", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn("ml-auto text-[length:var(--font-size-xs)] tracking-widest text-[var(--text-secondary)]", className)}
    {...props}
  />
)
MenubarShortcut.displayName = "MenubarShortcut"

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
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
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
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
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarShortcut,
  MenubarGroup,
  MenubarPortal,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
}
