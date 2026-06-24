import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { axeIgnore } from "@/.storybook/a11y"
import {
  Command,
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
}
