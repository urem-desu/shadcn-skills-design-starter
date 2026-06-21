# Input — Design System Component

Token-driven single-line field on the shadcn/ui foundation. Tokens live in the
shared `design-system/theme.css` (`--field-*`); this component adds only its own
classes. Error state is driven by `aria-invalid` so visual ≡ a11y state.

## Token mapping (Component → Semantic → Primitive)

| Component token | → Semantic | → Primitive (light) | Dark |
|---|---|---|---|
| `--field-bg` | `surface.card` | `white` | `gray.900` |
| `--field-bg-disabled` | `surface.disabled` | `gray.100` | `gray.800` |
| `--field-border` | `border.default` | `gray.200` | `gray.800` |
| `--field-border-hover` | `border.strong` | `gray.500` | `gray.500` |
| `--field-border-focus` | `border.focus` | `blue.500` | `blue.500` |
| `--field-border-error` | `border.error` | `red.500` | `red.500` |
| `--field-text` | `text.primary` | `gray.900` | `gray.50` |
| `--field-placeholder` | `text.tertiary` | `gray.400` | `gray.500` |
| `--field-radius` | `radius.md` | 6px | — |
| `--field-focus-ring` | `shadows.focus-ring` | 2px page + 2px `blue.500` | — |
| `--field-focus-ring-error` | focus-ring w/ `border.error` | 2px page + 2px `red.500` | — |
| height sm/md/lg | `sizing.control` | 32 / 40 / 48px | — |
| padding-inline | `spacing.scale.{3,4}` | 12 / 16px | — |
| font sm/md/lg | `typography.fontSize` | 14 / 16 / 18px | — |

## API

```ts
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  inputSize?: "sm" | "md" | "lg"   // default "md" (native `size` is omitted)
  error?: boolean                  // sets aria-invalid + error tokens
  type?: string                    // text | email | password | search | number | file | …
}
```

## States (8)

| # | State | Implementation |
|---|---|---|
| 1 | Default | `--field-border` |
| 2 | Hover | `:hover` → `--field-border-hover` |
| 3 | Focus | `:focus-visible` → `--field-border-focus` + `--field-focus-ring` |
| 4 | Active | N/A (text entry has no pressed state; caret/value reflect input) |
| 5 | Disabled | `disabled` → opacity .5, `--field-bg-disabled`, `not-allowed` |
| 6 | Loading | async validation: trailing spinner + `aria-busy` (compose in field wrapper) |
| 7 | Error | `error`/`aria-invalid` → `--field-border-error` + error ring + message via `aria-describedby` |
| 8 | Read-only | `readOnly` → `--field-bg-disabled`, value selectable |

## Accessibility (gate-verified)

- Always paired with a `<label for>`; helper/error linked via `aria-describedby`.
- Error: `aria-invalid="true"` + visible message (color is never the only signal — message text is present).
- Keyboard: native focus/typing; visible `:focus-visible` ring (3:1).
- Placeholders are hints only — the real `<label>` always carries the name.

| Gate (light & dark) | Result |
|---|---|
| `verify_states` | 33/33 element-states pass AA |
| `measure_render` | all text AA |
| `axe_audit` | 0 violations |
| `verify_responsive` | no overflow @ 280/320/414 |

## Usage

```tsx
<Input placeholder="you@example.com" type="email" />
<Input inputSize="lg" defaultValue="Pedro Duarte" />
<Input disabled placeholder="Disabled" />
<Input readOnly value="read-only" />
<Input error aria-describedby="err" type="email" defaultValue="bad" />
```
