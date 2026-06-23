"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Sheet — slide-in panel (left / right / top / bottom) built on Radix Dialog.
 * Focus-trapped, scrim-backed, Escape-to-close. Re-uses --scrim and
 * --dialog-max-w. One additional seam: --sheet-side-size (side panel width/
 * height on the blocking axis; no scale token at 360).
 */
const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close
const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-[var(--scrim)]", className)}
    {...props}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

type SheetSide = "top" | "right" | "bottom" | "left"

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  side?: SheetSide
}

const sideClasses: Record<SheetSide, string> = {
  top: "inset-x-0 top-0 border-b border-[var(--border-default)] data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
  bottom: "inset-x-0 bottom-0 border-t border-[var(--border-default)] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
  left: "inset-y-0 left-0 h-full w-[var(--sheet-side-size)] border-r border-[var(--border-default)] data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
  right: "inset-y-0 right-0 h-full w-[var(--sheet-side-size)] border-l border-[var(--border-default)] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 flex flex-col gap-[var(--space-4)] bg-[var(--surface-card)] p-[var(--space-6)]",
        "shadow-[var(--shadow-lg)] transition ease-[var(--ease-in-out)] duration-[var(--duration-base)]",
        sideClasses[side],
        className
      )}
      {...props}
    >
      {children}
      <SheetPrimitive.Close
        className={cn(
          "absolute right-[var(--space-4)] top-[var(--space-4)]",
          "flex size-[var(--icon-md)] items-center justify-center",
          "rounded-[var(--radius-sm)] text-[var(--text-secondary)]",
          "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
          "hover:bg-[var(--action-secondary)] hover:text-[var(--text-primary)]",
          "focus:outline-none focus:shadow-[var(--focus-ring)]",
        )}
      >
        <X className="size-[var(--icon-sm)]" aria-hidden="true" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-[var(--space-1-5)]", className)} {...props} />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse gap-[var(--space-2)] sm:flex-row sm:justify-end", className)} {...props} />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-[length:var(--font-size-lg)] font-[var(--font-weight-semibold)] text-[var(--text-primary)]", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-[length:var(--font-size-sm)] text-[var(--text-secondary)]", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
}
