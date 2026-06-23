# Tabs — Design System Component

Radix-based tab strip with panel. Zero seams: all values map to existing
semantic/primitive tokens. The active trigger elevates to a card surface
(`surface-card`) inside the sunken list container. Inactive triggers use
`text-secondary` and fade to `text-primary` on hover.

Figma description: "A set of layered sections of content — known as tab panels — that are displayed one at a time."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| `TabsList` | background | `surface.sunken` | `gray.100` | `gray.800` |
| `TabsList` | border-radius | `radius-md` | 6px | — |
| `TabsList` | height | `control-md` | 40px | — |
| `TabsList` | padding | `space-1` | 4px | — |
| `TabsList` | gap | `space-1` | 4px | — |
| `TabsTrigger` (active) | background | `surface.card` | white | `gray.950` |
| `TabsTrigger` (active) | color | `text.primary` | `gray.900` | `gray.50` |
| `TabsTrigger` (active) | shadow | `shadow-sm` | sm shadow | — |
| `TabsTrigger` (inactive) | color | `text.secondary` | `gray.500` | `gray.400` |
| `TabsTrigger` (inactive hover) | color | `text.primary` | `gray.900` | `gray.50` |
| `TabsTrigger` | border-radius | `radius-sm` | 4px | — |
| `TabsTrigger` | padding | `space-3` / `space-1-5` | 12px / 6px | — |
| `TabsTrigger` | font-size | `font-size-sm` | 14px | — |
| `TabsTrigger` | font-weight | `font-weight-medium` | 500 | — |
| `TabsTrigger` | focus ring | `shadow.focus-ring` | double ring | — |
| `TabsContent` | margin-top | `space-2` | 8px | — |
| `TabsContent` | focus ring | `shadow.focus-ring` + `radius-md` | — | — |

## API
```ts
// Tabs = Radix Root
const Tabs   // type, defaultValue, value, onValueChange, orientation, dir

// TabsList = Radix List
interface TabsListProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.List> {}

// TabsTrigger = Radix Trigger
interface TabsTriggerProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  value: string   // must match a TabsContent value
}

// TabsContent = Radix Content
interface TabsContentProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  value: string
}
```

## States
| State | Visual |
|---|---|
| Active trigger | `surface-card` bg + `shadow-sm` + `text-primary` |
| Inactive trigger (rest) | transparent bg + `text-secondary` |
| Inactive trigger (hover) | transparent bg + `text-primary` |
| Trigger focus | `shadow.focus-ring` |
| Trigger disabled | `opacity: 0.5`, no pointer events |
| Content | Visible only for the matching active `value` (Radix manages) |

## Accessibility
- Radix Tabs implements the WAI-ARIA Tabs pattern: `role="tablist"`, each
  `TabsTrigger` is `role="tab"`, each `TabsContent` is `role="tabpanel"`.
- `aria-selected` and `aria-controls` / `aria-labelledby` are wired by Radix.
- Keyboard: Arrow keys move between tabs; Enter/Space activate; Home/End jump.
- `axe_audit`: 0 violations · `verify_responsive`: tabs wrap/scroll @ narrow viewports.

## Usage
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/design-system/tabs/tabs"

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Account settings panel content.
  </TabsContent>
  <TabsContent value="password">
    Password change form.
  </TabsContent>
  <TabsContent value="notifications">
    Notification preferences.
  </TabsContent>
</Tabs>
```
