# Empty — Design System Component

Token-driven empty-state layout. Slots: optional icon (lucide SVG), required
title string, optional description string, optional action children (Button, etc.).
No Radix primitive — pure HTML composition. Zero component-scoped seams; every
value reads from the shared semantic/primitive tier.

Figma description: "Use the Empty component to display a empty state."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| Root | padding-block | `space-9` | 36px | — |
| Root | padding-inline | `space-6` | 24px | — |
| Root | gap (between slots) | `space-4` | 16px | — |
| Icon wrapper | size | `icon-lg` | 24px | — |
| Icon wrapper | color | `text.tertiary` | `gray.400` | `gray.500` |
| Title | font-size | `font-size.base` | 16px | — |
| Title | font-weight | `font-weight.semibold` | 600 | — |
| Title | color | `text.primary` | `gray.900` | `gray.50` |
| Title | line-height | `line-tight` | 1.25 | — |
| Description | font-size | `font-size.sm` | 14px | — |
| Description | color | `text.secondary` | `gray.600` | `gray.400` |
| Description | line-height | `line-normal` | 1.5 | — |
| Description | max-width | 280px (bare px; smallest value in scale is space-9=36px — no match) | 280px | — |
| Actions gap | gap | `space-2` | 8px | — |

> The 280px description cap is an unavoidable bare pixel (no spacing-scale token resolves
> to it). Per the hybrid convention a `ds-allow-hardcode` comment is added at the call site.

## API
```ts
interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode       // lucide SVG or any inline SVG; aria-hidden applied by wrapper
  title: string                // primary heading — required, visible
  description?: string         // secondary detail text
  // children = action slot (Button / link) — optional
}
```

## States
- **Default (no content)**: icon + title + description + action visible.
- **Title only**: icon and description may be omitted; action slot hidden when no children.
- **With icon**: wrapper applies `text-tertiary`; icon inherits `currentColor` via `[&_svg]`.
- **With action**: children rendered in a flex row with `gap-2`.
- **Dark**: semantic tokens flip at `[data-theme="dark"]` — no extra overrides needed.

## Accessibility
- Icon wrapper carries `aria-hidden="true"` — decorative; title is the AT-readable label.
- `title` is a `<p>` (not `<h*>`) — consumers should wrap `Empty` in the appropriate heading
  hierarchy or pass a heading element via children if the empty state anchors a section.
- No role override needed; the container is a generic `<div>`.
- Color contrast: `text.primary` 15:1 (light) / 18:1 (dark); `text.secondary` 5.7:1 / 7.3:1;
  `text.tertiary` 2.9:1 (decorative icon — no AA requirement).
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import { Empty } from "@/design-system/empty/empty"
import { Inbox } from "lucide-react"
import { Button } from "@/design-system/button/button"

// Minimal
<Empty title="No results found" />

// Full
<Empty
  icon={<Inbox />}
  title="No messages yet"
  description="When you receive a message, it will appear here."
>
  <Button size="sm">Compose</Button>
</Empty>

// Inside a card / panel
<div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)]">
  <Empty
    icon={<Inbox />}
    title="No messages"
    description="Start a conversation to see messages here."
  >
    <Button variant="outline" size="sm">New message</Button>
  </Empty>
</div>
```
