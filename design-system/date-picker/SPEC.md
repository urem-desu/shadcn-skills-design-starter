# Date Picker — Design System Component

Token-driven date picker (Figma "Date Picker": _"A date picker component with
range and presets"_). The canonical pattern: a **Label** over an outline
**Button** trigger (formatted date + chevron-down) that opens a **Popover**
holding the **Calendar** with `captionLayout="dropdown"` (month + year selects
in the caption).

Composes existing atoms — **Button** (trigger), **Calendar** (the grid) — and
colocates thin Radix **Popover** wrappers (`Popover`, `PopoverTrigger`,
`PopoverContent`, `PopoverAnchor`) — the same surface the standalone Popover
component (#36) will own; promote them there when it lands.

Hybrid tokens: one seam, `--date-picker-trigger-w` (Figma `w-48` / 192px). Every
other value resolves to an existing semantic/primitive. Note: the selected day
uses our brand `--action-primary` (blue) — consistent with the already-built
Calendar — where the neutral Figma kit paints it near-black; this is the
design-system's intentional primary divergence, not drift.

## Anatomy
```
Label        Date of Birth
Trigger    ┌───────────────────────────┐
           │ Select a date          v  │   ← Button outline, justify-between
           └───────────────────────────┘
              │ opens
Popover    ┌───────────────────────────┐
           │  ‹   [Jun v]  [2025 v]   › │   ← Calendar caption (dropdowns)
           │  Su Mo Tu We Th Fr Sa     │
           │   1  2  3  … (grid) … 25*  │   ← 25 selected
           └───────────────────────────┘
```

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| Root | layout / gap | `flex-col` / `spacing.scale.2` | 8px | — |
| Label | font-size / weight | `font-size.sm` / medium | 14px / 500 | — |
| Label | color | `text.primary` | `gray.900` | `gray.50` |
| Trigger (Button outline md) | height | `sizing.control.md` | 40px | — |
| Trigger | width | `--date-picker-trigger-w` (seam) | 192px | — |
| Trigger | padding-inline | `spacing.scale.4` | 16px | — |
| Trigger | font-size / weight | `font-size.base` / regular | 16px / 400 | — |
| Trigger | bg / border / text | `button.outline-*` | `white` / `gray.200` / `gray.900` | `gray.900` / `gray.800` / `gray.50` |
| Trigger hover | bg | `action.secondary` | `gray.100` | `gray.700` |
| Trigger focus | ring | `button.focus-ring` | `blue.500` double ring | — |
| Trigger disabled | opacity | 0.5 + `pointer-events:none` | — | — |
| Trigger chevron | size / color | `sizing.icon.md` / `text.secondary` | 20px / `gray.600` | `gray.400` |
| Popover surface | radius | `radius.lg` | 8px | — |
| Popover surface | border / bg | `border.default` / `surface.card` | `gray.200` / `white` | `gray.800` / `gray.900` |
| Popover surface | shadow | `shadow.md` | — | — |
| Popover (date-picker use) | padding | 0 (Calendar owns its `space-3`) | — | — |
| Calendar | (full token map) | see `calendar/SPEC.md` | — | — |
| Calendar caption dropdown | border / radius / shadow | `border.default` / `radius.md` / `shadow.sm` | `gray.200` / 6px | `gray.800` |
| Selected day | bg / text | `action.primary` / `text.on-action` | `blue.600` / `white` | — |
| Outside / trailing day | color | `text.secondary` (+ disabled 0.5) | `gray.600` | `gray.400` |

## API
```ts
interface DatePickerProps {
  label?: React.ReactNode          // rendered above the trigger; wires htmlFor -> trigger id
  placeholder?: string             // trigger text when empty (default "Select a date")
  value?: Date                     // controlled selection
  onChange?: (date: Date | undefined) => void
  format?: (date: Date) => string  // trigger label formatter (default toLocaleDateString)
  disabled?: boolean
  id?: string                      // label/trigger association (auto via useId)
}

// Colocated Radix Popover wrappers (forward the full Radix API):
// Popover, PopoverTrigger, PopoverAnchor, PopoverContent
```
State (open, selected date) is internal but `value`/`onChange` make it
controllable. Selecting a day calls `onChange` and closes the popover.

## States
- **Empty / default**: trigger shows `placeholder` at `text.primary`, popover closed.
- **Open**: trigger `aria-expanded="true"`; popover holds the Calendar. Selected
  day filled `action.primary`; trailing days `text.secondary` + disabled 0.5.
- **Selected (closed)**: trigger shows the formatted date.
- **Hover / focus**: trigger uses the Button outline hover bg + focus ring;
  day buttons + caption dropdowns + nav buttons carry their own hover/focus
  (see `calendar/SPEC.md`).
- **Disabled**: trigger `disabled`, opacity 0.5, popover cannot open.

## Accessibility (gate-verified, light & dark)
- The trigger is a real `<button>` named by its visible `Label` (via `htmlFor`/
  `id`) or, when unlabelled, by `aria-label={placeholder}`; `aria-haspopup="dialog"`
  + `aria-expanded` describe the popover. Radix Popover manages focus (moves into
  the panel on open, returns to the trigger on close) and Escape/outside-click close.
- The Calendar is the WAI-ARIA grid pattern (see `calendar/SPEC.md`): arrow-key
  roving focus, `role="grid"`, weekday `<th scope="col">`, selected day
  `aria-selected`, today `aria-current="date"`.
- The chevron on the trigger and the caret in each caption dropdown are
  decorative (`aria-hidden`); the dropdowns and nav buttons carry `aria-label`s.
- Contrast clears AA in both themes: trigger + label `text.primary` 15:1 / 18:1,
  selected day `text.on-action` on `action.primary` 8.6:1, trailing-day
  `text.secondary` 5.7:1 / 7.3:1.
- `measure_render`: all labels AA · `axe_audit`: 0 violations · `verify_states`:
  trigger, dropdowns, nav, and day buttons pass default/hover/focus ·
  `verify_responsive`: no overflow @ 280/320/414 (calendar cells flex-shrink).

## Usage
```tsx
"use client"
import * as React from "react"
import { DatePicker } from "@/design-system/date-picker/date-picker"

export function BirthdayField() {
  const [dob, setDob] = React.useState<Date>()
  return (
    <DatePicker
      label="Date of Birth"
      placeholder="Select a date"
      value={dob}
      onChange={setDob}
      format={(d) => d.toLocaleDateString("en-US", { dateStyle: "long" })}
    />
  )
}

// The colocated Popover wrappers are reusable on their own until the Popover
// component (#36) lands:
import {
  Popover, PopoverTrigger, PopoverContent,
} from "@/design-system/date-picker/date-picker"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open</Button>
  </PopoverTrigger>
  <PopoverContent align="start">…</PopoverContent>
</Popover>
```
