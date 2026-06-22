# Data Table — Design System Component

Token-driven datagrid on TanStack Table (Figma "Data Table": _"Powerful table
and datagrids built using TanStack Table"_). TanStack owns the headless model —
sorting, column filtering, column visibility, row selection, pagination — and
this component owns the surface, composing the design-system atoms:

- **Input** (toolbar filter), **Button** (Columns trigger / row-actions / Previous-Next),
  **Checkbox** (select-all + per-row), **DropdownMenu** (column visibility + row actions).
- Colocated **Table primitives** (`Table`, `TableHeader`, `TableBody`, `TableRow`,
  `TableHead`, `TableCell`) — the same surface the standalone Table component
  (#50) will own; promote them there when it lands.

Hybrid token rule: zero color/geometry component tokens — every value resolves
to an existing semantic/primitive. One genuine seam: `--data-table-filter-max-w`
(the 384px filter cap; a bare px would fail `lint_hardcodes` and no scale token
sits at 384).

## Anatomy
```
Toolbar   [ Filter input .......................... ]        [ Columns v ]
Table  ┌───────────────────────────────────────────────────────────────┐
       │ [ ] │ Status     │ Email  ↕        │        Amount │        │
       ├───────────────────────────────────────────────────────────────┤
       │ [ ] │ Success    │ ken99@yahoo.com │       $316.00 │  ...   │
       │  …  rows …                                                    │
       └───────────────────────────────────────────────────────────────┘
Footer  N of M row(s) selected.                    [ Previous ] [ Next ]
```

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| Toolbar | padding-block | `spacing.scale.4` | 16px | — |
| Toolbar | gap | `spacing.scale.2` | 8px | — |
| Filter (Input atom) | height | `sizing.control.md` | 40px | — |
| Filter | max-width | `--data-table-filter-max-w` (seam) | 384px | — |
| Filter | border / radius / px | `field.border` / `field.radius` / `space-3` | `gray.200` / 6px / 12px | `gray.800` |
| Filter | text / placeholder | `field.text` / `field.placeholder` | `gray.900` / `gray.400` | `gray.50` / `gray.500` |
| Filter focus | border / ring | `field.border-focus` / `field.focus-ring` | `blue.500` | — |
| Columns (Button outline md) | bg / border / text | `button.outline-*` | `white` / `gray.200` / `gray.900` | `gray.900` / `gray.800` / `gray.50` |
| Columns hover | bg | `action.secondary` | `gray.100` | `gray.700` |
| Columns chevron | size | `sizing.icon.md` | 20px | — |
| Table wrapper | border / radius / bg | `border.default` / `radius.md` / `surface.card` | `gray.200` / 6px / `white` | `gray.800` / `gray.900` |
| Table | font-size / text | `typography.fontSize.sm` / `text.primary` | 14px / `gray.900` | `gray.50` |
| TableHead | height | `sizing.control.md` | 40px | — |
| TableHead | padding-inline | `spacing.scale.2` | 8px | — |
| TableHead | font-weight / color | medium / `text.primary` | 500 / `gray.900` | `gray.50` |
| Header row | border-block-end | `border.default` | `gray.200` | `gray.800` |
| Email sort (Button ghost sm) | text / hover bg | `text.primary` / `action.secondary` | `gray.900` / `gray.100` | `gray.50` / `gray.700` |
| Email sort | margin-inline-start | `-spacing.scale.3` (align to header text) | -12px | — |
| Email sort icon (arrow-up-down) | size | `sizing.icon.sm` | 16px | — |
| TableCell | padding | `space-3` / `space-2` | 12px / 8px | — |
| TableCell | text | `text.primary` | `gray.900` | `gray.50` |
| Amount cell | text-align / numerals | end / tabular-nums | — | — |
| Row hover | bg | `surface.sunken` | `gray.50` | `black` |
| Row selected (`data-state="selected"`) | bg | `action.secondary` | `gray.100` | `gray.800` |
| Row border-block-end (not last) | color | `border.default` | `gray.200` | `gray.800` |
| Select checkbox (Checkbox atom) | box / border | `control-box-bg` / `control-box-border` | `white` / `gray.500` | `gray.900` / `gray.500` |
| Select checkbox checked | fill / mark | `control-checked-bg` / `control-checked-mark` | `blue.600` / `white` | — |
| Row actions (Button ghost icon) | size | `sizing.control.sm` | 32px | — |
| Row actions ellipsis | size | `sizing.icon.sm` | 16px | — |
| Footer | padding-block / gap | `space-4` / `space-2` | 16px / 8px | — |
| Selection count | font-size / color | `font-size.sm` / `text.secondary` | 14px / `gray.600` | `gray.400` |
| Previous / Next (Button outline sm) | height / px | `control.sm` / `space-3` | 32px / 12px | — |
| Previous / Next disabled | opacity | 0.5 + `pointer-events:none` | — | — |

## API
```ts
import type { ColumnDef } from "@tanstack/react-table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  /** Column id the toolbar text filter targets (e.g. "email"). Omit for no filter. */
  filterColumn?: string
  /** Placeholder for the toolbar filter input. */
  filterPlaceholder?: string  // default "Filter..."
}

// Row-actions trigger for an "actions" column cell.
function DataTableRowActions(props: { children: React.ReactNode }): JSX.Element

// Colocated, token-driven table primitives (forward all native attrs):
// Table, TableHeader, TableBody, TableRow, TableHead, TableCell
```
Column behaviour (select, sort, hide, actions) is declared in `ColumnDef`s by
the consumer — see Usage. The component wires the four TanStack row models
(core, filtered, sorted, paginated) and the four UI state slices (sorting,
columnFilters, columnVisibility, rowSelection).

## States
- **Row resting**: transparent, `text.primary` cells.
- **Row hover**: `surface.sunken` background (`hover:bg` on `TableRow`).
- **Row selected** (`data-state="selected"`, driven by `row.getIsSelected()`):
  `action.secondary` background; the row checkbox is `checked`.
- **Select-all** (header checkbox): `checked` when every page row is selected,
  `indeterminate` when some are — set via `table.getIsAllPageRowsSelected()` /
  `getIsSomePageRowsSelected()`.
- **Sort** (Email header): ghost button toggles `column.toggleSorting()`; the
  arrow-up-down icon is the affordance. (Asc/desc/none cycle is TanStack's.)
- **Column visibility**: the Columns menu lists hideable columns as checkbox
  items bound to `column.toggleVisibility()`; hidden columns drop from header + body.
- **Empty**: when no rows match the filter, a single full-width cell renders
  "No results." at `text.secondary`.
- **Pagination**: Previous / Next call `table.previousPage()` / `nextPage()` and
  are `disabled` (opacity 0.5) when `getCanPreviousPage()` / `getCanNextPage()`
  is false.
- **Filter**: typing in the toolbar Input sets `column.setFilterValue()` (live).

## Accessibility (gate-verified, light & dark)
- Native semantic table: `<table>` / `<thead>` / `<tbody>` / `<th scope="col">`
  / `<td>` — AT announces rows, columns, and headers. The actions column header
  carries an `sr-only` "Actions" label so it is not an empty header.
- Every checkbox is a real `<input type="checkbox">` with an `aria-label`
  (select-all "Select all"; rows "Select row") — keyboard-toggleable, focus ring
  via `control` focus-ring token.
- Icon-only controls have names: the Columns trigger has visible text "Columns";
  the Email sort button is named by its "Email" text; the row-actions ellipsis
  button has an `sr-only` "Open row actions"; all decorative SVGs are `aria-hidden`.
- The horizontal scroll wrapper holds focusable controls, so it is reachable
  without a synthetic `tabindex` (no `scrollable-region-focusable` violation).
- Contrast clears AA in both themes: header/cell `text.primary` 15:1 / 18:1,
  selection count `text.secondary` 5.7:1 / 7.3:1 (on its row/page surface),
  outline + ghost buttons in default/hover/focus.
- `measure_render`: all labels AA · `axe_audit`: 0 violations (table structure,
  control names) · `verify_states`: filter, Columns, sort, row-actions, and
  pagination buttons pass default/hover/focus · `verify_responsive`: table
  scrolls inside its wrapper — no page overflow @ 280/320/414.

## Usage
```tsx
"use client"
import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/design-system/button/button"
import {
  DataTable,
  DataTableRowActions,
  Checkbox,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/design-system/data-table/data-table"

type Payment = { id: string; status: string; email: string; amount: number }

const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(e.currentTarget.checked)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(e.currentTarget.checked)}
      />
    ),
  },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-[var(--space-3)]"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
          row.getValue("amount"),
        )}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DataTableRowActions>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>
          Copy payment ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem variant="destructive">Delete payment</DropdownMenuItem>
      </DataTableRowActions>
    ),
  },
]

export function PaymentsTable({ data }: { data: Payment[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      filterColumn="email"
      filterPlaceholder="Filter emails..."
    />
  )
}
```
