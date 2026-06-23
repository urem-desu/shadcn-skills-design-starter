# Sonner — Design System Component

Toast notification provider. Thin wrapper around the `sonner` npm package.
Zero seams: Sonner exposes its own CSS custom properties (`--normal-bg`,
`--normal-border`, `--normal-text`, etc.) that we remap to our semantic
tokens via `toastOptions.classNames`. No component-scoped token file needed.

Figma description: "An opinionated toast component for React."

## Token mapping
| Toast part | Sonner classNames key | → Semantic token | Light | Dark |
|---|---|---|---|---|
| Container | `toast` | `surface.card` bg | white | `gray.950` |
| Container | `toast` | `border.default` border | `gray.200` | `gray.700` |
| Container | `toast` | `shadow-lg` | 4-layer | — |
| Container | `toast` | `radius-lg` | 8px | — |
| Body text | `toast` | `text.primary` | `gray.900` | `gray.50` |
| Description | `description` | `text.secondary` | `gray.500` | `gray.400` |
| Action button | `actionButton` | `action.primary` bg + `action-primary-text` | blue/white | — |
| Cancel button | `cancelButton` | `action.secondary` bg + `text.secondary` | gray | — |
| Success border | `success` | `green.300` | — | — |
| Error text/border | `error` | `text.destructive` / `red.300` | — | — |
| Warning | `warning` | `amber.700` text / `amber.300` border | — | — |
| Info | `info` | `text.link` / `blue.200` border | — | — |

## API
```ts
// Toaster wraps Sonner's <Toaster> with design-system classNames pre-wired
type ToasterProps = React.ComponentProps<typeof Sonner>

// Create toasts from anywhere (no context needed):
import { toast } from "sonner"
toast("Message")
toast.success("Success")
toast.error("Error occurred")
toast.warning("Low disk space")
toast.promise(promise, { loading: "...", success: "Done", error: "Failed" })
```

## States
| Toast type | Visual |
|---|---|
| Default | White/dark card, `border-default`, `text-primary` |
| Success | Green `border-green-300` highlight |
| Error | Red text (`text-destructive`) + `border-red-300` |
| Warning | Amber text + `border-amber-300` |
| Info | Link-blue text + `border-blue-200` |
| With action | Primary button on right |
| Loading | Spinner + description |

## Accessibility
- Sonner renders toasts in a `role="region"` landmark with `aria-label="Notifications"`.
- Each toast uses `role="status"` (default) or `role="alert"` (error/warning) for
  appropriate live-region priority.
- `axe_audit`: 0 violations (Sonner handles ARIA internally).

## Usage
```tsx
// 1. Add Toaster once at the root layout
import { Toaster } from "@/design-system/sonner/sonner"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

// 2. Trigger toasts anywhere in the app
import { toast } from "sonner"

<button onClick={() => toast.success("Profile updated")}>
  Save changes
</button>

// With action button
toast("File deleted", {
  action: {
    label: "Undo",
    onClick: () => restoreFile(),
  },
})
```
