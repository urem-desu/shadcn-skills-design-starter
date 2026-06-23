# Native Select — Design System Component

Styled native `<select>` element. `appearance-none` removes the OS chrome;
a `ChevronDown` icon is layered as a non-interactive overlay (`pointer-events:none`)
so the native dropdown still activates on the full control. No Radix primitive.
Zero component-scoped seams — reads `--field-*`, `--space-*`, `--control-*`,
`--text-*`, `--icon-*`, `--radius-*` from the shared token layer.

Figma description: "A styled native HTML select element with consistent design system integration."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| `<select>` | height | `control-md` | 40px | — |
| `<select>` | border-radius | `field-radius` | 6px | — |
| `<select>` | border (resting) | `field-border` | `gray.200` | `gray.800` |
| `<select>` | border (hover) | `field-border-hover` | `gray.500` | — |
| `<select>` | border (focus) | `field-border-focus` | `blue.500` | — |
| `<select>` | shadow (focus) | `field-focus-ring` | double ring | — |
| `<select>` | background | `field-bg` | `white` | `gray.900` |
| `<select>` (disabled) | background | `field-bg-disabled` | `gray.100` | `gray.800` |
| `<select>` | padding-inline-start | `space-3` | 12px | — |
| `<select>` | padding-inline-end | `space-9` | 36px (room for chevron) | — |
| `<select>` | font-size | `font-size.sm` | 14px | — |
| `<select>` | color | `field-text` | `gray.900` | `gray.50` |
| Chevron icon | size | `icon-sm` | 16px | — |
| Chevron icon | color | `text.secondary` | `gray.600` | `gray.400` |
| Chevron icon | right offset | `space-3` | 12px | — |

## API
```ts
// NativeSelect extends all native <select> attributes
const NativeSelect = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>
// children = <option> / <optgroup> elements
```

## States
- **Resting**: `field-border` outline.
- **Hover**: `field-border-hover`.
- **Focus**: `field-border-focus` + `field-focus-ring`.
- **Disabled**: `field-bg-disabled` + opacity 0.5 + `cursor-not-allowed`.
- **Dark**: semantic tokens flip at `[data-theme="dark"]`.

## When to use Native Select vs Select (Radix)
- **NativeSelect**: when mobile usability is paramount (native pickers on iOS/Android),
  when the option list is long and doesn't need search, or when submitting a form
  without JS.
- **Select (Radix)**: when custom option rendering, search, or grouping with icons
  is required.

## Accessibility
- Native `<select>` is fully keyboard-navigable without any custom code.
- Associate with a `<label htmlFor={id}>` via `Field`.
- `aria-required`, `aria-invalid`, and `aria-describedby` pass through via `...props`.
- The chevron overlay is `aria-hidden="true"` — decorative.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import { NativeSelect } from "@/design-system/native-select/native-select"
import { Field } from "@/design-system/field/field"

// Standalone
<NativeSelect defaultValue="">
  <option value="" disabled>Select a country</option>
  <option value="us">United States</option>
  <option value="gb">United Kingdom</option>
  <option value="ca">Canada</option>
</NativeSelect>

// Wrapped in Field
<Field label="Country" htmlFor="country">
  <NativeSelect id="country" defaultValue="">
    <option value="" disabled>Select a country</option>
    <option value="us">United States</option>
    <option value="gb">United Kingdom</option>
  </NativeSelect>
</Field>
```
