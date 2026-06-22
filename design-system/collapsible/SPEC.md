# Collapsible — Design System Component

Token-driven show / hide primitive on the shadcn/ui foundation. Compound:
`Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`. Tokens: none (hybrid —
the parts are unstyled passthroughs to Radix Collapsible; consumers bring all
visual treatment, so there's nothing to seam).

This component is **structural infrastructure**: it owns the open/closed state,
the trigger ARIA contract, and the content's `data-state` / `data-disabled`
attributes, but it ships no visual opinion of its own. Accordion, Sidebar
collapsible group, "show more" buttons, FAQ rows, and disclosure widgets all
consume Collapsible and apply their own styling on top.

## Token mapping
| Part | Property | → Semantic | Note |
|---|---|---|---|
| `Collapsible` (root) | — | — | Unstyled. `data-slot="collapsible"` + `data-state` |
| `CollapsibleTrigger` | — | — | Unstyled. Inherits whatever the consumer styles it as (button, link). `data-state` mirrors root |
| `CollapsibleContent` | — | — | Unstyled. `data-state` flips between `open`/`closed` for consumer-driven animation; `hidden` attribute is managed by Radix when closed |

> When a consumer needs the standard kit chrome (border, padding, animated
> slide-down), they wire it directly: surface-card / border-default /
> radius-md / space-4 padding, `data-[state=open]:animate-collapsible-down`,
> `data-[state=closed]:animate-collapsible-up`. Accordion already does this
> internally — see `design-system/accordion/`.

## API
```ts
// All three parts forward to their Radix primitive — full Radix API surface.
interface CollapsibleProps extends ComponentProps<typeof RadixCollapsibleRoot> {
  open?: boolean                          // controlled
  defaultOpen?: boolean                   // uncontrolled
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
}

interface CollapsibleTriggerProps extends ComponentProps<typeof RadixCollapsibleTrigger> {
  asChild?: boolean   // render through to a child (e.g. an existing <Button>)
}

interface CollapsibleContentProps extends ComponentProps<typeof RadixCollapsibleContent> {
  asChild?: boolean
  forceMount?: boolean   // keep mounted when closed (for animations or SEO)
}
```

## States
- **Closed** (default): `data-state="closed"` on root, trigger, and content;
  content gets `hidden` attribute and is removed from the accessibility tree.
- **Open**: `data-state="open"` everywhere; content is rendered and exposed
  to AT.
- **Disabled**: `data-disabled` on root and trigger; trigger gains `disabled`
  attribute and is unfocusable. Content state is frozen.
- **Animation hook**: consumers style entry/exit via
  `data-[state=open]:animate-…` / `data-[state=closed]:animate-…`. Radix sets
  `--radix-collapsible-content-height` so a CSS keyframe can slide between
  `0` and the measured height without `auto` jank.

## Accessibility (gate-verified, light & dark)
- Trigger carries `aria-expanded` (true / false), `aria-controls` pointing at
  the content id, and `aria-disabled` (when disabled). All managed by Radix.
- Content carries `id` (matched to `aria-controls`); `hidden` is applied when
  closed so screen readers do not announce its children.
- Keyboard model: Tab reaches the trigger; Enter / Space toggles. When focus
  moves into open content, Tab continues into the first interactive child;
  Shift+Tab returns to the trigger.
- `prefers-reduced-motion`: if the consumer wires an animation, it must use
  the kit's reduced-motion pattern (zero duration or simple fade) — the
  primitive itself has no built-in motion.
- `measure_render`: visible labels AA · `axe_audit`: 0 violations (trigger
  has accessible name + aria-expanded + aria-controls; content is hidden
  when closed) · `verify_responsive`: no overflow @ 280/320/414.

## Usage
```tsx
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent,
} from "@/design-system/collapsible/collapsible"
import { Button } from "@/design-system/button/button"
import { ChevronDown } from "lucide-react"

{/* "Show more" pattern - 3 visible, rest collapsible */}
<div className="space-y-[var(--space-2)]">
  {first3.map((item) => <Item key={item.id} {...item} />)}

  <Collapsible>
    <CollapsibleContent className="space-y-[var(--space-2)]">
      {rest.map((item) => <Item key={item.id} {...item} />)}
    </CollapsibleContent>
    <CollapsibleTrigger asChild>
      <Button variant="ghost" size="sm">
        <ChevronDown className="transition-transform data-[state=open]:rotate-180" />
        Show more
      </Button>
    </CollapsibleTrigger>
  </Collapsible>
</div>

{/* Disclosure widget - "Advanced options" */}
<Collapsible defaultOpen={false}>
  <CollapsibleTrigger asChild>
    <Button variant="outline">Advanced options</Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-[var(--space-3)] rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-card)] p-[var(--space-4)]">
    {/* form fields ... */}
  </CollapsibleContent>
</Collapsible>

{/* Controlled - drive open state from outside */}
const [open, setOpen] = React.useState(false)
<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger asChild>
    <Button>{open ? "Hide" : "Show"} details</Button>
  </CollapsibleTrigger>
  <CollapsibleContent> ... </CollapsibleContent>
</Collapsible>
```
