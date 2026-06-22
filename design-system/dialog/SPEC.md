# Dialog — Design System Component

Token-driven modal window overlaid on the page, rendering the content beneath
inert (Figma "Dialog": _"A window overlaid on either the primary window or
another dialog window, rendering the content underneath inert"_). Built on the
Radix Dialog primitive. Compound: `Dialog`, `DialogTrigger`, `DialogContent`,
`DialogClose`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`,
`DialogOverlay`, `DialogPortal`.

Reuses the `--dialog-max-w` / `--scrim` seams minted by Alert Dialog and reads
`--surface-card` / `--text-primary` / `--text-secondary` / `--border-default`
plus the space/type/radius/shadow scales directly (zero new tokens). Footer
buttons are consumer-provided via the **Button** atom.

**Dialog vs Alert Dialog:** Dialog adds a top-right close (X), the scrim click
**dismisses**, and content/footer are generic (any buttons). Alert Dialog has no
X, the scrim does **not** dismiss, and it forces an explicit Action/Cancel choice.

## Anatomy
```
┌─ scrim (black 30%) ──────────────────────────────┐
│        ┌─ DialogContent ──────────────── [X] ─┐  │
│        │ Edit profile               (title)   │  │
│        │ Make changes to your profile here…   │  │  ← description (muted)
│        │ Name                                 │  │
│        │ [ Pedro Duarte                     ] │  │  ← field (label + input)
│        │ Username                             │  │
│        │ [ @peduarte                        ] │  │
│        │                   [Cancel] [Save…]   │  │  ← footer (right)
│        └──────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| Overlay | bg | `--scrim` | `rgba(0,0,0,.3)` | same |
| Content | position | centered (`top/left 50%`, `-translate-50%`) | — | — |
| Content | width / max-width | `100%` / `--dialog-max-w` | 512px | — |
| Content | gap (sections) | `spacing.scale.4` | 16px | — |
| Content | padding | `spacing.scale.6` | 24px | — |
| Content | border / bg | `border.default` / `surface.card` | `gray.200` / `white` | `gray.800` / `gray.900` |
| Content | radius / shadow | `radius.lg` / `shadow.lg` | 8px | — |
| Close (X) | position | `space-4` from top + right | 16px | — |
| Close (X) | icon size / color | `sizing.icon.sm` / `text.secondary` | 16px / `gray.600` | `gray.400` |
| Close (X) | opacity | 0.7 -> 1 on hover/focus | — | — |
| Close (X) | focus | `--focus-ring` | — | — |
| Header | gap | `spacing.scale.2` | 8px | — |
| Title | font-size / weight | `font-size.lg` / semibold | 18px / 600 | — |
| Title | color / leading | `text.primary` / `line.tight` | `gray.900` / 1.25 | `gray.50` |
| Description | font-size / leading | `font-size.sm` / `line.normal` | 14px / 1.5 | — |
| Description | color | `text.secondary` | `gray.600` | `gray.400` |
| Body | gap (fields) | `spacing.scale.4` | 16px | — |
| Field | label font / color | `font-size.sm` medium / `text.primary` | 14 / 500 | `gray.50` |
| Field | input (Input atom) | `field.*` | h40 / `gray.200` border / 6px | `gray.800` |
| Footer | direction / justify / gap | row / end / `space-2` | 8px | — |
| Footer Cancel (Button secondary) | bg / text | `action.secondary` / `text.primary` | `gray.100` / `gray.900` | `gray.800` / `gray.50` |
| Footer Save (Button primary) | bg / text | `action.primary` / `text.on-action` | `blue.600` / `white` | — |

> The primary footer button uses our brand `--action-primary` (blue) where the
> neutral Figma kit paints it near-black — the design-system's intentional
> primary divergence (same as Button / Alert Dialog), not drift.

## API
```ts
// All parts forward to their Radix Dialog primitive.
interface DialogProps          extends ComponentProps<typeof DialogPrimitive.Root>        {}
interface DialogContentProps   extends ComponentProps<typeof DialogPrimitive.Content>     { showCloseButton?: boolean }  // default true
interface DialogTitleProps       extends ComponentProps<typeof DialogPrimitive.Title>       {}
interface DialogDescriptionProps extends ComponentProps<typeof DialogPrimitive.Description> {}
// DialogTrigger / DialogClose accept `asChild` to compose with the Button atom.
// DialogHeader / DialogFooter are layout <div>s.
```

## States
- **Closed**: only the `DialogTrigger` is rendered.
- **Open**: scrim + centered content animate in (`fade-in` + `zoom-in-95`);
  focus moves into the content and is trapped; the page behind is inert.
- **Close affordances**: the X button, the Cancel button (wrap in
  `<DialogClose asChild>`), Escape, and a scrim click all dismiss; focus returns
  to the trigger.
- **Field focus**: inputs use the Input atom focus ring; the X button lifts to
  opacity 1 + focus ring; footer buttons use their Button variant focus ring.
- **Hover**: X opacity 1; buttons use their variant hover bg.

## Accessibility (gate-verified, light & dark)
- Radix sets `role="dialog"` + `aria-modal="true"`; `DialogTitle` and
  `DialogDescription` are wired as `aria-labelledby` / `aria-describedby`. A
  title is required for an accessible name (use an `sr-only` title if visually
  omitted).
- Focus is trapped while open and returns to the trigger on close (Radix);
  Escape and scrim-click close. The close (X) button has an `sr-only` "Close"
  label; its icon is `aria-hidden`.
- Contrast clears AA in both themes: title `text.primary` 15:1 / 18:1,
  description `text.secondary` 5.7:1 / 7.3:1, field labels + inputs, and both
  footer buttons in default/hover/focus.
- `measure_render`: all labels AA · `axe_audit`: 0 violations (modal structure,
  labelled controls) · `verify_states`: close, inputs, and footer buttons pass
  default/hover/focus · `verify_responsive`: content shrinks below 512px — no
  overflow @ 280/320/414. (Radix focus-trap behaviour is covered by
  `verify_focustrap` against the live React component.)

## Usage
```tsx
"use client"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter,
  DialogTitle, DialogDescription, DialogClose,
} from "@/design-system/dialog/dialog"
import { Button } from "@/design-system/button/button"
import { Input } from "@/design-system/input/input"
import { Label } from "@/design-system/label/label"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="flex flex-col gap-[var(--space-4)]">
      <div className="flex flex-col gap-[var(--space-2)]">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="Pedro Duarte" />
      </div>
      <div className="flex flex-col gap-[var(--space-2)]">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@peduarte" />
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="secondary">Cancel</Button>
      </DialogClose>
      <Button type="submit">Save Changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```
