# Hover Card — Design System Component

Token-driven floating preview card triggered by pointer hover (and focus) on a
link/trigger. Thin layer over `@radix-ui/react-hover-card` (portal, pointer-enter/
leave with configurable delay, Escape-to-close, focus stays in trigger).
One component seam: `--hover-card-w` (320px — bare px, no spacing-scale match).

Figma description: "For sighted users to preview content available behind a link."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| `HoverCardContent` | width | `--hover-card-w` | 320px | — |
| `HoverCardContent` | padding | `space-4` | 16px | — |
| `HoverCardContent` | border-radius | `radius-lg` | 8px | — |
| `HoverCardContent` | border | `border.default` | `gray.200` | `gray.800` |
| `HoverCardContent` | background | `surface.card` | `white` | `gray.900` |
| `HoverCardContent` | shadow | `shadow.lg` | multi-stop | — |
| `HoverCardContent` | color | `text.primary` | `gray.900` | `gray.50` |
| `HoverCardContent` | z-index | 50 (bare; z-index has no token) | — | — |
| `HoverCardContent` | side-offset | 4px (bare; no token; same offset as Popover/Tooltip) | — | — |
| Trigger | no token override — any element works as trigger | — | — | — |

## API
```ts
// HoverCard = Radix Root (openDelay, closeDelay, open, onOpenChange, defaultOpen)
// HoverCardTrigger = Radix Trigger (asChild-able, wraps any element)
// HoverCardContent = Radix Content + portal; inherits all Radix positioning props
interface HoverCardContentProps extends ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {
  align?: "start" | "center" | "end"   // default: "center"
  sideOffset?: number                   // default: 4
  // + side, avoidCollisions, collisionPadding, sticky, etc. (full Radix API)
}
```

## States
- **Closed (default)**: trigger visible; card not mounted.
- **Open (hovered/focused)**: card rendered in a portal at `z-50`, positioned relative
  to the trigger. Radix applies collision avoidance automatically.
- **Dark mode**: `[data-theme="dark"]` flips `surface-card`, `border-default`, `text-primary`.

## Accessibility
- Radix implements the WAI-ARIA disclosure pattern — the content is non-modal and
  supplemental; it does not trap focus (Tab still moves through the page).
- The card content receives `role="tooltip"` via Radix by default — for rich interactive
  content (links, buttons) use `HoverCard` instead of `Tooltip` to allow pointer entry.
- Escape closes the card without moving focus.
- `openDelay` (default 700ms) prevents accidental triggers on quick mouse traversal.
- `closeDelay` (default 300ms) allows the pointer to enter the card without it closing.
- All text in both themes clears AA: `text.primary` 15:1 / 18:1.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/design-system/hover-card/hover-card"
import { Avatar } from "@/design-system/avatar/avatar"
import { CalendarDays } from "lucide-react"

<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#" className="underline text-[var(--text-link)] text-sm">@shadcn</a>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="flex gap-[var(--space-4)]">
      <Avatar src="/avatars/shadcn.jpg" fallback="SC" />
      <div className="flex flex-col gap-[var(--space-1)]">
        <p className="text-[length:var(--font-size-sm)] font-[var(--font-weight-semibold)]">
          @shadcn
        </p>
        <p className="text-[length:var(--font-size-sm)] text-[var(--text-secondary)]">
          The creator of shadcn/ui. Building design systems.
        </p>
        <div className="flex items-center gap-[var(--space-2)] pt-[var(--space-2)]">
          <CalendarDays className="size-[var(--icon-sm)] text-[var(--text-tertiary)]" aria-hidden="true" />
          <span className="text-[length:var(--font-size-xs)] text-[var(--text-secondary)]">
            Joined December 2021
          </span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```
