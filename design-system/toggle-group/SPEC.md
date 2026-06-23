# Toggle Group — Design System Component

Radix-based set of Toggle buttons arranged as a joined strip. Re-uses
`toggleVariants` from Toggle to keep consistent sizing and color semantics.
Zero seams: the shared `border-default` border and flush-radius layout
are handled by tokens + utility classes.

Figma description: "A set of two-state buttons that can be toggled on or off."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| Group container | border | `border.default` (1px) | `gray.200` | `gray.700` |
| Group container | border-radius | `radius-md` | 6px | — |
| Group container | overflow | hidden (for radius clipping) | — | — |
| Item divider | border-right | `border.default` (1px) | `gray.200` | `gray.700` |
| Item (off, rest) | color | `text.secondary` via Toggle | `gray.500` | `gray.400` |
| Item (off, hover) | background | `action.secondary` via Toggle | `gray.100` | `gray.800` |
| Item (on) | background | `interactive.selected-bg` via Toggle | `blue.50` | `blue.950` |
| Item (on) | color | `interactive.selected-text` via Toggle | `blue.700` | `blue.300` |
| Item | focus ring | `shadow.focus-ring` via Toggle | double ring | — |

## API
```ts
// ToggleGroup = Radix Root (single or multiple selection type)
interface ToggleGroupProps
  extends ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  type: "single" | "multiple"
  value?: string | string[]             // controlled
  defaultValue?: string | string[]      // uncontrolled
  onValueChange?: (value: ...) => void
  variant?: "default" | "outline"
  size?: "sm" | "md" | "lg"
}

// ToggleGroupItem = Radix Item
interface ToggleGroupItemProps
  extends ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
    VariantProps<typeof toggleVariants> {
  value: string   // required — identifies this item
}
```

## States
| State | Visual |
|---|---|
| Item off (rest) | transparent bg, `text-secondary` |
| Item off (hover) | `action-secondary` bg, `text-primary` |
| Item on | `interactive-selected-bg`, `interactive-selected-text` |
| Item focus | `shadow.focus-ring` |
| Item disabled | `opacity: 0.5`, no pointer events |

## Accessibility
- Radix ToggleGroup renders `role="group"` with `aria-label` on the container.
- Each item is `role="button"` + `aria-pressed`.
- Keyboard: Tab moves into the group; Arrow keys move between items.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import { ToggleGroup, ToggleGroupItem } from "@/design-system/toggle-group/toggle-group"
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react"

// Text alignment (single selection)
<ToggleGroup type="single" aria-label="Text alignment">
  <ToggleGroupItem value="left" aria-label="Left">
    <AlignLeft className="size-[var(--icon-sm)]" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Center">
    <AlignCenter className="size-[var(--icon-sm)]" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Right">
    <AlignRight className="size-[var(--icon-sm)]" />
  </ToggleGroupItem>
</ToggleGroup>

// Text style (multiple selection)
<ToggleGroup type="multiple" aria-label="Text formatting">
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
  <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
</ToggleGroup>
```
