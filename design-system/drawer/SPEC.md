# Drawer — Design System Component

Token-driven sheet that slides in from a screen edge (Figma "Drawer": _"A drawer
component for React"_). Built on **Vaul** (drag-to-dismiss, scrim, focus trap,
four directions). Compound: `Drawer`, `DrawerTrigger`, `DrawerContent`,
`DrawerClose`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`,
`DrawerDescription`, `DrawerOverlay`, `DrawerPortal`.

Reuses the shared `--scrim` seam and reads `--surface-card` / `--text-primary` /
`--text-secondary` / `--border-default` + the space/radius/shadow scales
directly. Two component seams: `--drawer-handle-w` (drag-handle width) and
`--drawer-content-max-w` (centered content max-width). Footer + body controls are
consumer-provided via the **Button** atom.

**Drawer vs Dialog:** same modal semantics, but the Drawer is edge-anchored
(bottom default; also top/left/right), can be **dragged** to dismiss, and shows
a drag handle on the bottom direction. Vaul (not Radix) is the primitive.

## Anatomy (bottom direction)
```
┌─ scrim (black 30%) ──────────────────────────────┐
│                                                   │
│ ┌─ DrawerContent (slides up, rounded top) ──────┐ │
│ │                  ▔▔▔▔   (drag handle)          │ │
│ │                 Move Goal           (title)    │ │
│ │           Set your daily activity goal.        │ │  ← description (muted)
│ │       (-)        350         (+)               │ │  ← stepper (example body)
│ │               CALORIES/DAY                     │ │
│ │              ▁▃▂▄▅▆▃▅▆▃▄▇   (bars)             │ │
│ │              [ Submit ]                        │ │  ← footer (stacked, full-width)
│ │              [ Cancel ]                        │ │
│ └────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```
(The stepper + bars are example body content, not part of the component.)

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| Overlay | bg | `--scrim` | `rgba(0,0,0,.3)` | same |
| Content | anchor (bottom) | `inset-x-0 bottom-0`, `mt-24`, `max-h-80vh` | — | — |
| Content | bg / text | `surface.card` / `text.primary` | `white` / `gray.900` | `gray.900` / `gray.50` |
| Content | leading radius | `radius.lg` (top corners) | 8px | — |
| Content | leading border | `border.default` (top) | `gray.200` | `gray.800` |
| Content | shadow | `shadow.lg` | — | — |
| Drag handle | size | `space-2` x `--drawer-handle-w` | 8 x 100px | — |
| Drag handle | radius / bg | `radius.full` / `border.default` | `gray.200` | `gray.800` |
| Drag handle | margin-top | `spacing.scale.4` | 16px | — |
| Inner wrapper | max-width | `--drawer-content-max-w` | 384px | — |
| Header | gap / padding | `space-1-5` / `space-4` | 6 / 16px | — |
| Header (bottom/top) | align | center | — | — |
| Title | font-size / weight | `font-size.base` / semibold | 16px / 600 | — |
| Title | color | `text.primary` | `gray.900` | `gray.50` |
| Description | font-size / color | `font-size.sm` / `text.secondary` | 14px / `gray.600` | `gray.400` |
| Footer | direction / gap / padding | column / `space-2` / `space-4` | 8 / 16px | — |
| Footer Submit (Button primary) | bg / text | `action.primary` / `text.on-action` | `blue.600` / `white` | — |
| Footer Cancel (Button outline) | bg / border | `button.outline-*` | `white` / `gray.200` | `gray.900` / `gray.800` |
| Stepper button (Button outline, round) | size / radius | `control.sm` / `radius.full` | 32px | — |
| Stepper number (example) | font / weight | 72px / bold | display | — |
| Stepper unit (example) | font / color | `font-size.xs` / `text.secondary` | 12px / `gray.600` | `gray.400` |
| Activity bars (example) | bg | `text.primary` | `gray.900` | `gray.50` |

## API
```ts
// All parts forward to their Vaul primitive.
interface DrawerProps        extends ComponentProps<typeof Vaul.Root>    {
  direction?: "top" | "bottom" | "left" | "right"  // default "bottom"
  shouldScaleBackground?: boolean
}
interface DrawerContentProps extends ComponentProps<typeof Vaul.Content> {}  // renders the drag handle (bottom) + children
interface DrawerTitleProps       extends ComponentProps<typeof Vaul.Title>       {}
interface DrawerDescriptionProps extends ComponentProps<typeof Vaul.Description> {}
// DrawerTrigger / DrawerClose accept `asChild` to compose with the Button atom.
```

## States
- **Closed**: only the `DrawerTrigger` is rendered.
- **Open**: scrim + panel slide in from the chosen edge; focus moves into the
  panel and is trapped; the page behind is inert.
- **Dragging**: Vaul follows the pointer/touch; releasing past the threshold
  dismisses, otherwise it snaps back. The drag handle marks the affordance.
- **Close affordances**: drag-to-dismiss, the Cancel button (wrap in
  `<DrawerClose asChild>`), Escape, and a scrim click; focus returns to the trigger.
- **Hover / focus**: footer + stepper buttons use their Button variant
  hover bg + focus ring.

## Accessibility (gate-verified, light & dark)
- Vaul sets `role="dialog"` + `aria-modal`; `DrawerTitle` / `DrawerDescription`
  are wired as `aria-labelledby` / `aria-describedby` (a title is required for an
  accessible name). Focus is trapped and returns to the trigger on close.
- The drag handle is decorative (`aria-hidden`); dragging is an enhancement, not
  the only way to dismiss (Escape / Cancel / scrim all work) - keyboard users are
  never trapped.
- Example-body controls carry names: the stepper buttons use `aria-label`
  ("Decrease" / "Increase"); the activity bars are `aria-hidden`.
- Contrast clears AA in both themes: title `text.primary` 15:1 / 18:1,
  description + unit `text.secondary` 5.7:1 / 7.3:1, and all buttons in
  default/hover/focus.
- `measure_render`: all labels AA · `axe_audit`: 0 violations · `verify_states`:
  trigger, stepper, Submit, Cancel pass default/hover/focus · `verify_responsive`:
  content shrinks below 384px - no overflow @ 280/320/414. (Vaul drag + focus
  trap are covered against the live React component.)

## Usage
```tsx
"use client"
import * as React from "react"
import { Minus, Plus } from "lucide-react"
import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter,
  DrawerTitle, DrawerDescription, DrawerClose,
} from "@/design-system/drawer/drawer"
import { Button } from "@/design-system/button/button"

export function GoalDrawer() {
  const [goal, setGoal] = React.useState(350)
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-[var(--drawer-content-max-w)]">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="flex items-center gap-[var(--space-2)] px-[var(--space-4)]">
            <Button
              variant="outline"
              size="icon"
              className="size-[var(--control-sm)] rounded-[var(--radius-full)]"
              aria-label="Decrease"
              onClick={() => setGoal((g) => g - 10)}
            >
              <Minus />
            </Button>
            <div className="flex-1 text-center">
              <div className="text-[72px] font-bold leading-none">{goal}</div>
              <div className="text-[length:var(--font-size-xs)] uppercase text-[var(--text-secondary)]">
                Calories/day
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="size-[var(--control-sm)] rounded-[var(--radius-full)]"
              aria-label="Increase"
              onClick={() => setGoal((g) => g + 10)}
            >
              <Plus />
            </Button>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
```
