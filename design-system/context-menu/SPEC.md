# Context Menu — Design System Component

Token-driven contextual menu triggered by right-click (or long-press on touch).
Compound: `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`,
`ContextMenuGroup`, `ContextMenuItem`, `ContextMenuCheckboxItem`,
`ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuLabel`,
`ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuSub`,
`ContextMenuSubTrigger`, `ContextMenuSubContent`.
Thin layer over `@radix-ui/react-context-menu` (focus management, typeahead,
roving tabindex, Escape / outside-click-to-close). Shares all surface + item
tokens with `DropdownMenu` — no additional `--context-menu-*` seams.

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| `ContextMenuContent` | bg | `surface.card` | `white` | `gray.900` |
| `ContextMenuContent` | border | `border.default` | `gray.200` | `gray.800` |
| `ContextMenuContent` | shadow | `shadow.lg` | multi-stop | — |
| `ContextMenuContent` | radius | `radius.lg` | 8px | — |
| `ContextMenuContent` | padding | `spacing.scale.1` | 4px | — |
| `ContextMenuContent` | min-width | `--dropdown-min-w` | 180px | — |
| `ContextMenuContent` | max-width | `--dropdown-max-w` | 320px | — |
| `ContextMenuItem` (resting) | text | `text.primary` | `gray.900` | `gray.50` |
| `ContextMenuItem` (highlighted) | bg | `action.secondary` | `gray.800` text on `gray.100` | `gray.700` |
| `ContextMenuItem` (disabled) | opacity | 0.5 + `pointer-events:none` | — | — |
| `ContextMenuItem` (destructive) | text | `menu.item.destructive.text` | `red.700` | `red.300` |
| `ContextMenuItem` (destructive hover) | bg | `menu.item.destructive.bg.hover` | `red.50` | `action.secondary.hover` |
| `ContextMenuItem` (inset) | padding-inline-start | `spacing.scale.6` | 24px | — |
| `ContextMenuItem` padding | padding-block / -inline | `space-1-5` / `space-2` | 6px / 8px | — |
| `ContextMenuItem` gap (icon ↔ text) | gap | `spacing.scale.2` | 8px | — |
| `ContextMenuItem` icon | size | `sizing.icon.sm` | 16px | — |
| `ContextMenuCheckboxItem` indicator | left offset | `spacing.scale.2` | 8px | — |
| `ContextMenuRadioItem` dot | size | `spacing.scale.1-5` (fill-current) | 6px | — |
| `ContextMenuLabel` | font-size / weight | `font-size.sm` / semibold | 14px / 600 | — |
| `ContextMenuLabel` | color | `text.primary` | `gray.900` | `gray.50` |
| `ContextMenuSeparator` | height / bg | 1px / `border.default` | `gray.200` | `gray.800` |
| `ContextMenuSeparator` | margin-inline | `-spacing.scale.1` (bleed) | -4px | — |
| `ContextMenuShortcut` | font-size / color / tracking | `font-size.xs` / `text.secondary` / widest | 12px / `gray.600` | `gray.400` |
| `ContextMenuSubTrigger` (open) | bg | `action.secondary` | same as highlighted | — |

## API
```ts
// All parts forward to their Radix primitive — full Radix API surface.
// Same props as DropdownMenu counterparts (inset, variant, checked, etc.).

interface ContextMenuItemProps extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> {
  inset?: boolean
  variant?: "default" | "destructive"
}
interface ContextMenuCheckboxItemProps extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem> {}
interface ContextMenuRadioItemProps    extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>    {}
interface ContextMenuLabelProps        extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>        { inset?: boolean }
interface ContextMenuSubTriggerProps   extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger>   { inset?: boolean }
```

## States
- **Item resting**: transparent bg, `text.primary`.
- **Item highlighted** (`data-highlighted`, set by Radix on keyboard/pointer focus): `action.secondary` bg.
- **Item disabled** (`data-disabled`): opacity 0.5, no pointer events, skipped by keyboard nav.
- **Item destructive**: `menu.item.destructive.text`; on hover `menu.item.destructive.bg.hover`.
- **CheckboxItem checked** (`aria-checked="true"`): shows `<Check>` indicator via `ItemIndicator`.
- **RadioItem selected** (`aria-checked="true"`): shows `<Circle fill-current>` via `ItemIndicator`.
- **SubTrigger open** (`data-state="open"`): same `action.secondary` bg as highlighted.
- **Trigger closed**: no visual change — trigger wraps any arbitrary element.

## Accessibility (gate-verified, light & dark)
- Radix implements the WAI-ARIA **Menu** pattern: `role="menu"` on content,
  `role="menuitem"` / `role="menuitemcheckbox"` / `role="menuitemradio"` on items.
- Keyboard model: ArrowUp / ArrowDown navigate items; Enter / Space activate;
  ArrowRight opens sub-menu; ArrowLeft / Escape closes; typeahead jumps to first
  matching item.
- Focus returns to the trigger element on close (Radix manages).
- `ContextMenuTrigger` wraps the right-click area — Radix handles the contextmenu
  event cross-platform (long-press on touch automatically).
- `ContextMenuLabel` uses `role="presentation"` in the harness (it is non-interactive);
  groups use `aria-labelledby` to announce the label to AT.
- Shortcut chips are `aria-hidden` / decorative — they annotate items visually;
  the shortcut itself must be registered as a keyboard listener by the consumer.
- All text in both themes clears AA: item resting `text.primary` 15:1 / 18:1,
  shortcut `text.secondary` 5.7:1 / 7.3:1, destructive `menu-item-destructive-text`
  6.5:1 / light (5.8:1 on hover bg).
- `axe_audit`: 0 violations · `verify_states`: 3 element-states AA ·
  `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent,
  ContextMenuGroup, ContextMenuItem, ContextMenuCheckboxItem,
  ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuLabel,
  ContextMenuSeparator, ContextMenuShortcut,
  ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent,
} from "@/design-system/context-menu/context-menu"

<ContextMenu>
  <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-[var(--border-strong)] text-sm">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent className="w-64">
    <ContextMenuGroup>
      <ContextMenuItem inset>
        Back <ContextMenuShortcut>&#x2318;[</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset disabled>
        Forward <ContextMenuShortcut>&#x2318;]</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset>
        Reload <ContextMenuShortcut>&#x2318;R</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem>Save Page As…</ContextMenuItem>
          <ContextMenuItem>Create Shortcut…</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
    </ContextMenuGroup>

    <ContextMenuSeparator />

    <ContextMenuCheckboxItem checked>Show Bookmarks Bar</ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>

    <ContextMenuSeparator />

    <ContextMenuLabel inset>People</ContextMenuLabel>

    <ContextMenuSeparator />

    <ContextMenuRadioGroup value="pedro">
      <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
      <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>
```
