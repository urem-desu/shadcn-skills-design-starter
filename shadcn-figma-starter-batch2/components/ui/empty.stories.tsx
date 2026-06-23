import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FolderPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

const meta: Meta<typeof Empty> = {
  title: "Components/Empty",
  component: Empty,
  parameters: {
    docs: {
      description: {
        component:
          "An empty state. Explain the value and guide the user to the first action — never just \"No data\".",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Empty>

export const Default: Story = {
  render: () => (
    <Empty className="w-96">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderPlus />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          Create your first project to start collaborating with your team.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Create project</Button>
      </EmptyContent>
    </Empty>
  ),
}
