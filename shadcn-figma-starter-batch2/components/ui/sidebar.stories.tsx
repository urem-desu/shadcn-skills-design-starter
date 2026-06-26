import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { expect, userEvent, waitFor, within } from "storybook/test"
import { Bot, Inbox, MoreHorizontal, Plus, SquareTerminal } from "lucide-react"

import { SidebarDemo } from "@/components/docs/demos/sidebar-demo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A composable, collapsible sidebar. Wrap the app in `SidebarProvider`; toggle with `SidebarTrigger`. Collapses to an icon rail.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  render: () => <SidebarDemo />,
}

/** Frame helper so every story has a bounded, scrollable canvas. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[520px] w-full overflow-hidden rounded-lg border">
      {children}
    </div>
  )
}

/**
 * Exercises the full part inventory in one place: `SidebarInput`,
 * `SidebarSeparator`, `SidebarGroupAction` (button and `asChild`),
 * `SidebarGroupContent`, every `SidebarMenuButton` option (string vs object
 * tooltip, `isActive`, `variant`, `size`, `asChild`), `SidebarMenuAction`,
 * `SidebarMenuBadge`, `SidebarMenuSkeleton` (with and without icon), and the
 * `SidebarMenuSub` parts. The play hovers a tooltip button to mount its content.
 */
export const AllParts: Story = {
  render: () => (
    <Frame>
      <SidebarProvider className="min-h-0 h-full items-stretch">
        <Sidebar collapsible="icon" className="absolute h-full">
          <SidebarHeader>
            <SidebarInput aria-label="Search the sidebar" placeholder="Search…" />
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <span>Platform</span>
              </SidebarGroupLabel>
              <SidebarGroupAction title="Add platform">
                <Plus />
                <span className="sr-only">Add platform</span>
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive
                      variant="outline"
                      size="lg"
                      tooltip="Playground tip"
                    >
                      <SquareTerminal />
                      <span>Playground</span>
                    </SidebarMenuButton>
                    <SidebarMenuAction asChild showOnHover={false}>
                      <button type="button">
                        <MoreHorizontal />
                        <span className="sr-only">Playground actions</span>
                      </button>
                    </SidebarMenuAction>
                    <SidebarMenuBadge>12</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="sm" tooltip={{ children: "Models tip" }}>
                      <Bot />
                      <span>Models</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#inbox">
                        <Inbox />
                        <span>Inbox</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton size="sm" isActive href="#unread">
                          Unread
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a href="#archived">Archived</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>More</SidebarGroupLabel>
              <SidebarGroupAction asChild title="Add more">
                <a href="#add">
                  <Plus />
                  <span className="sr-only">Add more</span>
                </a>
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <span>Plain item</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Footer</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="min-h-0">
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <span className="text-sm font-medium">Content</span>
          </header>
        </SidebarInset>
      </SidebarProvider>
    </Frame>
  ),
}

/**
 * `collapsible="icon"` starting collapsed: the rail is the only affordance and
 * menu tooltips become visible (`hidden=false`) because the labels are hidden.
 */
export const Collapsed: Story = {
  render: () => (
    <Frame>
      <SidebarProvider defaultOpen={false} className="min-h-0 h-full items-stretch">
        <Sidebar collapsible="icon" className="absolute h-full">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Playground">
                    <SquareTerminal />
                    <span>Playground</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="min-h-0">
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <span className="text-sm font-medium">Collapsed</span>
          </header>
        </SidebarInset>
      </SidebarProvider>
    </Frame>
  ),
}

/** Every `Sidebar` shape: the `floating` and `inset` variants, a right-side bar, and `collapsible="none"`. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      {(["floating", "inset"] as const).map((variant) => (
        <SidebarProvider
          key={variant}
          className="h-72 w-64 min-h-0 items-stretch overflow-hidden rounded-lg border"
        >
          <Sidebar variant={variant} collapsible="icon" className="absolute h-full">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>{variant}</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <SquareTerminal />
                      <span>Item</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
          </Sidebar>
        </SidebarProvider>
      ))}
      <SidebarProvider className="h-72 w-64 min-h-0 items-stretch overflow-hidden rounded-lg border">
        <Sidebar side="right" className="absolute h-full">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Right</SidebarGroupLabel>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
      </SidebarProvider>
      <SidebarProvider className="h-72 w-64 min-h-0 items-stretch overflow-hidden rounded-lg border">
        <Sidebar collapsible="none" className="h-full">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Static</SidebarGroupLabel>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  ),
}

/**
 * Drives the interactive surface: clicking `SidebarTrigger` (with a passed
 * `onClick`) and the rail toggles open state and writes the cookie; the
 * keyboard shortcut (Ctrl/Cmd+B) and a non-matching key exercise the handler.
 */
