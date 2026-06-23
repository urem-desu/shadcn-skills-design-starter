import * as React from "react"
import type { Preview, Decorator } from "@storybook/nextjs-vite"
import { Inter, Geist_Mono } from "next/font/google"

// Real design tokens (Tailwind v4 @theme + :root / .dark) — same source as the app.
import "../app/globals.css"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-inter" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

/**
 * Apply the selected theme to the document root so that portalled overlays
 * (Dialog, DropdownMenu, Tooltip, Sheet…) — which render to document.body,
 * outside the story wrapper — inherit the same `.dark` tokens as the canvas.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? "light"

  React.useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    root.classList.add(fontSans.variable, fontMono.variable)
    document.body.style.backgroundColor = "var(--background)"
    document.body.style.color = "var(--foreground)"
  }, [theme])

  return (
    <div
      className={`${fontSans.variable} ${fontMono.variable} bg-background text-foreground`}
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", padding: "1.5rem" }}
    >
      <Story />
    </div>
  )
}

const preview: Preview = {
  // Generate an Autodocs page for every component meta.
  tags: ["autodocs"],
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Design-system color theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Mirror the app's surfaces so contrast checks run against real tokens.
    backgrounds: {
      options: {
        page: { name: "Page", value: "#ffffff" },
        dark: { name: "Dark", value: "#0a0a0a" },
      },
    },
    a11y: {
      // 'error' fails the Vitest/a11y run on violations; 'todo' only reports.
      test: "error",
    },
  },
}

export default preview
