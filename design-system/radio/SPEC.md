# Radio — Design System Component

Thin, token-driven custom control (same pattern as Checkbox): real
`<input type=radio>` on top, drawn circular `.box` overlay, filled dot on
`:checked`. Group by shared `name`; wrap a set in `<fieldset><legend>`.

## Token mapping
Shares the `--control-*` tokens with Checkbox; differs only in shape:
| Token | Value |
|---|---|
| `--radio-radius` | `radius.full` (circle) |
| box border | `--control-box-border` (`border.strong`) |
| checked border + dot | `--control-checked-bg` (`action.primary` → blue.600) |
| dot size | `.5rem` |
| box size | `--control-box-size` (16px) |
| focus | `--focus-ring` |

## API
```ts
type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">
```
Control-only — pair with `<Label>`; group with the same `name`.

## States
default · hover · focus (`:focus-visible` ring) · **selected** (primary border + dot) · disabled (opacity .5). No indeterminate/loading/error-per-item (validate at the group level).

## Accessibility (gate-verified, light & dark)
- Native radios → arrow-key roving within a `name` group automatically; `<fieldset>`/`<legend>` names the group.
- Selection shown by a dot, not color alone.
- `measure_render`: 10/10 text AA · `axe_audit`: 0 violations · `verify_states`: pass · `verify_responsive`: no overflow.

## Usage
```tsx
<fieldset>
  <legend>Notify me about…</legend>
  <Label><Radio name="n" defaultChecked /> All new messages</Label>
  <Label><Radio name="n" /> Direct messages and mentions</Label>
  <Label><Radio name="n" /> Nothing</Label>
</fieldset>
```
