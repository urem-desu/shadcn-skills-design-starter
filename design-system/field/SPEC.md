# Field — Design System Component

Accessible form-field layout wrapper. Composes Label, a control slot (Input,
Select, Textarea, or any custom control), optional hint text, and optional
error message. Error suppresses hint when both are present.
No Radix primitive. Zero component-scoped seams — all values read from shared
`--field-*` / `--text-*` / `--font-*` / `--space-*` tokens.

Figma description: "Combine labels, controls, and help text to compose
accessible form fields and grouped inputs."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| Root | gap | `space-1-5` | 6px | — |
| Label | font-size | `font-size.sm` | 14px | — |
| Label | font-weight | `font-weight.medium` | 500 | — |
| Label | line-height | `line-tight` | 1.25 | — |
| Label | color | `text.primary` | `gray.900` | `gray.50` |
| Required asterisk | color | `text.destructive` | `red.600` | `red.400` |
| Required asterisk | margin-left | `space-0-5` | 2px | — |
| Hint | font-size | `font-size.xs` | 12px | — |
| Hint | color | `text.secondary` | `gray.600` | `gray.400` |
| Hint | line-height | `line-normal` | 1.5 | — |
| Error | font-size | `font-size.xs` | 12px | — |
| Error | color | `text.destructive` | `red.600` | `red.400` |
| Error | line-height | `line-normal` | 1.5 | — |

## API
```ts
interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string        // visible label text — rendered as <label> with htmlFor
  htmlFor?: string      // ties label to control id (e.g. htmlFor="email")
  hint?: string         // helper text shown below the control (hidden when error shown)
  error?: string        // validation error; suppresses hint; role="alert" for AT
  required?: boolean    // shows red * after label (visual only; set aria-required on control)
  id?: string           // prefix for descId: id + "-desc" ties hint/error to control
  // children = control slot — any Input, Select, Textarea, etc.
}
```

## States
- **Default**: label + control + optional hint.
- **Required**: asterisk `*` after label (`aria-hidden`, purely decorative — set
  `aria-required="true"` on the control itself).
- **Error**: error replaces hint; `role="alert" aria-live="polite"` announces to AT.
- **Hint only**: hint shown when no error is present.
- **Both hint + error**: error takes precedence; hint is not rendered.
- **Dark**: semantic tokens flip at `[data-theme="dark"]` — no extra overrides.

## Accessibility
- `<label htmlFor={htmlFor}>` is the primary a11y hook — always pass `htmlFor` and
  a matching `id` on the control.
- Required: visual `*` is `aria-hidden`; the consumer must set `aria-required="true"`
  on the control.
- Error: `role="alert" aria-live="polite"` announces the message when it mounts.
  Pair with `aria-describedby` pointing at the error `<p id>` on the control.
- Hint: associate with the control via `aria-describedby={descId}` (`id + "-desc"`).
- Color contrast: `text.primary` label 15:1 (light) / 18:1 (dark); `text.destructive`
  error 5.7:1 (light) / 5.0:1 (dark); `text.secondary` hint 5.7:1 / 7.3:1.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import { Field } from "@/design-system/field/field"
import { Input } from "@/design-system/input/input"

// Default with hint
<Field label="Email address" htmlFor="email" hint="We'll never share your email.">
  <Input id="email" type="email" placeholder="you@example.com" />
</Field>

// Required + error
<Field
  label="Password"
  htmlFor="password"
  required
  error="Password must be at least 8 characters."
  id="password-field"
>
  <Input id="password" type="password" aria-required="true" aria-describedby="password-field-desc" />
</Field>

// Without label (control provides its own label via aria-label)
<Field hint="Max 280 characters.">
  <textarea aria-label="Bio" rows={3} />
</Field>
```
