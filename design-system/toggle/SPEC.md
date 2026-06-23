# Toggle — Design System Component

Radix-based pressable on/off button with `aria-pressed` state management.
Uses `cva` for variant + size composition. Zero seams: reads
`interactive-selected-*`, `action-secondary`, `border-default`, `control-*`,
and `text-*` from existing tokens.

Figma description: "A two-state button that can be either on or off."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| Root (rest) | color | `text.secondary` | `gray.500` | `gray.400` |
| Root (hover) | background | `action.secondary` | `gray.100` | `gray.800` |
| Root (hover) | color | `text.primary` | `gray.900` | `gray.50` |
| Root (on) | background | `interactive.selected-bg` | `blue.50` | `blue.950` |
| Root (on) | color | `interactive.selected-text` | `blue.700` | `blue.300` |
| Root | border-radius | `radius-md` | 6px | — |
| Root | font-size | `font-size-sm` | 14px | — |
| Root | font-weight | `font-weight-medium` | 500 | — |
| Root | focus ring | `shadow.focus-ring` | double ring | — |
| **sm** | height | `control-sm` | 32px | — |
| **sm** | padding-inline | `space-2` | 8px | — |
| **sm** | font-size | `font-size-xs` | 12px | — |
| **md** | height | `control-md` | 40px | — |
| **md** | padding-inline | `space-3` | 12px | — |
| **lg** | height | `control-lg` | 48px | — |
| **lg** | padding-inline | `space-4` | 16px | — |
| **lg** | font-size | `font-size-base` | 16px | — |
| Outline variant | border | `border.default` (1px) | `gray.200` | `gray.700` |

## API
```ts
interface ToggleProps
  extends ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  variant?: "default" | "outline"   // default: "default"
  size?: "sm" | "md" | "lg"         // default: "md"
  pressed?: boolean                  // controlled
  defaultPressed?: boolean           // uncontrolled
  onPressedChange?: (pressed: boolean) => void
  disabled?: boolean
}
```

## States
| State | Visual |
|---|---|
| Default (off) | transparent bg, `text-secondary` |
| Hover (off) | `action-secondary` bg, `text-primary` |
| Pressed / on (`data-[state=on]`) | `interactive-selected-bg`, `interactive-selected-text` |
| Focus | `shadow.focus-ring` |
| Disabled | `opacity: 0.5`, no pointer events |

## Accessibility
- Radix Toggle renders `role="button"` + `aria-pressed="true"` / `"false"`.
- Keyboard: `Enter` / `Space` toggles state.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import { Toggle } from "@/design-system/toggle/toggle"
import { Bold } from "lucide-react"

// Icon-only toggle
<Toggle aria-label="Toggle bold">
  <Bold className="size-[var(--icon-sm)]" />
</Toggle>

// With text
<Toggle variant="outline" size="sm">
  Subscribe
</Toggle>

// Controlled
const [pressed, setPressed] = React.useState(false)
<Toggle pressed={pressed} onPressedChange={setPressed}>
  {pressed ? "On" : "Off"}
</Toggle>
```
