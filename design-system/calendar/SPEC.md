# Calendar — Design System Component

Token-driven date picker on the shadcn/ui foundation. Thin configuration layer
over `react-day-picker` (DayPicker) — we map its `classNames` slots to our 3-tier
tokens and supply themed Chevron + DayButton sub-components. Tokens: none (hybrid —
the only component-scoped value is the `--cell-size` CSS var, and it aliases
directly to `--control-sm`, so no new semantic is minted).

## Token mapping
| Slot | Property | → Semantic | → Primitive (light) | Dark |
|---|---|---|---|---|
| root | bg | `surface.card` | `white` | `gray.900` |
| root | padding | `spacing.scale.3` | 12px | — |
| root | `--cell-size` | `sizing.control.sm` | 32px | — |
| month / months gap | gap | `spacing.scale.4` | 16px | — |
| nav prev / next button | uses Button `ghost` size `icon` | inherits `--button-*` | — | — |
| chevron icon | size | `sizing.icon.sm` | 16px | — |
| month_caption | font-size / weight | `typography.fontSize.sm` + medium | 14 / 500 | — |
| weekday | font-size | `typography.fontSize.xs` | 12px | — |
| weekday | color | `text.secondary` | `gray.600` | `gray.400` |
| week row | gap-top | `spacing.scale.2` | 8px | — |
| day (resting) | text | `text.primary` | `gray.900` | `gray.50` |
| day (hover) | bg | `action.secondary` | `gray.100` | `gray.800` |
| day (focus-visible) | ring | `--focus-ring` | 2px blue-500 + page | blue-500 + gray-950 |
| **today** | bg / text | `action.secondary` / `text.primary` | `gray.100` / `gray.900` | `gray.800` / `gray.50` |
| **selected (single)** | bg / text | `action.primary` / `text.on-action` | `blue.600` / `white` | same |
| **range start / end** | bg / text | `action.primary` / `text.on-action` | `blue.600` / `white` | same |
| **range middle** | bg / text | `interactive.selected-bg` / `interactive.selected-text` | `blue.50` / `blue.700` | `gray.800` / `blue.300` |
| **outside month** | text | `text.secondary` (kept AA-readable — outside days are still clickable) | `gray.600` | `gray.400` |
| **disabled** | text + opacity | `text.tertiary` + 0.5 | `gray.400` @ 50% | `gray.500` @ 50% |
| caption dropdown trigger | border / radius / shadow | `border.default` / `radius.md` / `shadow.sm` | — | — |
| caption dropdown trigger (focus-within) | border / ring | `border.focus` / `--focus-ring` | `blue.500` / 4px | same |
| day cell | aspect-ratio | 1 / 1 | — | — |
| day cell selected single corners | radius | `radius.md` | 6px | — |
| range-start corner / range-end corner | radius | `radius.md` (only on the outside corner) | — | — |

## API
```ts
// Inherits all react-day-picker DayPicker props; adds buttonVariant for the
// previous / next nav buttons (so consumers can pick "outline" inside a popover).
interface CalendarProps extends React.ComponentProps<typeof DayPicker> {
  buttonVariant?: ButtonProps["variant"]   // default "ghost"
  // — inherited from DayPicker —
  // mode: "single" | "multiple" | "range"
  // selected: Date | Date[] | DateRange
  // onSelect: (value) => void
  // disabled: Matcher | Matcher[]            // disabled dates
  // showOutsideDays?: boolean                // default true
  // weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  // captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years"
  // numberOfMonths?: number                  // 1 | 2 (range pickers often use 2)
  // locale?: Locale                          // date-fns Locale
}

// Exposed for consumers who need to render a custom day cell.
function CalendarDayButton(props): JSX.Element
```

Compose with `Popover` for a date input, with `Dialog` for full-screen pickers,
and with a `<Button>` trigger that shows the formatted selected date.

## States
- **Resting day**: `text.primary`, transparent bg.
- **Hover day**: `action.secondary` bg.
- **Focus-visible day**: 2px+2px `--focus-ring`; the focused cell raises to
  `z-index:10` so the ring isn't clipped by neighbors. DayPicker's roving
  tabindex moves focus with arrow keys; we forward focus to the DayButton ref
  on `modifiers.focused` so screen readers track the active date.
- **Today**: `action.secondary` background, preserved underneath selection
  (selection wins by removing the today corner radius so the highlight cleanly
  becomes part of a range or single selection).
- **Selected (single mode)**: `action.primary` bg + `text.on-action`, full
  `radius.md` corners.
- **Range start / end**: `action.primary` bg + `text.on-action`, only the
  outside corner is rounded (start: left, end: right).
- **Range middle**: `interactive.selected-bg` + `interactive.selected-text`,
  zero corners so the row reads as a continuous bar.
- **Outside month** (when `showOutsideDays`): `text.tertiary`.
- **Disabled** (matched by `disabled` prop): `text.tertiary` at 50% opacity,
  no pointer events.
- **Nav prev / next**: render through the kit's `<Button>` so they inherit
  every Button state (hover, focus-visible, disabled). `aria-disabled="true"`
  on month boundaries with `fromDate` / `toDate`.
- **Caption dropdowns** (when `captionLayout="dropdown"`): real `<select>`
  overlaid with `opacity:0` on a styled `<div>` — keyboard focus on the
  hidden select shows our focus ring via `:has-focus` on the wrapper.

## Accessibility (gate-verified, light & dark)
- DayPicker provides the WAI-ARIA Date Picker pattern out of the box:
  `<table role="grid">`, `<th scope="col">` weekday headers,
  `aria-selected` on chosen dates, `aria-disabled` on out-of-range dates, and
  `aria-current="date"` on today.
- Keyboard model: Tab moves between regions (prev, dropdowns, grid, next);
  inside the grid Arrow keys move day, PageUp/Down month, Shift+PageUp/Down
  year, Home / End start / end of week. Enter / Space selects.
- Focus indicator: every interactive cell uses the shared `--focus-ring` (3:1
  against the page surface in both themes). The cell raises to `z-index:10`
  while focused so the 4px ring is never clipped by adjacent cells.
- Range-middle contrast (`interactive.selected-text` on
  `interactive.selected-bg`) clears AA in both themes (light 7.5:1, dark
  10.1:1) so middle-of-range dates remain readable.
- RTL: chevron icons rotate 180° (handled by DayPicker's
  `rdp-button_next/previous` data classes); grid mirrors via logical
  properties.
- `measure_render`: all visible text AA · `axe_audit`: 0 violations
  (table semantics intact) · `verify_states`: hover + focus pass on every day
  cell · `verify_responsive`: no overflow @ 280/320/414.

## Usage
```tsx
import { Calendar } from "@/design-system/calendar/calendar"

{/* Single date - simplest */}
const [date, setDate] = React.useState<Date | undefined>(new Date())
<Calendar mode="single" selected={date} onSelect={setDate} />

{/* Date range */}
const [range, setRange] = React.useState<DateRange | undefined>()
<Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />

{/* Dropdown caption with min / max year */}
<Calendar
  mode="single"
  captionLayout="dropdown"
  fromYear={2000}
  toYear={2030}
  disabled={{ before: new Date() }}    // no dates in the past
/>

{/* Inside a Popover as a date input */}
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">{date ? format(date, "PP") : "Pick a date"}</Button>
  </PopoverTrigger>
  <PopoverContent className="p-0">
    <Calendar mode="single" selected={date} onSelect={setDate} buttonVariant="outline" />
  </PopoverContent>
</Popover>
```
