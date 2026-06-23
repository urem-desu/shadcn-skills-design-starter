# Sheet — Design System Component

Slide-in side panel (left / right / top / bottom). Built on Radix Dialog — same
focus-trap, scrim, Escape-to-close, and `aria-modal` semantics as Dialog, but
content slides in from an edge instead of centering. Re-uses `--scrim`,
`--dialog-max-w` (when panel needs a max-width). One additional seam:
`--sheet-side-size` (width for left/right panels, height for top/bottom — 360px,
no scale token).

Figma description: "Extends the Dialog component to display content that complements the main content of the screen."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| `SheetOverlay` | background | `--scrim` | `rgba(0,0,0,.3)` | `rgba(0,0,0,.3)` |
| `SheetContent` | background | `surface.card` | white | `gray.950` |
| `SheetContent` | padding | `space-6` | 24px | — |
| `SheetContent` | gap (flex) | `space-4` | 16px | — |
| `SheetContent` | shadow | `shadow-lg` | 4-layer shadow | — |
| `SheetContent` (left/right) | width | `--sheet-side-size` | 360px | — |
| `SheetContent` (top/bottom) | height | `--sheet-side-size` | 360px | — |
| Edge border | border | `border.default` | `gray.200` | `gray.700` |
| Transition | duration | `duration-base` | 200ms | — |
| Transition | easing | `ease-in-out` | cubic-bezier(.4,0,.2,1) | — |
| Close button (rest) | color | `text.secondary` | `gray.500` | `gray.400` |
| Close button (hover bg) | background | `action.secondary` | `gray.100` | `gray.800` |
| Close button | focus ring | `shadow.focus-ring` | double ring | — |
| `SheetTitle` | font-size | `font-size-lg` | 18px | — |
| `SheetTitle` | font-weight | `font-weight-semibold` | 600 | — |
| `SheetDescription` | font-size | `font-size-sm` | 14px | — |
| `SheetDescription` | color | `text.secondary` | `gray.500` | `gray.400` |

## API
```ts
// Sheet — Radix Dialog Root
const Sheet = SheetPrimitive.Root

// SheetContent — animated slide panel
interface SheetContentProps extends ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  side?: "top" | "right" | "bottom" | "left"   // default: "right"
}

// Convenience sub-components
const SheetTrigger   // Radix Dialog.Trigger
const SheetClose     // Radix Dialog.Close
const SheetPortal    // Radix Dialog.Portal
const SheetOverlay   // Radix Dialog.Overlay (scrim)
const SheetHeader    // <div> with flex-col gap-1.5
const SheetFooter    // <div> with flex-col-reverse → sm:flex-row justify-end
const SheetTitle     // Radix Dialog.Title
const SheetDescription // Radix Dialog.Description
```

## States
| State | Visual |
|---|---|
| Closed | Panel off-screen; no scrim |
| Opening | Slides in + scrim fades in (`duration-base`, `ease-in-out`) |
| Open | Panel visible; close button accessible; scrim blocks background |
| Closing | Slides out + scrim fades (`data-[state=closed]:slide-out-to-*`) |
| Close hover | Close `X` button bg → `action-secondary` |
| Close focus | Focus ring via `shadow.focus-ring` |

## Accessibility
- Radix Dialog: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` wired to
  `SheetTitle`, `aria-describedby` to `SheetDescription`.
- Focus is trapped inside the panel; Tab cycles within; Escape closes.
- Focus returns to the trigger element on close.
- `axe_audit`: 0 violations · `verify_focustrap`: Tab stays inside, Escape closes,
  focus returns · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import {
  Sheet, SheetContent, SheetDescription, SheetFooter,
  SheetHeader, SheetTitle, SheetTrigger,
} from "@/design-system/sheet/sheet"
import { Button } from "@/design-system/button/button"

// Right-side sheet (default)
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open settings</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when done.
      </SheetDescription>
    </SheetHeader>
    {/* form fields ... */}
    <SheetFooter>
      <Button type="submit">Save changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>

// Left-side navigation panel
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" aria-label="Open menu">
      <MenuIcon />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetTitle>Navigation</SheetTitle>
    {/* nav links ... */}
  </SheetContent>
</Sheet>
```
