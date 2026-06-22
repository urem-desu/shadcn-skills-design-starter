# Breadcrumb — Design System Component

Token-driven hierarchy trail on the shadcn/ui foundation. Compound: `Breadcrumb`,
`BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`,
`BreadcrumbSeparator`, `BreadcrumbEllipsis`. Tokens: none (hybrid — zero
component seams; every value maps to an existing semantic/primitive).

## Token mapping
| Part | Property | → Semantic | → Primitive (light) | Dark |
|---|---|---|---|---|
| `Breadcrumb` (`<nav>`) | `aria-label="breadcrumb"` | — | — | — |
| `BreadcrumbList` | gap | `spacing.scale.2` | 8px | — |
| `BreadcrumbList` | font-size | `typography.fontSize.sm` | 14px | — |
| `BreadcrumbList` | color (trail) | `text.secondary` | `gray.600` | `gray.400` |
| `BreadcrumbItem` | gap (item ↔ separator) | `spacing.scale.1-5` | 6px | — |
| `BreadcrumbLink` | color | `text.secondary` | `gray.600` | `gray.400` |
| `BreadcrumbLink` | color (hover) | `text.primary` | `gray.900` | `gray.50` |
| `BreadcrumbLink` | transition | `transition-micro` (100ms ease-out) | — | — |
| `BreadcrumbLink` | focus ring | `--focus-ring` | 2px blue-500 + 2px page | blue-500 + gray-950 |
| `BreadcrumbPage` | color | `text.primary` | `gray.900` | `gray.50` |
| `BreadcrumbPage` | font-weight | `typography.fontWeight.regular` | 400 | — |
| `BreadcrumbSeparator` (chevron) | size | `sizing.icon.xs` | 12px | — |
| `BreadcrumbSeparator` (chevron) | color | inherits `text.secondary` | `gray.600` | `gray.400` |
| `BreadcrumbEllipsis` | hit-area | `spacing.scale.9` square | 36px × 36px | — |
| `BreadcrumbEllipsis` | icon size | `sizing.icon.sm` | 16px | — |

## API
```ts
// All parts extend their underlying HTML element props.
<Breadcrumb>                               // <nav aria-label="breadcrumb">
  <BreadcrumbList>                         // <ol>
    <BreadcrumbItem>                       // <li>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>  // <a> | Slot via asChild
    </BreadcrumbItem>
    <BreadcrumbSeparator />                // <li role="presentation" aria-hidden>
    <BreadcrumbItem>
      <BreadcrumbEllipsis />               // collapses middle; <span role="presentation" aria-hidden> + sr-only "More"
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Settings</BreadcrumbPage>  // <span aria-current="page">
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```
`BreadcrumbLink` accepts `asChild` (Radix Slot) so consumers can wrap their
router's `<Link>` (Next.js, React Router, TanStack Router) without losing
styling or a11y. `BreadcrumbSeparator` accepts `children` to swap the default
chevron (e.g. `/` text, a custom icon).

## States
- **Trail link** Default: `text.secondary`. Hover: `text.primary`. Focus-visible:
  `--focus-ring`. Active: same as hover (transient).
- **Current page**: `text.primary`, `aria-current="page"`, non-interactive
  (`role="link" aria-disabled="true"`) — visible weight via color, not bold,
  matching shadcn.
- **Separator**: decorative, `aria-hidden`, no interactive state.
- **Ellipsis**: decorative trigger surface (`36×36` hit area), `aria-hidden` on
  the icon + visually hidden "More" label for screen readers. Wrap in a
  `<button>` / `<DropdownMenu>` trigger when used to reveal collapsed crumbs.

## Accessibility (gate-verified, light & dark)
- Outer `<nav aria-label="breadcrumb">` exposes the landmark; the ordered list
  conveys hierarchy order to assistive tech.
- The current page uses `aria-current="page"` (not `aria-disabled` alone) so
  screen readers announce "current page" — the single most important breadcrumb
  affordance.
- Trail links remain real `<a>` elements (not buttons) so they support
  middle-click / context menu / right-click "open in new tab".
- Separators are presentational only; they are not announced.
- Focus ring uses the shared `--focus-ring` (3:1 against the page surface in
  both themes); link color contrast meets AA in both states (default 7.0:1 light
  / 7.3:1 dark; hover 16.1:1 light / 18.5:1 dark).
- `measure_render`: all text AA · `axe_audit`: 0 violations · `verify_responsive`:
  wraps onto multiple rows (no overflow @ 280/320/414).

## Usage
```tsx
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis,
} from "@/design-system/breadcrumb/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Aurora launch</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

{/* Long path - collapse the middle with an ellipsis trigger */}
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Tokens</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```
