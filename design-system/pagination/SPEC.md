# Pagination — Design System Component

Composable page navigation. Parts: `Pagination` (nav wrapper), `PaginationContent`
(ul list), `PaginationItem` (li), `PaginationLink` (page number anchor),
`PaginationPrevious` / `PaginationNext` (chevron directional buttons),
`PaginationEllipsis` (…). No Radix primitive. Zero component-scoped seams —
reads `--button-*`, `--interactive-*`, `--text-*`, `--space-*`, `--control-*`,
`--icon-*`, `--radius-*` from the shared token layer.

Figma description: "Pagination with page navigation, next and previous links."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| `PaginationContent` | gap | `space-1` | 4px | — |
| `PaginationLink` (default) | size | `control-sm` (icon mode) | 32px | — |
| `PaginationLink` (default) | height | `control-sm` (size=default) | 32px | — |
| `PaginationLink` (default) | border | `button-outline-border` | `gray.200` | `gray.800` |
| `PaginationLink` (default) | bg | `button-outline-bg` | `white` | `gray.900` |
| `PaginationLink` (default) | color | `text.primary` | `gray.900` | `gray.50` |
| `PaginationLink` (default hover) | bg | `button-outline-bg-hover` | `gray.100` | `gray.800` |
| `PaginationLink` (active) | border | `interactive.selected-border` | `blue.200` | `blue.400` |
| `PaginationLink` (active) | bg | `interactive.selected-bg` | `blue.50` | `gray.800` |
| `PaginationLink` (active) | color | `interactive.selected-text` | `blue.700` | `blue.300` |
| `PaginationLink` | border-radius | `button-radius` | 6px | — |
| `PaginationLink` | font-size | `font-size.sm` | 14px | — |
| `PaginationLink` | font-weight | `font-weight.medium` | 500 | — |
| `PaginationEllipsis` | size | `control-sm` | 32px | — |
| `PaginationEllipsis` | color | `text.secondary` | `gray.600` | `gray.400` |
| Icon (Prev/Next/Ellipsis) | size | `icon-sm` | 16px | — |

## API
```ts
const Pagination            // <nav role="navigation" aria-label="Pagination">
const PaginationContent     // <ul>
const PaginationItem        // <li>

interface PaginationLinkProps extends ComponentProps<"a"> {
  isActive?: boolean        // applies selected bg + border + text
  size?: "default" | "icon" // "icon" = square (default); "default" = auto-width with px
}
const PaginationPrevious    // icon-only link, aria-label="Go to previous page"
const PaginationNext        // icon-only link, aria-label="Go to next page"
const PaginationEllipsis    // span, aria-hidden, shows MoreHorizontal icon
```

## States
- **Resting**: outline border, `button-outline-bg`.
- **Hover**: `button-outline-bg-hover`.
- **Active** (`isActive`): `interactive-selected-*` blue tint.
- **Focus-visible**: `button-focus-ring` double ring.
- **Disabled**: consumer sets `aria-disabled="true"` + `pointer-events:none` via `className`.
- **Dark**: semantic tokens flip at `[data-theme="dark"]`.

## Accessibility
- `<nav role="navigation" aria-label="Pagination">` wraps the control.
- Active link gets `aria-current="page"`.
- `PaginationPrevious` / `PaginationNext` carry `aria-label`.
- `PaginationEllipsis` is `aria-hidden="true"` (decorative).
- Disabled links: pass `aria-disabled="true"` and `tabIndex={-1}` via className/props.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext, PaginationEllipsis,
} from "@/design-system/pagination/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="?page=2" />
    </PaginationItem>
    <PaginationItem><PaginationLink href="?page=1">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="?page=2">2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="?page=3" isActive>3</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationLink href="?page=10">10</PaginationLink></PaginationItem>
    <PaginationItem>
      <PaginationNext href="?page=4" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```
