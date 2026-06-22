"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

/**
 * Drawer - token-driven sheet that slides in from an edge (Figma "Drawer": "A
 * drawer component for React"). Built on Vaul: drag-to-dismiss, scrim, focus
 * trap, and the four directions (bottom default, top, left, right). The bottom
 * direction shows a drag handle.
 *
 * Hybrid tokens: reuses the shared --scrim seam and reads --surface-card /
 * --text-primary / --text-secondary / --border-default + the space/radius/shadow
 * scales directly; the only component-scoped seams are --drawer-handle-w and
 * --drawer-content-max-w (bare px with no token to point at). Footer buttons are
 * consumer-provided via the Button atom. Mirrors the Figma kit: a black-30%
 * scrim under a white panel with rounded leading corners, a centered drag
 * handle, a 16/600 title, a 14/regular muted description, and a stacked footer.
 */
const Drawer = (props: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root data-slot="drawer" {...props} />
)

const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerPortal = DrawerPrimitive.Portal
const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    data-slot="drawer-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-[var(--scrim)]",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  />
))
DrawerOverlay.displayName = "DrawerOverlay"

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal data-slot="drawer-portal">
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      data-slot="drawer-content"
      className={cn(
        "group/drawer-content fixed z-50 flex h-auto flex-col",
        "border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--text-primary)]",
        // bottom (default)
        "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-[var(--radius-lg)] data-[vaul-drawer-direction=bottom]:border-t",
        // top
        "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-[var(--radius-lg)] data-[vaul-drawer-direction=top]:border-b",
        // right
        "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
        // left
        "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
        "shadow-[var(--shadow-lg)] outline-none",
        className
      )}
      {...props}
    >
      {/* drag handle - bottom direction only */}
      <div
        aria-hidden="true"
        className="mx-auto mt-[var(--space-4)] hidden h-[var(--space-2)] w-[var(--drawer-handle-w)] shrink-0 rounded-[var(--radius-full)] bg-[var(--border-default)] group-data-[vaul-drawer-direction=bottom]/drawer-content:block"
      />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="drawer-header"
    className={cn(
      "flex flex-col gap-[var(--space-1-5)] p-[var(--space-4)]",
      "group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center",
      "group-data-[vaul-drawer-direction=top]/drawer-content:text-center",
      "md:gap-[var(--space-1-5)] md:text-left",
      className
    )}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="drawer-footer"
    className={cn("mt-auto flex flex-col gap-[var(--space-2)] p-[var(--space-4)]", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    data-slot="drawer-title"
    className={cn(
      "text-[length:var(--font-size-base)] font-[var(--font-weight-semibold)]",
      "leading-[var(--line-normal)] text-[var(--text-primary)]",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    data-slot="drawer-description"
    className={cn(
      "text-[length:var(--font-size-sm)] leading-[var(--line-normal)] text-[var(--text-secondary)]",
      className
    )}
    {...props}
  />
))
DrawerDescription.displayName = "DrawerDescription"

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
