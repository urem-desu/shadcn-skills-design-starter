"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Dialog - token-driven modal window overlaid on the page, rendering the
 * content underneath inert (Figma "Dialog"). Built on the Radix Dialog
 * primitive: focus is trapped while open, focus returns to the trigger on
 * close, Escape closes, and - unlike Alert Dialog - clicking the scrim DOES
 * dismiss. A close (X) button sits in the top-right.
 *
 * Hybrid tokens: reuses the shared --dialog-max-w / --scrim seams (minted by
 * Alert Dialog) and reads --surface-card / --text-primary / --text-secondary /
 * --border-default + the space/type/radius/shadow scales directly. Footer
 * buttons are consumer-provided via the Button atom (wrap the dismiss action in
 * <DialogClose asChild>). Mirrors the Figma kit: black-30% scrim over a centered
 * white panel (rounded-lg, shadow-lg, p-6), an 18/600 title, a 14/regular muted
 * description, and a right-aligned footer.
 */
const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="dialog-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-[var(--scrim)]",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = "DialogOverlay"

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    /** Hide the built-in top-right close button. */
    showCloseButton?: boolean
  }
>(({ className, children, showCloseButton = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-slot="dialog-content"
      className={cn(
        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
        "flex w-full max-w-[var(--dialog-max-w)] flex-col gap-[var(--space-4)]",
        "border border-[var(--border-default)] bg-[var(--surface-card)]",
        "p-[var(--space-6)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)]",
        "outline-none",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton ? (
        <DialogPrimitive.Close
          data-slot="dialog-close"
          className={cn(
            "absolute right-[var(--space-4)] top-[var(--space-4)] rounded-[var(--radius-sm)]",
            "text-[var(--text-secondary)] opacity-70 transition-opacity outline-none",
            "hover:opacity-100 focus-visible:opacity-100 focus-visible:shadow-[var(--focus-ring)]",
            "disabled:pointer-events-none [&_svg]:size-[var(--icon-sm)] [&_svg]:shrink-0"
          )}
        >
          <X aria-hidden="true" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      ) : null}
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="dialog-header"
    className={cn("flex flex-col gap-[var(--space-2)] text-center sm:text-left", className)}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="dialog-footer"
    className={cn(
      "flex flex-col-reverse gap-[var(--space-2)] sm:flex-row sm:justify-end",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    data-slot="dialog-title"
    className={cn(
      "text-[length:var(--font-size-lg)] font-[var(--font-weight-semibold)]",
      "leading-[var(--line-tight)] text-[var(--text-primary)]",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    data-slot="dialog-description"
    className={cn(
      "text-[length:var(--font-size-sm)] leading-[var(--line-normal)]",
      "text-[var(--text-secondary)]",
      className
    )}
    {...props}
  />
))
DialogDescription.displayName = "DialogDescription"

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
