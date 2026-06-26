import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component:
          "Vertically stacked headings that each reveal a section. `single` shows one panel at a time; `multiple` allows several.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

const items = [
  { v: "product", q: "What is included?", a: "Everything in the Pro plan plus priority support." },
  { v: "shipping", q: "How long is delivery?", a: "Worldwide shipping in 3–5 business days." },
  { v: "returns", q: "Can I get a refund?", a: "Yes — within 30 days, no questions asked." },
]

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      {items.map((it) => (
        <AccordionItem key={it.v} value={it.v}>
          <AccordionTrigger>{it.q}</AccordionTrigger>
          <AccordionContent>{it.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step("Expand a section, then collapse it", async () => {
      const trigger = canvas.getByRole("button", { name: /what is included/i })
      await expect(trigger).toHaveAttribute("aria-expanded", "false")
      await userEvent.click(trigger)
      await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "true"))
      await expect(canvas.getByText(/everything in the pro plan/i)).toBeVisible()
      await userEvent.click(trigger)
      await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"))
    })
  },
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-96" defaultValue={["product", "shipping"]}>
      {items.map((it) => (
        <AccordionItem key={it.v} value={it.v}>
          <AccordionTrigger>{it.q}</AccordionTrigger>
          <AccordionContent>{it.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}
