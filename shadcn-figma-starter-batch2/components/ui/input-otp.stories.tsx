import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { InputOTP } from "@/components/ui/input-otp"
import { InputOTPDemo } from "@/components/docs/demos/input-otp-demo"

const meta: Meta<typeof InputOTP> = {
  title: "Components/Input OTP",
  component: InputOTP,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An accessible one-time-password input with copy-paste support. Group slots and add separators.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof InputOTP>

export const Showcase: Story = {
  render: () => <InputOTPDemo />,
}
