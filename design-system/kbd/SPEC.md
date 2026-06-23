# Kbd — Design System Component

Semantic `<kbd>` element styled as a keyboard key chip: `surface-sunken`
background, `border-default` border + bottom shadow to simulate key depth,
monospace font. Zero component-scoped seams — reads shared `--surface-*`,
`--border-*`, `--font-*`, `--space-*`, `--radius-*`, `--text-*` tokens.

Figma description: "Used to display textual user input from keyboard."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| `Kbd` | border-radius | `radius-sm` | 4px | — |
| `Kbd` | border | `border.default` | `gray.200` | `gray.800` |
| `Kbd` | background | `surface.sunken` | `gray.50` | `black` |
| `Kbd` | padding-inline | `space-1-5` | 6px | — |
| `Kbd` | padding-block | `space-0-5` | 2px | — |
| `Kbd` | font-size | `font-size.xs` | 12px | — |
| `Kbd` | font-weight | `font-weight.medium` | 500 | — |
| `Kbd` | font-family | mono (`font-mono` utility) | — | — |
| `Kbd` | color | `text.secondary` | `gray.600` | `gray.400` |
| `Kbd` | line-height | `line-tight` | 1.25 | — |
| `Kbd` | box-shadow | `0 1px 0 var(--border-default)` | simulates key depth | — |

## API
```ts
// Kbd extends all native <kbd> (HTMLElement) attributes
const Kbd = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>
// children = key label (text or symbol: "⌘", "Ctrl", "Enter", "⇧", etc.)
```

## States
- **Default**: `surface-sunken` bg + border + bottom shadow.
- **Dark**: semantic tokens flip; sunken becomes `black`, border becomes `gray.800`.
- No interactive states — `Kbd` is informational only.

## Accessibility
- Uses the semantic `<kbd>` HTML element — assistive technology announces
  "keyboard key" automatically in some browsers.
- Inline in text: `Press <Kbd>⌘K</Kbd> to open command palette.`
- Compound keys: each key in its own `<Kbd>`, separated by `+` text:
  `<Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>`
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import { Kbd } from "@/design-system/kbd/kbd"

// Single key
<Kbd>Enter</Kbd>
<Kbd>⌘K</Kbd>
<Kbd>Esc</Kbd>

// Compound shortcut
<span className="inline-flex items-center gap-[var(--space-1)]">
  <Kbd>⌘</Kbd>
  <Kbd>Shift</Kbd>
  <Kbd>P</Kbd>
</span>

// Inline in prose
<p className="text-sm text-[var(--text-secondary)]">
  Press <Kbd>⌘K</Kbd> to open the command palette.
</p>

// In a menu shortcut (paired with ContextMenuShortcut / DropdownMenuShortcut)
<ContextMenuItem>
  New tab <ContextMenuShortcut><Kbd>⌘T</Kbd></ContextMenuShortcut>
</ContextMenuItem>
```
