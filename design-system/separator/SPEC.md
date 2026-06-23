# Separator — Design System Component

Thin horizontal or vertical rule. Thin layer over Radix Separator — handles
`role="separator"` vs `role="none"` (when `decorative`), `aria-orientation`.
No seams: the 1px line and `border-default` color both resolve from existing
scale/semantic tokens.

Figma description: "Visually or semantically separates content."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| Horizontal rule | height | 1px (pixel value from border spec — no scale token) | 1px | — |
| Horizontal rule | width | 100% (full container) | — | — |
| Vertical rule | width | 1px | 1px | — |
| Vertical rule | height | 100% (full parent height) | — | — |
| Line | background | `border.default` | `gray.200` | `gray.700` |

## API
```ts
// Separator extends Radix SeparatorPrimitive.Root
interface SeparatorProps extends ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  orientation?: "horizontal" | "vertical"   // default: "horizontal"
  decorative?: boolean                       // default: true
  // + className
}
```

`decorative={true}` (default) → Radix renders `role="none"` (screen readers ignore it).
`decorative={false}` → Radix renders `role="separator"` + `aria-orientation`.

## States
- **Horizontal**: `h-px w-full` — sits between stacked elements.
- **Vertical**: `h-full w-px` — sits between inline elements (flex row).
- **Dark**: `border-default` flips to dark gray automatically.

## Accessibility
- When `decorative` (default), screen readers skip the element entirely.
- When semantic (`decorative={false}`), Radix announces `"separator"` with the
  correct orientation to assistive technology.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import { Separator } from "@/design-system/separator/separator"

// Horizontal (between sections)
<div className="flex flex-col gap-[var(--space-4)]">
  <p>Section one content</p>
  <Separator />
  <p>Section two content</p>
</div>

// Vertical (inline between items)
<div className="flex items-center gap-[var(--space-4)] h-5">
  <span>Home</span>
  <Separator orientation="vertical" />
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>API</span>
</div>

// Semantic (accessible landmark)
<Separator decorative={false} aria-label="End of navigation" />
```
