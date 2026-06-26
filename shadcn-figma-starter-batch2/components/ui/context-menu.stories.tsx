import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fireEvent, screen, userEvent, waitFor, within } from "storybook/test"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

const meta: Meta<typeof ContextMenu> = {
  title: "Components/Context Menu",
  component: ContextMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A menu triggered by right-click (or long-press). Same item model as Dropdown Menu.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ContextMenu>

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-72 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Right-click to open, then close", async () => {
      await fireEvent.contextMenu(canvas.getByText("Right-click here"))
      await expect(await screen.findByText("Reload")).toBeInTheDocument()
      await expect(screen.getByText("Delete")).toBeInTheDocument()
      await userEvent.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument())
    })
  },
}

export const WithExplicitPortal: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-72 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuContent className="w-52">
          <ContextMenuItem>Open</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenu>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Open and close", async () => {
      await fireEvent.contextMenu(canvas.getByText("Right-click here"))
      await expect(await screen.findByText("Open")).toBeInTheDocument()
      await userEvent.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument())
    })
  },
}

/**
 * The full item model: a `Group` of checkbox items, a `RadioGroup`, and a
 * nested `Sub` menu — the same primitives Dropdown Menu and Menubar share.
 */
export const WithSubmenuAndSelections: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-72 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuGroup>
          <ContextMenuLabel>Appearance</ContextMenuLabel>
          <ContextMenuCheckboxItem checked>Show toolbar</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show sidebar</ContextMenuCheckboxItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="md">
          <ContextMenuLabel>Density</ContextMenuLabel>
          <ContextMenuRadioItem value="sm">Compact</ContextMenuRadioItem>
          <ContextMenuRadioItem value="md">Comfortable</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Copy link</ContextMenuItem>
            <ContextMenuItem>Email</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Open, reveal the submenu, then close", async () => {
      await fireEvent.contextMenu(canvas.getByText("Right-click here"))
      await expect(
        await screen.findByRole("menuitemcheckbox", { name: /show sidebar/i }),
      ).toBeInTheDocument()
      await expect(screen.getByRole("menuitemradio", { name: /comfortable/i })).toBeInTheDocument()
      // Hover the sub-trigger so the SubContent mounts.
      await userEvent.hover(screen.getByRole("menuitem", { name: /share/i }))
      await expect(await screen.findByRole("menuitem", { name: /copy link/i })).toBeInTheDocument()
      // Two Escapes: close the submenu, then the root — resting DOM is clean.
      await userEvent.keyboard("{Escape}")
      await userEvent.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument())
    })
  },
}
