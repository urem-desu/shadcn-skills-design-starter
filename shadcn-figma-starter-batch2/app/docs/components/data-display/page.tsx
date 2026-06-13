import type { Metadata } from "next"
import { ChevronsUpDown, Star } from "lucide-react"
import { PageHeader } from "@/components/docs/page-header"
import { Showcase } from "@/components/docs/showcase"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { ChartDemo } from "@/components/docs/demos/chart-demo"

export const metadata: Metadata = { title: "Data Display" }

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
]

export default function DataDisplayPage() {
  return (
    <>
      <PageHeader eyebrow="Components" title="Data Display" description="Presenting content — tables, cards, avatars, accordions, carousels and charts." />

      <Showcase name="Table" source="components/ui/table.tsx" tokens={["border", "muted", "muted-foreground"]}>
        <Table className="max-w-xl">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((i) => (
              <TableRow key={i.invoice}>
                <TableCell className="font-medium">{i.invoice}</TableCell>
                <TableCell>{i.status}</TableCell>
                <TableCell>{i.method}</TableCell>
                <TableCell className="text-right">{i.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Showcase>

      <Showcase name="Avatar" source="components/ui/avatar.tsx" tokens={["muted", "muted-foreground", "border"]}>
        <Avatar><AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /><AvatarFallback>CN</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
      </Showcase>

      <Showcase name="Card" source="components/ui/card.tsx" tokens={["card", "card-foreground", "border"]}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one click.</CardDescription>
            <CardAction><Button variant="link" size="sm">Sign up</Button></CardAction>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Start from a template or import an existing repository.</CardContent>
          <CardFooter className="flex justify-between gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </Showcase>

      <Showcase name="Accordion" source="components/ui/accordion.tsx" tokens={["border", "foreground", "muted-foreground"]}>
        <Accordion type="single" collapsible defaultValue="a" className="w-full max-w-[503px]">
          <AccordionItem value="a">
            <AccordionTrigger className="data-[state=open]:font-bold">Product Information</AccordionTrigger>
            <AccordionContent className="text-foreground">Our flagship product combines cutting-edge technology with sleek design.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger className="data-[state=open]:font-bold">Shipping Details</AccordionTrigger>
            <AccordionContent className="text-foreground">We offer worldwide shipping through trusted courier partners.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Showcase>

      <Showcase name="Collapsible" source="components/ui/collapsible.tsx" tokens={["muted", "foreground"]}>
        <Collapsible className="w-full max-w-sm">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium">@peduarte starred 3 repositories</span>
            <CollapsibleTrigger asChild><Button variant="ghost" size="icon"><ChevronsUpDown /></Button></CollapsibleTrigger>
          </div>
          <div className="mt-2 rounded-md border px-3 py-2 text-sm">@radix-ui/primitives</div>
          <CollapsibleContent className="flex flex-col gap-2">
            <div className="mt-2 rounded-md border px-3 py-2 text-sm">@radix-ui/colors</div>
            <div className="rounded-md border px-3 py-2 text-sm">@stitches/react</div>
          </CollapsibleContent>
        </Collapsible>
      </Showcase>

      <Showcase name="Carousel" source="components/ui/carousel.tsx" tokens={["card", "border", "foreground"]}>
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, i) => (
              <CarouselItem key={i}>
                <div className="flex aspect-square items-center justify-center rounded-lg border bg-card text-4xl font-semibold">
                  {i + 1}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Showcase>

      <Showcase name="Chart" source="components/ui/chart.tsx" tokens={["chart-2", "border", "muted-foreground"]}>
        <ChartDemo />
      </Showcase>

      <Showcase name="Item" source="components/ui/item.tsx" tokens={["card", "muted", "muted-foreground"]}>
        <Item className="w-full max-w-sm rounded-lg border">
          <ItemMedia><Star className="size-5" /></ItemMedia>
          <ItemContent>
            <ItemTitle>Starred project</ItemTitle>
            <ItemDescription>Updated 2 hours ago</ItemDescription>
          </ItemContent>
        </Item>
      </Showcase>
    </>
  )
}
