import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TriangleAlert } from "lucide-react"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const meta: Meta<typeof AlertDialog> = {
  title: "Components/Alert Dialog",
  component: AlertDialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A modal that interrupts with important content and expects a response. Unlike Dialog, it must be acknowledged — use for destructive confirmations.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AlertDialog>

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger className={cn(buttonVariants({ variant: "outline" }))}>
        Show dialog
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <TriangleAlert />
          </AlertDialogMedia>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className={cn(buttonVariants({ variant: "destructive" }))}>
            Delete account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Open the alert, then dismiss via Cancel", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /show dialog/i }))
      await expect(await screen.findByRole("alertdialog")).toBeInTheDocument()
      await expect(screen.getByText("Are you absolutely sure?")).toBeInTheDocument()
      await userEvent.click(screen.getByRole("button", { name: /cancel/i }))
      await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument())
    })
  },
}
