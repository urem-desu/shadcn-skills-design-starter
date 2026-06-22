# Button Group — Design System Component

Token-driven layout that fuses adjacent buttons (or input/select triggers) into
a single connected unit by stripping inner corners and collapsing duplicated
borders. Compound: `ButtonGroup`, `ButtonGroupText`, `ButtonGroupSeparator`.
Tokens: none (hybrid — purely structural; geometry/color come from the children
and existing semantics).

## Token mapping
| Part | Property | → Semantic | → Primitive (light) | Dark |
|---|---|---|---|---|
| `ButtonGroup` (horizontal) | gap | 0 (children flush) | — | — |
| `ButtonGroup` (group of groups) | gap | `spacing.scale.2` | 8px | — |
| `ButtonGroup` (vertical) | flex-direction | column | — | — |
| `ButtonGroup` corner-stripping | each child's outer corner kept; inner corners → 0 | inherits child's `--button-radius` | 6px | — |
| `ButtonGroup` border-collapse | drops inside border on each non-first child | inherits child border | — | — |
| `ButtonGroup` focus-stacking | focused child gets `z-index:10` so its focus ring isn't clipped by neighbors | `--focus-ring` | — | — |
| `ButtonGroupText` | bg | `action.secondary` | `gray.100` | `gray.800` |
| `ButtonGroupText` | text | `text.primary` | `gray.900` | `gray.50` |
| `ButtonGroupText` | border | `border.default` | `gray.200` | `gray.800` |
| `ButtonGroupText` | radius | `radius.md` | 6px | — |
| `ButtonGroupText` | padding-inline | `spacing.scale.4` | 16px | — |
| `ButtonGroupText` | gap (text ↔ icon) | `spacing.scale.2` | 8px | — |
| `ButtonGroupText` | font-size | `typography.fontSize.sm` | 14px | — |
| `ButtonGroupText` | font-weight | `typography.fontWeight.medium` | 500 | — |
| `ButtonGroupText` | shadow | `shadow.sm` | 0 1px 2px rgba(0,0,0,.05) | — |
| `ButtonGroupText` | icon size (default) | `sizing.icon.sm` | 16px | — |
| `ButtonGroupSeparator` | bg | `border.default` | `gray.200` | `gray.800` |
| `ButtonGroupSeparator` | width / height | self-stretch · 1px (horizontal) / 1px tall (vertical) | — | — |

## API
```ts
interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"   // default "horizontal"
}

interface ButtonGroupTextProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean   // render through to a child element via Radix Slot
}

interface ButtonGroupSeparatorProps extends React.ComponentProps<typeof Separator> {
  orientation?: "horizontal" | "vertical"   // default "vertical" (matches the visual axis between two fused buttons)
}
```
Usage rules:
- `ButtonGroup` must contain real `<Button>` / `<input>` / select-trigger children. Order in the DOM = visual order.
- Mixing widths: text inputs flex to fill (`[&>input]:flex-1`); buttons stay `w-fit`.
- Nesting (group of groups): when a `ButtonGroup` is a child of another `ButtonGroup`, an 8px gap is automatically inserted between them so the fused units are visually distinct.

## States
- **Group container**: no states of its own — it's a layout primitive.
- **Child buttons**: keep all their own states (Default / Hover / Focus-visible /
  Active / Disabled / Selected / Loading). The group only adjusts geometry so
  the focus ring stays visible on top of the fused row.
- **Focus-visible**: the focused child is raised to `z-index:10`, so the 2px+2px
  focus ring is never clipped by an adjacent button's edge.
- **Text addon**: non-interactive, single visual state.
- **Separator**: decorative, `aria-hidden`, single visual state.

## Accessibility (gate-verified, light & dark)
- Container exposes `role="group"` so screen readers announce the boundary
  ("group, 3 items") before listing children — keeps related actions grouped
  in the AT tree without inventing a label of our own (consumers may add
  `aria-label="Text formatting"` for toolbars).
- `data-orientation` mirrors visual axis; arrow-key navigation is **not**
  added by the component (compose with `Toggle Group` / a roving-tabindex
  controller when the group must be single-tab-stop, e.g. for toolbars).
- Children remain native interactive elements; their existing keyboard model
  (Enter / Space activates; Tab moves) is preserved.
- Focus-stacking keeps the 3:1 focus ring fully visible against the page
  surface in both themes; border-collapse never removes a child's accessible
  outline.
- `measure_render`: all text AA · `axe_audit`: 0 violations · `verify_states`:
  every interactive child still passes default/hover/focus contrast inside
  the group · `verify_responsive`: no overflow @ 280/320/414.

## Usage
```tsx
import {
  ButtonGroup, ButtonGroupText, ButtonGroupSeparator,
} from "@/design-system/button-group/button-group"
import { Button } from "@/design-system/button/button"

{/* Segmented action */}
<ButtonGroup aria-label="Document actions">
  <Button variant="outline">Save</Button>
  <Button variant="outline">Save and continue</Button>
  <Button variant="outline" size="icon"><ChevronDownIcon /></Button>
</ButtonGroup>

{/* Vertical stack (sidebar) */}
<ButtonGroup orientation="vertical">
  <Button variant="outline">Inbox</Button>
  <Button variant="outline">Drafts</Button>
  <Button variant="outline">Sent</Button>
</ButtonGroup>

{/* Input with addon */}
<ButtonGroup>
  <ButtonGroupText>https://</ButtonGroupText>
  <input className="..." defaultValue="acme.com/blog" />
  <Button variant="outline">Copy</Button>
</ButtonGroup>

{/* Group of groups (8px gap auto-inserted) */}
<ButtonGroup>
  <ButtonGroup>
    <Button variant="outline">B</Button>
    <Button variant="outline">I</Button>
    <Button variant="outline">U</Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button variant="outline">Left</Button>
    <Button variant="outline">Center</Button>
    <Button variant="outline">Right</Button>
  </ButtonGroup>
</ButtonGroup>
```
