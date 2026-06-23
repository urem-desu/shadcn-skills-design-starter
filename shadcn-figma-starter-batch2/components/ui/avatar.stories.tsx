import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An image element with a text fallback for representing a user. Three sizes; falls back to initials when the image fails.",
      },
    },
  },
  args: { size: "default" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "default", "lg"] },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/96?img=12" alt="Ada Lovelace" />
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
  ),
}

/** When the image is missing, initials render with a muted surface. */
export const Fallback: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Avatar>
      <AvatarImage src="" alt="" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      {(["sm", "default", "lg"] as const).map((s) => (
        <Avatar key={s} size={s}>
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
}

export const Group: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <AvatarGroup>
      {["AL", "JD", "MK"].map((i) => (
        <Avatar key={i}>
          <AvatarFallback>{i}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  ),
}
