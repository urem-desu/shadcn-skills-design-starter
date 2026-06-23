import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  parameters: {
    docs: {
      description: {
        component:
          "React Hook Form bindings: `FormField` wires a control to its label, description, and error with the right ARIA (`aria-describedby`, `aria-invalid`).",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Form>

type Values = { username: string }

function ProfileForm() {
  const form = useForm<Values>({ defaultValues: { username: "" } })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        className="w-80 space-y-6"
        noValidate
      >
        <FormField
          control={form.control}
          name="username"
          rules={{ required: "Username is required." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export const Default: Story = {
  render: () => <ProfileForm />,
}
