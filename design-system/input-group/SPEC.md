# Input Group — Design System Component

Adorned input: a border wrapper containing prefix and/or suffix `InputAddon`
blocks flanking an `InputGroupField`. Addons carry the `surface-sunken` tint
and a `border-default` divider; the outer wrapper hosts the border and focus ring
so the inner `<input>` renders borderless. Supports text labels, icons, and
button addons (pass a `<button>` as children to `InputAddon`).
No Radix primitive. Zero component-scoped seams — reads `--field-*`, `--space-*`,
`--surface-*`, `--text-*` tokens throughout.

Figma description: "Display additional information or actions to an input or textarea."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| `InputGroup` (wrapper) | height | `control-md` | 40px | — |
| `InputGroup` | border-radius | `field-radius` | 6px | — |
| `InputGroup` | border (resting) | `field-border` | `gray.200` | `gray.800` |
| `InputGroup` | border (focus-within) | `field-border-focus` | `blue.500` | — |
| `InputGroup` | shadow (focus-within) | `field-focus-ring` | double-ring | — |
| `InputGroup` | bg | `field-bg` | `white` | `gray.900` |
| `InputAddon` | padding-inline | `space-3` | 12px | — |
| `InputAddon` | bg | `surface-sunken` | `gray.50` | `black` |
| `InputAddon` | border-inline | `field-border` | `gray.200` | `gray.800` |
| `InputAddon` | color | `text.secondary` | `gray.600` | `gray.400` |
| `InputAddon` | font-size | `font-size.sm` | 14px | — |
| `InputAddon` icon | size | `icon-sm` | 16px | — |
| `InputGroupField` | padding-inline | `space-3` | 12px | — |
| `InputGroupField` | font-size | `font-size.sm` | 14px | — |
| `InputGroupField` | color | `field-text` / `field-placeholder` | `gray.900` / `gray.400` | — |

## API
```ts
// Compose these three primitives:
const InputGroup       // outer wrapper (div) — hosts border + focus ring
const InputAddon       // prefix or suffix block (div) — icon/text/button
const InputGroupField  // the <input> inside the group (forwards all input attributes)

// Layout rules:
// - Prefix addon: first child → gets border-r
// - Suffix addon: last child  → gets border-l (via CSS last: selector)
// - Field: middle child, flex-1, no border
// - Multiple addons on one side: nest inside one InputAddon
```

## States
- **Resting**: `field-border` outline around the whole group.
- **Focus** (`focus-within`): `field-border-focus` + `field-focus-ring` double ring.
- **Disabled**: wrapper opacity 0.5; cursor not-allowed (`has-[input:disabled]`).
- **Error**: consumer adds `border-[var(--field-border-error)]` to `InputGroup` and
  `shadow-[var(--field-focus-ring-error)]` on focus — same pattern as `Input`.
- **Dark**: semantic tokens flip; `surface-sunken` goes to `black`.

## Accessibility
- The `InputAddon` is `aria-hidden` when it contains only a decorative icon; set
  `aria-label` on the input instead (e.g. `aria-label="Search"`).
- When the addon is a `<button>`, it participates in tab order naturally; no extra
  role needed.
- Label association: wrap with `Field` (`<label htmlFor={id}>`) or set `aria-label`
  directly on `InputGroupField`.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import { InputGroup, InputAddon, InputGroupField } from "@/design-system/input-group/input-group"
import { Search, DollarSign, Globe } from "lucide-react"

// Prefix icon
<InputGroup>
  <InputAddon aria-hidden="true"><Search /></InputAddon>
  <InputGroupField type="search" placeholder="Search…" aria-label="Search" />
</InputGroup>

// Prefix text
<InputGroup>
  <InputAddon>https://</InputAddon>
  <InputGroupField type="url" placeholder="example.com" aria-label="Website URL" />
</InputGroup>

// Prefix icon + suffix text
<InputGroup>
  <InputAddon aria-hidden="true"><DollarSign /></InputAddon>
  <InputGroupField type="number" placeholder="0.00" aria-label="Amount in USD" />
  <InputAddon>USD</InputAddon>
</InputGroup>

// Wrapped in Field for label + hint
<Field label="Website" htmlFor="site-url" hint="Include the full URL.">
  <InputGroup>
    <InputAddon aria-hidden="true"><Globe /></InputAddon>
    <InputGroupField id="site-url" type="url" placeholder="https://example.com" />
  </InputGroup>
</Field>
```
