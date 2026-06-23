# Progress — Design System Component

Animated completion bar. Thin layer over Radix Progress (`aria-valuenow`,
`aria-valuemin`, `aria-valuemax`, `aria-valuetext`, indeterminate state support).
Two seams: `--progress-h` (track height — 8px, no space token) and
`--progress-radius` (aliased to `radius-full` for pill ends).

Figma description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| Root (track) | height | `--progress-h` | 8px | — |
| Root (track) | border-radius | `--progress-radius` → `radius-full` | 9999px | — |
| Root (track) | background | `action.secondary` | `gray.100` | `gray.800` |
| Root (track) | width | 100% (full container) | — | — |
| Indicator (fill) | background | `action.primary` | `blue.600` | — |
| Indicator | transition | `duration-base` / `ease-out` | 200ms | — |
| Indicator | transform | `translateX(-N%)` | Radix `value` prop | — |

## API
```ts
// Progress extends Radix ProgressPrimitive.Root
interface ProgressProps extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number   // 0–100; undefined = indeterminate
  // + className, ...Radix props (getValueLabel, max, etc.)
}
```

## States
- **Determinate**: `value` 0–100; indicator slides from left.
- **Indeterminate**: `value` undefined; Radix sets `aria-valuetext="indeterminate"`.
  Add a CSS animation (e.g. shimmer/slide) via `className` on the indicator.
- **Dark**: `action-secondary` track flips to `gray.800`; fill stays `action-primary`.

## Accessibility
- Radix renders `role="progressbar"` with `aria-valuenow`, `aria-valuemin`,
  `aria-valuemax` automatically from the `value` / `max` props.
- Provide `aria-label` or `aria-labelledby` on the `Progress` element to describe
  what is being tracked (e.g. `aria-label="Upload progress"`).
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import { Progress } from "@/design-system/progress/progress"

// Determinate
<Progress value={60} aria-label="Upload progress" />

// With label
<div className="flex flex-col gap-[var(--space-2)]">
  <div className="flex justify-between">
    <span className="text-sm text-[var(--text-secondary)]">Uploading file…</span>
    <span className="text-sm font-medium">60%</span>
  </div>
  <Progress value={60} aria-label="Upload progress" />
</div>

// Indeterminate
<Progress aria-label="Loading" />
```
