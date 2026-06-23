import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CircleCheckIcon, CircleHelpIcon, XIcon } from "lucide-react"

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          "Displays a callout for user attention. `default` for neutral/info, `destructive` for errors. Pair color with an icon and text — never color alone.",
      },
    },
  },
  args: { variant: "default" },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "destructive"] },
  },
  render: (args) => (
    <div className="w-96">
      <Alert {...args}>
        <CircleHelpIcon />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          You can add components to your app using the CLI.
        </AlertDescription>
      </Alert>
    </div>
  ),
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Success: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-96">
      <Alert>
        <CircleCheckIcon />
        <AlertTitle>Payment received</AlertTitle>
        <AlertDescription>Your subscription is now active.</AlertDescription>
      </Alert>
    </div>
  ),
}

export const Destructive: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-96">
      <Alert variant="destructive">
        <XIcon />
        <AlertTitle>Unable to process payment</AlertTitle>
        <AlertDescription>
          Your card was declined. Try a different payment method.
        </AlertDescription>
      </Alert>
    </div>
  ),
}
