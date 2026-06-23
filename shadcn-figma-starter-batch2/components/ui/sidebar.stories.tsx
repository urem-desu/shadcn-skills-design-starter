import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Sidebar } from "@/components/ui/sidebar"
import { SidebarDemo } from "@/components/docs/demos/sidebar-demo"

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A composable, collapsible sidebar. Wrap the app in `SidebarProvider`; toggle with `SidebarTrigger`. Collapses to an icon rail.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  render: () => <SidebarDemo />,
}
