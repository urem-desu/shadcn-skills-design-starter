# Accordion - Design System Component (molecule)

Token-driven, vertically stacked set of interactive headings that each reveal a
section of content. Built on the Radix Accordion primitive (keyboard model, roving
focus, single/multiple modes, `data-state`). Hybrid token model: every value maps to
an existing semantic/primitive token in `design-system/theme.css`, so the Accordion
mints **no** component tokens - it reads those tokens directly. Dark mode swaps at the
semantic tier only.

Mirrors the Figma **Accordion** component (page `72:2591`, set `3126:1672`): stacked
items separated by a 1px bottom divider, a left-aligned 14/500 trigger title with a
trailing chevron that rotates 180deg on open, and a two-paragraph answer rendered at
the secondary text color.

Files: `accordion.tsx` (React, Radix, `forwardRef`), `accordion-states.html` (gate harness).

## Anatomy

```
┌─────────────────────────────────────────────┐
│  Product Information                      v   │  ← AccordionTrigger (header button)
├───────────────────────────────────────────── │  ← 1px --accordion-item-border (per item)
│  Shipping Details                         v   │
└─────────────────────────────────────────────┘
   open ▼
┌─────────────────────────────────────────────┐
│  Product Information                      ^   │  ← chevron rotated 180deg, aria-expanded=true
│  Our flagship product combines …              │  ← AccordionContent (paragraph 1)
│  Key features include …                       │  ← paragraph 2 (gap --accordion-content-gap)
└─────────────────────────────────────────────┘
  trigger padding-block --accordion-trigger-py (16px) · content padding-bottom 16px
```

## Token mapping (property -> token read directly)

No `--accordion-*` component tokens: each property reads the semantic/primitive token below.

| Property | Token read | Light | Dark |
|---|---|---|---|
| item divider | `--border-default` | `gray.200` (#e5e7eb) | `gray.800` |
| trigger text | `--text-primary` | `gray.900` | `gray.50` |
| trigger weight | `--font-weight-medium` | 500 | - |
| trigger size | `--font-size-sm` | 14px | - |
| trigger padding-block / gap | `--space-4` | 16px | - |
| chevron color | `--text-secondary` | `gray.600` (5.7:1) | `gray.400` |
| content text | `--text-secondary` | `gray.600` | `gray.400` |
| content size | `--font-size-sm` | 14px | - |
| content padding-bottom / gap | `--space-4` | 16px | - |
| focus corner radius | `--radius-sm` | 4px | - |
| focus ring | `--focus-ring` | double ring, `border.focus` | - |
| transition duration / ease | `--duration-base` / `--ease-out` | 200ms / `cubic-bezier(0,0,.2,1)` | - |

Trigger uses `line.normal` (1.5). Figma renders both title and answer at foreground
`#0a0a0a`; the design system applies standard scan hierarchy - title `text.primary`,
answer `text.secondary` - both clearing WCAG AA. The 1px divider maps to Figma `#e5e5e5`.

## API

```ts
// Re-exported Radix Root; pass type/collapsible/value through.
<Accordion type="single" collapsible>   // FAQ pattern (one open at a time)
<Accordion type="multiple">             // independent items

interface AccordionItemProps    extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}     // requires value
interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {}  // disabled supported
interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {}
// Slots: Accordion, AccordionItem, AccordionTrigger, AccordionContent
```

## States

| # | State | Token / behavior |
|---|---|---|
| 1 | Default (collapsed) | `--accordion-trigger-text` on transparent; chevron `--accordion-icon` pointing down |
| 2 | Hover | `text-decoration: underline` on the trigger (shadcn-canonical affordance) |
| 3 | Focus-visible | `--accordion-focus-ring` double ring, rounded `--accordion-radius` |
| 4 | Active / pressed | Radix toggles `data-state`; press immediately resolves to open/closed |
| 5 | Open (expanded) | `aria-expanded=true`, chevron rotates 180deg, content animates in |
| 6 | Disabled | `disabled` trigger: `pointer-events:none` + `opacity:.5` (house pattern) |

Loading and Error are **not applicable** - an accordion is a static disclosure
control, not an async or input element, so it has no busy or validation state.

Open/close animates via `animate-accordion-down` / `animate-accordion-up` keyframes
driving Radix's `--radix-accordion-content-height`; register these in the Tailwind
`@theme` and gate them behind `prefers-reduced-motion` (replace with instant show).

## Accessibility (gate-verified, light & dark)
- Each trigger is a real `<button>` inside an `<h3>` header (`AccordionPrimitive.Header`),
  so headings are navigable and the control is keyboard-reachable.
- Keyboard model (from Radix): Tab moves between triggers, Enter/Space toggles, Up/Down
  arrows move between triggers, Home/End jump to first/last.
- `aria-expanded` + `aria-controls` wire the trigger to its region; the chevron is
  `aria-hidden` (state is conveyed by `aria-expanded`, never by the icon alone).
- Chevron color `text.secondary` is a graphical object at 5.7:1 (AA needs 3:1).
- Focus ring meets 3:1; visible in both themes.

### Verification (real gate output)
| Gate | Light | Dark |
|---|---|---|
| `check_no_emoji.py` (tsx + html + theme) | OK | - |
| `measure_render.mjs` (text AA) | 14/14 pass | 14/14 pass |
| `verify_states.mjs` (default/hover/focus) | 24/24 pass | 24/24 pass |
| `axe_audit.mjs` (WCAG 2.2 A/AA) | 0 violations | 0 violations |
| `verify_responsive.mjs` | no overflow @280/320/414px | - |

## Usage

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/design-system/accordion/accordion"

<Accordion type="single" collapsible defaultValue="product">
  <AccordionItem value="product">
    <AccordionTrigger>Product Information</AccordionTrigger>
    <AccordionContent>
      <p>Our flagship product combines cutting-edge technology with sleek design.</p>
      <p>Key features include advanced processing capabilities and an intuitive UI.</p>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="shipping">
    <AccordionTrigger>Shipping Details</AccordionTrigger>
    <AccordionContent>
      <p>We offer worldwide shipping through trusted courier partners.</p>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="returns">
    <AccordionTrigger disabled>Return Policy</AccordionTrigger>
    <AccordionContent>
      <p>30-day return policy with free return shipping.</p>
    </AccordionContent>
  </AccordionItem>
</Accordion>

// Independent items, multiple open at once
<Accordion type="multiple">…</Accordion>
```
