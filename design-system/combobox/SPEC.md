# Combobox — Design System Component

Token-driven single-select with a searchable popover list. Compound:
`Combobox`, `ComboboxTrigger`, `ComboboxContent`. Internally a thin composition
of `Popover` (the floating surface) + `Command` (the searchable list with
ARIA Combobox/Listbox). Tokens: none (hybrid — every visual decision comes
from the composed primitives; the trigger paints from `<Button variant="outline">`,
the panel from Popover, the items from Command).

Why a separate component for what shadcn ships as a recipe: in the Figma kit
the Combobox is a single component with a defined API (items, value, placeholder),
so this wrapper gives consumers the same one-prop API as `Select` while still
letting them swap in a custom trigger or content node when needed.

## Token mapping
| Part | Property | → Composed primitive |
|---|---|---|
| `ComboboxTrigger` (default) | bg / border / hover / focus / radius / height / padding | inherits `<Button variant="outline" size="md" />` (uses `--button-outline-*` + `--button-radius` + `--button-focus-ring`) |
| `ComboboxTrigger` indicator (chevron) | size / color | `sizing.icon.sm` / inherits Button text color |
| `ComboboxTrigger` displayed value | overflow | `truncate` so a long selected label doesn't push past the trigger width |
| `ComboboxTrigger` placeholder | color | `text.tertiary` (when no value selected) |
| `ComboboxContent` panel | bg / border / radius / shadow / padding | inherits `<PopoverContent />` (uses `--surface-card`, `--border-default`, `--radius-md`, `--shadow-lg`); padding 0 because Command brings its own |
| `ComboboxContent` content | list / item geometry / selected state | inherits `<Command>` (uses `--command-list-max-h`, `--interactive-selected-*`) |
| Selected item check icon | size / color | `sizing.icon.sm` / inherits current Command item text color |

## API
```ts
interface ComboboxItem {
  value: string
  label: React.ReactNode
  /** Extra search terms (cmdk filters on label + keywords). */
  keywords?: string[]
  disabled?: boolean
}

interface ComboboxProps {
  items: ComboboxItem[]
  value?: string                                    // controlled selected value
  defaultValue?: string                             // uncontrolled
  onValueChange?: (value: string) => void
  placeholder?: string                              // default "Select an option…"
  searchPlaceholder?: string                        // default "Search…"
  emptyMessage?: React.ReactNode                    // default "No results found."
  triggerClassName?: string                         // size/width the trigger
  contentClassName?: string                         // size/align the popover panel (default matches trigger width)
  side?: "top" | "right" | "bottom" | "left"        // popover side, default "bottom"
  align?: "start" | "center" | "end"                // popover align, default "start"
  disabled?: boolean
  /** Accessible name for the trigger (when no surrounding <Label htmlFor>). */
  "aria-label"?: string
}

// Slot overrides - use these when the default trigger button or content panel
// isn't what you want (e.g. a custom multi-line trigger, or a virtualized list).
interface ComboboxTriggerProps extends React.ComponentProps<typeof Button> {}
interface ComboboxContentProps extends React.ComponentProps<typeof PopoverContent> {}
```

## States
- **Trigger closed / empty**: outline button with placeholder text in
  `text.tertiary`; chevron on the trailing edge.
- **Trigger closed / has value**: outline button with the selected label in
  `text.primary`; chevron unchanged. `aria-expanded="false"`.
- **Trigger open**: `aria-expanded="true"` (chevron rotation is the
  consumer's call — the kit doesn't impose one to keep the trigger reusable).
  Focus ring shows; Popover panel rendered below.
- **Trigger disabled**: opacity 0.5, `pointer-events:none`, no focus.
- **Content open**: Popover panel with search input + result list; the
  currently-selected item shows the check icon at full opacity, others at 0.
- **List active-descendant**: cmdk marks the highlighted item with
  `data-selected="true"` (separate from `value` — this is the cursor, not
  the chosen value). Renders with `interactive-selected-bg/-text` per Command.
- **Empty**: when the search yields nothing, `<CommandEmpty>` renders the
  `emptyMessage`.

## Accessibility (gate-verified, light & dark)
- The composed primitives implement the WAI-ARIA Combobox-with-Listbox pattern.
  The trigger carries `role="combobox" aria-expanded aria-controls`; the open
  panel hosts `role="listbox"`; items are `role="option" aria-selected`.
- Keyboard model (delegated to Command):
  - Trigger: Tab focuses; Enter / Space / Down opens the panel.
  - Open panel: focus moves to the search input; ArrowUp / ArrowDown navigate
    items; Enter selects and closes; Escape closes without selecting; typing
    filters.
- The selected item must be conveyed by text + the check icon (color is not
  the only indicator — the chevron stays neutral, the check carries the
  "selected" affordance).
- When no surrounding `<Label htmlFor>` exists, consumers must pass
  `aria-label` so the trigger has an accessible name.
- All text inherits Button + Command contrast guarantees: trigger label
  `text.primary` at 15:1 light / 18:1 dark; placeholder `text.tertiary`
  decorative (consumers should still meet AA via a real `<Label>`).
- `measure_render`: visible labels AA · `axe_audit`: 0 violations
  (combobox + listbox + option roles intact) · `verify_states`: trigger
  + item states pass default/hover/focus · `verify_responsive`: no overflow
  @ 280/320/414.

## Usage
```tsx
import { Combobox } from "@/design-system/combobox/combobox"

const frameworks = [
  { value: "next.js",     label: "Next.js" },
  { value: "sveltekit",   label: "SvelteKit" },
  { value: "nuxt.js",     label: "Nuxt.js" },
  { value: "remix",       label: "Remix" },
  { value: "astro",       label: "Astro" },
]

{/* Uncontrolled, with a surrounding Label */}
<Field>
  <Label htmlFor="framework">Framework</Label>
  <Combobox
    id="framework"
    items={frameworks}
    placeholder="Select framework…"
    searchPlaceholder="Search framework…"
    onValueChange={(v) => console.log(v)}
  />
</Field>

{/* Controlled, scoped width */}
const [value, setValue] = React.useState("")
<Combobox
  items={frameworks}
  value={value}
  onValueChange={setValue}
  triggerClassName="w-[240px]"
  contentClassName="w-[240px]"
  aria-label="Pick a framework"
/>

{/* Custom trigger (e.g. a chip in a table row) */}
<Combobox items={statuses} value={value} onValueChange={setValue}>
  <ComboboxTrigger asChild>
    <Badge variant="outline" role="combobox" aria-expanded={open}>
      {label ?? "+ Set status"}
    </Badge>
  </ComboboxTrigger>
</Combobox>
```
