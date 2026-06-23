# Scroll Area — Design System Component

Cross-browser custom scrollbar overlay. Thin layer over Radix ScrollArea
(overlay scrollbars that appear on hover/scroll, programmatic scroll API,
RTL support). Exports `ScrollArea` (root + viewport + corner) and `ScrollBar`
(vertical or horizontal thumb). One seam: `--scrollbar-size` (thumb track width/
height — 10px, no space token at that value).

Figma description: "Augments native scroll functionality for custom, cross-browser styling."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| `ScrollBar` (vertical) | width | `--scrollbar-size` | 10px | — |
| `ScrollBar` (horizontal) | height | `--scrollbar-size` | 10px | — |
| `ScrollBar` | padding | 1px (bare; track inset) | — | — |
| Thumb | border-radius | `radius-full` | 9999px | — |
| Thumb | background | `border.strong` | `gray.500` | `gray.500` |
| `ScrollAreaViewport` | border-radius | inherits from root | — | — |

## API
```ts
// ScrollArea = Radix Root + Viewport + vertical ScrollBar + Corner auto-wired
interface ScrollAreaProps extends ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {}

// ScrollBar = standalone scrollbar (used for horizontal or extra vertical bars)
interface ScrollBarProps extends ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {
  orientation?: "horizontal" | "vertical"   // default: "vertical"
}
```

## States
- **Idle**: thumb visible only on hover (Radix `type="hover"` default) or always
  (`type="always"`).
- **Scrolling**: thumb opacity 1; Radix handles the visibility transition.
- **Dark**: thumb uses `border-strong` which stays `gray.500` in both modes.

## Accessibility
- Radix wraps a native scrollable viewport; keyboard scrolling (Arrow keys, Page Up/Down,
  Home/End) works natively inside the viewport.
- The custom scrollbar is decorative — the native scroll behavior remains.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import { ScrollArea } from "@/design-system/scroll-area/scroll-area"

// Fixed-height scrollable list
<ScrollArea className="h-64 w-full rounded-[var(--radius-md)] border border-[var(--border-default)]">
  <div className="p-[var(--space-4)]">
    {items.map((item) => (
      <div key={item.id} className="py-[var(--space-2)] border-b border-[var(--border-default)] last:border-0">
        {item.name}
      </div>
    ))}
  </div>
</ScrollArea>

// Horizontal scroll
import { ScrollArea, ScrollBar } from "@/design-system/scroll-area/scroll-area"

<ScrollArea className="w-96 whitespace-nowrap">
  <div className="flex gap-[var(--space-4)] p-[var(--space-4)]">
    {tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```
