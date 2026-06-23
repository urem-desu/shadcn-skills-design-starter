import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Label } from "@/components/ui/label"

const meta: Meta<typeof NativeSelect> = {
  title: "Components/Native Select",
  component: NativeSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A styled native HTML <select>. Use when the platform picker (mobile, accessibility) is preferable to the custom Select.",
      },
    },
  },
  argTypes: { disabled: { control: "boolean" } },
}

export default meta
type Story = StoryObj<typeof NativeSelect>

export const Default: Story = {
  render: (args) => (
    <div className="grid w-56 gap-2">
      <Label htmlFor="ns">Timezone</Label>
      <NativeSelect id="ns" {...args}>
        <NativeSelectOptGroup label="North America">
          <NativeSelectOption value="est">Eastern</NativeSelectOption>
          <NativeSelectOption value="pst">Pacific</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Europe">
          <NativeSelectOption value="gmt">GMT</NativeSelectOption>
          <NativeSelectOption value="cet">Central European</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </div>
  ),
}

export const Disabled: Story = { args: { disabled: true }, render: Default.render }
