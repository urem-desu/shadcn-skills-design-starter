# Table — Design System Component

Semantic HTML table (`<table>` / `<thead>` / `<tbody>` / `<tfoot>` / `<tr>` /
`<th>` / `<td>`) wrapped for token consumption. Zero seams: all values map to
existing semantic/primitive tokens. Horizontally scrollable container handles
responsive overflow.

Note: `Table` provides the base rendering layer. For sortable, filterable, and
paginated tables use **Data Table** (component #19), which composes this
primitive with TanStack Table.

Figma description: "A responsive table component."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| Row divider | border-bottom | `border.default` | `gray.200` | `gray.700` |
| `TableHead` row | border-bottom | `border.default` | `gray.200` | `gray.700` |
| `TableHead` | height | `control-md` | 40px | — |
| `TableHead` | padding-inline | `space-4` | 16px | — |
| `TableHead` | color | `text.secondary` | `gray.500` | `gray.400` |
| `TableHead` | font-weight | `font-weight-medium` | 500 | — |
| `TableCell` | padding-block | `space-3` | 12px | — |
| `TableCell` | padding-inline | `space-4` | 16px | — |
| `TableCell` | color | `text.primary` | `gray.900` | `gray.50` |
| `TableRow` (hover) | background | `surface.sunken` | `gray.50` | `gray.900` |
| `TableRow` (selected) | background | `interactive.selected-bg` | `blue.50` | `blue.950` |
| `TableFooter` | background | `surface.sunken` | `gray.50` | `gray.900` |
| `TableFooter` | border-top | `border.default` | `gray.200` | `gray.700` |
| `TableCaption` | color | `text.secondary` | `gray.500` | `gray.400` |
| Font size | all cells | `font-size-sm` | 14px | — |

## API
```ts
// All components extend their respective HTML element types
const Table       // div wrapper → <table>
const TableHeader // <thead>
const TableBody   // <tbody>
const TableFooter // <tfoot>
const TableRow    // <tr>
const TableHead   // <th>
const TableCell   // <td>
const TableCaption // <caption>
```

## States
- **Row hover**: `surface-sunken` background.
- **Row selected** (`data-[state=selected]`): `interactive-selected-bg`.
- **Dark**: border colors and surface colors flip via semantic token dark overrides.

## Accessibility
- Semantic HTML elements provide native table roles automatically.
- Use `<caption>` to describe the table to screen readers.
- For sortable columns, add `aria-sort="ascending"` / `"descending"` / `"none"`
  to `<th>` elements.
- `axe_audit`: 0 violations · `verify_responsive`: horizontal scroll container
  prevents overflow @ 280/320/414px.

## Usage
```tsx
import {
  Table, TableBody, TableCaption, TableCell, TableFooter,
  TableHead, TableHeader, TableRow,
} from "@/design-system/table/table"

<Table>
  <TableCaption>Monthly invoices</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map((invoice) => (
      <TableRow key={invoice.id}>
        <TableCell className="font-medium">{invoice.id}</TableCell>
        <TableCell>{invoice.status}</TableCell>
        <TableCell>{invoice.method}</TableCell>
        <TableCell className="text-right">{invoice.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total</TableCell>
      <TableCell className="text-right">$2,500.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```
