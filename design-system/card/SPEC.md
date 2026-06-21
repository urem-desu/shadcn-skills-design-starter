# Card — Design System Component (molecule)

Token-driven surface container that groups related content and actions. Bordered,
softly elevated panel composed of header / title / description / action / content
/ footer slots. Every value resolves to a `--card-*` token in
`design-system/theme.css`; dark mode swaps at the semantic tier only.

Files: `card.tsx` (React, `forwardRef`, `asChild`), `card-states.html` (gate harness).

## Anatomy

```
┌─────────────────────────────────────────────┐
│ CardHeader   [CardTitle      ] [CardAction]  │  ← grid 1fr / auto
│              [CardDescription ]              │
│ CardContent  …body…                          │
│ CardFooter   [Button] [Button]               │
└─────────────────────────────────────────────┘
  radius --radius-lg (8px) · border --border-default · shadow --shadow-sm
  outer padding-block --space-6 (24px) · section padding-inline --space-6
  inter-slot gap --space-4 (16px)
```

## Token mapping (Component → Semantic → Primitive)

| Token | → Semantic | Light | Dark |
|---|---|---|---|
| `--surface-card` | `surface.card` | `white` | `gray.900` |
| `--border-default` | `border.default` | `gray.200` | `gray.800` |
| `--radius-lg` | `radius.lg` | 8px | — |
| `--shadow-sm` | `shadow.sm` | subtle 1px | — |
| `--shadow-sm-hover` | `shadow.md` | raised | — |
| `--space-6` | `space.6` | 24px | — |
| `--space-4` | `space.4` | 16px | — |
| `--text-primary` | `text.primary` | `gray.900` | `gray.50` |
| `--text-secondary` | `text.secondary` | `gray.600` | `gray.400` |

Title `font-size.lg` (18px) / weight 600 / `line.tight`; description `font-size.sm` (14px) / `line.normal`.

## API

```ts
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean  // raise to --shadow-sm-hover on hover; adds focus ring
  asChild?: boolean      // render the card as a link/button (use with interactive)
}
// Slots: Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter
```

`CardAction` sits in the header's second column (top-aligned, right-justified) for a
trailing button or menu trigger.

## States
Static surface by default — no interactive states. When `interactive` (a card that
is itself a link/button), hover raises elevation (`--shadow-sm` → `--shadow-sm-hover`)
and `:focus-visible` shows the shared `--focus-ring`. Both respect
`prefers-reduced-motion` (transition removed).

## Accessibility (gate-verified, light & dark)
- Container is a neutral grouping element; semantics come from its contents (a real
  heading inside `CardTitle`, real controls in the footer). An interactive card uses a
  real `<button>`/`<a>` (via `asChild`) so it is keyboard-reachable and focus-visible.
- Elevation is decorative; never the sole signal of interactivity.

### Verification (real gate output)
| Gate | Light | Dark |
|---|---|---|
| `measure_render.mjs` (text AA) | 14/14 pass | 14/14 pass |
| `verify_states.mjs` (default/hover/focus) | 21/21 pass | 21/21 pass |
| `axe_audit.mjs` (WCAG 2.2 A/AA) | 0 violations | 0 violations |
| `verify_responsive.mjs` | no overflow @280/320/414px | — |

## Usage

```tsx
<Card>
  <CardHeader>
    <CardTitle>Project Atlas</CardTitle>
    <CardDescription>Shared workspace for the team.</CardDescription>
    <CardAction>
      <Button variant="ghost" size="icon" aria-label="More options"><MoreHorizontal /></Button>
    </CardAction>
  </CardHeader>
  <CardContent>12 active members · updated 2 hours ago.</CardContent>
  <CardFooter>
    <Button>Open</Button>
    <Button variant="secondary">Share</Button>
  </CardFooter>
</Card>

// Whole card is a link, elevates on hover
<Card interactive asChild>
  <a href="/pro"><CardHeader><CardTitle>Upgrade to Pro</CardTitle></CardHeader></a>
</Card>
```
