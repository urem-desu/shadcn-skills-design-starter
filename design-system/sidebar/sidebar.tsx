"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Sidebar — collapsible navigation rail.
 * Composable: SidebarProvider (context) → Sidebar (panel) →
 *   SidebarHeader / SidebarContent / SidebarFooter / SidebarGroup /
 *   SidebarGroupLabel / SidebarGroupContent / SidebarMenu / SidebarMenuItem /
 *   SidebarMenuButton / SidebarSeparator / SidebarTrigger.
 *
 * Two width seams: --sidebar-w (expanded) and --sidebar-collapsed-w (icon-rail).
 * Everything else maps to existing semantic tokens.
 */

/* ---- Context ------------------------------------------------------------ */

interface SidebarContextValue {
  open: boolean
  setOpen: (v: boolean) => void
  collapsible: boolean
}

const SidebarContext = React.createContext<SidebarContextValue>({
  open: true,
  setOpen: () => {},
  collapsible: true,
})

function useSidebar() {
  return React.useContext(SidebarContext)
}

/* ---- Provider ----------------------------------------------------------- */

interface SidebarProviderProps {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (v: boolean) => void
  collapsible?: boolean
  children: React.ReactNode
  className?: string
}

const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange,
      collapsible = true,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [openState, setOpenState] = React.useState(defaultOpen)
    const open = openProp ?? openState

    const setOpen = React.useCallback(
      (value: boolean) => {
        setOpenState(value)
        onOpenChange?.(value)
      },
      [onOpenChange]
    )

    return (
      <SidebarContext.Provider value={{ open, setOpen, collapsible }}>
        <div
          ref={ref}
          data-sidebar-state={open ? "expanded" : "collapsed"}
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

/* ---- Sidebar panel ------------------------------------------------------ */

const Sidebar = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { side?: "left" | "right" }
>(({ side = "left", className, ...props }, ref) => {
  const { open } = useSidebar()

  return (
    <aside
      ref={ref}
      data-state={open ? "expanded" : "collapsed"}
      className={cn(
        "relative flex flex-col overflow-hidden",
        "bg-[var(--surface-card)] border-[var(--border-default)]",
        "transition-[width] duration-[var(--duration-base)] ease-[var(--ease-in-out)]",
        side === "left"
          ? "border-r"
          : "border-l",
        open
          ? "w-[var(--sidebar-w)]"
          : "w-[var(--sidebar-collapsed-w)]",
        className
      )}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

/* ---- Structural sections ------------------------------------------------ */

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-[var(--space-2)] p-[var(--space-3)]",
      "border-b border-[var(--border-default)]",
      className
    )}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-1 flex-col gap-[var(--space-1)] overflow-y-auto overflow-x-hidden",
      "p-[var(--space-3)]",
      className
    )}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-[var(--space-2)] p-[var(--space-3)]",
      "border-t border-[var(--border-default)]",
      className
    )}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

/* ---- Groups ------------------------------------------------------------- */

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-[var(--space-1)]", className)}
    {...props}
  />
))
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { open } = useSidebar()

  return (
    <p
      ref={ref}
      className={cn(
        "px-[var(--space-2)] py-[var(--space-1)]",
        "text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)]",
        "text-[var(--text-tertiary)] uppercase tracking-[.06em]",
        "truncate transition-opacity duration-[var(--duration-base)]",
        !open && "opacity-0 pointer-events-none h-0 py-0 overflow-hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-[var(--space-0-5)]", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

/* ---- Menu --------------------------------------------------------------- */

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-col gap-[var(--space-0-5)] list-none m-0 p-0", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("relative", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string
  size?: "sm" | "md"
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, isActive, tooltip, size = "md", children, ...props }, ref) => {
    const { open } = useSidebar()

    const el = (
      <button
        ref={ref}
        data-active={isActive}
        title={!open && tooltip ? tooltip : undefined}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex w-full items-center gap-[var(--space-2)] rounded-[var(--radius-md)]",
          "text-[length:var(--font-size-sm)] text-[var(--text-primary)]",
          "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
          "hover:bg-[var(--action-secondary)] hover:text-[var(--text-primary)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
          "disabled:pointer-events-none disabled:opacity-50",
          size === "sm"
            ? "h-[var(--control-sm)] px-[var(--space-2)]"
            : "h-[var(--control-md)] px-[var(--space-2)]",
          isActive && "bg-[var(--interactive-selected-bg)] text-[var(--interactive-selected-text)] font-[var(--font-weight-medium)]",
          !open && "justify-center px-0",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )

    return el
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

/* ---- Separator ---------------------------------------------------------- */

const SidebarSeparator = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("my-[var(--space-2)] border-t border-[var(--border-default)]", className)}
    {...props}
  />
))
SidebarSeparator.displayName = "SidebarSeparator"

/* ---- Trigger (toggle button) ------------------------------------------- */

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { open, setOpen, collapsible } = useSidebar()

  if (!collapsible) return null

  return (
    <button
      ref={ref}
      onClick={(e) => {
        setOpen(!open)
        onClick?.(e)
      }}
      aria-expanded={open}
      aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
      className={cn(
        "flex size-[var(--control-sm)] items-center justify-center",
        "rounded-[var(--radius-md)] text-[var(--text-secondary)]",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
        "hover:bg-[var(--action-secondary)] hover:text-[var(--text-primary)]",
        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
        className
      )}
      {...props}
    >
      {/* Panel icon: two vertical lines representing a sidebar */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="12" height="12" rx="2" />
        <line x1="6" y1="2" x2="6" y2="14" />
      </svg>
    </button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
