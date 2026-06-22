# Command — Design System Component

Token-driven command palette / typeahead menu on the shadcn/ui foundation.
Compound: `Command`, `CommandDialog`, `CommandInput`, `CommandList`,
`CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`,
`CommandSeparator`. Thin layer over `cmdk` — cmdk owns filtering, keyboard
navigation, and ARIA Listbox; we own the surface, item geometry, and the
selection visual. One genuine seam: `--command-list-max-h` (the scroll cap).

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| `Command` (root) | bg | `surface.card` | `white` | `gray.900` |
| `Command` (root) | text | `text.primary` | `gray.900` | `gray.50` |
| `Command` (root) | radius / overflow | `radius.md` / `hidden` | 6px | — |
| `CommandInput` wrapper | height | `sizing.control.sm` | 36px (shadcn h-9) | — |
| `CommandInput` wrapper | gap (icon ↔ input) | `spacing.scale.2` | 8px | — |
| `CommandInput` wrapper | padding-inline | `spacing.scale.3` | 12px | — |
| `CommandInput` wrapper | border-block-end | `border.default` | `gray.200` | `gray.800` |
| `CommandInput` search icon | size | `sizing.icon.sm` | 16px | — |
| `CommandInput` search icon | opacity | 0.5 (decorative) | — | — |
| `CommandInput` | height | `sizing.control.md` | 40px | — |
| `CommandInput` | font-size | `typography.fontSize.sm` | 14px | — |
| `CommandInput` placeholder | color | `text.tertiary` | `gray.400` | `gray.500` |
| `CommandInput` disabled | opacity | 0.5 + `pointer-events:none` | — | — |
| `CommandList` | max-block-size | `--command-list-max-h` (seam) | 300px | — |
| `CommandList` | overflow | `auto` on Y, `hidden` on X | — | — |
| `CommandEmpty` | padding-block | `spacing.scale.6` | 24px | — |
| `CommandEmpty` | text-align / font-size | center / `font-size.sm` | 14px | — |
| `CommandGroup` | padding | `spacing.scale.1` | 4px | — |
| `CommandGroup` | color | `text.primary` | `gray.900` | `gray.50` |
| `CommandGroup` heading | padding-inline / -block | `space-2` / `space-1-5` | 8px / 6px | — |
| `CommandGroup` heading | font-size / weight | `font-size.xs` / medium | 12 / 500 | — |
| `CommandGroup` heading | color | `text.secondary` | `gray.600` | `gray.400` |
| `CommandSeparator` | block-size | 1px | — | — |
| `CommandSeparator` | bg | `border.default` | `gray.200` | `gray.800` |
| `CommandSeparator` | margin-inline | `-spacing.scale.1` (bleed past group padding) | -4px | — |
| `CommandItem` (resting) | radius | `radius.sm` | 4px | — |
| `CommandItem` (resting) | padding | `space-2` / `space-1-5` | 8px / 6px | — |
| `CommandItem` (resting) | gap | `spacing.scale.2` | 8px | — |
| `CommandItem` (resting) | font-size | `font-size.sm` | 14px | — |
| `CommandItem` icon | size / color | `sizing.icon.sm` / `text.secondary` | 16px / `gray.600` | `gray.400` |
| `CommandItem` selected (`data-selected=true`) | bg / text | `interactive.selected-bg` / `interactive.selected-text` | `blue.50` / `blue.700` | `gray.800` / `blue.300` |
| `CommandItem` disabled (`data-disabled=true`) | opacity | 0.5 + `pointer-events:none` | — | — |
| `CommandShortcut` | margin-inline-start | auto | — | — |
| `CommandShortcut` | font-size / color / tracking | `font-size.xs` / `text.secondary` / widest | 12 / `gray.600` | `gray.400` |
| `CommandDialog` panel (when wrapped) | padding | 0 (input + list fill the dialog) | — | — |
| `CommandDialog` panel | overflow | `hidden` | — | — |

