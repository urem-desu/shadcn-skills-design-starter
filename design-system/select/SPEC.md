# Select — Design System Component

Token-driven native `<select>` styled as a field — shares the `--field-*` tokens
with Input/Textarea. Native gives full keyboard + native mobile pickers; a custom
chevron overlays the control (`pointer-events:none`). For a fully-styled listbox,
compose Radix Select on the same tokens.

## Token mapping
Identical to Input's field tokens: `--field-bg / -bg-disabled / -border / -border-hover / -border-focus / -border-error / -text / -radius / -focus-ring`. Chevron uses `text.secondary`, `icon.sm`; right padding = `icon.sm + space.3×2`.

## API
```ts
interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>,"size"> {
  error?: boolean
}
```

## States
default · hover (`--field-border-hover`) · focus (`--field-border-focus` + ring) · disabled (opacity .5, `--field-bg-disabled`) · error (`aria-invalid` → `--field-border-error` + message). Supports `<optgroup>`/`<option disabled>`.

## Accessibility (gate-verified, light & dark)
- Pair with `<Label htmlFor>`; error message via `aria-describedby` + `aria-invalid`.
- Native keyboard (type-ahead, arrows, Enter) and platform pickers for free.
- `measure_render`: 9/9 text AA · `axe_audit`: 0 · `verify_states`: pass · `verify_responsive`: no overflow.

## Usage
```tsx
<Label htmlFor="fruit">Fruit</Label>
<Select id="fruit" defaultValue="">
  <option value="" disabled>Select a fruit</option>
  <option>Apple</option><option>Banana</option>
</Select>
<Select error aria-describedby="err"><option>…</option></Select>
```
