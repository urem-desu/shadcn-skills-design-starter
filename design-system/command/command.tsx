"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/design-system/dialog/dialog"

/**
 * Command - token-driven command palette / typeahead. Thin layer over cmdk:
 * cmdk owns filtering + ARIA Combobox/Listbox; we own the surface, item
 * geometry, and the active-descendant visual. Hybrid: one component-tier
 * seam, --command-list-max-h (the scroll cap), defined in theme.css.
 */

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex h-full w-full flex-col overflow-hidden",
        "rounded-[var(--radius-md)] bg-[var(--surface-card)] text-[var(--text-primary)]",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}
      >
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className={cn(
        "flex h-[var(--control-sm)] items-center gap-[var(--space-2)]",
        "border-b border-[var(--border-default)] px-[var(--space-3)]"
      )}
    >
      <SearchIcon
        aria-hidden="true"
        className="size-[var(--icon-sm)] shrink-0 opacity-50"
      />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "flex h-[var(--control-md)] w-full rounded-[var(--radius-md)] bg-transparent",
          "py-[var(--space-3)] text-[length:var(--font-size-sm)] outline-hidden",
          "placeholder:text-[var(--text-tertiary)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[var(--command-list-max-h)] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-[var(--space-6)] text-center text-[length:var(--font-size-sm)]"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-[var(--space-1)] text-[var(--text-primary)]",
        // group heading styling - cmdk emits the heading as [cmdk-group-heading]
        "[&_[cmdk-group-heading]]:px-[var(--space-2)] [&_[cmdk-group-heading]]:py-[var(--space-1-5)]",
        "[&_[cmdk-group-heading]]:text-[length:var(--font-size-xs)] [&_[cmdk-group-heading]]:font-[var(--font-weight-medium)]",
        "[&_[cmdk-group-heading]]:text-[var(--text-secondary)]",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn(
        "h-px bg-[var(--border-default)] -mx-[var(--space-1)]",
        className
      )}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default items-center gap-[var(--space-2)]",
        "rounded-[var(--radius-sm)] px-[var(--space-2)] py-[var(--space-1-5)]",
        "text-[length:var(--font-size-sm)] outline-hidden select-none",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        "data-[selected=true]:bg-[var(--interactive-selected-bg)] data-[selected=true]:text-[var(--interactive-selected-text)]",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        "[&_svg:not([class*='size-'])]:size-[var(--icon-sm)]",
        "[&_svg:not([class*='text-'])]:text-[var(--text-secondary)]",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-[length:var(--font-size-xs)] tracking-widest text-[var(--text-secondary)]",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
