# Alert Dialog - Design System Component (molecule)

Token-driven modal that interrupts the user with important content and expects an
explicit response (confirm / cancel). Built on the Radix AlertDialog primitive:
focus is trapped while open, focus returns to the trigger on close, Escape and the
Cancel action dismiss, and - unlike a plain Dialog - clicking the overlay does NOT
dismiss, forcing a deliberate choice. Hybrid token model: the component reads semantic
colors (`--surface-card`, `--text-primary`, `--text-secondary`, `--border-default`,
`--scrim`) and the spacing/type/radius/shadow tokens directly; the only component-scoped
token is `--dialog-max-w` (no existing token to point at). The footer buttons reuse
`--button-*` via `buttonVariants`; dark mode swaps at the semantic tier only.

Mirrors the Figma **Alert Dialog** component (page `72:2675`, set `3126:2004`):
a black-30% scrim over a centered white panel (rounded-lg, shadow-lg, p-6, gap-4),
an 18/600 title, a 14/regular muted description, and a right-aligned footer with an
outline Cancel + a primary Action.

Files: `alert-dialog.tsx` (React, Radix, `forwardRef`), `alert-dialog-states.html` (gate harness).

## Anatomy

```
┌───────────────────────────────────────────────┐  ← overlay / scrim --scrim (black 30%)
│                                                 │
│      ┌─────────────────────────────────────┐   │  ← AlertDialogContent (centered panel)
│      │  Are you absolutely sure?           │   │  ← AlertDialogTitle  (18/600 text-primary)
│      │  This action cannot be undone …      │   │  ← AlertDialogDescription (14 text-secondary)
│      │                                       │   │     header gap space-2 (8px)
│      │                    [Cancel] [Continue]│   │  ← AlertDialogFooter (Cancel outline + Action primary)
│      └─────────────────────────────────────┘   │     panel padding space-6 (24px)
│                                                 │     section gap space-4 (16px) · footer gap 8px
└───────────────────────────────────────────────┘
```

## Token mapping (property -> token read directly)

Only `--dialog-max-w` is component-scoped; everything else reads a semantic/primitive token.

| Property | Token read | Light | Dark |
|---|---|---|---|
| overlay / scrim | `--scrim` | `rgba(0,0,0,.3)` (Figma #0000004d) | same |
| panel bg | `--surface-card` | `white` | `gray.900` |
| panel border | `--border-default` | `gray.200` | `gray.800` |
| panel radius | `--radius-lg` | 8px | - |
| panel shadow | `--shadow-lg` | elevation-lg | - |
| panel padding | `--space-6` | 24px | - |
| section gap (header->footer) | `--space-4` | 16px | - |
| header gap (title->desc) / footer gap | `--space-2` | 8px | - |
| panel max-width | `--dialog-max-w` | 512px (shadcn sm:max-w-lg) | - |
| title text | `--text-primary` | `gray.900` (Figma #0a0a0a) | `gray.50` |
| title size / weight | `--font-size-lg` / `--font-weight-semibold` | 18px / 600 | - |
| description text | `--text-secondary` | `gray.600` (5.7:1) | `gray.400` |
| description size | `--font-size-sm` | 14px | - |
| button focus ring | `--focus-ring` (via buttonVariants) | double ring, `border.focus` | - |
| Action button | `--button-primary-*` | blue.600 / white | blue.600 / white |
| Cancel button | `--button-outline-*` | white / border / text.primary | gray.900 / border / text.primary |

Figma renders the panel's "primary" Action as neutral-black (#171717) and both texts
at foreground #0a0a0a. The design system maps **by intent**: the Action is the one
main affirmative action -> `--button-primary-*` (house blue); Cancel is neutral ->
`--button-outline-*`; the description drops to `text.secondary` for scan hierarchy.
All clear WCAG AA. A destructive confirm overrides the Action with the destructive
`buttonVariants` (see Usage) - the danger variant then applies everywhere.

## API

```ts
// Composable Radix slots (compound component):
<AlertDialog>                       // Root: open / defaultOpen / onOpenChange
  <AlertDialogTrigger asChild>…     // the control that opens it
  <AlertDialogContent>              // portals + overlay + centered panel (focus trapped)
    <AlertDialogHeader>
      <AlertDialogTitle>            // required: labels the dialog (aria-labelledby)
      <AlertDialogDescription>      // describes it (aria-describedby)
    <AlertDialogFooter>
      <AlertDialogCancel>           // outline button; closes, returns focus to trigger
      <AlertDialogAction>           // primary button; the confirming action
```

All slots forward refs and accept `className`; they extend the matching Radix
`ComponentPropsWithoutRef`. `AlertDialogAction` applies the primary `buttonVariants()`
and `AlertDialogCancel` the `outline` variant by default; override a single instance
(e.g. a destructive confirm) by passing `className={buttonVariants({ variant: "destructive" })}`.

## States

| # | State | Token / behavior |
|---|---|---|
| 1 | Default (open) | scrim `--dialog-overlay` + panel `--dialog-bg`; footer = outline Cancel + primary Action |
| 2 | Hover | each footer button uses its `--button-*-bg-hover` (primary darkens, outline fills) |
| 3 | Focus-visible | `--button-focus-ring` double ring on the focused button; first focus lands on Cancel/Action per Radix |
| 4 | Active / pressed | `--button-*-bg-active` on the pressed button |
| 5 | Open / close motion | overlay fade + panel zoom/fade via `data-[state]` animate utilities; gate behind `prefers-reduced-motion` |
| 6 | Disabled (action) | pass `disabled` to `<AlertDialogAction>`: `opacity:.5` + no pointer events (inherited from Button) |

Loading and Error are **not applicable** to the dialog container - it is a
presentational/control surface, not an async or input element. If the confirm
triggers async work, set `loading` on the Button rendered inside `<AlertDialogAction>`.

## Accessibility (gate-verified, light & dark)
- Radix sets `role="alertdialog"`, `aria-modal="true"`, and wires `aria-labelledby`
  -> Title and `aria-describedby` -> Description automatically.
- Focus is trapped within the panel while open; on close, focus returns to the trigger.
- Keyboard: Tab/Shift+Tab cycle the two actions, Enter activates the focused button,
  **Escape** closes (equivalent to Cancel). Overlay click does NOT close (deliberate).
- Title (`text.primary`) and description (`text.secondary`, 5.7:1) clear AA; the scrim
  is decorative (content sits on the opaque panel, so text contrast is measured there).
- Focus ring meets 3:1 and is visible in both themes.

### Verification (real gate output)
| Gate | Light | Dark |
|---|---|---|
| `check_no_emoji.py` (tsx + html + theme) | OK | - |
| `measure_render.mjs` (text AA) | 12/12 pass | 12/12 pass |
| `verify_states.mjs` (default/hover/focus) | 15/15 pass | 15/15 pass |
| `axe_audit.mjs` (WCAG 2.2 A/AA) | 0 violations | 0 violations |
| `verify_responsive.mjs` | no overflow @280/320/414px | - |

## Usage

```tsx
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogFooter, AlertDialogTitle, AlertDialogDescription,
  AlertDialogAction, AlertDialogCancel,
} from "@/design-system/alert-dialog/alert-dialog"
import { Button, buttonVariants } from "@/design-system/button/button"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Show dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

// Destructive confirm - override the Action with the danger variant
<AlertDialogAction className={buttonVariants({ variant: "destructive" })}>
  Delete account
</AlertDialogAction>
```
