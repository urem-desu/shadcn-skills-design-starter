"use client"

import * as React from "react"
import { ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Payment = {
  id: string
  status: "success" | "pending" | "failed"
  email: string
  amount: number
}

const data: Payment[] = [
  { id: "INV-001", status: "success", email: "ada@example.com", amount: 316 },
  { id: "INV-002", status: "pending", email: "grace@example.com", amount: 242 },
  { id: "INV-003", status: "failed", email: "alan@example.com", amount: 837 },
  { id: "INV-004", status: "success", email: "linus@example.com", amount: 125 },
]

const statusVariant: Record<Payment["status"], "secondary" | "outline" | "destructive"> = {
  success: "secondary",
  pending: "outline",
  failed: "destructive",
}

export function DataTableDemo() {
  const [sortDesc, setSortDesc] = React.useState(true)
  const [selected, setSelected] = React.useState<Record<string, boolean>>({})

  const rows = React.useMemo(
    () => [...data].sort((a, b) => (sortDesc ? b.amount - a.amount : a.amount - b.amount)),
    [sortDesc]
  )

  const allSelected = rows.every((r) => selected[r.id])
  const someSelected = rows.some((r) => selected[r.id])
  const selectedCount = Object.values(selected).filter(Boolean).length

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={allSelected ? true : someSelected ? "indeterminate" : false}
                  onCheckedChange={(v) =>
                    setSelected(v ? Object.fromEntries(rows.map((r) => [r.id, true])) : {})
                  }
                  aria-label="Select all rows"
                />
              </TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto flex"
                  onClick={() => setSortDesc((s) => !s)}
                >
                  Amount
                  <ArrowUpDown />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} data-state={selected[row.id] ? "selected" : undefined}>
                <TableCell>
                  <Checkbox
                    checked={!!selected[row.id]}
                    onCheckedChange={(v) => setSelected((s) => ({ ...s, [row.id]: !!v }))}
                    aria-label={`Select ${row.id}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{row.email}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {row.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {selectedCount} of {rows.length} row(s) selected.
      </p>
    </div>
  )
}
