# Navigation Menu — Design System Component

Horizontal top-nav with expandable mega-menu viewport panels. Compound:
`NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`,
`NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`,
`NavigationMenuViewport`, `NavigationMenuIndicator`.
Thin layer over `@radix-ui/react-navigation-menu` (hover-intent delay,
keyboard nav, aria-haspopup, viewport animation). Two seams:
`--nav-viewport-w` (content panel width) and `--nav-indicator-size` (arrow).

Figma description: "A collection of links for navigating websites."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| `NavigationMenu` | z-index | 10 (bare; no token) | — | — |
| `NavigationMenuList` | gap | `space-1` | 4px | — |
| `NavigationMenuTrigger/Link` | height | `control-sm` | 32px | — |
| `NavigationMenuTrigger/Link` | padding-inline | `space-3` | 12px | — |
| `NavigationMenuTrigger/Link` | padding-block | `space-2` | 8px | — |
| `NavigationMenuTrigger/Link` | border-radius | `radius-md` | 6px | — |
| `NavigationMenuTrigger/Link` | font-size | `font-size.sm` | 14px | — |
| `NavigationMenuTrigger/Link` | font-weight | `font-weight.medium` | 500 | — |
| `NavigationMenuTrigger/Link` | color | `text.primary` | `gray.900` | `gray.50` |
| `NavigationMenuTrigger/Link` (hover) | bg | `action.secondary` | `gray.100` | `gray.800` |
| `NavigationMenuTrigger/Link` (open) | bg | `action.secondary` | — | — |
| `NavigationMenuTrigger/Link` (active) | bg | `interactive.selected-bg` | `blue.50` | `gray.800` |
| `NavigationMenuTrigger/Link` (active) | color | `interactive.selected-text` | `blue.700` | `blue.300` |
| Chevron icon | size | `icon-sm` | 16px | — |
| Chevron icon | color | `text.secondary` | `gray.600` | `gray.400` |
| `NavigationMenuViewport` | top offset | `space-1-5` | 6px | — |
| `NavigationMenuViewport` | border-radius | `radius-lg` | 8px | — |
| `NavigationMenuViewport` | border | `border.default` | `gray.200` | `gray.800` |
| `NavigationMenuViewport` | background | `surface.card` | `white` | `gray.900` |
| `NavigationMenuViewport` | shadow | `shadow.lg` | multi-stop | — |
| `NavigationMenuViewport` | min-width | `--nav-viewport-w` | 400px | — |
| Indicator arrow | size | `--nav-indicator-size` | 8px | — |
| Indicator arrow | background | `border.default` | `gray.200` | `gray.800` |

## API
```ts
// NavigationMenu = Radix Root (value, onValueChange, defaultValue, delayDuration)
// NavigationMenuList = <ul> wrapper
// NavigationMenuItem = <li> wrapper
// NavigationMenuTrigger = trigger button (opens content)
// NavigationMenuContent = panel content (rendered in viewport)
// NavigationMenuLink = plain navigation link (no dropdown)
// NavigationMenuViewport = floating panel host (auto-positioned below list)
// NavigationMenuIndicator = optional arrow pointing to active trigger
// navigationMenuTriggerStyle = className string (for use in asChild link patterns)
```

## States
- **Trigger resting**: transparent bg.
- **Trigger hover/open** (`data-state="open"`): `action.secondary` bg.
- **Trigger active** (`data-active`): `interactive-selected-bg` + `interactive-selected-text`.
- **Chevron**: rotates 180° when `data-state="open"`.
- **Viewport**: `h-[--radix-navigation-menu-viewport-height]` (Radix CSS var) animates height.
- **Dark**: semantic tokens flip at `[data-theme="dark"]`.

## Accessibility
- Radix implements WAI-ARIA `role="navigation"`, `role="menubar"` (trigger list),
  `aria-haspopup`, `aria-expanded`, and manages focus on open/close.
- Keyboard: Tab navigates between triggers; Enter/Space opens; Arrow keys navigate
  inside the open content; Escape closes and returns focus to trigger.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem,
  NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/design-system/navigation-menu/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-[var(--space-2)] p-[var(--space-4)] md:w-[500px] md:grid-cols-2">
          <li>
            <NavigationMenuLink asChild>
              <a href="/design">Design</a>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <a href="/engineering">Engineering</a>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <a href="/pricing" className={navigationMenuTriggerStyle}>Pricing</a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```
