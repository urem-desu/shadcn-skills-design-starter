# Menubar — Design System Component

Persistent horizontal menu strip (File / Edit / View…). Compound:
`Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`,
`MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarLabel`,
`MenubarSeparator`, `MenubarShortcut`, `MenubarSub`, `MenubarSubTrigger`,
`MenubarSubContent`.
Thin layer over `@radix-ui/react-menubar` (roving keyboard focus between triggers,
typeahead, portal menus). Shares all surface + item tokens with DropdownMenu and
ContextMenu. One seam: `--menubar-trigger-px` (12px — bare px, no space token).

Figma description: "A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| `Menubar` (strip) | height | `control-sm` | 32px | — |
| `Menubar` | gap (between triggers) | `space-1` | 4px | — |
| `Menubar` | padding-inline | `space-1` | 4px | — |
| `Menubar` | border-radius | `radius-md` | 6px | — |
| `Menubar` | border | `border.default` | `gray.200` | `gray.800` |
| `Menubar` | background | `surface.card` | `white` | `gray.900` |
| `Menubar` | shadow | `shadow.sm` | subtle | — |
| `MenubarTrigger` (resting) | bg | transparent | — | — |
| `MenubarTrigger` (hover/focus/open) | bg | `action.secondary` | `gray.100` | `gray.800` |
| `MenubarTrigger` | padding-inline | `--menubar-trigger-px` | 12px | — |
| `MenubarTrigger` | padding-block | `space-1` | 4px | — |
| `MenubarTrigger` | font-size | `font-size.sm` | 14px | — |
| `MenubarTrigger` | font-weight | `font-weight.medium` | 500 | — |
| `MenubarContent` | (same as DropdownMenuContent) | surface-card + border-default + shadow-lg | — | — |
| `MenubarItem` | (same as DropdownMenuItem) | text-primary + action-secondary hover | — | — |
| `MenubarItem (destructive)` | (same as DropdownMenuItem destructive) | `menu-item-destructive-text` | — | — |
| `MenubarSeparator` | (same as DropdownMenuSeparator) | border-default / 1px | — | — |

## API
```ts
// All compound parts forward to their Radix Menubar counterparts.
// Same props as DropdownMenu equivalents (inset, variant, checked, value, etc.).
interface MenubarTriggerProps extends ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger> {}
interface MenubarItemProps extends ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> {
  inset?: boolean
  variant?: "default" | "destructive"
}
// + MenubarCheckboxItem, MenubarRadioItem, MenubarLabel, MenubarSubTrigger (all mirror DropdownMenu)
```

## States
- **Trigger resting**: transparent bg.
- **Trigger hover/focus/open** (`data-state="open"`): `action.secondary` bg.
- **Item highlighted** (`data-highlighted`): `action.secondary` bg.
- **Item disabled**: opacity 0.5, `pointer-events:none`.
- **Item destructive**: `menu-item-destructive-text`; hover `menu-item-destructive-bg-hover`.
- **CheckboxItem checked**: `<Check>` indicator visible via `ItemIndicator`.
- **RadioItem selected**: `<Circle fill-current>` visible via `ItemIndicator`.

## Accessibility
- Radix implements the WAI-ARIA **Menubar** pattern: `role="menubar"` on the strip,
  `role="menu"` on each content panel, `role="menuitem"` etc. on items.
- Keyboard: Left/Right arrows move between top-level triggers; Down/Enter opens a menu;
  Up/Down navigate items; ArrowRight opens sub-menus; Escape closes; typeahead jumps.
- Focus stays in the menubar strip while navigating; moves into the open menu panel.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent,
  MenubarItem, MenubarSeparator, MenubarLabel, MenubarShortcut,
  MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem,
  MenubarSub, MenubarSubTrigger, MenubarSubContent,
} from "@/design-system/menubar/menubar"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New tab <MenubarShortcut>&#x2318;T</MenubarShortcut></MenubarItem>
      <MenubarItem>New window <MenubarShortcut>&#x2318;N</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print… <MenubarShortcut>&#x2318;P</MenubarShortcut></MenubarItem>
    </MenubarContent>
  </MenubarMenu>

  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Undo <MenubarShortcut>&#x2318;Z</MenubarShortcut></MenubarItem>
      <MenubarItem>Redo <MenubarShortcut>&#x2318;&#x21E7;Z</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>Find</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>Find on page… <MenubarShortcut>&#x2318;F</MenubarShortcut></MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
    </MenubarContent>
  </MenubarMenu>

  <MenubarMenu>
    <MenubarTrigger>View</MenubarTrigger>
    <MenubarContent>
      <MenubarCheckboxItem checked>Show toolbar</MenubarCheckboxItem>
      <MenubarSeparator />
      <MenubarLabel>Zoom</MenubarLabel>
      <MenubarRadioGroup value="100">
        <MenubarRadioItem value="75">75%</MenubarRadioItem>
        <MenubarRadioItem value="100">100%</MenubarRadioItem>
        <MenubarRadioItem value="125">125%</MenubarRadioItem>
      </MenubarRadioGroup>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```
