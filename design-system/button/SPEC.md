# Button — Design System Component

Production-ready, fully token-driven Button built on the shadcn/ui foundation
(Radix `Slot` + `class-variance-authority`) and mapped to a DTCG 3-tier token
architecture. Every visual value resolves to a token — no hardcoded colors,
pixels, radii, shadows, durations, easings, or typography.

Files:
- `theme.css` — the 3-tier token layer (primitive → semantic → component) + dark mode + Tailwind v4 `@theme inline` mapping.
- `button.tsx` — the React component (cva, forwardRef, `asChild`, loading, selected).
- `button-states.html` — states harness used to run the accessibility gates.

---

## 1. Anatomy

```
┌──────────────────────────────────────┐
│  [leading icon?]  Label  [trailing?]  │   ← pressable native <button>
└──────────────────────────────────────┘
        gap = --space-2 (8px)
   height = --control-{sm|md|lg}
   padding-inline = --space-{3|4|6}
   radius = --button-radius (--radius-md, 6px)
   focus  = --button-focus-ring (double ring)
```

Icon-only uses `size="icon"` (square) and **requires** `aria-label`.

---

## 2. Token mapping (Primitive → Semantic → Component)

Dark mode swaps at the **semantic** tier only; component and primitive tiers are unchanged.

### Color — fills & text

| Component token | → Semantic | → Primitive (light) | Dark (semantic remap) |
|---|---|---|---|
| `--button-primary-bg` | `--action-primary` | `blue.600` `#2563eb` | unchanged |
| `--button-primary-bg-hover` | `--action-primary-hover` | `blue.700` `#1d4ed8` | unchanged |
| `--button-primary-bg-active` | `--action-primary-active` | `blue.800` `#1e40af` | unchanged |
| `--button-primary-text` | `--text-on-action` | `white` `#ffffff` | unchanged |
| `--button-secondary-bg` | `--action-secondary` | `gray.100` `#f3f4f6` | `gray.800` `#1f2937` |
| `--button-secondary-bg-hover` | `--action-secondary-hover` | `gray.200` `#e5e7eb` | `gray.700` `#374151` |
| `--button-secondary-bg-active` | `--action-secondary-active` | `gray.300` `#d1d5db` | `gray.500` `#6b7280` |
| `--button-secondary-text` | `--text-primary` | `gray.900` `#111827` | `gray.50` `#f9fafb` |
| `--button-ghost-bg` | — | `transparent` | unchanged |
| `--button-ghost-bg-hover` | `--action-secondary` | `gray.100` | `gray.800` |
| `--button-ghost-bg-active` | `--action-secondary-hover` | `gray.200` | `gray.700` |
| `--button-ghost-text` | `--text-primary` | `gray.900` | `gray.50` |
| `--button-destructive-bg` | `--action-destructive` | `red.600` `#dc2626` | unchanged |
| `--button-destructive-bg-hover` | `--action-destructive-hover` | `red.700` `#b91c1c` | unchanged |
| `--button-destructive-bg-active` | `--action-destructive-active` | `red.800` `#991b1b` | unchanged |
| `--button-destructive-text` | `--text-on-action` | `white` | unchanged |
| `--button-link-text` | `--text-link` | `blue.600` | `blue.400` `#60a5fa` |
| `--button-link-text-hover` | `--text-link-hover` | `blue.800` | `blue.300` `#93c5fd` |
| `--button-selected-bg` | `--interactive-selected-bg` | `blue.50` `#eff6ff` | `gray.800` |
| `--button-selected-border` | `--interactive-selected-border` | `blue.200` | `blue.400` |
| `--button-selected-text` | `--interactive-selected-text` | `blue.700` | `blue.300` |
| `--button-disabled-bg` | `--surface-disabled` | `gray.100` | `gray.800` |
| `--button-disabled-text` | `--text-disabled` | `gray.400` `#9ca3af` | `gray.500` |

### Geometry / motion / type

| Component token | → Source | Value |
|---|---|---|
| `--button-radius` | `radius-semantic.button` → `radius.md` | 6px |
| `--button-font-weight` | `typography.fontWeight.medium` | 500 |
| `--button-transition-duration` | `motion.duration.fast` | 100ms |
| `--button-transition-ease` | `motion.easing.ease-out` | `cubic-bezier(0,0,.2,1)` |
| `--button-focus-ring` | `shadows.focus-ring` | `0 0 0 2px page, 0 0 0 4px blue.500` |
| height `sm / md / lg` | `sizing.control.{sm,md,lg}` | 32 / 40 / 48px |
| padding-inline `sm / md / lg` | `spacing.scale.{3,4,6}` | 12 / 16 / 24px |
| font-size `sm / md / lg` | `typography.fontSize.{sm,base,lg}` | 14 / 16 / 18px |
| icon `sm / md / lg` | `sizing.icon.{sm,md,lg}` | 16 / 20 / 24px |
| gap | `spacing.scale.2` | 8px |

---

## 3. Component API

