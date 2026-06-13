# Critical Rules — always enforced

From the official `shadcn-ui/ui` skill. Apply to every line of code, AI-generated or
hand-written. The summary table lives in [`SKILL.md`](../SKILL.md); this is the full set.

## 1. Styling

| Rule | Correct | Wrong |
| --- | --- | --- |
| Semantic tokens only | `bg-primary text-primary-foreground` | `bg-blue-500 text-white` |
| `gap-*` for spacing | `flex flex-col gap-4` | `space-y-4` |
| `size-*` for equal dimensions | `size-10` | `w-10 h-10` |
| `truncate` shorthand | `truncate` | `overflow-hidden text-ellipsis whitespace-nowrap` |
| No manual dark overrides | `bg-background` | `bg-white dark:bg-gray-950` |
| `className` for layout only | `<Card className="max-w-md mx-auto">` | `<Card className="bg-blue-100">` |
| Status colors via Badge or tokens | `<Badge variant="secondary">+20.1%</Badge>` | `<span className="text-emerald-600">` |

## 2. Conditional classes — use `cn()`

```tsx
import { cn } from "@/lib/utils"

<div className={cn(
  "flex items-center",
  isActive ? "bg-primary text-primary-foreground" : "bg-muted"
)} />
```

Never write manual ternaries inside `className` template strings.

## 3. Forms

```tsx
<FieldGroup>
  <Field>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" />
    <FieldDescription>We'll never share your email.</FieldDescription>
  </Field>
</FieldGroup>
```

- Validation: `data-invalid` on **Field**, `aria-invalid` on the **control**
- Disabled: `data-disabled` on Field, `disabled` on the control
- `InputGroup` uses `InputGroupInput` / `InputGroupTextarea` — never raw `Input` / `Textarea` inside `InputGroup`
- Option sets (2–7 choices) use `ToggleGroup`, not a loop of `Button`
- `FieldSet` + `FieldLegend` for grouping checkboxes/radios

## 4. Composition

- **Items inside their Group.** `SelectItem` → `SelectGroup`, `DropdownMenuItem` → `DropdownMenuGroup`, `CommandItem` → `CommandGroup`.
- **Custom triggers:** `asChild` for Radix, `render` for Base UI. Check the `base` field via `npx shadcn@latest info`.
- **Overlay accessibility:** Dialog, Sheet, Drawer always need a Title (use `VisuallyHidden` if it shouldn't render).
- **No manual `z-index`** on overlays.

## 5. Icons

```tsx
// Inside a Button — use data-icon, no sizing
<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>

// Outside a Button — use size-*
<SearchIcon className="size-4" />
```

Import from the project's `iconLibrary` (`lucide`). Don't import new icon packages unless the
user adds one explicitly. Stroke width follows the kit's `stroke-width` scale (default `2`).

## 6. Built-in variants first

Customization priority:
1. Built-in variants (`variant="outline"`, `size="sm"`)
2. `className` for layout
3. New variant via `cva` in the component source
4. Wrapper component
