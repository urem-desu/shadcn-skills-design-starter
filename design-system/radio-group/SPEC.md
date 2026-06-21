# Radio Group - Design System Component

Token-driven set of mutually-exclusive options (only one checked at a time), built
on the Radix RadioGroup primitive (`role=radiogroup`, roving focus with arrow keys,
single-selection, `data-state`). Mirrors the Figma **Radio Group** component (page
`73:1984`): a vertical stack of circular controls, each a 1.5px ring that fills with
a centered dot when selected, paired with a label.

The visual control is the same custom circle as Checkbox (shared `--control-*`
tokens); `RadioGroupItem` is control-only - pair each with a `<Label htmlFor>`.

Files: `radio-group.tsx` (React, Radix, `forwardRef`), `radio-group-states.html` (gate harness).

## Token mapping (property -> token read directly)

Shares the `--control-*` custom-control tokens with Checkbox; differs only in shape.

| Property | Token read | Value |
|---|---|---|
| item shape | `--radio-radius` | `radius.full` (circle) |
| ring border | `--control-box-border` | `border.strong` |
| item bg | `--control-box-bg` | `surface.card` |
| checked ring + dot | `--control-checked-bg` | `action.primary` (blue.600) |
| item size | `--control-box-size` | 16px (`space.4`) |
| dot size | `--space-2` | 8px |
| group gap | `--space-3` | 12px |
| focus ring | `--focus-ring` | double ring, `border.focus` |

## API

```ts
// Composable Radix slots:
<RadioGroup defaultValue value onValueChange name disabled>   // Root, role=radiogroup
  <RadioGroupItem value="..." id="..." />                     // one circular control
```

Both slots forward refs, accept `className`, and extend the matching Radix
`ComponentPropsWithoutRef`. `RadioGroupItem` is control-only; give it an `id` and
pair with `<Label htmlFor>` for the option text.

## States

| # | State | Token / behavior |
|---|---|---|
| 1 | Default (unselected) | `--control-box-border` ring on `--control-box-bg` |
| 2 | Hover | ring unchanged; the row label/control is the hit target |
| 3 | Focus-visible | `--focus-ring` double ring on the focused item |
| 4 | Selected | `data-[state=checked]`: ring -> `--control-checked-bg`, centered dot shown |
| 5 | Disabled | `opacity:.5` + no pointer events (per item or whole group) |

Selection is shown by the dot, never by color alone. No loading/error per item -
validate at the group level. Only one item can be checked at a time (Radix enforces).

## Accessibility (gate-verified, light & dark)
- Radix gives `role="radiogroup"` + roving focus: arrow keys move and select within
  the group, Tab enters/leaves it; single-selection enforced.
- Name the group with an external label wired via `aria-labelledby` (or a `<fieldset>`/
  `<legend>` in the harness).
- Selection conveyed by the dot, not color alone; focus ring meets 3:1 in both themes.

### Verification (real gate output)
| Gate | Light | Dark |
|---|---|---|
| `check_no_emoji.py` | OK | - |
| `measure_render.mjs` (text AA) | pass | pass |
| `verify_states.mjs` | pass | pass |
| `axe_audit.mjs` (WCAG 2.2 A/AA) | 0 violations | 0 violations |
| `verify_responsive.mjs` | no overflow @280/320/414px | - |

## Usage

```tsx
import { RadioGroup, RadioGroupItem } from "@/design-system/radio-group/radio-group"
import { Label } from "@/design-system/label/label"

<RadioGroup defaultValue="all" aria-labelledby="notify-label">
  <p id="notify-label">Notify me about...</p>
  <div className="flex items-center gap-[var(--space-2)]">
    <RadioGroupItem value="all" id="r-all" />
    <Label htmlFor="r-all">All new messages</Label>
  </div>
  <div className="flex items-center gap-[var(--space-2)]">
    <RadioGroupItem value="mentions" id="r-mentions" />
    <Label htmlFor="r-mentions">Direct messages and mentions</Label>
  </div>
  <div className="flex items-center gap-[var(--space-2)]">
    <RadioGroupItem value="none" id="r-none" />
    <Label htmlFor="r-none">Nothing</Label>
  </div>
</RadioGroup>
```
