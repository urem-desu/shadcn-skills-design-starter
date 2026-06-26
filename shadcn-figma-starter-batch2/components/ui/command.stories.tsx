import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"

import { axeIgnore } from "@/.storybook/a11y"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const meta: Meta<typeof Command> = {
  title: "Components/Command",
  component: Command,
  parameters: {
    docs: {
      description: {
        component:
          "A composable command menu (cmdk). Type to filter; arrow keys move; Enter selects.",
      },
    },
    // Scoped axe exception: the role="listbox" / role="option" structure is
    // rendered internally by the cmdk library and is not addressable from story
    // or component code, so aria-required-children is disabled here only.
    a11y: axeIgnore("aria-required-children"),
  },
}

export default meta
type Story = StoryObj<typeof Command>

export const Default: Story = {
  render: () => (
    <Command className="w-80 rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search emoji</CommandItem>
          <CommandItem>Launch</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            Profile <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Settings <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText(/type a command/i)
    await step("Filter to a matching item", async () => {
      await userEvent.type(input, "cal")
      await expect(canvas.getByText("Calendar")).toBeInTheDocument()
      await expect(canvas.queryByText("Launch")).not.toBeInTheDocument()
    })
    await step("Filter to no results — empty state branch", async () => {
      await userEvent.clear(input)
      await userEvent.type(input, "zzzzz")
      await expect(await canvas.findByText("No results found.")).toBeInTheDocument()
    })
  },
}

/** The same command menu inside a modal Dialog (`CommandDialog`, default chrome). */
function CommandDialogExample({
  showCloseButton,
  title,
  description,
}: {
  showCloseButton?: boolean
  title?: string
  description?: string
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open command palette
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        showCloseButton={showCloseButton}
        title={title}
        description={description}
      >
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search emoji</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

const openDialogAndClose: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByRole("button", { name: /open command palette/i }))
  await expect(await screen.findByRole("dialog")).toBeInTheDocument()
  await expect(screen.getByPlaceholderText(/type a command/i)).toBeInTheDocument()
  await userEvent.keyboard("{Escape}")
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
}

/** Default dialog chrome — uses the built-in title/description and close button. */
export const Dialog: Story = {
  render: () => <CommandDialogExample />,
  play: openDialogAndClose,
}

/** Custom title/description and no close button — exercises the overridden props. */
export const DialogCustomChrome: Story = {
  render: () => (
    <CommandDialogExample
      showCloseButton={false}
      title="Quick actions"
      description="Jump to anything in the app"
    />
  ),
  play: openDialogAndClose,
}
