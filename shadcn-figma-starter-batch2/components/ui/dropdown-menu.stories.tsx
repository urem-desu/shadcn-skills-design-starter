import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/Dropdown Menu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A menu of actions or functions triggered by a button. Items, checkbox items, radio groups, separators, and shortcuts.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Open the menu, then close it", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /open menu/i }))
      // Portalled content renders to document.body — assert via screen.
      await expect(await screen.findByText("Profile")).toBeInTheDocument()
      await expect(screen.getByText("Log out")).toBeInTheDocument()
      // Close and wait for full unmount so the resting DOM is a11y-clean
      // (an open Radix menu aria-hides the focusable trigger).
      await userEvent.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument())
    })
  },
}

export const WithCheckboxesAndRadio: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">View options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked>Status bar</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Activity bar</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="md">
          <DropdownMenuRadioItem value="sm">Small</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="md">Medium</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="lg">Large</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Open and verify checkbox + radio items render", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /view options/i }))
      // Mounting the open menu exercises the checkbox/radio item branches.
      await expect(
        await screen.findByRole("menuitemcheckbox", { name: /activity bar/i }),
      ).toBeInTheDocument()
      await expect(screen.getByRole("menuitemradio", { name: /large/i })).toBeInTheDocument()
      await userEvent.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument())
    })
  },
}

/** A nested `Sub` menu inside a `Group`. */
export const WithSubmenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>New file</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Email</DropdownMenuItem>
              <DropdownMenuItem>Message</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Open the menu, reveal the submenu, then close", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /open menu/i }))
      // Hover the sub-trigger so the SubContent mounts.
      await userEvent.hover(await screen.findByRole("menuitem", { name: /invite users/i }))
      await expect(await screen.findByRole("menuitem", { name: "Email" })).toBeInTheDocument()
      await userEvent.keyboard("{Escape}")
      await userEvent.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument())
    })
  },
}