```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "link"  // default "primary"
  size?:    "sm" | "md" | "lg" | "icon"                                  // default "md"
  asChild?: boolean        // render through to a child element (e.g. <a>) via Radix Slot
  loading?: boolean        // spinner + aria-busy + blocks interaction
  loadingText?: string     // label while loading (defaults to children)
  selected?: boolean       // toggle/segmented selected → aria-pressed + selected tokens
  disabled?: boolean
}
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | enum | `primary` | Token role; pick by **intent** — destructive for irreversible actions, never primary. |
| `size` | enum | `md` | `icon` is square; requires `aria-label`. All sizes ≥ 24px target (WCAG 2.5.8); md/lg ≥ 40px. |
| `asChild` | boolean | `false` | Composes onto a child (`<a>`, `Link`). Disabled is expressed as `aria-disabled` in this mode. |
| `loading` | boolean | `false` | Sets `aria-busy="true"`, disables, swaps in a spinning `Loader2`. |
| `loadingText` | string | — | Optional override for the visible/announced label during loading. |
| `selected` | boolean | `false` | Sets `aria-pressed`; applies the selected token set. For toggle/segmented use. |

---

## 4. Variants

Built with `cva`; variant × size × selected resolved at the class layer, so every
combination is token-driven. `compoundVariants` swaps the background to the
selected token set when `selected` is true.

| Variant | Use case | Rest → Hover → Active |
|---|---|---|
| `primary` | The one main affirmative action | blue.600 → 700 → 800, white text |
| `secondary` | Supporting actions | gray.100 → 200 → 300, gray.900 text |
| `ghost` | Tertiary / toolbar / inline | transparent → gray.100 → gray.200 |
| `destructive` | Delete / remove / irreversible | red.600 → 700 → 800, white text |
| `link` | Navigation styled as a button | link color, underline on hover |

---

## 5. States (8)

| # | State | Implementation | Token(s) |
|---|---|---|---|
| 1 | Default | resting | `--button-{variant}-bg` / `-text` |
| 2 | Hover | `:hover` | `--button-{variant}-bg-hover` |
| 3 | Focus | `:focus-visible` → double ring | `--button-focus-ring` |
| 4 | Active / pressed | `:active` | `--button-{variant}-bg-active` |
| 5 | Disabled | `disabled` (or `aria-disabled` when `asChild`) | `opacity .5`, `pointer-events:none`, `cursor:not-allowed` |
| 6 | Loading | `loading` → `Loader2` spinner + `aria-busy` + disabled | `--button-transition-*` |
| 7 | Error | **N/A standalone** — a submit button reflects validation via its form, not its own style | — |
| 8 | Selected | `selected` → `aria-pressed` + selected token set (toggle/segmented only) | `--button-selected-*` |

---

## 6. Accessibility (WCAG 2.2 AA) — gate-verified

- **Semantic HTML:** native `<button>` (or a real element via `asChild`); never a `<div>`.
- **Keyboard:** in the tab order natively; `Enter`/`Space` activate. Disabled via `disabled` removes from tab order; `asChild` uses `aria-disabled` to keep discoverability.
- **Focus indicator:** `--button-focus-ring` is a 2px page-colored spacer + 2px `blue.500` ring (meets 3:1 non-text contrast, visible on any background, on `:focus-visible` only).
- **ARIA:** `aria-busy` while loading; `aria-pressed` when selected; icon-only requires `aria-label`; spinner is `aria-hidden`.
- **Target size:** all sizes ≥ 24×24 (WCAG 2.5.8); md/lg meet the 40px+ recommended touch target.
- **Color independence:** state is never conveyed by color alone — loading adds a spinner, selected adds `aria-pressed` + a border, disabled changes the cursor.

### Verification (real gate output, light + dark)

| Gate | Result |
|---|---|
| `verify_states.mjs` (default/hover/focus contrast) | 57/57 element-states pass AA — light **and** dark |
| `measure_render.mjs` (text AA) | 33/33 text elements pass AA — light **and** dark |
| `axe_audit.mjs` (WCAG 2.2 A/AA: roles, names, labels) | 0 violations — light **and** dark |
| `verify_responsive.mjs` | no horizontal overflow at 280 / 320 / 414px |

> Scope: these gates prove objective correctness (contrast, ARIA, no drift, responsive). Per the session's no-screenshot constraint, the visual "render and look" pass was **not** performed — request it to lift that and I'll screenshot every state.

---

## 7. Tailwind v4 integration

`theme.css` exposes the component tokens to utilities via `@theme inline` (e.g.
`--color-button-primary: var(--button-primary-bg)` → `bg-button-primary`,
`hover:bg-button-primary-hover`). The component consumes those color utilities and
reads geometry/motion tokens through arbitrary-value utilities
(`h-[var(--control-md)]`, `rounded-[var(--button-radius)]`,
`duration-[var(--button-transition-duration)]`). Import order in `app/globals.css`:

```css
@import "tailwindcss";
/* :root + [data-theme="dark"] token layer from theme.css */
@theme inline { /* --color-button-* and --radius-button mappings */ }
```

Dark mode toggles with `data-theme="dark"` on `<html>` (or wire to `next-themes`).

---

## 8. Usage — all variants & states

```tsx
import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"

// Variants
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="link">Learn more</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Add"><Plus /></Button>

// With icons
<Button><Download /> Download</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Saving</Button>
<Button loading loadingText="Saving…">Save</Button>
<Button selected aria-label="Bold">B</Button>     {/* toggle / segmented */}

// asChild — link that looks like a button
<Button asChild>
  <a href="/dashboard">Go to dashboard</a>
</Button>
```
