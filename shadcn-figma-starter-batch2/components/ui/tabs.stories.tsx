import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          "Layered sections of content shown one at a time. Roving-tabindex keyboard model; arrow keys move between tabs.",
      },
    },
  },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const Body = () => (
  <>
    <TabsContent value="account" className="text-sm text-muted-foreground">
      Make changes to your account here.
    </TabsContent>
    <TabsContent value="password" className="text-sm text-muted-foreground">
      Change your password here.
    </TabsContent>
  </>
)

export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="account" className="w-80" {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <Body />
    </Tabs>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Switch from the Account tab to Password", async () => {
      await expect(canvas.getByText(/make changes to your account/i)).toBeVisible()
      await userEvent.click(canvas.getByRole("tab", { name: "Password" }))
      await expect(await canvas.findByText(/change your password/i)).toBeVisible()
      await expect(canvas.getByRole("tab", { name: "Password" })).toHaveAttribute(
        "aria-selected",
        "true",
      )
    })
  },
}

/** `line` variant — underline indicator instead of the filled pill track. */
export const Line: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabs defaultValue="account" className="w-80">
      <TabsList variant="line">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <Body />
    </Tabs>
  ),
}
