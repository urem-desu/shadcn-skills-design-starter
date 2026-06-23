# Item — Design System Component

Versatile list row: optional leading icon slot, text block (required title +
optional description), optional trailing slot (badge, count, action, meta).
Supports interactive mode (hover/focus/active + button role) or static mode
(display only). Zero component-scoped seams — reads `--text-*`, `--space-*`,
`--action-*`, `--icon-*`, `--font-*`, `--radius-*` from the shared tier.

Figma description: "A versatile component that you can use to display any content."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| Root | padding-inline | `space-4` | 16px | — |
| Root | padding-block | `space-3` | 12px | — |
| Root | gap (icon ↔ body ↔ trailing) | `space-3` | 12px | — |
| Root (interactive hover) | bg | `action.secondary` | `gray.100` | `gray.800` |
| Root (interactive active) | bg | `action.secondary.active` | `gray.300` | `gray.500` |
| Root (interactive focus) | shadow | `focus-ring` | double ring | — |
| Icon wrapper | size | `icon-md` | 20px | — |
| Icon wrapper | color | `text.secondary` | `gray.600` | `gray.400` |
| Title | font-size | `font-size.sm` | 14px | — |
| Title | font-weight | `font-weight.medium` | 500 | — |
| Title | color | `text.primary` | `gray.900` | `gray.50` |
| Title | line-height | `line-tight` | 1.25 | — |
| Description | font-size | `font-size.xs` | 12px | — |
| Description | color | `text.secondary` | `gray.600` | `gray.400` |
| Description | line-height | `line-normal` | 1.5 | — |
| Trailing slot | color | `text.secondary` | `gray.600` | `gray.400` |

## API
```ts
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode        // leading icon (lucide SVG) — aria-hidden applied
  title: string                 // primary text — required
  description?: string          // secondary detail
  trailing?: React.ReactNode    // trailing slot: Badge, count, icon, action button
  interactive?: boolean         // adds hover/focus/active styles + role="button" + tabIndex
}
```

## States
- **Static (default)**: display-only; no hover/focus styles; no role.
- **Interactive**: hover `action.secondary`, active `action.secondary.active`,
  focus-visible `focus-ring`; `role="button"` + `tabIndex={0}`.
- **Dark**: semantic tokens flip at `[data-theme="dark"]`.

## Accessibility
- Static items carry no implicit role — wrap in `<ul><li>` if used in a list context.
- Interactive items use `role="button"` + `tabIndex={0}`; keyboard activation (Enter/Space)
  must be handled by the consumer via `onClick` or `onKeyDown`.
- Icon is `aria-hidden="true"` — the title provides the accessible label.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import { Item } from "@/design-system/item/item"
import { Inbox, ChevronRight } from "lucide-react"
import { Badge } from "@/design-system/badge/badge"

// Static list item
<ul>
  <li><Item icon={<Inbox />} title="Messages" description="3 unread" /></li>
</ul>

// Interactive with trailing badge
<Item
  icon={<Inbox />}
  title="Notifications"
  description="New alerts"
  trailing={<Badge>4</Badge>}
  interactive
  onClick={() => navigate("/notifications")}
/>

// Trailing chevron (navigation row)
<Item
  title="Account settings"
  description="Manage your profile and preferences"
  trailing={<ChevronRight className="size-[var(--icon-sm)]" />}
  interactive
/>
```
