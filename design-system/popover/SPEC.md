# Popover — Design System Component

Token-driven floating rich-content panel triggered by a button click. Compound:
`Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor`. Thin layer over
`@radix-ui/react-popover` (portal, focus trap, Escape-to-close, outside-click-
to-close, collision avoidance). One seam: `--popover-w` (bare px, no scale match).

Figma description: "Displays rich content in a portal, triggered by a button."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| `PopoverContent` | width | `--popover-w` | 320px | — |
| `PopoverContent` | padding | `space-4` | 16px | — |
| `PopoverContent` | border-radius | `radius-lg` | 8px | — |
| `PopoverContent` | border | `border.default` | `gray.200` | `gray.800` |
| `PopoverContent` | background | `surface.card` | `white` | `gray.900` |
| `PopoverContent` | shadow | `shadow.lg` | multi-stop | — |
| `PopoverContent` | color | `text.primary` | `gray.900` | `gray.50` |
| `PopoverContent` | z-index | 50 (bare; no token) | — | — |
| `PopoverContent` | side-offset | 4px (bare; same as HoverCard/Tooltip) | — | — |

## API
```ts
// Popover = Radix Root (open, onOpenChange, defaultOpen, modal)
// PopoverTrigger = Radix Trigger (asChild-able)
// PopoverContent = Radix Content; all Radix positioning props forwarded
interface PopoverContentProps extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  align?: "start" | "center" | "end"   // default: "center"
  sideOffset?: number                   // default: 4
  // + side, avoidCollisions, collisionPadding, sticky, etc.
}
// PopoverAnchor = Radix Anchor (optional custom positioning anchor)
```

## States
- **Closed (default)**: trigger rendered; content not mounted.
- **Open**: content rendered in a portal at `z-50`, collision-aware.
- **Dark**: semantic tokens flip at `[data-theme="dark"]`.

## vs HoverCard
- Popover = click-to-open, focus-trapped interactive content, modal-like behavior.
- HoverCard = hover-to-open, non-trapping supplemental preview, no modal behavior.

## Accessibility
- `PopoverContent` receives `role="dialog"` with `aria-modal="true"` via Radix.
- Focus moves into the content on open; Escape closes and returns focus to trigger.
- Tab is trapped within the content (use for interactive popovers with forms/buttons).
- Trigger automatically gets `aria-haspopup="dialog"` + `aria-expanded`.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@/design-system/popover/popover"
import { Button } from "@/design-system/button/button"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="flex flex-col gap-[var(--space-3)]">
      <p className="text-[length:var(--font-size-sm)] font-[var(--font-weight-semibold)]">
        Settings
      </p>
      <p className="text-[length:var(--font-size-sm)] text-[var(--text-secondary)]">
        Adjust your preferences here.
      </p>
    </div>
  </PopoverContent>
</Popover>
```
