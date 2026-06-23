import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Table — semantic HTML table with token-driven row dividers, header tint,
 * and cell padding. Zero seams: all values map to existing semantic/primitive
 * tokens. Responsive: wraps in a horizontally-scrollable container.
 */

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom text-[length:var(--font-size-sm)]",
        className
      )}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("[&_tr]:border-b [&_tr]:border-[var(--border-default)]", className)}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-[var(--border-default)] bg-[var(--surface-sunken)]",
      "font-[var(--font-weight-medium)] [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-[var(--border-default)]",
      "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
      "hover:bg-[var(--surface-sunken)]",
      "data-[state=selected]:bg-[var(--interactive-selected-bg)]",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-[var(--control-md)] px-[var(--space-4)] text-left align-middle",
      "text-[length:var(--font-size-sm)] font-[var(--font-weight-medium)] text-[var(--text-secondary)]",
      "[&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-[var(--space-4)] py-[var(--space-3)] align-middle",
      "text-[length:var(--font-size-sm)] text-[var(--text-primary)]",
      "[&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-[var(--space-4)] text-[length:var(--font-size-sm)] text-[var(--text-secondary)]",
      className
    )}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
}