export const Interactions: Story = {
  render: () => {
    // Calls setOpen with a plain boolean (not an updater fn) — the other half of
    // the `typeof value === "function" ? value(open) : value` branch.
    function ForceClose() {
      const { setOpen } = useSidebar()
      return (
        <button type="button" data-testid="force-close" onClick={() => setOpen(false)}>
          Force close
        </button>
      )
    }
    function Harness() {
      const [count, setCount] = React.useState(0)
      return (
        <Frame>
          <SidebarProvider className="min-h-0 h-full items-stretch">
            <Sidebar collapsible="offcanvas" className="absolute h-full">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Nav</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
              <SidebarRail />
            </Sidebar>
            <SidebarInset className="min-h-0">
              <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" onClick={() => setCount((c) => c + 1)} />
                <span className="text-sm font-medium" data-testid="clicks">
                  Trigger clicks: {count}
                </span>
                <ForceClose />
              </header>
            </SidebarInset>
          </SidebarProvider>
        </Frame>
      )
    }
    return <Harness />
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    // Both the trigger and the rail expose the name "Toggle Sidebar"; pick the
    // trigger by its data-slot.
    const trigger = canvasElement.querySelector<HTMLButtonElement>(
      '[data-slot="sidebar-trigger"]',
    )!

    await step("Click the trigger — toggles state and runs the passed onClick", async () => {
      await userEvent.click(trigger)
      await expect(canvas.getByTestId("clicks")).toHaveTextContent("Trigger clicks: 1")
      await userEvent.click(trigger)
      await expect(canvas.getByTestId("clicks")).toHaveTextContent("Trigger clicks: 2")
    })

    await step("Click the rail — also toggles", async () => {
      const rail = canvasElement.querySelector<HTMLButtonElement>('[data-sidebar="rail"]')
      if (rail) await userEvent.click(rail)
    })

    await step("Keyboard shortcut and a non-matching key", async () => {
      await userEvent.keyboard("{Control>}b{/Control}")
      // A plain key takes the handler's false branch (no toggle).
      await userEvent.keyboard("x")
    })

    await step("Force close — setOpen called with a boolean, not an updater", async () => {
      await userEvent.click(canvas.getByTestId("force-close"))
    })
  },
}

/** Controlled mode: parent owns `open` and receives `onOpenChange`. */
export const Controlled: Story = {
  render: () => {
    function Harness() {
      const [open, setOpen] = React.useState(true)
      return (
        <Frame>
          <SidebarProvider
            open={open}
            onOpenChange={setOpen}
            className="min-h-0 h-full items-stretch"
          >
            <Sidebar collapsible="icon" className="absolute h-full">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Controlled</SidebarGroupLabel>
                </SidebarGroup>
              </SidebarContent>
              <SidebarRail />
            </Sidebar>
            <SidebarInset className="min-h-0">
              <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <span className="text-sm font-medium" data-testid="state">
                  {open ? "open" : "closed"}
                </span>
              </header>
            </SidebarInset>
          </SidebarProvider>
        </Frame>
      )
    }
    return <Harness />
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Toggling routes through the parent's onOpenChange", async () => {
      await expect(canvas.getByTestId("state")).toHaveTextContent("open")
      const trigger = canvasElement.querySelector<HTMLButtonElement>(
        '[data-slot="sidebar-trigger"]',
      )!
      await userEvent.click(trigger)
      await expect(canvas.getByTestId("state")).toHaveTextContent("closed")
    })
  },
}

/**
 * Below the mobile breakpoint the sidebar renders inside a `Sheet`. The play
 * shrinks the viewport, opens the sheet, then restores the desktop viewport so
 * later stories are unaffected.
 */
export const Mobile: Story = {
  render: () => (
    <Frame>
      <SidebarProvider className="min-h-0 h-full items-stretch">
        <Sidebar collapsible="offcanvas">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Mobile nav</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <span>Mobile item</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="min-h-0">
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <span className="text-sm font-medium">Mobile</span>
          </header>
        </SidebarInset>
      </SidebarProvider>
    </Frame>
  ),
  play: async ({ canvasElement, step }) => {
    const { page } = await import("@vitest/browser/context")
    const body = within(document.body)
    try {
      await step("Shrink to mobile and open the sheet sidebar", async () => {
        await page.viewport(390, 800)
        // In mobile mode the desktop sidebar <div> is replaced by a Sheet, which
        // renders nothing while closed — so its absence proves useIsMobile flipped.
        await waitFor(
          () => expect(canvasElement.querySelector('[data-slot="sidebar"]')).toBeNull(),
          { timeout: 4000 },
        )
        const trigger = canvasElement.querySelector<HTMLButtonElement>(
          '[data-slot="sidebar-trigger"]',
        )!
        await userEvent.click(trigger)
        const dialog = await body.findByRole("dialog", {}, { timeout: 4000 })
        await expect(within(dialog).getByText("Mobile item")).toBeInTheDocument()
        await userEvent.keyboard("{Escape}")
        await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument())
      })
    } finally {
      // Restore a desktop viewport for subsequent stories in this worker.
      await page.viewport(1280, 800)
    }
  },
}

/** Error boundary proving `useSidebar` throws a clear message outside a provider. */
class Catch extends React.Component<
  { children: React.ReactNode },
  { error: string | null }
> {
  state = { error: null as string | null }
  static getDerivedStateFromError(error: Error) {
    return { error: error.message }
  }
  render() {
    if (this.state.error) {
      return <p role="alert">{this.state.error}</p>
    }
    return this.props.children
  }
}

function NeedsProvider() {
  useSidebar()
  return <span>unreachable</span>
}

export const OutsideProvider: Story = {
  render: () => (
    <div className="p-4">
      <Catch>
        <NeedsProvider />
      </Catch>
    </div>
  ),
  beforeEach() {
    const original = console.error
    console.error = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0].includes("must be used within a SidebarProvider")) return
      original.apply(console, args)
    }
    return () => { console.error = original }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("The hook throws and the boundary shows the message", async () => {
      await expect(canvas.getByRole("alert")).toHaveTextContent(
        /must be used within a SidebarProvider/i,
      )
    })
  },
}
