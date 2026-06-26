import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { FieldDemo } from "@/components/docs/demos/field-demo"

const meta: Meta<typeof Field> = {
  title: "Components/Field",
  component: Field,
  parameters: {
    docs: {
      description: {
        component:
          "Compose accessible form fields: label, control, description, and error wired together. `orientation` can be vertical, horizontal, or responsive.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Field>

export const Showcase: Story = {
  render: () => <FieldDemo />,
}

/**
 * Error rendering across its branches: a single error via the `errors` prop,
 * a de-duplicated multi-error list, and an explicit `children` message.
 */
export const ErrorStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <FieldGroup className="max-w-sm">
      <Field data-invalid>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" aria-invalid defaultValue="not-an-email" />
        <FieldError errors={[{ message: "Enter a valid email address." }]} />
      </Field>
      <FieldSeparator />
      <Field data-invalid>
        <FieldLabel htmlFor="pwd">Password</FieldLabel>
        <Input id="pwd" type="password" aria-invalid />
        <FieldError
          errors={[
            { message: "Must be at least 8 characters." },
            { message: "Must include a number." },
            { message: "Must be at least 8 characters." },
          ]}
        />
      </Field>
      <FieldSeparator>Or</FieldSeparator>
      <Field data-invalid>
        <FieldLabel htmlFor="user">Username</FieldLabel>
        <Input id="user" aria-invalid />
        <FieldError>That username is already taken.</FieldError>
        <FieldDescription>Pick something unique.</FieldDescription>
      </Field>
      {/* No children and no errors → FieldError renders nothing (its empty path). */}
      <FieldError errors={[]} />
    </FieldGroup>
  ),
}

/** Horizontal orientation plus a fieldset/legend grouping. */
export const HorizontalAndFieldset: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <FieldSet className="max-w-md">
      <FieldLegend>Notifications</FieldLegend>
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldLabel htmlFor="marketing">Marketing emails</FieldLabel>
          <Input id="marketing" placeholder="weekly" className="max-w-[10rem]" />
        </Field>
        <Field orientation="responsive">
          <FieldLabel htmlFor="digest">Product digest</FieldLabel>
          <Input id="digest" placeholder="monthly" className="max-w-[10rem]" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}
