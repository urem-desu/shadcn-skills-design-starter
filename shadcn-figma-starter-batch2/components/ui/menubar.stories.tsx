import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

const meta: Meta<typeof Menubar> = {
  title: "Components/Menubar",
  component: Menubar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A persistent desktop-style menu bar. Arrow keys move between menus and items.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Menubar>

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print…</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Toggle fullscreen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Open the File menu, then close", async () => {
      await userEvent.click(canvas.getByRole("menuitem", { name: "File" }))
      await expect(await screen.findByText("New tab")).toBeInTheDocument()
      await expect(screen.getByText("Print…")).toBeInTheDocument()
      await userEvent.keyboard("{Escape}")
      await waitFor(() =>
        expect(screen.queryByRole("menu", { hidden: false })).not.toBeInTheDocument(),
      )
    })
  },
}

/**
 * Exercises the richer item set: a `Group` with checkbox items, a `RadioGroup`,
 * and a nested `Sub` menu.
 */
export const WithSubmenusAndSelections: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Options</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarLabel>Appearance</MenubarLabel>
            <MenubarCheckboxItem checked>Always show bookmarks</MenubarCheckboxItem>
            <MenubarCheckboxItem>Always show full URLs</MenubarCheckboxItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarRadioGroup value="pedro">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="pedro">Pedro</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Open the menu, reveal the submenu, then close", async () => {
      await userEvent.click(canvas.getByRole("menuitem", { name: "Options" }))
      await expect(
        await screen.findByRole("menuitemcheckbox", { name: /full urls/i }),
      ).toBeInTheDocument()
      await expect(screen.getByRole("menuitemradio", { name: "Pedro" })).toBeInTheDocument()
      await userEvent.hover(screen.getByRole("menuitem", { name: /share/i }))
      await expect(await screen.findByRole("menuitem", { name: /email link/i })).toBeInTheDocument()
      await userEvent.keyboard("{Escape}")
      await userEvent.keyboard("{Escape}")
      await waitFor(() =>
        expect(screen.queryByRole("menu", { hidden: false })).not.toBeInTheDocument(),
      )
    })
  },
}
