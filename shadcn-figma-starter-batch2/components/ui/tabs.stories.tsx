import type { Meta, StoryObj } from "@storybook/nextjs-vite"

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
