import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A list of options the user picks from, opened by a button. Built on Radix Select with full keyboard support.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56" aria-label="Select a fruit">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes" disabled>
            Grapes (out of stock)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Open the list, choose an option, and reflect it on the trigger", async () => {
      const trigger = canvas.getByRole("combobox", { name: /select a fruit/i })
      // Radix Select opens on keyboard (ArrowDown) more reliably than a synthetic
      // click in the test browser. The listbox is portalled — assert via screen.
      trigger.focus()
      await userEvent.keyboard("{ArrowDown}")
      await userEvent.click(await screen.findByRole("option", { name: "Banana" }))
      // Choosing closes the listbox; wait for unmount so the resting DOM is clean.
      await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument())
      await expect(trigger).toHaveTextContent("Banana")
    })
  },
}

/** `position="popper"` plus a `SelectSeparator` between two groups. */
export const GroupedPopper: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56" aria-label="Pick a timezone">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern</SelectItem>
          <SelectItem value="pst">Pacific</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">GMT</SelectItem>
          <SelectItem value="cet">Central European</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Open the popper-positioned list, then close it", async () => {
      const trigger = canvas.getByRole("combobox", { name: /pick a timezone/i })
      trigger.focus()
      await userEvent.keyboard("{ArrowDown}")
      await expect(await screen.findByRole("option", { name: "GMT" })).toBeInTheDocument()
      await userEvent.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument())
    })
  },
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-56" aria-label="Disabled select">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">One</SelectItem>
      </SelectContent>
    </Select>
  ),
}
