# Badge — Design System Component

Token-driven status/label chip on the shadcn/ui foundation. Non-interactive
`<span>` by default; render as a link/button via `asChild`. Tokens: `--badge-*`
in `design-system/theme.css` (each variant carries a dark-mode value).

## Token mapping (Component → Primitive light / dark)

| Variant | bg (light → dark) | text (light → dark) |
|---|---|---|
| neutral | `gray.100` → `gray.800` | `gray.700` → `gray.100` |
| primary | `blue.100` → `blue.800` | `blue.700` → `blue.100` |
| success | `green.100` → `green.800` | `green.800` → `green.100` |
| warning | `amber.100` → `amber.800` | `amber.800` → `amber.100` |
| error | `red.100` → `red.800` | `red.700` → `red.100` |
| outline | transparent + `border.strong` | `text.primary` |

Geometry: `--badge-radius` = `radius.full`; padding `space.0.5 × space.2`; text `font-size.xs` (12px); weight 500; icon `icon.xs`.

> Note: success/warning text use the **-800** step (not the kit's -700) so 12px text clears AA on the -100 chip — verified by gate.

## API

```ts
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "primary" | "success" | "warning" | "error" | "outline"  // default "neutral"
  asChild?: boolean
}
```

## States
Static chip — no interactive states. When `asChild` wraps a link/button, the child element carries hover/focus. Status is never color-only: pair with an icon or text (e.g. a check + "Verified").

## Accessibility (gate-verified, light & dark)
- Color is decorative; meaning comes from the label text (and optional icon).
- `measure_render`: 12/12 text AA · `axe_audit`: 0 violations · `verify_responsive`: no overflow.

## Usage
```tsx
<Badge>Neutral</Badge>
<Badge variant="success"><Check /> Verified</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="outline">v1.2.0</Badge>
<Badge asChild variant="primary"><a href="/tag/new">new</a></Badge>
```
