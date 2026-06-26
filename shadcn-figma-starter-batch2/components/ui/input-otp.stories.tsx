import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
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

export const WithFakeCaret: Story = {
  render: () => (
    <InputOTP maxLength={4} data-testid="otp" aria-label="One-time password">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const otp = canvas.getByRole("textbox")
    await userEvent.click(otp)
    await waitFor(() => expect(otp).toHaveFocus())
    // When focused with no chars entered, slot 0 is active and shows the fake
    // caret — this exercises the `{hasFakeCaret && ...}` branch in slot render.
    await waitFor(() =>
      expect(canvasElement.querySelector(".animate-caret-blink")).not.toBeNull()
    )
  },
}
