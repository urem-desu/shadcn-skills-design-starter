import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"

const meta: Meta<typeof Toaster> = {
  title: "Components/Sonner (Toast)",
  component: Toaster,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An opinionated toast notifier. Mount one <Toaster /> at the app root, then call toast() from anywhere.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Toaster>

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <Button variant="outline" onClick={() => toast("Event has been created")}>
        Show toast
      </Button>
    </>
  ),
}

export const Variants: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => toast.success("Saved")}>
          Success
        </Button>
        <Button variant="outline" onClick={() => toast.error("Something went wrong")}>
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("Scheduled", {
              description: "Friday, June 26 at 9:00 AM",
              action: { label: "Undo", onClick: () => {} },
            })
          }
        >
          With action
        </Button>
      </div>
    </>
  ),
}
