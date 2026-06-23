import type { Meta, StoryObj } from "@storybook/nextjs-vite"

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
