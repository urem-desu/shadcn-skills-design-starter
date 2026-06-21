# Dropdown Menu - Design System Component (molecule)

Token-driven menu built on the Radix DropdownMenu primitive (focus management,
typeahead, roving tabindex, Escape / outside-click to close, portalling - all for
free). The surface and items resolve to `--dropdown-*` / `--menu-*` tokens in
`design-system/theme.css`; dark mode swaps at the semantic tier. Destructive items
use the danger token set **by intent**, never the primary color.

Files: `dropdown-menu.tsx` (React, Radix wrappers), `dropdown-menu-states.html` (gate harness).

## Anatomy

```
[Trigger v]
   │ (opens)
   ▼
┌───────────────────────────────┐
│ Label                         │  ← --text-secondary, xs, semibold
│ [icon] Item            ⌘P     │  ← --text-primary · shortcut --text-secondary
│ ───────────────────────────── │  ← Separator --border-default
│ [x] CheckboxItem (inset)      │  ← indicator in the --space-6 inset gutter
│ [icon] Sub trigger         ›  │  ← opens SubContent
│ [icon] Disabled item   (.5α)  │  ← opacity .5, pointer-events none
│ ───────────────────────────── │
│ [icon] Destructive item ⇧⌘⌫   │  ← --menu-item-destructive-text
└───────────────────────────────┘
  surface --surface-card · border --border-default · radius --radius-lg
  shadow --shadow-lg · min-w --dropdown-min-w (180px) · max-w --dropdown-max-w
```

## Token mapping (Component → Semantic → Primitive)

| Token | → Semantic | Light | Dark |
|---|---|---|---|
| `--surface-card` | `surface.card` | `white` | `gray.900` |
| `--border-default` | `border.default` | `gray.200` | `gray.800` |
| `--radius-lg` | `radius.lg` | 8px | - |
| `--shadow-lg` | `shadow.lg` | floating | - |
| `--text-primary` | `text.primary` | `gray.900` | `gray.50` |
| `--action-secondary` | `action.secondary` | `gray.100` | `gray.800` |
| `--menu-item-destructive-text` | danger (AA-tuned) | `red.700` | `red.300` |
| `--menu-item-destructive-bg-hover` | danger tint | `red.50` | `action.secondary-hover` (neutral) |
| `--border-default` | `border.default` | `gray.200` | `gray.800` |
| `--text-secondary` | `text.secondary` | `gray.600` | `gray.400` |

> AA tuning (gate-driven): destructive text is `red.700` (not `red.600`, which only
> reaches 3.95:1 on the `red.50` hover). In dark, a saturated red surface cannot carry
> red text at AA, so the destructive hover uses the neutral hover with `red.300` text.
> Disabled items use **opacity .5** on the normal text (house pattern) rather than a
> dim color token, so the underlying color stays AA-measurable.

## API (Radix wrappers)

`DropdownMenu` · `DropdownMenuTrigger` · `DropdownMenuContent` · `DropdownMenuGroup`
· `DropdownMenuItem` (`variant?: "default" | "destructive"`, `inset?`) ·
`DropdownMenuCheckboxItem` · `DropdownMenuRadioGroup` / `DropdownMenuRadioItem` ·
`DropdownMenuLabel` (`inset?`) · `DropdownMenuSeparator` · `DropdownMenuShortcut` ·
`DropdownMenuSub` / `DropdownMenuSubTrigger` / `DropdownMenuSubContent`.

## States

| State | Implementation | Token(s) |
|---|---|---|
| Item resting | base | `--text-primary` on `--surface-card` |
| Item highlighted (hover/keyboard) | Radix `data-[highlighted]` | `--action-secondary` |
| Item focus | roving tabindex (Radix) | highlight = focus (one visual) |
| Destructive | `variant="destructive"` | `--menu-item-destructive-text` / `-bg-hover` |
| Disabled | `disabled` → `data-[disabled]` | `opacity .5`, `pointer-events none` |
| Checked | CheckboxItem / RadioItem indicator | check / dot in inset gutter |
| Sub open | `data-[state=open]` | `--action-secondary` |

## Accessibility (gate-verified, light & dark)
- Radix provides `role="menu"` / `menuitem(checkbox|radio)`, full keyboard model
  (arrows, Home/End, typeahead, Enter/Space, Escape), focus return to trigger, and
  `aria-expanded`/`aria-haspopup` on the trigger.
- Destructive intent is conveyed by an icon + label (e.g. trash + "Delete account"),
  not color alone.
- Checkbox/radio state is exposed via `aria-checked`, not just the indicator glyph.

### Verification (real gate output)
| Gate | Light | Dark |
|---|---|---|
| `measure_render.mjs` (text AA) | 18/18 pass | 18/18 pass |
| `verify_states.mjs` (default/hover/focus, incl. destructive) | 24/24 pass | 24/24 pass |
| `axe_audit.mjs` (WCAG 2.2 A/AA) | 0 violations | 0 violations |
| `verify_responsive.mjs` | no overflow @280/320/414px | - |

## Usage

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="secondary">Open</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuItem><User /> Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem>
    <DropdownMenuItem><CreditCard /> Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut></DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked>Status bar</DropdownMenuCheckboxItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger><UserPlus /> Invite users</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Email</DropdownMenuItem>
        <DropdownMenuItem>Message</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive"><Trash2 /> Delete account</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```