## API
```ts
// All parts forward to their cmdk primitive - full cmdk API surface.
interface CommandProps        extends ComponentProps<typeof CommandPrimitive>          { value?: string; onValueChange?: (v: string) => void; filter?: (value: string, search: string) => number; shouldFilter?: boolean }
interface CommandInputProps   extends ComponentProps<typeof CommandPrimitive.Input>    { placeholder?: string }
interface CommandListProps    extends ComponentProps<typeof CommandPrimitive.List>     {}
interface CommandEmptyProps   extends ComponentProps<typeof CommandPrimitive.Empty>    {}
interface CommandGroupProps   extends ComponentProps<typeof CommandPrimitive.Group>    { heading?: React.ReactNode; value?: string }
interface CommandItemProps    extends ComponentProps<typeof CommandPrimitive.Item>     { value?: string; onSelect?: (value: string) => void; disabled?: boolean; keywords?: string[] }
interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement>          {}
interface CommandSeparatorProps extends ComponentProps<typeof CommandPrimitive.Separator> { alwaysRender?: boolean }
interface CommandDialogProps  extends ComponentProps<typeof Dialog>                    { title?: string; description?: string; showCloseButton?: boolean }
```
Use `Command` standalone inside a Popover (typeahead in a field) or wrap with
`CommandDialog` for a global ⌘K palette.

## States
- **Item resting**: transparent bg, `text.primary`.
- **Item active descendant** (`data-selected="true"`, set by cmdk on the currently
  highlighted item — moves with ArrowUp / ArrowDown / mouse): `interactive.selected-bg`
  + `interactive.selected-text`. There is no `focus` state on items themselves —
  per the WAI-ARIA Combobox-with-Listbox pattern, focus stays on the input and
  the active item is communicated via `aria-activedescendant`. Selection
  contrast clears AA in both themes (7.5:1 light, 10.1:1 dark).
- **Item disabled**: `data-disabled="true"`, opacity 0.5, no pointer events,
  skipped during keyboard nav.
- **Input focus**: native input focus ring is suppressed (`outline-hidden`);
  the wrapper's border-block-end stays as the visible affordance — when the
  palette opens inside a Dialog, the dialog's own focus trap handles the
  affordance.
- **Empty**: rendered automatically by cmdk when no items match the current
  filter — copy comes from `<CommandEmpty>` children.
- **Group heading**: non-interactive caption; hidden when its group has no
  visible items.

## Accessibility (gate-verified, light & dark)
- cmdk implements the WAI-ARIA **Combobox + Listbox** pattern: the input has
  `role="combobox" aria-expanded aria-controls aria-activedescendant`; the list
  is `role="listbox"`; items are `role="option" aria-selected`.
- Keyboard model: ArrowUp / ArrowDown move the active descendant; Home / End
  jump to first / last; Enter activates `onSelect`; typing filters. Inside a
  `CommandDialog`, Escape closes (Dialog focus trap).
- Search icon is decorative (`aria-hidden` + 0.5 opacity); the input itself
  carries the accessible name via `placeholder` or `aria-label` set by the
  consumer.
- `CommandDialog` injects an `sr-only` `DialogTitle` + `DialogDescription` so
  AT always announces the palette's purpose — invisible to sighted users.
- All text inside the palette clears AA in both themes (group heading
  `text.secondary` at 5.7:1 / 7.3:1, item resting `text.primary` at 15:1 / 18:1,
  selected item `interactive.selected-text` at 7.5:1 / 10.1:1).
- `measure_render`: all labels AA · `axe_audit`: 0 violations
  (Listbox + Combobox structure intact) · `verify_states`: every item passes
  default/hover/focus contrast · `verify_responsive`: no overflow @ 280/320/414.

## Usage
```tsx
import {
  Command, CommandInput, CommandList, CommandEmpty, CommandGroup,
  CommandItem, CommandShortcut, CommandSeparator, CommandDialog,
} from "@/design-system/command/command"
import { Calculator, Calendar, Settings, User } from "lucide-react"

{/* Inline typeahead inside a Popover */}
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Pick a project…</Button>
  </PopoverTrigger>
  <PopoverContent className="p-0">
    <Command>
      <CommandInput placeholder="Search projects…" />
      <CommandList>
        <CommandEmpty>No project found.</CommandEmpty>
        <CommandGroup heading="Recent">
          {recent.map((p) => (
            <CommandItem key={p.id} value={p.name} onSelect={() => pick(p)}>
              {p.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>

{/* Global Cmd+K palette */}
const [open, setOpen] = React.useState(false)
React.useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen((o) => !o)
    }
  }
  document.addEventListener("keydown", down)
  return () => document.removeEventListener("keydown", down)
}, [])

<CommandDialog open={open} onOpenChange={setOpen} title="Quick actions" description="Find something to do">
  <CommandInput placeholder="Type a command or search…" />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem><Calendar /> Calendar</CommandItem>
      <CommandItem><Calculator /> Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>
        <User /> Profile
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <Settings /> Preferences
        <CommandShortcut>⌘,</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>
```
