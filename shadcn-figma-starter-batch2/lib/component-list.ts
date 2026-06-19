/**
 * Flat component catalog — one entry per component, mirroring the Figma kit's
 * one-page-per-component structure (no category grouping). Plain data (no JSX) so
 * the client sidebar can import it cheaply. The live previews live, keyed by the
 * same slug, in `components/docs/component-showcases.tsx`.
 */
export type ComponentMeta = { slug: string; name: string; description: string }

// Descriptions are mirrored verbatim from the Figma kit's per-component
// "Component description" text node (fileKey UOQqHNISgc7bbc8yWt8Vj8), matching
// its exact wording, em-dashes, and quirks. Exceptions are flagged inline.
const entries: { name: string; description: string }[] = [
  { name: "Accordion", description: "A vertically stacked set of interactive headings that each reveal a section of content." },
  { name: "Alert", description: "Displays a callout for user attention." },
  { name: "Alert Dialog", description: "A modal dialog that interrupts the user with important content and expects a response." },
  { name: "Aspect Ratio", description: "Displays content within a desired ratio." },
  // Figma's Avatar page carries Alert Dialog's text (copy-paste artifact in the
  // source). Using the correct Avatar description instead of mirroring the error.
  { name: "Avatar", description: "An image element with a fallback for representing the user." },
  { name: "Badge", description: "Displays a badge or a component that looks like a badge." },
  { name: "Breadcrumb", description: "Displays the path to the current resource using a hierarchy of links." },
  { name: "Button", description: "Displays a button or a component that looks like a button." },
  { name: "Button Group", description: "A container that groups related buttons together with consistent styling." },
  { name: "Calendar", description: "A date field component that allows users to enter and edit date." },
  { name: "Card", description: "Displays a card with header, content, and footer." },
  { name: "Carousel", description: "A carousel with motion and swipe built using Embla." },
  { name: "Chart", description: "Beautiful charts. Built using Recharts. Copy and paste into your apps." },
  { name: "Checkbox", description: "A control that allows the user to toggle between checked and not checked." },
  { name: "Collapsible", description: "An interactive component which expands/collapses a panel." },
  { name: "Combobox", description: "Autocomplete input and command palette with a list of suggestions." },
  { name: "Command", description: "Fast, composable, unstyled command menu for React." },
  { name: "Context Menu", description: "Displays a menu to the user — such as a set of actions or functions — triggered by a button." },
  { name: "Data Table", description: "Powerful table and datagrids built using TanStack Table." },
  { name: "Date Picker", description: "A date picker component with range and presets." },
  { name: "Dialog", description: "A window overlaid on either the primary window or another dialog window, rendering the content underneath inert." },
  { name: "Drawer", description: "A drawer component for React." },
  { name: "Dropdown Menu", description: "Displays a menu to the user — such as a set of actions or functions — triggered by a button." },
  { name: "Empty", description: "Use the Empty component to display a empty state." },
  { name: "Field", description: "Combine labels, controls, and help text to compose accessible form fields and grouped inputs." },
  { name: "Hover Card", description: "For sighted users to preview content available behind a link." },
  { name: "Input", description: "Displays a form input field or a component that looks like an input field." },
  { name: "Input Group", description: "Display additional information or actions to an input or textarea." },
  { name: "Input OTP", description: "Accessible one-time password component with copy paste functionality." },
  { name: "Item", description: "A versatile component that you can use to display any content." },
  { name: "Kbd", description: "Used to display textual user input from keyboard." },
  { name: "Label", description: "Renders an accessible label associated with controls." },
  { name: "Menubar", description: "A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands." },
  { name: "Native Select", description: "A styled native HTML select element with consistent design system integration." },
  { name: "Navigation Menu", description: "A collection of links for navigating websites." },
  { name: "Pagination", description: "Pagination with page navigation, next and previous links." },
  { name: "Popover", description: "Displays rich content in a portal, triggered by a button." },
  { name: "Progress", description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar." },
  { name: "Radio Group", description: "A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time." },
  { name: "Scroll Area", description: "Augments native scroll functionality for custom, cross-browser styling." },
  { name: "Select", description: "Displays a list of options for the user to pick from—triggered by a button." },
  { name: "Separator", description: "Visually or semantically separates content." },
  { name: "Sheet", description: "Extends the Dialog component to display content that complements the main content of the screen." },
  { name: "Sidebar", description: "A composable, themeable and customizable sidebar component." },
  { name: "Skeleton", description: "Use to show a placeholder while content is loading." },
  { name: "Slider", description: "An input where the user selects a value from within a given range." },
  { name: "Sonner", description: "An opinionated toast component for React." },
  { name: "Spinner", description: "An indicator that can be used to show a loading state." },
  { name: "Switch", description: "A control that allows the user to toggle between checked and not checked." },
  { name: "Table", description: "A responsive table component." },
  { name: "Tabs", description: "A set of layered sections of content—known as tab panels—that are displayed one at a time." },
  { name: "Textarea", description: "Displays a form textarea or a component that looks like a textarea." },
  { name: "Toggle", description: "A two-state button that can be either on or off." },
  { name: "Toggle Group", description: "A set of two-state buttons that can be toggled on or off." },
  { name: "Tooltip", description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it." },
]

export const componentList: ComponentMeta[] = entries
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(({ name, description }) => ({
    name,
    description,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
  }))

export const componentSlugs: string[] = componentList.map((c) => c.slug)

export function getComponentMeta(slug: string): ComponentMeta | undefined {
  return componentList.find((c) => c.slug === slug)
}
