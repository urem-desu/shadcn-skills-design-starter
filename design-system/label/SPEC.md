# Label — Design System Component

Token-driven form label on the shadcn/ui foundation. Tokens: `--label-*`.

## Token mapping
| Component token | → Semantic | → Primitive (light) | Dark |
|---|---|---|---|
| `--label-text` | `text.primary` | `gray.900` | `gray.50` |
| `--label-weight` | `typography.fontWeight.medium` | 500 | — |
| `--label-size` | `typography.fontSize.sm` | 14px | — |
| line-height | `typography.lineHeight.tight` | 1.25 | — |
| gap (inline w/ control) | `spacing.scale.2` | 8px | — |

## API
Extends `React.LabelHTMLAttributes<HTMLLabelElement>` — use `htmlFor` to bind, or wrap the control.

## States
- Default: `--label-text`.
- Disabled (peer): `peer-disabled:opacity-70` + `cursor-not-allowed` when the associated control (sibling with `peer`) is disabled.

## Accessibility (gate-verified, light & dark)
- Programmatic association via `htmlFor`/`id` (or wrapping) is mandatory — clicking the label focuses/toggles the control, enlarging the target.
- `measure_render`: 6/6 text AA · `axe_audit`: 0 violations (all controls labelled) · `verify_responsive`: no overflow.

## Usage
```tsx
<Label htmlFor="email">Email address</Label>
<Input id="email" type="email" />

{/* wrapping inline control */}
<Label><Checkbox className="peer" /> Accept terms and conditions</Label>
```
