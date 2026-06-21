# Checkbox — Design System Component

Thin, token-driven custom control. A real `<input type=checkbox>` sits on top
(transparent, keeps native keyboard + a11y); a drawn `.box` overlay
(`pointer-events:none`) shows the visual; **check + indeterminate dash are two
`<path>` in one `<svg>`** toggled by `:checked` / `:indeterminate` — identical
`stroke-width`, so the two glyphs read at the same weight.

## Token mapping
| Component token | → Semantic | → Primitive (light) | Dark |
|---|---|---|---|
| `--control-box-size` | `spacing.scale.4` | 16px | — |
| `--control-box-border` | `border.strong` | `gray.500` | `gray.500` |
| `--control-box-bg` | `surface.card` | `white` | `gray.900` |
| `--control-checked-bg` | `action.primary` | `blue.600` | `blue.600` |
| `--control-checked-mark` | `text.on-action` | `white` | `white` |
| `--checkbox-radius` | `radius.sm` | 4px | — |
| focus | `shadows.focus-ring` | double ring | — |
| error border | `border.error` | `red.500` | `red.500` |

Glyph: `.62rem`, `stroke-width:2`, round caps. Box border `1.5px`.

## API
```ts
interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>,"type"> {
  indeterminate?: boolean   // set via ref on the native input
}
```
Control-only — pair with `<Label htmlFor>`.

## States (8)
default · hover · focus (`:focus-visible` ring) · active (native press) · **checked** (fill + check) · **indeterminate** (fill + dash) · disabled (opacity .5, not-allowed) · error (`aria-invalid` → error border). Loading N/A.

## Accessibility (gate-verified, light & dark)
- Native checkbox → full keyboard (`Space`) + correct role/state to SR; the overlay is `aria-hidden` and `pointer-events:none` so it never blocks the toggle.
- State is never color-only (a check/dash glyph distinguishes on/indeterminate).
- `measure_render`: 12/12 text AA · `axe_audit`: 0 violations · `verify_states`: pass · `verify_responsive`: no overflow. (Contrast gate correctly skips the input itself as a toggle.)

## Usage
```tsx
<Label><Checkbox /> Accept terms and conditions</Label>
<Checkbox defaultChecked />
<Checkbox indeterminate />
<Checkbox disabled />
<Checkbox aria-invalid aria-describedby="err" />
```
