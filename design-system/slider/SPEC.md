# Slider — Design System Component

Horizontal range input. Thin layer over Radix Slider — handles keyboard
navigation (Arrow keys, Home/End, Page Up/Down), ARIA (`role="slider"`,
`aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`), and
multi-thumb ranges.

Two seams: `--slider-track-h` (track height — 4px, between `space-1`=4 but
used as a visual dimension not a spacing token) and `--slider-thumb-size`
(16px — between `space-4`=16px but named distinctly as a sizing concern).

Figma description: "An input where the user selects a value from within a given range."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| Track | height | `--slider-track-h` | 4px | — |
| Track | border-radius | `radius-full` | 9999px | — |
| Track | background | `action.secondary` | `gray.100` | `gray.800` |
| Range (fill) | background | `action.primary` | `blue.600` | `blue.500` |
| Thumb | size | `--slider-thumb-size` | 16px | — |
| Thumb | border | `action.primary` (2px) | `blue.600` | `blue.500` |
| Thumb | background | `surface.card` | white | `gray.950` |
| Thumb | border-radius | `radius-full` | 9999px | — |
| Thumb | shadow (rest) | `shadow-sm` | sm shadow | — |
| Thumb | shadow (hover) | `shadow-md` | md shadow | — |
| Thumb | focus ring | `shadow.focus-ring` | double ring | — |

## Component seams
```css
--slider-track-h: 4px;
--slider-thumb-size: 16px;
```

## API
```ts
// Slider extends Radix SliderPrimitive.Root
interface SliderProps extends ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  // Radix props: value, defaultValue, min, max, step, onValueChange, disabled, orientation...
}
```

## States
| State | Visual |
|---|---|
| Default | Track with fill from min to current value |
| Hover | Thumb shadow elevates to `shadow-md` |
| Focus | Thumb gets `shadow.focus-ring` |
| Dragging | Radix manages pointer capture; range fill tracks in real time |
| Disabled | `opacity: 0.5`, no pointer events |

## Accessibility
- Radix renders `role="slider"` with `aria-valuenow`, `aria-valuemin`,
  `aria-valuemax` from `value`/`min`/`max` props.
- Provide `aria-label` or a visible `<label>` pointing to the slider.
- Keyboard: Arrow keys step by `step`; Page Up/Down step by 10×; Home/End jump to min/max.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import { Slider } from "@/design-system/slider/slider"

// Basic 0–100 slider
<Slider
  defaultValue={[50]}
  min={0}
  max={100}
  step={1}
  aria-label="Volume"
/>

// With visible label + value
const [volume, setVolume] = React.useState([50])
<div className="flex flex-col gap-[var(--space-2)]">
  <div className="flex justify-between">
    <label className="text-sm font-medium" id="volume-label">Volume</label>
    <span className="text-sm text-[var(--text-secondary)]">{volume[0]}</span>
  </div>
  <Slider
    value={volume}
    onValueChange={setVolume}
    min={0} max={100} step={1}
    aria-labelledby="volume-label"
  />
</div>

// Range (two thumbs)
<Slider defaultValue={[20, 80]} min={0} max={100} step={5} aria-label="Price range" />
```
