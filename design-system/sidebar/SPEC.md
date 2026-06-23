# Sidebar — Design System Component

Collapsible navigation rail. Composable architecture:
`SidebarProvider` (context + wrapper) → `Sidebar` (panel) →
`SidebarHeader` / `SidebarContent` / `SidebarFooter` (structural sections) →
`SidebarGroup` / `SidebarGroupLabel` / `SidebarGroupContent` (content groups) →
`SidebarMenu` / `SidebarMenuItem` / `SidebarMenuButton` (nav items) →
`SidebarSeparator` / `SidebarTrigger` (utilities).

Two seams: `--sidebar-w` (expanded width — 240px) and `--sidebar-collapsed-w`
(icon-rail width — 48px). Both are bare-px values with no existing scale token.

Figma description: "A composable, themeable and customizable sidebar component."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| Panel | background | `surface.card` | white | `gray.950` |
| Panel | border | `border.default` | `gray.200` | `gray.700` |
| Panel (expanded) | width | `--sidebar-w` | 240px | — |
| Panel (collapsed) | width | `--sidebar-collapsed-w` | 48px | — |
| Panel | transition | `duration-base` / `ease-in-out` | 200ms | — |
| `SidebarMenuButton` (rest) | color | `text.primary` | `gray.900` | `gray.50` |
| `SidebarMenuButton` (hover) | background | `action.secondary` | `gray.100` | `gray.800` |
| `SidebarMenuButton` (active) | background | `interactive.selected-bg` | `blue.50` | `blue.950` |
| `SidebarMenuButton` (active) | color | `interactive.selected-text` | `blue.700` | `blue.300` |
| `SidebarMenuButton` | focus ring | `shadow.focus-ring` | double ring | — |
| `SidebarGroupLabel` | color | `text.tertiary` | `gray.400` | `gray.500` |
| `SidebarSeparator` | border | `border.default` | `gray.200` | `gray.700` |

## Component seams
```css
--sidebar-w: 240px;
--sidebar-collapsed-w: 48px;
```

## API
```ts
// SidebarProvider — required root wrapper
interface SidebarProviderProps {
  defaultOpen?: boolean       // initial open state (default: true)
  open?: boolean              // controlled open state
  onOpenChange?: (v: boolean) => void
  collapsible?: boolean       // show trigger button (default: true)
  children: React.ReactNode
}

// Sidebar — the panel itself
interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  side?: "left" | "right"   // default: "left"
}

// SidebarMenuButton
interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean          // marks current-page item
  tooltip?: string            // shown as title when sidebar is collapsed
  size?: "sm" | "md"          // default: "md"
}

// useSidebar() — read/set open state from any descendant
interface SidebarContextValue { open: boolean; setOpen: (v: boolean) => void; collapsible: boolean }
```

## States
| State | Visual |
|---|---|
| Expanded | Full-width panel with label text visible |
| Collapsed | Icon-width rail; `SidebarGroupLabel` hidden; item text hidden |
| Item — hover | `action-secondary` background |
| Item — active | `interactive-selected-*` background + text |
| Item — focus | `shadow.focus-ring` |
| Item — disabled | `opacity: 0.5`, no pointer events |

## Accessibility
- `SidebarTrigger` uses `aria-expanded` to announce collapsed/expanded state.
- Active menu item receives `aria-current="page"`.
- When collapsed, `SidebarMenuButton` exposes a native `title` tooltip.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarProvider, SidebarTrigger,
} from "@/design-system/sidebar/sidebar"
import { LayoutDashboard, Settings, Users } from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton tooltip={item.label} isActive={currentPath === item.href}>
                      <item.icon className="size-[var(--icon-sm)]" aria-hidden="true" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 overflow-auto">{children}</main>
    </SidebarProvider>
  )
}
```
