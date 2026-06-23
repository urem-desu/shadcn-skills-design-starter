/**
 * Component documentation data — structured content for each design system component.
 * Populated in batches. Missing entries fall back to the live showcase (no doc section shown).
 */

export interface PropDef {
  prop: string
  type: string
  default?: string
  description: string
}

export interface TokenDef {
  property: string
  token: string
  light?: string
  dark?: string
}

export interface StateDef {
  state: string
  description: string
}

export interface VariantDef {
  name: string
  description: string
}

export interface ComponentDoc {
  slug: string
  anatomy?: string
  slots?: string[]
  props?: PropDef[]
  variants?: VariantDef[]
  states?: StateDef[]
  do?: string[]
  dont?: string[]
  a11y?: string[]
  tokens?: TokenDef[]
  usage?: string
}

// ─── Batch 1: Accordion → Button ─────────────────────────────────────────────

const accordion: ComponentDoc = {
  slug: "accordion",
  anatomy: `┌─────────────────────────────────────────────┐
│  Product Information                      v   │  ← AccordionTrigger (<button> in <h3>)
├──────────────────────────────────────────────┤  ← 1px divider (--border-default)
│  Shipping Details                         v   │
└─────────────────────────────────────────────┘

  open ▼

┌─────────────────────────────────────────────┐
│  Product Information                      ^   │  ← chevron rotates 180deg, aria-expanded=true
│                                               │
│  Our flagship product combines …              │  ← AccordionContent
│  Key features include …                       │
└─────────────────────────────────────────────┘
  trigger padding-block: 16px · content padding-bottom: 16px`,
  slots: [
    "Accordion — root; accepts type and collapsible",
    "AccordionItem — one row; requires a unique value prop",
    "AccordionTrigger — the visible heading button",
    "AccordionContent — the revealed body (animates on open/close)",
  ],
  props: [
    { prop: "type", type: '"single" | "multiple"', description: 'Single: at most one panel open. Multiple: each item is independent.' },
    { prop: "collapsible", type: "boolean", default: "false", description: "When type is single, allow toggling the open panel closed. Recommended for FAQ patterns." },
    { prop: "defaultValue", type: "string | string[]", description: "Uncontrolled: the item(s) open on first render." },
    { prop: "value", type: "string | string[]", description: "Controlled open item(s). Pair with onValueChange." },
    { prop: "onValueChange", type: "(value: string | string[]) => void", description: "Fired when the open panel changes." },
    { prop: "disabled", type: "boolean", default: "false", description: "On AccordionItem: prevents the trigger from toggling. Renders at 50% opacity." },
  ],
  states: [
    { state: "Default (collapsed)", description: "Trigger uses --text-primary; chevron points down; content hidden (height: 0)." },
    { state: "Hover", description: "Trigger text gains underline decoration — the canonical shadcn affordance." },
    { state: "Focus-visible", description: "Double focus ring (--focus-ring) with --radius-sm rounding." },
    { state: "Active / pressed", description: "Radix toggles data-state on pointer-up; the press resolves immediately to open or closed." },
    { state: "Open (expanded)", description: "aria-expanded=true; chevron rotates 180deg; content animates in via accordion-down keyframe." },
    { state: "Disabled", description: "pointer-events:none + opacity:0.5 on the trigger. Content stays hidden." },
  ],
  do: [
    "Use type=\"single\" collapsible for FAQ — only one answer visible at a time keeps the page scannable.",
    "Use type=\"multiple\" when items are independent and users may need to compare content across panels.",
    "Keep trigger labels concise — they double as headings for screen reader users.",
    "Respect prefers-reduced-motion: replace the height animation with an instant show/hide.",
  ],
  dont: [
    "Don't nest Accordions — the heading level collision and keyboard model become confusing.",
    "Don't use Accordion for a single expandable section — use Collapsible instead.",
    "Don't put critical information only inside a collapsed panel if users need it without interaction.",
  ],
  a11y: [
    "Each AccordionTrigger is a real <button> wrapped in an <h3> header, so it participates in the heading outline and is reachable by keyboard.",
    "Keyboard: Tab moves between triggers; Enter/Space toggles; Up/Down arrows navigate between triggers; Home/End jump to first/last.",
    "aria-expanded and aria-controls are wired automatically by Radix — the chevron is aria-hidden (state is conveyed by aria-expanded, not the icon).",
    "Chevron color (text.secondary, 5.7:1) clears the 3:1 graphical object requirement. Trigger text clears AA.",
  ],
  tokens: [
    { property: "Item divider", token: "--border-default", light: "gray.200 (#e5e7eb)", dark: "gray.800" },
    { property: "Trigger text color", token: "--text-primary", light: "gray.900", dark: "gray.50" },
    { property: "Trigger font size", token: "--font-size-sm", light: "14px", dark: "—" },
    { property: "Trigger font weight", token: "--font-weight-medium", light: "500", dark: "—" },
    { property: "Trigger / content padding", token: "--space-4", light: "16px", dark: "—" },
    { property: "Chevron / content text", token: "--text-secondary", light: "gray.600 (5.7:1)", dark: "gray.400" },
    { property: "Focus ring", token: "--focus-ring", light: "2px blue-500 + 2px page bg", dark: "2px blue-500 + 2px dark bg" },
    { property: "Transition duration", token: "--duration-base", light: "200ms", dark: "—" },
    { property: "Transition easing", token: "--ease-out", light: "cubic-bezier(0,0,.2,1)", dark: "—" },
  ],
  usage: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/design-system/accordion/accordion"

// Single-open FAQ (recommended)
<Accordion type="single" collapsible defaultValue="shipping">
  <AccordionItem value="product">
    <AccordionTrigger>Product Information</AccordionTrigger>
    <AccordionContent>
      <p>Our flagship product combines cutting-edge technology with sleek design.</p>
      <p>Key features include advanced processing and an intuitive interface.</p>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="shipping">
    <AccordionTrigger>Shipping Details</AccordionTrigger>
    <AccordionContent>
      <p>We offer worldwide shipping through trusted courier partners.</p>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="returns" disabled>
    <AccordionTrigger>Return Policy</AccordionTrigger>
    <AccordionContent>Not available at this time.</AccordionContent>
  </AccordionItem>
</Accordion>

// Multiple-open (compare contents side by side)
<Accordion type="multiple">…</Accordion>`,
}

const alert: ComponentDoc = {
  slug: "alert",
  anatomy: `┌▏────────────────────────────────────────────┐
│▏  [icon]  AlertTitle                          │  ▏= 4px left accent bar
│▏           AlertDescription paragraph …       │
└▏────────────────────────────────────────────┘
  grid: [icon-md  1fr] · gap-x: 12px · radius: --radius-lg
  padding: --space-4 (16px) · title: 14px/600 · body: 14px/400`,
  slots: [
    "Alert — the tinted container (<div role=\"alert|status\">)",
    "AlertTitle — bold heading line (font-weight 600)",
    "AlertDescription — supporting body text (text-secondary color)",
  ],
  props: [
    { prop: "variant", type: '"info" | "success" | "warning" | "error"', default: '"info"', description: "Controls background, text, accent bar, and icon color. Also determines the live-region role." },
    { prop: "icon", type: "React.ReactNode", description: "Override the per-variant default Lucide icon. Pass null explicitly to remove it (not recommended for accessibility)." },
    { prop: "role", type: "string", description: "Auto-set: error/warning → \"alert\" (assertive); info/success → \"status\" (polite). Override when the page context demands a different politeness." },
  ],
  variants: [
    { name: "info", description: "Blue tint. Default. Use for neutral announcements and tips." },
    { name: "success", description: "Green tint. Use to confirm a completed action." },
    { name: "warning", description: "Amber tint. Use when user attention is needed but the action is not yet failed." },
    { name: "error", description: "Red tint. Use when an operation has failed and user action is required." },
  ],
  states: [
    { state: "Static (default)", description: "Non-interactive container. Renders tinted background + left accent bar + icon." },
    { state: "Embedded link hover/focus", description: "Any <a> inside inherits alert text color and receives the standard --focus-ring." },
  ],
  do: [
    "Always pair color with a distinct icon — color alone is not sufficient (WCAG 1.4.1).",
    "Use error/warning with role=\"alert\" so screen readers announce changes assertively.",
    "Keep AlertTitle short and action-oriented; put detail in AlertDescription.",
    "Place the alert near the content it describes — not only at the top of the page.",
  ],
  dont: [
    "Don't use Alert for interactive confirmations — use AlertDialog instead.",
    "Don't nest alerts; if multiple messages appear together, use a toast stack (Sonner).",
    "Don't omit AlertTitle — a description without a title loses scan hierarchy.",
    "Don't use error styling for non-error situations; variant meaning must match content.",
  ],
  a11y: [
    "error and warning variants render role=\"alert\" (assertive live region) — screen readers interrupt and announce immediately.",
    "info and success variants render role=\"status\" (polite live region) — announced at the next idle moment.",
    "Each variant's Lucide icon is aria-hidden; the title text carries the semantic meaning.",
    "WCAG 1.4.1 compliance: meaning is conveyed by icon shape + text label, not color alone.",
  ],
  tokens: [
    { property: "info: background", token: "--alert-info-bg", light: "blue.100", dark: "blue.800" },
    { property: "info: text", token: "--alert-info-text", light: "blue.700", dark: "blue.100" },
    { property: "info: accent / icon", token: "--alert-info-accent", light: "blue.600", dark: "blue.300" },
    { property: "success: background", token: "--alert-success-bg", light: "green.100", dark: "green.800" },
    { property: "success: text", token: "--alert-success-text", light: "green.800", dark: "green.100" },
    { property: "warning: background", token: "--alert-warning-bg", light: "amber.100", dark: "amber.800" },
    { property: "warning: text", token: "--alert-warning-text", light: "amber.800", dark: "amber.100" },
    { property: "error: background", token: "--alert-error-bg", light: "red.100", dark: "red.800" },
    { property: "error: text", token: "--alert-error-text", light: "red.700", dark: "red.100" },
    { property: "Accent bar width", token: "--alert-accent-width", light: "4px", dark: "—" },
    { property: "Padding", token: "--alert-padding / --space-4", light: "16px", dark: "—" },
    { property: "Border radius", token: "--radius-lg", light: "8px", dark: "—" },
  ],
  usage: `import { Alert, AlertTitle, AlertDescription } from "@/design-system/alert/alert"

// Default info
<Alert>
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>A new version of the editor is available.</AlertDescription>
</Alert>

// Error — announces assertively to screen readers
<Alert variant="error">
  <AlertTitle>Payment failed</AlertTitle>
  <AlertDescription>Your card was declined. Update billing and try again.</AlertDescription>
</Alert>

// Success with custom icon
<Alert variant="success" icon={<PartyPopper />}>
  <AlertTitle>Changes saved successfully</AlertTitle>
</Alert>`,
}

const alertDialog: ComponentDoc = {
  slug: "alert-dialog",
  anatomy: `┌───────────────────────────────────────────────┐  ← overlay scrim (black 30%)
│                                                 │
│      ┌─────────────────────────────────────┐   │  ← AlertDialogContent (centered panel)
│      │  Are you absolutely sure?           │   │    radius: --radius-lg · shadow: --shadow-lg
│      │                                       │   │    padding: 24px · max-w: 512px
│      │  This action cannot be undone …      │   │  ← AlertDialogDescription (text-secondary)
│      │                                       │   │    header gap: 8px · section gap: 16px
│      │                    [Cancel] [Continue]│   │  ← AlertDialogFooter (right-aligned)
│      └─────────────────────────────────────┘   │    footer gap: 8px
│                                                 │
└───────────────────────────────────────────────┘`,
  slots: [
    "AlertDialog — root (controls open state)",
    "AlertDialogTrigger — the control that opens the dialog (asChild supported)",
    "AlertDialogContent — portals the panel; traps focus; renders scrim",
    "AlertDialogHeader — vertical stack wrapping Title + Description",
    "AlertDialogTitle — required; announces the dialog to screen readers (aria-labelledby)",
    "AlertDialogDescription — provides context (aria-describedby)",
    "AlertDialogFooter — right-aligned action row",
    "AlertDialogCancel — outline button; closes and returns focus to trigger",
    "AlertDialogAction — primary button; the confirming action",
  ],
  props: [
    { prop: "open", type: "boolean", description: "Controlled open state. Pair with onOpenChange." },
    { prop: "defaultOpen", type: "boolean", default: "false", description: "Uncontrolled initial open state." },
    { prop: "onOpenChange", type: "(open: boolean) => void", description: "Fired when the dialog opens or closes." },
    { prop: "asChild", type: "boolean", default: "false", description: "On AlertDialogTrigger: merges props onto the child element instead of rendering a button." },
  ],
  states: [
    { state: "Open", description: "Scrim fades in; panel zooms in with a subtle scale+fade. Focus is trapped; first focus lands on AlertDialogCancel." },
    { state: "Closed", description: "Panel scales out + fades; scrim fades; focus returns to the trigger element." },
    { state: "Hover (buttons)", description: "Cancel: outline fills with secondary hover. Action: primary darkens to blue.700." },
    { state: "Focus-visible (buttons)", description: "Double focus ring (--button-focus-ring) on the focused button." },
    { state: "Active / pressed", description: "--button-*-bg-active on the pressed button." },
    { state: "Disabled (Action)", description: "Pass disabled to AlertDialogAction: opacity:0.5 + no pointer events." },
  ],
  do: [
    "Use AlertDialog for destructive or irreversible actions that require explicit confirmation (delete, revoke, override).",
    "Label the Action button with the specific action ('Delete account', not 'OK') — users should know what they're confirming.",
    "For destructive confirms, pass className={buttonVariants({ variant: 'destructive' })} to AlertDialogAction.",
    "Keep the description short — one sentence explaining why the action can't be undone.",
  ],
  dont: [
    "Don't use AlertDialog for informational messages — use Dialog (the overlay dismisses on click there) or Alert.",
    "Don't dismiss on overlay click — AlertDialog is intentional; the user must choose Cancel or Action.",
    "Don't use the same button style for both Cancel and Action — the visual weight difference signals which is the primary choice.",
    "Don't skip AlertDialogTitle — it is required for aria-labelledby and causes an a11y violation if absent.",
  ],
  a11y: [
    "Radix sets role=\"alertdialog\" and aria-modal=\"true\" automatically; the modal attribute prevents screen readers from reading background content.",
    "Focus is trapped within the panel while open; Tab and Shift+Tab cycle only the two action buttons.",
    "Escape closes the dialog (equivalent to Cancel) — this is a required ARIA keyboard contract.",
    "On close, focus returns to the element that triggered the dialog (Radix manages this automatically).",
    "AlertDialogTitle is required: it becomes the accessible name via aria-labelledby. AlertDialogDescription provides additional context via aria-describedby.",
  ],
  tokens: [
    { property: "Overlay / scrim", token: "--scrim", light: "rgba(0,0,0,0.3)", dark: "same" },
    { property: "Panel background", token: "--surface-card", light: "white", dark: "gray.900" },
    { property: "Panel border", token: "--border-default", light: "gray.200", dark: "gray.800" },
    { property: "Panel radius", token: "--radius-lg", light: "8px", dark: "—" },
    { property: "Panel shadow", token: "--shadow-lg", light: "elevation-lg", dark: "—" },
    { property: "Panel padding", token: "--space-6", light: "24px", dark: "—" },
    { property: "Title color", token: "--text-primary", light: "gray.900", dark: "gray.50" },
    { property: "Description color", token: "--text-secondary", light: "gray.600 (5.7:1)", dark: "gray.400" },
    { property: "Action button", token: "--button-primary-*", light: "blue.600 bg / white text", dark: "same" },
    { property: "Cancel button", token: "--button-outline-*", light: "white bg / border / text.primary", dark: "gray.900 bg" },
  ],
  usage: `import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogFooter,
  AlertDialogTitle, AlertDialogDescription,
  AlertDialogAction, AlertDialogCancel,
} from "@/design-system/alert-dialog/alert-dialog"
import { buttonVariants } from "@/design-system/button/button"

// Standard confirmation
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Show dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. Your data will be permanently removed.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

// Destructive confirm — danger variant on the Action
<AlertDialogAction className={buttonVariants({ variant: "destructive" })}>
  Delete account
</AlertDialogAction>`,
}

const aspectRatio: ComponentDoc = {
  slug: "aspect-ratio",
  anatomy: `┌─────────────────────────────────────────────┐  ← consumer wrapper (overflow-hidden rounded-*)
│  <div data-slot="aspect-ratio">             │  ← AspectRatio (position: relative; aspect-ratio: ratio)
│    <child className="size-full …">          │  ← image / video / iframe (fills the box)
│    </child>                                 │
│  </div>                                     │
└─────────────────────────────────────────────┘
  The wrapper reserves height from the ratio before the medium loads (CLS = 0).`,
  props: [
    { prop: "ratio", type: "number", default: "1", description: "Width-to-height ratio. Common values: 16/9 (widescreen), 4/3 (classic), 3/2 (photo), 1 (square), 9/16 (portrait)." },
  ],
  states: [
    { state: "None", description: "Aspect Ratio is a structural wrapper — it has no interactive states. The child element governs all visual and interactive behavior." },
  ],
  do: [
    "Apply overflow-hidden and rounded-* on the consumer wrapper, not on the AspectRatio itself — this keeps the component free of visual opinions.",
    "Use object-cover on <img>/<video> children to crop to the box; use object-contain to fit without clipping.",
    "Always provide alt text on <img> children and title on <iframe> children — the component itself contributes no accessible label.",
    "Use ratio={16/9} for embedded videos, ratio={1} for avatar tiles, ratio={4/3} for thumbnails.",
  ],
  dont: [
    "Don't set a fixed height on the child — the aspect-ratio CSS property sets it automatically.",
    "Don't skip alt/title on child media — the wrapper is invisible to assistive tech.",
    "Don't use AspectRatio for text content whose height is inherently variable.",
  ],
  a11y: [
    "The wrapper element (data-slot=\"aspect-ratio\") is a non-interactive container with no role or label — it is transparent to assistive technology.",
    "The child element must carry its own accessible label: alt for <img>, title for <iframe>, or aria-label for CSS-painted content.",
    "The ratio reserves space before content loads, eliminating Cumulative Layout Shift (CLS = 0) — this is an indirect a11y benefit for cognitive load and reading continuity.",
  ],
  tokens: [
    { property: "None", token: "—", light: "—", dark: "—" },
  ],
  usage: `import { AspectRatio } from "@/design-system/aspect-ratio/aspect-ratio"

{/* 16:9 image */}
<div className="w-full max-w-md overflow-hidden rounded-[var(--radius-lg)]">
  <AspectRatio ratio={16 / 9}>
    <img
      src="/cover.jpg"
      alt="Mountain ridge at sunset"
      className="size-full object-cover"
    />
  </AspectRatio>
</div>

{/* Embedded map — 4:3 */}
<AspectRatio ratio={4 / 3}>
  <iframe
    title="Office location"
    src="https://www.openstreetmap.org/export/embed.html"
    className="size-full border-0"
  />
</AspectRatio>

{/* Square placeholder tile */}
<AspectRatio ratio={1} className="rounded-[var(--radius-md)] bg-[var(--surface-sunken)]" />`,
}

const avatar: ComponentDoc = {
  slug: "avatar",
  anatomy: `┌───────────────────┐
│  ┌─────────────┐   │  ← consumer (stacked group uses negative margin + ring)
│  │  img (fade) │   │  ← Avatar (position: relative; border-radius: full)
│  │  ─────────  │   │    size sm/md/lg: 32/40/48px
│  │    CN       │   │  ← fallback initials (aria-hidden once image loads)
│  └─────────────┘   │
└───────────────────┘
  ring = --avatar-border (surface.card) · bg = --avatar-bg · text = --avatar-text`,
  props: [
    { prop: "name", type: "string", description: "Required. Used as the <img> alt attribute and to derive the 2-character initials fallback." },
    { prop: "src", type: "string", description: "Image URL. When provided, the image fades in over the initials on load." },
    { prop: "fallback", type: "string", description: "Override the auto-derived initials (e.g. pass 'AL' for 'Ada Lovelace')." },
    { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Control size: 32px / 40px / 48px." },
  ],
  states: [
    { state: "Default (initials)", description: "Initials rendered on --avatar-bg (gray.200 light, gray.700 dark)." },
    { state: "Image loading", description: "Initials visible while the image src is fetched." },
    { state: "Image loaded", description: "Image fades in (--duration-base, 200ms) over the initials." },
    { state: "Image error", description: "Falls back to initials gracefully — no broken image icon shown." },
    { state: "Stacked group", description: "Negative inline-start margin with --avatar-border ring creates the overlapping stack." },
  ],
  do: [
    "Always pass the name prop — it becomes the img alt and the initials source; omitting it is an a11y violation.",
    "Use stacked groups (negative margin) for showing multiple users in a compact space; add a +N overflow badge for >5.",
    "Use size=\"sm\" in data tables and compact lists; size=\"lg\" in profile headers.",
  ],
  dont: [
    "Don't use Avatar for non-person entities without adjusting alt to match — a product logo avatar needs alt=\"Company logo\", not a person's name.",
    "Don't hardcode initials that diverge from name — use the fallback prop instead so the two stay in sync.",
  ],
  a11y: [
    "The name prop becomes the <img alt> attribute — it is announced by screen readers as the accessible label.",
    "Initials are aria-hidden once the image successfully loads, preventing double-announcement ('CN shadcn image').",
    "Initials text contrast (--avatar-text on --avatar-bg): gray.700 on gray.200 = 4.6:1 in light mode, gray.100 on gray.700 = 7.3:1 in dark — both clear AA.",
  ],
  tokens: [
    { property: "Background (initials)", token: "--avatar-bg", light: "gray.200", dark: "gray.700" },
    { property: "Text (initials)", token: "--avatar-text", light: "gray.700 (4.6:1)", dark: "gray.100 (7.3:1)" },
    { property: "Ring (stacked group)", token: "--avatar-border → --surface-card", light: "white", dark: "gray.900" },
    { property: "Border radius", token: "--avatar-radius → --radius-full", light: "9999px", dark: "—" },
    { property: "Size sm", token: "--control-sm → sizing.control.sm", light: "32px", dark: "—" },
    { property: "Size md", token: "--control-md → sizing.control.md", light: "40px", dark: "—" },
    { property: "Size lg", token: "--control-lg → sizing.control.lg", light: "48px", dark: "—" },
    { property: "Fade duration", token: "--duration-base", light: "200ms", dark: "—" },
  ],
  usage: `import { Avatar } from "@/design-system/avatar/avatar"

{/* Image with name */}
<Avatar name="shadcn" src="https://github.com/shadcn.png" />

{/* Initials only — large */}
<Avatar name="Vercel" size="lg" />

{/* Custom initials */}
<Avatar name="Ada Lovelace" fallback="AL" />

{/* Stacked group */}
<div className="flex -space-x-2">
  <Avatar name="Alice" src="/alice.jpg" size="sm" />
  <Avatar name="Bob" src="/bob.jpg" size="sm" />
  <Avatar name="Charlie" size="sm" />
</div>`,
}

const badge: ComponentDoc = {
  slug: "badge",
  anatomy: `┌───────────────────────┐
│  [icon?]  Label text  │  ← Badge (<span> or asChild element)
└───────────────────────┘
  radius: --badge-radius (full) · padding: 2px 8px
  font: 12px / weight 500 · icon: 12px (icon.xs)`,
  props: [
    { prop: "variant", type: '"neutral" | "primary" | "success" | "warning" | "error" | "outline"', default: '"neutral"', description: "Controls background color, text color, and border (outline only)." },
    { prop: "asChild", type: "boolean", default: "false", description: "Render the Badge as its child element (e.g. an <a> or <button>) while applying all Badge styles." },
  ],
  variants: [
    { name: "neutral", description: "Gray tint. Default. Use for general labels, counts, and tags with no semantic meaning." },
    { name: "primary", description: "Blue tint. Use for selected state, active filters, or brand-aligned labels." },
    { name: "success", description: "Green tint. Use for verified, complete, active, or passed states." },
    { name: "warning", description: "Amber tint. Use for pending, review-needed, or at-risk states." },
    { name: "error", description: "Red tint. Use for failed, rejected, overdue, or critical states." },
    { name: "outline", description: "Transparent background with border. Use for version numbers, inactive labels, or secondary metadata." },
  ],
  states: [
    { state: "Static (default)", description: "Non-interactive <span>. No hover or focus states." },
    { state: "Interactive (asChild)", description: "When asChild wraps an <a> or <button>, the child element carries hover/focus/active states inherited from its own styles." },
  ],
  do: [
    "Pair the badge color with an icon or descriptive text — color alone is not sufficient (WCAG 1.4.1).",
    "Use asChild to make a badge navigable: <Badge asChild variant=\"primary\"><a href=\"/tag\">new</a></Badge>.",
    "Keep badge text to 1–3 words maximum. For longer labels, use a Tag or Pill pattern instead.",
    "Match variant to semantic meaning consistently: success always means 'good', error always means 'failed'.",
  ],
  dont: [
    "Don't use Badge as a primary call-to-action — use Button instead.",
    "Don't rely on color alone to convey status — always add an icon or text label.",
    "Don't use multiple high-contrast variants in the same row — it creates visual noise.",
  ],
  a11y: [
    "Badge is a decorative label by default (<span>). Screen readers announce its text content as inline text.",
    "Color conveys reinforcement only — the text label is the accessible meaning (WCAG 1.4.1).",
    "When asChild wraps an interactive element, all host element accessibility rules apply (focus indicator, aria-label for icon-only badges).",
    "Text size is 12px (xs) — verify that the color pair still meets 4.5:1 at this size. All built-in variants are gate-verified to meet AA.",
  ],
  tokens: [
    { property: "neutral: background", token: "--badge-neutral-bg", light: "gray.100", dark: "gray.800" },
    { property: "neutral: text", token: "--badge-neutral-text", light: "gray.700", dark: "gray.100" },
    { property: "primary: background", token: "--badge-primary-bg", light: "blue.100", dark: "blue.800" },
    { property: "primary: text", token: "--badge-primary-text", light: "blue.700", dark: "blue.100" },
    { property: "success: background", token: "--badge-success-bg", light: "green.100", dark: "green.800" },
    { property: "success: text", token: "--badge-success-text", light: "green.800 (AA)", dark: "green.100" },
    { property: "warning: background", token: "--badge-warning-bg", light: "amber.100", dark: "amber.800" },
    { property: "warning: text", token: "--badge-warning-text", light: "amber.800 (AA)", dark: "amber.100" },
    { property: "error: background", token: "--badge-error-bg", light: "red.100", dark: "red.800" },
    { property: "error: text", token: "--badge-error-text", light: "red.700 (AA)", dark: "red.100" },
    { property: "Border radius", token: "--badge-radius → --radius-full", light: "9999px", dark: "—" },
  ],
  usage: `import { Badge } from "@/design-system/badge/badge"
import { Check } from "lucide-react"

<Badge>Neutral</Badge>
<Badge variant="primary">New</Badge>
<Badge variant="success"><Check className="size-3" />Verified</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="outline">v1.2.0</Badge>

{/* As a link */}
<Badge asChild variant="primary">
  <a href="/tag/new">new</a>
</Badge>`,
}

const breadcrumb: ComponentDoc = {
  slug: "breadcrumb",
  anatomy: `<nav aria-label="breadcrumb">
  <ol>                              ← BreadcrumbList (flex, gap: 8px, font-size: 14px)
    <li>                            ← BreadcrumbItem
      <a href="/">Home</a>          ← BreadcrumbLink (text-secondary → text-primary on hover)
    </li>
    <li aria-hidden role="presentation">  ← BreadcrumbSeparator (chevron-right, 12px)
    </li>
    <li>
      <span aria-current="page">   ← BreadcrumbPage (text-primary, non-interactive)
        Current
      </span>
    </li>
  </ol>
</nav>`,
  slots: [
    "Breadcrumb — <nav aria-label=\"breadcrumb\"> landmark",
    "BreadcrumbList — <ol> flex container",
    "BreadcrumbItem — <li> wrapper",
    "BreadcrumbLink — <a> (or asChild) trail link; hover lightens to text.primary",
    "BreadcrumbPage — <span aria-current=\"page\"> current location indicator",
    "BreadcrumbSeparator — decorative <li aria-hidden>; defaults to ChevronRight",
    "BreadcrumbEllipsis — collapses a deep path; wrap in a DropdownMenu trigger",
  ],
  states: [
    { state: "Trail link — default", description: "text.secondary color (gray.600 / gray.400)." },
    { state: "Trail link — hover", description: "text.primary (gray.900 / gray.50); 100ms ease-out transition." },
    { state: "Trail link — focus-visible", description: "Standard --focus-ring double ring." },
    { state: "Current page", description: "text.primary color; aria-current=\"page\"; not a link (non-interactive)." },
    { state: "Separator", description: "Decorative only; aria-hidden; no interactive state." },
    { state: "Ellipsis", description: "36×36px hit area; aria-hidden icon + visually-hidden 'More' label." },
  ],
  do: [
    "Always wrap trail items in BreadcrumbLink (real <a> elements) — they support middle-click, context menu, and right-click 'open in new tab'.",
    "Use BreadcrumbPage for the current location — it renders aria-current=\"page\" which screen readers announce explicitly.",
    "Use asChild on BreadcrumbLink to pass your router's <Link> component: <BreadcrumbLink asChild><Link href=\"/\">Home</Link></BreadcrumbLink>.",
    "Collapse long paths with BreadcrumbEllipsis wrapped in a DropdownMenu — reveal the hidden crumbs on click.",
  ],
  dont: [
    "Don't use <button> elements for trail crumbs — breadcrumb navigation is link-based.",
    "Don't skip the nav aria-label — without it, screen readers can't distinguish this landmark from other <nav> elements on the page.",
    "Don't make the current page a link — it should be non-interactive (BreadcrumbPage, not BreadcrumbLink).",
    "Don't show more than 5 visible crumbs without collapsing — use BreadcrumbEllipsis for deep paths.",
  ],
  a11y: [
    "The outer <nav aria-label=\"breadcrumb\"> creates a navigation landmark, discoverable via screen reader landmark shortcuts.",
    "BreadcrumbPage renders aria-current=\"page\" — the most important breadcrumb a11y requirement; screen readers announce 'current page'.",
    "BreadcrumbSeparator is aria-hidden and role=\"presentation\" — separators are not announced.",
    "Trail link contrast: gray.600 on page bg = 7.0:1 (light); hover gray.900 = 16.1:1. Both clear AA at 14px.",
    "BreadcrumbEllipsis has a visually-hidden 'More' label so screen readers can identify the control even though the icon is hidden.",
  ],
  tokens: [
    { property: "Trail link color", token: "--text-secondary", light: "gray.600 (7.0:1)", dark: "gray.400" },
    { property: "Trail link hover", token: "--text-primary", light: "gray.900 (16.1:1)", dark: "gray.50" },
    { property: "Current page color", token: "--text-primary", light: "gray.900", dark: "gray.50" },
    { property: "Font size", token: "--font-size-sm", light: "14px", dark: "—" },
    { property: "List gap", token: "--space-2", light: "8px", dark: "—" },
    { property: "Item gap (item ↔ separator)", token: "--space-1-5", light: "6px", dark: "—" },
    { property: "Separator icon size", token: "--icon-xs", light: "12px", dark: "—" },
    { property: "Ellipsis hit area", token: "--space-9", light: "36px × 36px", dark: "—" },
    { property: "Focus ring", token: "--focus-ring", light: "2px blue-500 + 2px page bg", dark: "2px blue-500 + dark bg" },
    { property: "Transition", token: "--transition-micro", light: "100ms ease-out", dark: "—" },
  ],
  usage: `import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage,
  BreadcrumbSeparator, BreadcrumbEllipsis,
} from "@/design-system/breadcrumb/breadcrumb"

{/* Standard 3-level path */}
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Aurora launch</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

{/* Deep path — collapse middle */}
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Settings</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
}

const button: ComponentDoc = {
  slug: "button",
  anatomy: `┌──────────────────────────────────────────┐
│  [leading icon?]  Label  [trailing icon?] │  ← <button> (or asChild element)
└──────────────────────────────────────────┘
  height: --control-{sm|md|lg} → 32/40/48px
  padding-inline: --space-{3|4|6} → 12/16/24px
  radius: --button-radius (--radius-md, 6px)
  gap: --space-2 (8px)
  focus: --button-focus-ring (double ring, blue-500)`,
  props: [
    { prop: "variant", type: '"primary" | "secondary" | "ghost" | "destructive" | "link" | "outline"', default: '"primary"', description: "Visual style and semantic intent of the button." },
    { prop: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"', description: "Controls height, padding, and font size. icon renders a square (no padding) for icon-only buttons." },
    { prop: "asChild", type: "boolean", default: "false", description: "Render the button as its child element (e.g. a Next.js <Link>) while applying all button styles." },
    { prop: "loading", type: "boolean", default: "false", description: "Shows a spinner; sets aria-busy and prevents interaction while true." },
    { prop: "disabled", type: "boolean", default: "false", description: "Prevents interaction; sets opacity:0.5 and pointer-events:none." },
    { prop: "selected", type: "boolean", default: "false", description: "Applies the selected state visual (blue tint bg + border). Use for toggle buttons." },
  ],
  variants: [
    { name: "primary", description: "Blue filled. Use for the single main affirmative action on a surface." },
    { name: "secondary", description: "Gray filled. Use for secondary or alternative actions alongside a primary." },
    { name: "ghost", description: "Transparent background. Use for low-emphasis actions that need minimal visual weight." },
    { name: "outline", description: "White/card bg with border. Use for cancel actions or equal-weight alternatives." },
    { name: "destructive", description: "Red filled. Use for delete, remove, or revoke actions. Never primary for destructive." },
    { name: "link", description: "Looks like a text link. Use for inline navigation-style actions." },
  ],
  states: [
    { state: "Default", description: "Base background, text, and border per variant." },
    { state: "Hover", description: "--button-*-bg-hover: primary darkens to blue.700; secondary/ghost fills with gray.200." },
    { state: "Focus-visible", description: "--button-focus-ring: 2px offset ring (blue-500) visible in both themes." },
    { state: "Active / pressed", description: "--button-*-bg-active: one step darker than hover. Resolves on pointer-up." },
    { state: "Disabled", description: "--button-disabled-bg (gray.100) + --button-disabled-text (gray.400); pointer-events:none." },
    { state: "Loading", description: "Spinner replaces or joins label; aria-busy=true; pointer-events:none." },
    { state: "Selected", description: "Blue-50 bg + blue.200 border + blue.700 text (light). For toggle button patterns." },
  ],
  do: [
    "Use exactly one primary button per section — it marks the single most important action.",
    "Use destructive variant for delete/remove/revoke — never primary (blue) for an action that destroys data.",
    "For icon-only buttons, always pass aria-label: <Button size=\"icon\" aria-label=\"Close dialog\"><X /></Button>.",
    "Use asChild to make a button a Next.js Link without losing button styles: <Button asChild><Link href=\"/…\">Go</Link></Button>.",
    "Use loading state for async actions — it communicates 'in progress' and prevents double-submit.",
  ],
  dont: [
    "Don't use primary for destructive actions — use the destructive variant consistently wherever the same action appears.",
    "Don't style secondary as a colored filled button — secondary is always a gray (neutral) fill. Color goes on primary or destructive only.",
    "Don't use multiple primary buttons side by side — demote one to secondary or ghost.",
    "Don't use an icon-only button without aria-label — it is invisible to screen readers.",
    "Don't disable buttons as the primary error prevention strategy — prefer validation feedback and allow the click.",
  ],
  a11y: [
    "Renders a native <button type=\"button\"> by default — keyboard reachable, Enter/Space activatable.",
    "loading state sets aria-busy=\"true\" so screen readers announce the in-progress state.",
    "disabled sets the native disabled attribute — the element is removed from tab order and screen reader users hear 'dimmed'.",
    "Focus ring (--button-focus-ring) uses a 2px outline + 2px offset; visible against both light and dark page backgrounds at 3:1+.",
    "icon size (square button): always provide aria-label — there is no visible text label for screen readers.",
    "asChild: the child element must be an interactive element (<a>, <button>, <Link>); styling does not make a <div> keyboard-accessible.",
  ],
  tokens: [
    { property: "primary: bg", token: "--button-primary-bg → --action-primary", light: "blue.600 (#2563eb)", dark: "same" },
    { property: "primary: bg hover", token: "--button-primary-bg-hover", light: "blue.700", dark: "same" },
    { property: "primary: text", token: "--button-primary-text → --text-on-action", light: "white", dark: "same" },
    { property: "secondary: bg", token: "--button-secondary-bg → --action-secondary", light: "gray.100", dark: "gray.800" },
    { property: "secondary: text", token: "--button-secondary-text → --text-primary", light: "gray.900", dark: "gray.50" },
    { property: "ghost: bg hover", token: "--button-ghost-bg-hover → --action-secondary", light: "gray.100", dark: "gray.800" },
    { property: "destructive: bg", token: "--button-destructive-bg → --action-destructive", light: "red.600", dark: "same" },
    { property: "disabled: bg", token: "--button-disabled-bg → --surface-disabled", light: "gray.100", dark: "gray.800" },
    { property: "disabled: text", token: "--button-disabled-text → --text-disabled", light: "gray.400", dark: "gray.500" },
    { property: "Focus ring", token: "--button-focus-ring", light: "0 0 0 2px page + 0 0 0 4px blue.500", dark: "same pattern, dark bg" },
    { property: "Border radius", token: "--button-radius → --radius-md", light: "6px", dark: "—" },
    { property: "Height sm/md/lg", token: "--control-sm/md/lg", light: "32/40/48px", dark: "—" },
    { property: "Transition duration", token: "--button-transition-duration → --duration-fast", light: "100ms", dark: "—" },
  ],
  usage: `import { Button } from "@/design-system/button/button"
import { buttonVariants } from "@/design-system/button/button"
import { Trash2, ArrowRight } from "lucide-react"
import Link from "next/link"

{/* Variants */}
<Button>Save changes</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Learn more</Button>
<Button variant="outline">View details</Button>
<Button variant="destructive"><Trash2 className="size-4" />Delete account</Button>
<Button variant="link">Terms of service <ArrowRight className="size-4" /></Button>

{/* Sizes */}
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Delete"><Trash2 className="size-4" /></Button>

{/* States */}
<Button loading>Saving…</Button>
<Button disabled>Unavailable</Button>

{/* As a Next.js Link */}
<Button asChild>
  <Link href="/dashboard">Go to dashboard</Link>
</Button>`,
}

// ─── Batch 2: Button Group → Combobox ────────────────────────────────────────

const buttonGroup: ComponentDoc = {
  slug: "button-group",
  anatomy: `┌──────────────────────────────────────────────────────┐
│  [Button]  │  [Button]  │  [Button size="icon"]        │  ← ButtonGroup (role="group")
└──────────────────────────────────────────────────────┘
  gap: 0 · inner corners stripped to 0 · duplicate borders collapsed
  focused child raised to z-index:10 so ring is never clipped

  With text addon:
  ┌─────────────────────────────────────────────────────┐
  │  https://  │  <input />                 │  [Copy]   │
  └─────────────────────────────────────────────────────┘
  ButtonGroupText: bg gray.100 · border · radius 6px · padding-inline 16px`,
  slots: [
    "ButtonGroup — layout container (role=\"group\"); accepts orientation prop",
    "ButtonGroupText — static text/icon addon (non-interactive label cell)",
    "ButtonGroupSeparator — 1px visual divider between groups (aria-hidden)",
  ],
  props: [
    { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Axis of the fused row. Vertical stacks children column-wise with inner corners stripped top/bottom." },
    { prop: "aria-label", type: "string", description: "Describes the group purpose to screen readers (e.g. \"Text formatting\"). Strongly recommended for toolbar groups." },
    { prop: "asChild (ButtonGroupText)", type: "boolean", default: "false", description: "Render ButtonGroupText through to a child element via Radix Slot." },
  ],
  states: [
    { state: "Group container", description: "No states of its own — layout primitive only." },
    { state: "Child button states", description: "Every child (Button, input, trigger) keeps its full state set: Default / Hover / Focus / Active / Disabled / Selected / Loading." },
    { state: "Focus-visible (child)", description: "The focused child is raised to z-index:10 so its 2px+2px ring is never clipped by neighboring borders." },
    { state: "Text addon", description: "ButtonGroupText is non-interactive — single static visual state." },
  ],
  do: [
    "Pass aria-label on ButtonGroup when used as a toolbar — screen readers announce 'group, N items' with a label.",
    "Use ButtonGroupText for static prefixes/suffixes (URL schemes, units, currency symbols) paired with an input.",
    "Use ButtonGroupSeparator between fused sub-groups to add a 1px visual pause without breaking the connected feel.",
    "Nest ButtonGroup inside another ButtonGroup for multi-section toolbars — an 8px gap is automatically inserted between sub-groups.",
  ],
  dont: [
    "Don't group semantically unrelated buttons — the ARIA group boundary implies relationship.",
    "Don't mix sizes within a group — height mismatches break the fused border alignment.",
    "Don't use ButtonGroup as a radio/tab pattern without adding a roving-tabindex controller (use Toggle Group for that).",
    "Don't skip corner-stripping for buttons added dynamically — add them inside the group so the CSS sibling selectors apply.",
  ],
  a11y: [
    "ButtonGroup renders role=\"group\" so assistive technology announces the boundary before listing child controls.",
    "Arrow-key navigation is not built in — compose with Toggle Group or a roving-tabindex controller when the group must be a single tab stop (e.g. a formatting toolbar).",
    "Children remain native interactive elements; their keyboard model (Tab, Enter/Space) and focus indicators are preserved inside the group.",
    "Focus-stacking (z-index:10 on focused child) ensures the 3:1 focus ring is always visible against the page surface — border-collapse never clips an outline.",
  ],
  tokens: [
    { property: "Inner gap", token: "0 (flush)", light: "children borders collapse", dark: "—" },
    { property: "ButtonGroupText: bg", token: "--action-secondary", light: "gray.100", dark: "gray.800" },
    { property: "ButtonGroupText: text", token: "--text-primary", light: "gray.900", dark: "gray.50" },
    { property: "ButtonGroupText: border", token: "--border-default", light: "gray.200", dark: "gray.800" },
    { property: "ButtonGroupText: radius", token: "--radius-md", light: "6px", dark: "—" },
    { property: "ButtonGroupText: padding-inline", token: "--space-4", light: "16px", dark: "—" },
    { property: "ButtonGroupSeparator: bg", token: "--border-default", light: "gray.200 / 1px", dark: "gray.800 / 1px" },
    { property: "Child corner radius", token: "inherits --button-radius", light: "6px (inner corners → 0)", dark: "—" },
  ],
  usage: `import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator } from "@/design-system/button-group/button-group"
import { Button } from "@/design-system/button/button"
import { ChevronDown } from "lucide-react"

{/* Segmented actions */}
<ButtonGroup aria-label="Save options">
  <Button variant="outline">Save</Button>
  <Button variant="outline">Save and continue</Button>
  <Button variant="outline" size="icon" aria-label="More save options">
    <ChevronDown className="size-4" />
  </Button>
</ButtonGroup>

{/* Input with URL prefix + copy action */}
<ButtonGroup>
  <ButtonGroupText>https://</ButtonGroupText>
  <input className="flex-1 border-0 bg-transparent px-3 text-sm outline-none" defaultValue="acme.com" />
  <Button variant="outline">Copy</Button>
</ButtonGroup>

{/* Vertical sidebar nav */}
<ButtonGroup orientation="vertical">
  <Button variant="outline">Inbox</Button>
  <Button variant="outline">Drafts</Button>
  <Button variant="outline">Sent</Button>
</ButtonGroup>`,
}

const calendar: ComponentDoc = {
  slug: "calendar",
  anatomy: `┌─────────────────────────────────────┐  ← Calendar root (bg: surface.card, padding: 12px)
│  [<]   June 2025    [>]              │  ← month nav + caption (prev/next: Button ghost icon)
│                                       │    caption: 14px/500
│  Su  Mo  Tu  We  Th  Fr  Sa          │  ← weekday headers (12px, text.secondary)
│                                       │
│   1   2   3   4   5   6   7          │  ← day cells (32px square, --cell-size)
│   8   9  10  11  12  13  14          │    today: action.secondary bg
│  15  16  17  18 [19] 20  21          │    selected: action.primary bg + white text
│  22  23  24  25  26  27  28          │    range middle: interactive.selected-bg
│  29  30                               │    outside: text.secondary/50 (still clickable)
└─────────────────────────────────────┘`,
  props: [
    { prop: "mode", type: '"single" | "multiple" | "range"', description: "Selection model. single: one date. multiple: any number of dates. range: a contiguous DateRange." },
    { prop: "selected", type: "Date | Date[] | DateRange", description: "Controlled selected value. Shape must match mode." },
    { prop: "onSelect", type: "(value) => void", description: "Fired when the user changes the selection." },
    { prop: "disabled", type: "Matcher | Matcher[]", description: "Disable specific dates or ranges (e.g. { before: new Date() } to disable past dates)." },
    { prop: "showOutsideDays", type: "boolean", default: "true", description: "Render dates from the previous/next month that fill the grid." },
    { prop: "numberOfMonths", type: "number", default: "1", description: "Side-by-side months. Use 2 for range pickers." },
    { prop: "captionLayout", type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"', default: '"label"', description: "Swap the caption from a static label to a dropdown for fast year/month jumping." },
    { prop: "weekStartsOn", type: "0 | 1 | 2 | 3 | 4 | 5 | 6", default: "0", description: "0 = Sunday, 1 = Monday, etc." },
    { prop: "buttonVariant", type: "ButtonProps['variant']", default: '"ghost"', description: "Visual style of the prev/next nav buttons. Use 'outline' inside a Popover." },
  ],
  states: [
    { state: "Resting day", description: "text.primary color, transparent background." },
    { state: "Hover", description: "action.secondary background (gray.100 light / gray.800 dark)." },
    { state: "Focus-visible", description: "2px+2px --focus-ring; cell raised to z-index:10 so ring isn't clipped." },
    { state: "Today", description: "action.secondary background. Preserved unless overridden by selection." },
    { state: "Selected (single)", description: "action.primary bg (blue.600) + text.on-action (white). Full radius.md corners." },
    { state: "Range start / end", description: "action.primary bg. Only the outer corner is rounded (start: left, end: right)." },
    { state: "Range middle", description: "interactive.selected-bg + interactive.selected-text. No corners — continuous bar." },
    { state: "Outside month", description: "text.secondary / 50% opacity. Still clickable (navigates to that month)." },
    { state: "Disabled", description: "text.tertiary at 50% opacity. pointer-events:none." },
    { state: "Nav disabled", description: "Prev/Next button aria-disabled when fromDate/toDate boundary is reached." },
  ],
  do: [
    "Use mode=\"range\" with numberOfMonths={2} for date-range pickers — two side-by-side months make the range extent immediately visible.",
    "Compose Calendar with Popover for a date input: the trigger shows the formatted date, the popover holds the Calendar.",
    "Disable past dates with disabled={{ before: new Date() }} for future-only booking flows.",
    "Use captionLayout=\"dropdown\" with fromYear/toYear for date-of-birth pickers — users shouldn't navigate year by year.",
  ],
  dont: [
    "Don't use Calendar as a standalone page element for simple date inputs — wrap it in a Popover or Dialog.",
    "Don't let range-middle text fail contrast — the built-in interactive.selected tokens are gate-verified; don't override with lighter tones.",
    "Don't disable entire months without a visible explanation — show a tooltip or banner explaining why those dates are unavailable.",
  ],
  a11y: [
    "DayPicker renders the WAI-ARIA Date Picker pattern: role=\"grid\", <th scope=\"col\"> weekday headers, aria-selected on selected dates, aria-disabled on disabled dates, aria-current=\"date\" on today.",
    "Keyboard model: Tab moves between regions; inside the grid Arrow keys move between days, PageUp/Down change the month, Shift+PageUp/Down change the year, Home/End go to week start/end. Enter/Space selects.",
    "The focused cell is raised to z-index:10 — the focus ring is never clipped by adjacent cells.",
    "Range-middle contrast (interactive.selected-text on interactive.selected-bg): 7.5:1 light, 10.1:1 dark — both clear AA.",
    "RTL: chevrons rotate 180deg and the grid mirrors via logical properties (handled by DayPicker data classes).",
  ],
  tokens: [
    { property: "Root background", token: "--surface-card", light: "white", dark: "gray.900" },
    { property: "Root padding", token: "--space-3", light: "12px", dark: "—" },
    { property: "Cell size", token: "--cell-size → --control-sm", light: "32px", dark: "—" },
    { property: "Weekday color", token: "--text-secondary", light: "gray.600", dark: "gray.400" },
    { property: "Day hover bg", token: "--action-secondary", light: "gray.100", dark: "gray.800" },
    { property: "Selected bg", token: "--action-primary", light: "blue.600", dark: "same" },
    { property: "Selected text", token: "--text-on-action", light: "white", dark: "same" },
    { property: "Range middle bg", token: "--interactive-selected-bg", light: "blue.50", dark: "gray.800" },
    { property: "Range middle text", token: "--interactive-selected-text", light: "blue.700 (7.5:1)", dark: "blue.300 (10.1:1)" },
    { property: "Today bg", token: "--action-secondary", light: "gray.100", dark: "gray.800" },
    { property: "Disabled text", token: "--text-tertiary @ 50%", light: "gray.400 / 50%", dark: "gray.500 / 50%" },
    { property: "Focus ring", token: "--focus-ring", light: "2px blue-500 + 2px page bg", dark: "2px blue-500 + dark bg" },
  ],
  usage: `import { Calendar } from "@/design-system/calendar/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/design-system/button/button"
import { format } from "date-fns"

{/* Single date */}
const [date, setDate] = React.useState<Date | undefined>(new Date())
<Calendar mode="single" selected={date} onSelect={setDate} />

{/* Date range — two months side by side */}
const [range, setRange] = React.useState<DateRange | undefined>()
<Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />

{/* Popover date input */}
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">{date ? format(date, "PP") : "Pick a date"}</Button>
  </PopoverTrigger>
  <PopoverContent className="p-0">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      buttonVariant="outline"
      disabled={{ before: new Date() }}
    />
  </PopoverContent>
</Popover>

{/* Dropdown caption for year/month navigation */}
<Calendar
  mode="single"
  captionLayout="dropdown"
  fromYear={1900}
  toYear={2010}
/>`,
}

const card: ComponentDoc = {
  slug: "card",
  anatomy: `┌──────────────────────────────────────────────────┐  ← Card
│  CardHeader                                       │    bg: surface.card · radius: 8px
│  ┌────────────────────────────┬────────────────┐  │    border: border.default · shadow: shadow.sm
│  │  CardTitle                 │  [CardAction]  │  │    padding: 24px
│  │  CardDescription           │                │  │    grid: [1fr  auto] in header
│  └────────────────────────────┴────────────────┘  │    inter-slot gap: 16px
│                                                    │
│  CardContent                                      │  ← body (any child content)
│  …                                                 │
│                                                    │
│  CardFooter                                       │  ← optional footer (flex row)
│  [Button]  [Button]                               │
└──────────────────────────────────────────────────┘`,
  slots: [
    "Card — the outer panel (<div> with border, radius, shadow, bg)",
    "CardHeader — top section; grid layout with title/description left and action right",
    "CardTitle — bold heading (18px/600, text.primary)",
    "CardDescription — supporting subtitle (14px, text.secondary)",
    "CardAction — right-aligned trailing slot in the header (icon button, menu trigger)",
    "CardContent — free-form body area",
    "CardFooter — optional bottom row (flex, typically holds action buttons)",
  ],
  props: [
    { prop: "interactive", type: "boolean", default: "false", description: "Elevates shadow on hover (shadow.sm → shadow.md) and adds a focus ring. Use when the entire card is a clickable link." },
    { prop: "asChild", type: "boolean", default: "false", description: "Renders the Card as its child element. Pair with interactive and <a> or Next.js <Link> for a fully clickable card." },
  ],
  states: [
    { state: "Static (default)", description: "Non-interactive surface. No hover or focus states." },
    { state: "Interactive hover", description: "shadow.sm → shadow.md elevation; 150ms ease-out transition (respects prefers-reduced-motion)." },
    { state: "Interactive focus-visible", description: "Standard --focus-ring double ring on the card element." },
  ],
  do: [
    "Use CardTitle for the primary heading — it renders as a semantic heading so screen readers can navigate to the card.",
    "Use CardAction for a single trailing control (icon button, overflow menu). For multiple trailing actions, use CardFooter.",
    "Use interactive + asChild with <a> or <Link> when the whole card navigates — this keeps the clickable surface keyboard-reachable and screen-reader-meaningful.",
    "Keep content inside the card slots — structure is CardHeader → CardContent → CardFooter for predictable padding and spacing.",
  ],
  dont: [
    "Don't nest interactive cards — a clickable area inside a clickable card creates an ambiguous focus model.",
    "Don't rely on shadow elevation alone to communicate interactivity — add a cursor:pointer and focus ring.",
    "Don't put multiple competing primary actions in CardFooter — one primary, one secondary maximum.",
    "Don't use Card as a modal or dialog — use Dialog or Sheet for overlays.",
  ],
  a11y: [
    "The Card container itself is a neutral grouping element (<div>) — its semantics come from its children (a real heading in CardTitle, real controls in CardFooter).",
    "Interactive cards use a real <a> or <button> via asChild — this is what makes them keyboard-reachable, not just CSS cursor:pointer.",
    "Elevation change (shadow) is decorative — never the sole signal of interactivity. The cursor change and focus ring communicate actionability.",
    "CardTitle should map to the appropriate heading level for the page outline (h2 for section cards, h3 for nested cards).",
  ],
  tokens: [
    { property: "Background", token: "--surface-card", light: "white", dark: "gray.900" },
    { property: "Border", token: "--border-default", light: "gray.200", dark: "gray.800" },
    { property: "Border radius", token: "--radius-lg", light: "8px", dark: "—" },
    { property: "Shadow (resting)", token: "--shadow-sm", light: "0 1px 2px rgba(0,0,0,.05)", dark: "—" },
    { property: "Shadow (hover)", token: "--shadow-md", light: "raised elevation", dark: "—" },
    { property: "Outer padding", token: "--space-6", light: "24px", dark: "—" },
    { property: "Inter-slot gap", token: "--space-4", light: "16px", dark: "—" },
    { property: "Title: size / weight", token: "--font-size-lg / --font-weight-semibold", light: "18px / 600", dark: "—" },
    { property: "Title: color", token: "--text-primary", light: "gray.900", dark: "gray.50" },
    { property: "Description: color", token: "--text-secondary", light: "gray.600", dark: "gray.400" },
  ],
  usage: `import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@/design-system/card/card"
import { Button } from "@/design-system/button/button"
import { MoreHorizontal } from "lucide-react"

{/* Standard card */}
<Card>
  <CardHeader>
    <CardTitle>Project Atlas</CardTitle>
    <CardDescription>Shared workspace for the design team.</CardDescription>
    <CardAction>
      <Button variant="ghost" size="icon" aria-label="More options">
        <MoreHorizontal className="size-4" />
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    12 active members · updated 2 hours ago.
  </CardContent>
  <CardFooter>
    <Button>Open</Button>
    <Button variant="secondary">Share</Button>
  </CardFooter>
</Card>

{/* Fully clickable card (interactive link) */}
<Card interactive asChild>
  <a href="/pro">
    <CardHeader>
      <CardTitle>Upgrade to Pro</CardTitle>
      <CardDescription>Unlock unlimited projects and team seats.</CardDescription>
    </CardHeader>
  </a>
</Card>`,
}

const carousel: ComponentDoc = {
  slug: "carousel",
  anatomy: `┌────────────────────────────────────────────────────────┐
│  Carousel (role="region" aria-roledescription="carousel")│
│                                                          │
│  [<]  ┌──────────────────────────────────────┐  [>]    │  ← prev/next (Button outline icon)
│       │  CarouselContent (overflow: hidden)   │         │    offset: -(32px + 16px) from edge
│       │  ┌─────┐  ┌─────┐  ┌─────┐           │         │
│       │  │Slide│  │Slide│  │Slide│           │         │  ← CarouselItem
│       │  │     │  │     │  │     │           │         │    role="group"
│       │  └─────┘  └─────┘  └─────┘           │         │    aria-roledescription="slide"
│       └──────────────────────────────────────┘         │
└────────────────────────────────────────────────────────┘
  slide padding-inline-start: 16px · nav button size: 32px`,
  slots: [
    "Carousel — root region; accepts opts (Embla options), plugins, orientation",
    "CarouselContent — scroll viewport (overflow:hidden flex container)",
    "CarouselItem — one slide (role=\"group\" aria-roledescription=\"slide\")",
    "CarouselPrevious — prev nav button (Button outline icon, positioned outside left/top)",
    "CarouselNext — next nav button (Button outline icon, positioned outside right/bottom)",
  ],
  props: [
    { prop: "opts", type: "EmblaOptionsType", description: "Embla carousel options (loop, align, slidesToScroll, etc.)." },
    { prop: "plugins", type: "EmblaPluginType[]", description: "Embla plugins (e.g. Autoplay, Fade, ClassNames)." },
    { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Scroll axis. Vertical rotates the prev/next buttons 90deg." },
    { prop: "setApi", type: "(api: CarouselApi) => void", description: "Receive the Embla imperative API handle for programmatic control (scroll to index, add event listeners, etc.)." },
  ],
  states: [
    { state: "Slide", description: "Stateless visual container — child content owns interaction." },
    { state: "Prev / Next — default", description: "Outline icon button, resting state." },
    { state: "Prev / Next — hover", description: "Button outline hover fill." },
    { state: "Prev / Next — focus-visible", description: "--button-focus-ring double ring." },
    { state: "Prev / Next — disabled", description: "disabled=true when canScrollPrev/canScrollNext is false (boundary reached). opacity:0.5, no focus." },
    { state: "Region arrow keys", description: "ArrowLeft/Right (horizontal) or ArrowUp/Down (vertical) on the region call scrollPrev/scrollNext. Disabled when focus is inside a child input." },
  ],
  do: [
    "Always add a descriptive aria-label to Carousel: <Carousel aria-label=\"Product photos\">.",
    "Number slides explicitly in sr-only text inside each CarouselItem for screen readers: 'Slide 1 of 5'.",
    "Use opts.loop={true} for infinite auto-play carousels — it keeps both nav buttons enabled.",
    "For autoplay, respect prefers-reduced-motion by pausing via the Embla Autoplay plugin's shouldAutoplay option.",
    "Expose setApi and add dot indicators for carousels with many slides.",
  ],
  dont: [
    "Don't use Carousel for critical content — not all users will see beyond the first slide.",
    "Don't use Carousel for a single slide — remove the nav buttons and use a plain image/card.",
    "Don't autoplay without providing a visible pause control (WCAG 2.2.2).",
    "Don't set very short autoplay durations — give users at least 5 seconds per slide to read the content.",
  ],
  a11y: [
    "role=\"region\" + aria-roledescription=\"carousel\" on the outer element exposes it as a carousel landmark to screen readers.",
    "Each slide has role=\"group\" aria-roledescription=\"slide\" — AT can navigate by slide and read 'slide N of total'.",
    "Prev/Next buttons have visually-hidden text ('Previous slide' / 'Next slide') — the arrow icon is aria-hidden.",
    "ArrowLeft/Right scroll the carousel at capture-phase but are suppressed when focus is inside a child input.",
    "When canScrollPrev/canScrollNext is false, the button gets disabled=true — unfocusable and announced as 'dimmed' by screen readers.",
  ],
  tokens: [
    { property: "Slide padding-inline-start", token: "--space-4", light: "16px", dark: "—" },
    { property: "Nav button size", token: "--control-sm", light: "32px square", dark: "—" },
    { property: "Nav button radius", token: "--radius-full", light: "9999px", dark: "—" },
    { property: "Nav button style", token: "inherits Button outline icon", light: "border + bg + hover + focus", dark: "same" },
    { property: "Nav offset from edge", token: "calc(--control-sm + --space-4)", light: "-48px", dark: "—" },
    { property: "Nav icon size", token: "--icon-sm", light: "16px", dark: "—" },
  ],
  usage: `import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/design-system/carousel/carousel"
import { Card, CardContent } from "@/design-system/card/card"

{/* Basic horizontal carousel */}
<Carousel className="w-full max-w-sm" aria-label="Feature highlights">
  <CarouselContent>
    {Array.from({ length: 5 }).map((_, i) => (
      <CarouselItem key={i}>
        <Card>
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <span className="text-4xl font-semibold">{i + 1}</span>
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

{/* Looping autoplay carousel */}
import Autoplay from "embla-carousel-autoplay"
<Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 4000 })]}>
  {/* ... */}
</Carousel>

{/* Vertical carousel */}
<Carousel orientation="vertical">
  {/* ... */}
</Carousel>`,
}

const chart: ComponentDoc = {
  slug: "chart",
  anatomy: `┌─────────────────────────────────────────────────┐  ← ChartContainer (responsive wrapper)
│  [legend]                                         │    config: ChartConfig (series colors + labels)
│                                                   │    children: a single Recharts chart node
│      ┌──────────────────────────────────────┐    │
│      │  [SVG chart — Bar, Line, Pie, etc.]   │    │  ← Recharts chart (Bar, LineChart, PieChart…)
│      │  axis ticks: text.secondary (12px)    │    │    series colors: var(--color-{key}) from config
│      │  grid lines: border.default / 50%     │    │
│      └──────────────────────────────────────┘    │
│                                                   │
│  [ChartTooltipContent] — on hover                 │  ← surface.card bg · shadow.lg · radius.lg
└─────────────────────────────────────────────────┘`,
  props: [
    { prop: "config", type: "ChartConfig", description: "Required. Maps series keys to their label and color. Color can be a single value or { light, dark } for per-theme colors." },
    { prop: "children", type: "ResponsiveContainer['children']", description: "A single Recharts chart node (BarChart, LineChart, PieChart, etc.)." },
    { prop: "initialDimension", type: "{ width: number; height: number }", default: "{ width: 320, height: 200 }", description: "SSR seed dimensions — prevents layout shift before Recharts measures the container." },
    { prop: "id", type: "string", description: "Explicit id for the scoped <style> block. Auto-generated when omitted." },
  ],
  variants: [
    { name: "Bar chart", description: "Categorical comparisons. Use BarChart + Bar with dataKey matching ChartConfig keys." },
    { name: "Line / Area chart", description: "Trends over time. LineChart + Line, or AreaChart + Area for filled volume." },
    { name: "Pie / Donut chart", description: "Part-to-whole relationships. PieChart + Pie; add innerRadius for donut." },
    { name: "Radial chart", description: "Single metric as a gauge arc. RadialBarChart + RadialBar." },
  ],
  states: [
    { state: "Tooltip hidden", description: "Default; no tooltip rendered." },
    { state: "Tooltip visible", description: "Shown on hover/focus over a chart element. Renders in surface.card with shadow.lg above chart paint." },
    { state: "Legend", description: "Static — no interactive state. Each series shows a colored dot (8px, radius.sm) + label." },
    { state: "Empty data", description: "Recharts renders an empty viewport. Consumers must pair with an Empty State component when data.length === 0." },
  ],
  do: [
    "Define all series in ChartConfig with semantic labels — tooltips and legends use config.label for human-readable names.",
    "Use the 5-color sequence in order (--chart-1 through --chart-5) so series are maximally distinguishable including for color-blind users.",
    "Provide a text fallback or table equivalent for screen reader users — SVG chart content is not announced by AT.",
    "Use ChartTooltipContent for consistent tooltip styling — it handles label, value, and color dot formatting automatically.",
  ],
  dont: [
    "Don't use more than 5 categorical series without a legend — beyond 5 colors the distinction breaks down.",
    "Don't hardcode color values in Bar/Line/Pie components — reference var(--color-{key}) so per-theme colors from ChartConfig apply.",
    "Don't skip the empty state — an empty Recharts viewport gives users no signal that data is missing or still loading.",
    "Don't use pie charts for more than 5 segments — use a bar chart or ranked list instead.",
  ],
  a11y: [
    "SVG chart content is not announced by assistive technology — always provide a text summary, a data table below the chart, or aria-label describing the key takeaway.",
    "ChartTooltip is triggered by hover — keyboard users cannot access it unless you also wire focus-based tooltip display on SVG elements.",
    "The 5-color palette is designed for hue separation, not just brightness — distinguishable for protanopia and deuteranopia.",
    "Use role=\"img\" aria-label on the ChartContainer wrapping div when the chart conveys a single insight ('Monthly revenue up 12%').",
  ],
  tokens: [
    { property: "Series 1", token: "--chart-1", light: "blue.500 (#3b82f6)", dark: "blue.400 (#60a5fa)" },
    { property: "Series 2", token: "--chart-2", light: "green.600 (#16a34a)", dark: "green.300 (#86efac)" },
    { property: "Series 3", token: "--chart-3", light: "amber.600 (#d97706)", dark: "amber.300 (#fcd34d)" },
    { property: "Series 4", token: "--chart-4", light: "red.500 (#ef4444)", dark: "red.400 (#f87171)" },
    { property: "Series 5", token: "--chart-5", light: "gray.500 (#6b7280)", dark: "gray.400 (#9ca3af)" },
    { property: "Axis tick text", token: "--text-secondary", light: "gray.600", dark: "gray.400" },
    { property: "Grid lines", token: "--border-default @ 50%", light: "gray.200 / 50%", dark: "gray.800 / 50%" },
    { property: "Tooltip bg", token: "--surface-card", light: "white", dark: "gray.900" },
    { property: "Tooltip shadow", token: "--shadow-lg", light: "elevation-lg", dark: "—" },
    { property: "Tooltip radius", token: "--radius-lg", light: "8px", dark: "—" },
  ],
  usage: `import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/design-system/chart/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const config = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile:  { label: "Mobile",  color: "var(--chart-2)" },
}

const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
]

<ChartContainer config={config} className="h-64 w-full">
  <BarChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <YAxis tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile"  fill="var(--color-mobile)"  radius={4} />
  </BarChart>
</ChartContainer>`,
}

const checkbox: ComponentDoc = {
  slug: "checkbox",
  anatomy: `┌──────────────────────────────┐
│  [■]  Label text              │  ← Label wraps or htmlFor wires to Checkbox
└──────────────────────────────┘

  ┌────┐  ← Checkbox (16px square)
  │ ✓  │     real <input type="checkbox"> (transparent, handles keyboard + a11y)
  └────┘     drawn .box overlay (pointer-events:none, shows the visual)
             check + dash live in one <svg>; toggled by :checked / :indeterminate
  border: 1.5px · radius: --radius-sm (4px)
  checked bg: --action-primary (blue.600) · mark: white`,
  props: [
    { prop: "checked", type: "boolean", description: "Controlled checked state. Pair with onChange." },
    { prop: "defaultChecked", type: "boolean", description: "Uncontrolled initial checked state." },
    { prop: "indeterminate", type: "boolean", default: "false", description: "Shows the dash glyph (partial selection). Same stroke-width as the check mark." },
    { prop: "disabled", type: "boolean", default: "false", description: "opacity:0.5 + not-allowed cursor + no interaction." },
    { prop: "aria-invalid", type: "boolean | 'true' | 'false'", description: "Error state — renders red border (--border-error). Pair with aria-describedby pointing to an error message." },
    { prop: "onChange", type: "React.ChangeEventHandler<HTMLInputElement>", description: "Fired when the checked state changes." },
  ],
  states: [
    { state: "Unchecked", description: "White bg (surface.card), gray.500 border, no glyph." },
    { state: "Hover", description: "Border darkens; bg may tint slightly." },
    { state: "Focus-visible", description: "--focus-ring double ring (2px+2px blue.500)." },
    { state: "Active / pressed", description: "Native browser press state." },
    { state: "Checked", description: "blue.600 bg (action.primary) + white check mark." },
    { state: "Indeterminate", description: "blue.600 bg + white dash (same stroke-width as check — same visual weight)." },
    { state: "Disabled", description: "opacity:0.5, cursor:not-allowed, no pointer events." },
    { state: "Error", description: "aria-invalid: red border (--border-error, red.500)." },
  ],
  do: [
    "Always pair Checkbox with a visible Label: use <Label htmlFor> or wrap the Checkbox inside <Label>.",
    "Use the indeterminate state for 'select all' headers where some but not all children are checked.",
    "Set aria-invalid and aria-describedby when a checkbox is required but unchecked on form submit.",
    "Use a fieldset + legend when grouping multiple related checkboxes (e.g. a notification preferences list).",
  ],
  dont: [
    "Don't use Checkbox for a single on/off toggle where the result is immediately applied — use Switch instead.",
    "Don't rely on color alone to convey checked vs unchecked — the check/dash glyph is the primary indicator.",
    "Don't place the label only above the checkbox without htmlFor — screen readers may not associate them.",
    "Don't disable checkboxes without explaining why — an invisible disabled state creates confusion.",
  ],
  a11y: [
    "A real <input type=\"checkbox\"> sits atop the visual overlay — this means full keyboard support (Space toggles), correct role='checkbox', and correct state announcement (checked/unchecked/mixed) without any ARIA hacks.",
    "The drawn overlay is aria-hidden and pointer-events:none — it never intercepts clicks or keyboard events.",
    "Checked and indeterminate states are distinguished by different glyphs (check vs dash), not color alone — WCAG 1.4.1 compliant.",
    "Error state uses aria-invalid='true' + aria-describedby to associate the error message — screen readers announce 'invalid entry' and read the error.",
    "Indeterminate is set via the indeterminate DOM property on the native input (not an ARIA attribute) — browsers announce it as 'mixed'.",
  ],
  tokens: [
    { property: "Box size", token: "--control-box-size → --space-4", light: "16px", dark: "—" },
    { property: "Box border", token: "--control-box-border → --border-strong", light: "gray.500 / 1.5px", dark: "same" },
    { property: "Box background", token: "--control-box-bg → --surface-card", light: "white", dark: "gray.900" },
    { property: "Checked background", token: "--control-checked-bg → --action-primary", light: "blue.600", dark: "same" },
    { property: "Check / dash mark", token: "--control-checked-mark → --text-on-action", light: "white", dark: "same" },
    { property: "Border radius", token: "--checkbox-radius → --radius-sm", light: "4px", dark: "—" },
    { property: "Error border", token: "--border-error", light: "red.500", dark: "same" },
    { property: "Focus ring", token: "--focus-ring", light: "2px blue-500 + 2px page bg", dark: "2px blue-500 + dark bg" },
  ],
  usage: `import { Checkbox } from "@/design-system/checkbox/checkbox"
import { Label } from "@/design-system/label/label"

{/* Wrapped label (implicit association) */}
<Label>
  <Checkbox /> Accept terms and conditions
</Label>

{/* htmlFor association */}
<div className="flex items-center gap-2">
  <Checkbox id="newsletter" />
  <Label htmlFor="newsletter">Subscribe to newsletter</Label>
</div>

{/* Indeterminate (select-all header) */}
<Checkbox
  indeterminate={someChecked && !allChecked}
  checked={allChecked}
  onChange={toggleAll}
/>

{/* Error state */}
<Checkbox aria-invalid aria-describedby="terms-error" id="terms" />
<p id="terms-error" className="text-sm text-destructive">You must accept the terms.</p>`,
}

const collapsible: ComponentDoc = {
  slug: "collapsible",
  anatomy: `<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger asChild>
    <Button>Toggle</Button>   ← trigger (any element; aria-expanded + aria-controls auto-wired)
  </CollapsibleTrigger>
  <CollapsibleContent>       ← body; hidden attr managed by Radix when closed
    …                         consumer applies styling, padding, animation
  </CollapsibleContent>
</Collapsible>

  Collapsible is purely structural — it ships no visual treatment.
  data-state="open" / "closed" on all three parts drives consumer-side CSS.`,
  slots: [
    "Collapsible — root; manages open state; data-state + data-disabled on self and children",
    "CollapsibleTrigger — the toggle control; aria-expanded and aria-controls wired by Radix",
    "CollapsibleContent — the hidden/shown body; Radix sets --radix-collapsible-content-height for CSS animations",
  ],
  props: [
    { prop: "open", type: "boolean", description: "Controlled open state. Pair with onOpenChange." },
    { prop: "defaultOpen", type: "boolean", default: "false", description: "Uncontrolled initial open state." },
    { prop: "onOpenChange", type: "(open: boolean) => void", description: "Fired when the open state changes." },
    { prop: "disabled", type: "boolean", default: "false", description: "Prevents toggling. Sets data-disabled on root and trigger; adds disabled attribute to the trigger." },
    { prop: "asChild (Trigger)", type: "boolean", default: "false", description: "Render CollapsibleTrigger through to a child element (e.g. an existing Button)." },
    { prop: "forceMount (Content)", type: "boolean", default: "false", description: "Keep CollapsibleContent mounted when closed — useful for exit animations or SEO-visible content." },
  ],
  states: [
    { state: "Closed (default)", description: "data-state=\"closed\" on all parts; content has hidden attribute and is removed from the accessibility tree." },
    { state: "Open", description: "data-state=\"open\" everywhere; content is rendered and accessible." },
    { state: "Disabled", description: "data-disabled on root and trigger; trigger is unfocusable (disabled attr); content state is frozen." },
    { state: "Animation (open)", description: "data-[state=open]:animate-collapsible-down — use --radix-collapsible-content-height to animate height from 0 to measured value." },
    { state: "Animation (close)", description: "data-[state=closed]:animate-collapsible-up — reverse keyframe." },
  ],
  do: [
    "Use asChild on CollapsibleTrigger to avoid a nested button — pass an existing <Button> as the child.",
    "Wire CSS animations using data-[state=open] and data-[state=closed] — Radix sets --radix-collapsible-content-height for jank-free height transitions.",
    "Use forceMount on CollapsibleContent when you need the content to be in the DOM while closed (exit animation, SEO, pre-fetching).",
    "Use Collapsible for single show/hide patterns. For multiple items, use Accordion (which composes Collapsible internally).",
  ],
  dont: [
    "Don't add aria-expanded manually — Radix manages it automatically on CollapsibleTrigger.",
    "Don't use Collapsible when you need multiple panels with coordinated open state — use Accordion.",
    "Don't skip prefers-reduced-motion handling — if you add a height animation, provide a zero-duration fallback.",
    "Don't hardcode display:none on CollapsibleContent — let Radix's hidden attribute handle visibility.",
  ],
  a11y: [
    "CollapsibleTrigger automatically receives aria-expanded (true/false) and aria-controls pointing to the content id — these are Radix-managed and never need to be set manually.",
    "CollapsibleContent receives an id matching aria-controls; the hidden attribute is applied by Radix when closed, removing it from the accessibility tree.",
    "Keyboard: Tab reaches the trigger; Enter/Space toggles; when open, Tab moves into the first interactive child of CollapsibleContent; Shift+Tab returns to the trigger.",
    "disabled sets the native disabled attribute on the trigger — the element is removed from the tab order and announced as 'dimmed'.",
  ],
  tokens: [
    { property: "None — structural only", token: "—", light: "—", dark: "—" },
    { property: "Consumer: animated height", token: "--radix-collapsible-content-height", light: "set by Radix at runtime", dark: "—" },
    { property: "Typical consumer: bg", token: "--surface-card", light: "white", dark: "gray.900" },
    { property: "Typical consumer: border", token: "--border-default", light: "gray.200", dark: "gray.800" },
    { property: "Typical consumer: radius", token: "--radius-md", light: "6px", dark: "—" },
    { property: "Typical consumer: padding", token: "--space-4", light: "16px", dark: "—" },
  ],
  usage: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/design-system/collapsible/collapsible"
import { Button } from "@/design-system/button/button"
import { ChevronDown } from "lucide-react"

{/* "Show more" — controlled externally */}
const [open, setOpen] = React.useState(false)

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger asChild>
    <Button variant="ghost" size="sm">
      <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      {open ? "Show less" : "Show more"}
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent
    className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up"
  >
    <div className="rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-card)] p-[var(--space-4)] mt-[var(--space-2)]">
      {/* extra content */}
    </div>
  </CollapsibleContent>
</Collapsible>

{/* Advanced options disclosure */}
<Collapsible defaultOpen={false}>
  <CollapsibleTrigger asChild>
    <Button variant="outline">Advanced options</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    {/* form fields */}
  </CollapsibleContent>
</Collapsible>`,
}

const combobox: ComponentDoc = {
  slug: "combobox",
  anatomy: `┌─────────────────────────────────────────┐  ← ComboboxTrigger (Button outline + chevron)
│  Selected label or placeholder…       v  │    role="combobox" aria-expanded aria-controls
└─────────────────────────────────────────┘

  (when open)

┌─────────────────────────────────────────┐  ← ComboboxContent (PopoverContent → surface.card)
│  ┌─────────────────────────────────┐    │    shadow.lg · radius.md · border.default
│  │  Search…                        │    │  ← Command search input
│  └─────────────────────────────────┘    │
│  Option A                           ✓   │  ← selected item (check icon, interactive.selected-*)
│  Option B                               │  ← list item (Command item)
│  Option C (disabled)                    │    hover: interactive.selected-bg
│                                         │    disabled: opacity.5
│  No results found.                      │  ← CommandEmpty (when search yields nothing)
└─────────────────────────────────────────┘`,
  props: [
    { prop: "items", type: "ComboboxItem[]", description: "Required. Array of { value, label, keywords?, disabled? }. keywords adds extra search terms beyond the label." },
    { prop: "value", type: "string", description: "Controlled selected value (matches an item.value)." },
    { prop: "defaultValue", type: "string", description: "Uncontrolled initial selected value." },
    { prop: "onValueChange", type: "(value: string) => void", description: "Fired when the user selects an item." },
    { prop: "placeholder", type: "string", default: '"Select an option…"', description: "Trigger text when no item is selected." },
    { prop: "searchPlaceholder", type: "string", default: '"Search…"', description: "Placeholder inside the search input." },
    { prop: "emptyMessage", type: "React.ReactNode", default: '"No results found."', description: "Content shown when search yields no matches." },
    { prop: "disabled", type: "boolean", default: "false", description: "Disables the trigger — opacity:0.5, no focus." },
    { prop: "aria-label", type: "string", description: "Accessible name for the trigger when no surrounding <Label htmlFor> exists." },
    { prop: "side / align", type: '"top" | "right" | "bottom" | "left" / "start" | "center" | "end"', description: "Popover placement. Defaults: bottom / start." },
  ],
  states: [
    { state: "Trigger — empty", description: "Outline button with placeholder text in text.tertiary." },
    { state: "Trigger — has value", description: "Outline button with selected label in text.primary." },
    { state: "Trigger — open", description: "aria-expanded=true; Popover panel renders; focus ring visible." },
    { state: "Trigger — disabled", description: "opacity:0.5, pointer-events:none, unfocusable." },
    { state: "List item — default", description: "text.primary, transparent background." },
    { state: "List item — hover / cursor", description: "interactive.selected-bg + text (keyboard cursor or pointer hover)." },
    { state: "List item — selected", description: "Check icon (full opacity) trailing the label. Color stays with the cursor state." },
    { state: "List item — disabled", description: "opacity:0.5, pointer-events:none." },
    { state: "Empty", description: "CommandEmpty renders emptyMessage when search yields zero results." },
  ],
  do: [
    "Always pair Combobox with a visible <Label htmlFor> — or pass aria-label when a floating label is used.",
    "Add keywords to items that have synonyms: { value: 'us', label: 'United States', keywords: ['usa', 'america'] }.",
    "Use placeholder text that describes the selection (e.g. 'Select a country…') not just 'Select…'.",
    "Use Combobox over Select when the list has more than ~10 items — search dramatically reduces time-on-task.",
  ],
  dont: [
    "Don't use Combobox for fewer than ~5 items — a plain Select or Radio Group is faster to interact with.",
    "Don't use Combobox for multi-select — use a multi-select pattern with checkboxes inside the list.",
    "Don't skip the emptyMessage — a blank panel gives users no signal that their search matched nothing.",
    "Don't make item.value different from item.label without providing a mapping — displayed text should match what gets submitted.",
  ],
  a11y: [
    "Implements the WAI-ARIA Combobox-with-Listbox pattern: trigger has role='combobox' aria-expanded aria-controls; panel has role='listbox'; items are role='option' aria-selected.",
    "Keyboard: Tab focuses the trigger; Enter/Space/ArrowDown opens the panel; inside the panel ArrowUp/Down navigate items; Enter selects and closes; Escape closes without selecting.",
    "The check icon on the selected item is aria-hidden — the selected state is conveyed through aria-selected='true' on the option element.",
    "When no surrounding <Label htmlFor> exists, the aria-label prop is required — without it the trigger has no accessible name.",
    "All text inherits Button + Command contrast guarantees: trigger label text.primary at 15:1 light / 18:1 dark.",
  ],
  tokens: [
    { property: "Trigger: bg / border / radius", token: "inherits --button-outline-* + --button-radius", light: "white / gray.200 / 6px", dark: "gray.900 / gray.800" },
    { property: "Trigger: height", token: "--control-md", light: "40px", dark: "—" },
    { property: "Trigger: placeholder color", token: "--text-tertiary", light: "gray.400", dark: "gray.500" },
    { property: "Trigger: focus ring", token: "--button-focus-ring", light: "2px+2px blue.500", dark: "same" },
    { property: "Panel: bg / border / radius", token: "--surface-card / --border-default / --radius-md", light: "white / gray.200 / 6px", dark: "gray.900 / gray.800" },
    { property: "Panel: shadow", token: "--shadow-lg", light: "elevation-lg", dark: "—" },
    { property: "Item hover / cursor bg", token: "--interactive-selected-bg", light: "blue.50", dark: "gray.800" },
    { property: "Item hover / cursor text", token: "--interactive-selected-text", light: "blue.700", dark: "blue.300" },
    { property: "Selected check icon", token: "inherits item text color", light: "—", dark: "—" },
  ],
  usage: `import { Combobox } from "@/design-system/combobox/combobox"
import { Label } from "@/design-system/label/label"

const frameworks = [
  { value: "next",  label: "Next.js", keywords: ["nextjs", "react"] },
  { value: "nuxt",  label: "Nuxt",    keywords: ["vuejs", "vue"] },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro",   keywords: ["islands"] },
]

const [value, setValue] = React.useState("")

<div className="flex flex-col gap-1.5">
  <Label htmlFor="framework-picker">Framework</Label>
  <Combobox
    items={frameworks}
    value={value}
    onValueChange={setValue}
    placeholder="Select a framework…"
    searchPlaceholder="Search frameworks…"
    emptyMessage="No framework found."
    triggerClassName="w-[200px]"
  />
</div>`,
}

// ─── Batch 3: Command → Empty ─────────────────────────────────────────────────

const command: ComponentDoc = {
  slug: "command",
  anatomy: `┌───────────────────────────────────────────────┐  ← Command (surface.card bg, radius.md)
│  [search icon]  Search…                        │  ← CommandInput (h-9 wrapper + h-10 input)
│  ──────────────────────────────────────────── │  ← border.default separator
│  Suggestions                                   │  ← CommandGroup heading (xs/500, text.secondary)
│  [icon]  Calendar                     ⌘K       │  ← CommandItem (selected: interactive.selected-*)
│  [icon]  Calculator                            │
│  ──────────────────────────────────────────── │  ← CommandSeparator (1px, border.default)
│  Settings                                      │  ← another CommandGroup
│  [icon]  Profile                      ⌘P       │    shortcut: xs, text.secondary, tracking-widest
│  [icon]  Preferences                  ⌘,       │
│                                                 │
│  No results found.                              │  ← CommandEmpty (shown when search yields nothing)
└───────────────────────────────────────────────┘
  item: 14px · padding 6px/8px · icon 16px · list max-height: 300px (scrollable)`,
  slots: [
    "Command — root (surface.card bg, radius.md); filter/shouldFilter for custom search",
    "CommandInput — search field (icon + input); border-block-end separates it from the list",
    "CommandList — scrollable container (max-h: 300px via --command-list-max-h)",
    "CommandEmpty — shown by cmdk when no items match; put the 'No results' copy here",
    "CommandGroup — named section; heading is auto-hidden when group has no visible items",
    "CommandItem — one selectable row; value + onSelect; supports disabled + keywords",
    "CommandShortcut — trailing keyboard hint chip (decorative, aria-hidden)",
    "CommandSeparator — 1px divider between groups (bleeds past group padding)",
    "CommandDialog — wraps Command in a full Dialog for global ⌘K palettes",
  ],
  props: [
    { prop: "value", type: "string", description: "Controlled active-descendant value (controlled mode)." },
    { prop: "onValueChange", type: "(value: string) => void", description: "Fired when the active item changes." },
    { prop: "filter", type: "(value: string, search: string) => number", description: "Custom filter function. Return 1 to show, 0 to hide. Default: substring match on item value + keywords." },
    { prop: "shouldFilter", type: "boolean", default: "true", description: "Set false to handle filtering externally (async search, server-side)." },
    { prop: "value (CommandItem)", type: "string", description: "The item's filter key and onSelect argument. Defaults to the item's text content." },
    { prop: "onSelect (CommandItem)", type: "(value: string) => void", description: "Called when the item is activated (Enter or click)." },
    { prop: "keywords (CommandItem)", type: "string[]", description: "Extra search terms beyond the visible label (synonyms, abbreviations)." },
    { prop: "disabled (CommandItem)", type: "boolean", default: "false", description: "Skipped during keyboard nav; opacity:0.5." },
  ],
  states: [
    { state: "Item resting", description: "Transparent bg, text.primary color." },
    { state: "Item active descendant", description: "data-selected=true (cmdk): interactive.selected-bg + interactive.selected-text. Focus stays on the input; this is the aria-activedescendant." },
    { state: "Item disabled", description: "data-disabled=true: opacity:0.5, pointer-events:none, skipped by keyboard." },
    { state: "Empty", description: "CommandEmpty renders automatically when cmdk finds no matching items." },
    { state: "Group heading hidden", description: "Auto-hidden by cmdk when all items in a group are filtered out." },
  ],
  do: [
    "Use CommandDialog with a ⌘K keyboard shortcut for app-wide command palettes — users expect Cmd/Ctrl+K.",
    "Use shouldFilter={false} when fetching search results from an API — pass filtered items and let the server rank results.",
    "Add keywords to CommandItem for items with synonyms: keywords={['prefs', 'settings']} on a 'Preferences' item.",
    "Wrap Command in a Popover for inline typeahead pickers (language selector, project picker, assignee search).",
    "Always provide CommandEmpty with a helpful message — a blank panel is confusing.",
  ],
  dont: [
    "Don't use Command for navigation menus — use NavigationMenu or a plain list of links instead.",
    "Don't skip CommandDialog's title and description props — they are rendered sr-only and are required for screen reader context.",
    "Don't put more than ~100 items in the list without virtualization — cmdk renders all items in the DOM.",
    "Don't rely on CommandShortcut alone to communicate an action — register the keyboard listener separately.",
  ],
  a11y: [
    "cmdk implements the WAI-ARIA Combobox+Listbox pattern: the input has role='combobox' aria-expanded aria-controls aria-activedescendant; the list is role='listbox'; items are role='option' aria-selected.",
    "Focus stays on the input throughout — keyboard navigation moves aria-activedescendant, not DOM focus. This is correct per the pattern.",
    "CommandDialog injects an sr-only DialogTitle + DialogDescription so screen readers always announce the palette's purpose.",
    "The search icon is aria-hidden + opacity:0.5 (decorative). The input carries its accessible name via placeholder or aria-label.",
    "Selected item contrast (interactive.selected-text on interactive.selected-bg): 7.5:1 light, 10.1:1 dark — both clear AA at 14px.",
  ],
  tokens: [
    { property: "Root background", token: "--surface-card", light: "white", dark: "gray.900" },
    { property: "Root radius", token: "--radius-md", light: "6px", dark: "—" },
    { property: "Input border-block-end", token: "--border-default", light: "gray.200", dark: "gray.800" },
    { property: "Input placeholder", token: "--text-tertiary", light: "gray.400", dark: "gray.500" },
    { property: "List max-height", token: "--command-list-max-h", light: "300px", dark: "—" },
    { property: "Group heading color", token: "--text-secondary", light: "gray.600 (5.7:1)", dark: "gray.400" },
    { property: "Item: active-descendant bg", token: "--interactive-selected-bg", light: "blue.50", dark: "gray.800" },
    { property: "Item: active-descendant text", token: "--interactive-selected-text", light: "blue.700 (7.5:1)", dark: "blue.300 (10.1:1)" },
    { property: "Item icon color", token: "--text-secondary", light: "gray.600", dark: "gray.400" },
    { property: "Shortcut color", token: "--text-secondary", light: "gray.600", dark: "gray.400" },
    { property: "Separator bg", token: "--border-default", light: "gray.200 / 1px", dark: "gray.800 / 1px" },
  ],
  usage: `import {
  Command, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandShortcut,
  CommandSeparator, CommandDialog,
} from "@/design-system/command/command"
import { Calculator, Calendar, Settings, User } from "lucide-react"

{/* Inline typeahead (inside a Popover) */}
<Command>
  <CommandInput placeholder="Search projects…" />
  <CommandList>
    <CommandEmpty>No project found.</CommandEmpty>
    <CommandGroup heading="Recent">
      <CommandItem value="atlas" onSelect={() => pick("atlas")}>Project Atlas</CommandItem>
      <CommandItem value="nova" onSelect={() => pick("nova")}>Project Nova</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>

{/* Global ⌘K palette */}
const [open, setOpen] = React.useState(false)
React.useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen((o) => !o) }
  }
  document.addEventListener("keydown", handler)
  return () => document.removeEventListener("keydown", handler)
}, [])

<CommandDialog open={open} onOpenChange={setOpen} title="Quick actions">
  <CommandInput placeholder="Type a command or search…" />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem><Calendar className="size-4" /> Calendar</CommandItem>
      <CommandItem><Calculator className="size-4" /> Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem><User className="size-4" /> Profile<CommandShortcut>⌘P</CommandShortcut></CommandItem>
      <CommandItem><Settings className="size-4" /> Preferences<CommandShortcut>⌘,</CommandShortcut></CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`,
}

const contextMenu: ComponentDoc = {
  slug: "context-menu",
  anatomy: `[Trigger area — right-click to open]
   │
   ▼ (cursor position)
┌────────────────────────────────┐  ← ContextMenuContent
│  Label                         │    bg: surface.card · border: border.default
│  [icon]  View                  │    radius: radius.lg · shadow: shadow.lg
│  [icon]  Copy                  │    min-w: 180px · padding: 4px
│  [x]     Show bookmarks        │  ← ContextMenuCheckboxItem (checked indicator)
│  ─────────────────────────── ─ │  ← ContextMenuSeparator
│  [icon]  Share          >      │  ← ContextMenuSubTrigger (opens SubContent)
│  ─────────────────────────── ─ │
│  [icon]  Delete account ⇧⌘⌫    │  ← ContextMenuItem variant="destructive" (red.700 text)
└────────────────────────────────┘
  highlighted item: action.secondary bg · shortcut: xs/text.secondary/tracking-widest`,
  slots: [
    "ContextMenu — root (controls open state via onOpenChange)",
    "ContextMenuTrigger — the right-click zone (wraps any element)",
    "ContextMenuContent — the floating panel (portalled, positioned at cursor)",
    "ContextMenuGroup — named section of items",
    "ContextMenuItem — one action row; variant='destructive' for danger actions",
    "ContextMenuCheckboxItem — togglable item with check indicator",
    "ContextMenuRadioGroup / ContextMenuRadioItem — exclusive selection group",
    "ContextMenuLabel — non-interactive section heading",
    "ContextMenuSeparator — 1px divider (bleeds to panel edges)",
    "ContextMenuShortcut — trailing keyboard hint (decorative)",
    "ContextMenuSub / ContextMenuSubTrigger / ContextMenuSubContent — nested sub-menu",
  ],
  props: [
    { prop: "variant (ContextMenuItem)", type: '"default" | "destructive"', default: '"default"', description: "destructive renders the item in red (red.700 light / red.300 dark) with a red hover tint. Use for delete, remove, revoke actions." },
    { prop: "inset (ContextMenuItem)", type: "boolean", default: "false", description: "Adds 24px inline-start padding to align text with items that have an icon." },
    { prop: "checked (ContextMenuCheckboxItem)", type: "boolean", description: "Controlled checked state." },
    { prop: "onCheckedChange", type: "(checked: boolean) => void", description: "Fired when a CheckboxItem is toggled." },
    { prop: "value (ContextMenuRadioItem)", type: "string", description: "The value this radio item represents." },
  ],
  states: [
    { state: "Item resting", description: "Transparent bg, text.primary color." },
    { state: "Item highlighted", description: "data-highlighted (Radix): action.secondary bg (gray.100 light / gray.800 dark)." },
    { state: "Item disabled", description: "data-disabled: opacity:0.5, pointer-events:none, skipped by keyboard." },
    { state: "Item destructive", description: "red.700 text (light) / red.300 (dark); red.50 hover bg (light) / neutral hover (dark)." },
    { state: "CheckboxItem checked", description: "aria-checked=true: Check icon rendered in the inset gutter via ItemIndicator." },
    { state: "RadioItem selected", description: "aria-checked=true: filled Circle dot in the inset gutter." },
    { state: "SubTrigger open", description: "data-state=open: same action.secondary bg as highlighted." },
  ],
  do: [
    "Use ContextMenu for secondary actions that don't need to be visible in the primary UI — file operations, object-level actions, view toggles.",
    "Use variant='destructive' for delete/remove items — red color + an icon communicates danger (not color alone).",
    "Group related items with ContextMenuGroup and add a ContextMenuLabel so users understand the section.",
    "Register keyboard shortcuts that appear in ContextMenuShortcut as actual listeners — the chip is decorative only.",
  ],
  dont: [
    "Don't put primary actions only in a context menu — keyboard-only and touch users may never discover them.",
    "Don't use a context menu as the sole way to perform a critical action — mirror it in a visible button or toolbar.",
    "Don't mix too many items — keep context menus under 10 items; use sub-menus for grouped overflows.",
    "Don't rely on the red color alone for the destructive item — always pair it with an icon (e.g. Trash2) and a clear label.",
  ],
  a11y: [
    "Radix provides role='menu' on the content, role='menuitem' / role='menuitemcheckbox' / role='menuitemradio' on items.",
    "Keyboard model: ArrowUp/Down navigate items; Enter/Space activate; ArrowRight opens a sub-menu; ArrowLeft/Escape closes; typing jumps to the first matching item (typeahead).",
    "Focus returns to the element that received the contextmenu event on close (Radix manages this).",
    "ContextMenuTrigger handles both right-click (desktop) and long-press (touch) via the Radix contextmenu event — no separate touch handler needed.",
    "Shortcuts in ContextMenuShortcut are aria-hidden — they are visual annotations only. Register the actual keyboard listener at the application level.",
    "Destructive item: red text alone is not sufficient — pair with an icon + clear label (WCAG 1.4.1).",
  ],
  tokens: [
    { property: "Panel background", token: "--surface-card", light: "white", dark: "gray.900" },
    { property: "Panel border", token: "--border-default", light: "gray.200", dark: "gray.800" },
    { property: "Panel radius", token: "--radius-lg", light: "8px", dark: "—" },
    { property: "Panel shadow", token: "--shadow-lg", light: "multi-stop elevation", dark: "—" },
    { property: "Panel min-width", token: "--dropdown-min-w", light: "180px", dark: "—" },
    { property: "Item highlighted bg", token: "--action-secondary", light: "gray.100", dark: "gray.800" },
    { property: "Item resting text", token: "--text-primary", light: "gray.900 (15:1)", dark: "gray.50 (18:1)" },
    { property: "Destructive text", token: "--menu-item-destructive-text", light: "red.700 (6.5:1)", dark: "red.300" },
    { property: "Destructive hover bg", token: "--menu-item-destructive-bg-hover", light: "red.50", dark: "neutral hover" },
    { property: "Shortcut / label color", token: "--text-secondary", light: "gray.600", dark: "gray.400" },
    { property: "Separator", token: "--border-default / 1px", light: "gray.200", dark: "gray.800" },
  ],
  usage: `import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent,
  ContextMenuGroup, ContextMenuItem, ContextMenuCheckboxItem,
  ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut,
  ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent,
} from "@/design-system/context-menu/context-menu"
import { Copy, Eye, Share, Trash2 } from "lucide-react"

<ContextMenu>
  <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent className="w-56">
    <ContextMenuGroup>
      <ContextMenuLabel>Actions</ContextMenuLabel>
      <ContextMenuItem><Eye className="size-4" /> View</ContextMenuItem>
      <ContextMenuItem><Copy className="size-4" /> Copy<ContextMenuShortcut>⌘C</ContextMenuShortcut></ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
      Show bookmarks bar
    </ContextMenuCheckboxItem>
    <ContextMenuSeparator />
    <ContextMenuSub>
      <ContextMenuSubTrigger><Share className="size-4" /> Share</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Email link</ContextMenuItem>
        <ContextMenuItem>Copy link</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive"><Trash2 className="size-4" /> Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
}

const dataTable: ComponentDoc = {
  slug: "data-table",
  anatomy: `Toolbar  ┌─ [ Filter… ─────────────────── ]  [ Columns v ] ─┐
          └────────────────────────────────────────────────────┘
Table    ┌──────────────────────────────────────────────────────┐
         │  [ ] │ Status      │ Email ↕          │ Amount       │
         ├──────────────────────────────────────────────────────┤  ← TableHeader (h-10, border-block-end)
         │  [ ] │ Success     │ ken99@yahoo.com  │    $316.00   │  ← TableRow (hover: surface.sunken)
         │  [ ] │ Processing  │ abe45@gmail.com  │    $242.00   │    selected: action.secondary bg
         │  [ ] │ Pending     │ monserrat44@…    │    $837.00   │    amount: tabular-nums text-end
         │  [•] │ Failed      │ sixtyfour@…      │    $874.00   │    row actions: Button ghost icon
         └──────────────────────────────────────────────────────┘
Footer   ┌─ 1 of 4 row(s) selected. ──────── [ Previous ] [ Next ] ─┐
          └────────────────────────────────────────────────────────┘`,
  props: [
    { prop: "columns", type: "ColumnDef<TData, TValue>[]", description: "Required. TanStack Table column definitions. Declare sort, cell renderers, header labels, and row-selection checkbox here." },
    { prop: "data", type: "TData[]", description: "Required. The row data array." },
    { prop: "filterColumn", type: "string", description: "Column id the toolbar text filter targets (e.g. 'email'). Omit to hide the filter input." },
    { prop: "filterPlaceholder", type: "string", default: '"Filter…"', description: "Placeholder text for the toolbar filter input." },
  ],
  states: [
    { state: "Row resting", description: "Transparent bg, text.primary cells." },
    { state: "Row hover", description: "surface.sunken bg (gray.50 light / black dark)." },
    { state: "Row selected", description: "data-state=selected: action.secondary bg; row checkbox is checked." },
    { state: "Select-all header", description: "Checkbox is checked (all rows), indeterminate (some rows), or unchecked." },
    { state: "Sort active", description: "Sort ghost button shows ArrowUpDown icon; column.toggleSorting() on click." },
    { state: "Prev / Next disabled", description: "opacity:0.5 + pointer-events:none when at the first or last page." },
    { state: "Column hidden", description: "Columns toggle via the DropdownMenu Columns button; column visibility managed by TanStack." },
  ],
  do: [
    "Declare the select column first in your ColumnDef array — the checkbox should always be the leftmost column.",
    "Use tabular-nums and text-end on numeric cells (amounts, counts) so values align on the decimal point.",
    "Add enableSorting: true on column defs that should be sortable; include an ArrowUpDown sort button in the header cell renderer.",
    "Provide a filterColumn prop so users can search long tables without scrolling.",
    "Use DataTableRowActions with a DropdownMenu for per-row actions (Edit, Delete) — keep the table body uncluttered.",
  ],
  dont: [
    "Don't put more than 6–7 columns in the default view — use column visibility to hide less-important columns by default.",
    "Don't use a Data Table for fewer than ~10 rows — a plain list or Card grid is easier to scan.",
    "Don't omit the footer pagination — always show current page position so users know where they are in the dataset.",
    "Don't use color alone to convey row status — use a Status badge or text label alongside any color indicator.",
  ],
  a11y: [
    "The table renders semantic HTML: <table>, <thead>, <tbody>, <tr>, <th scope='col'>, <td> — screen readers can navigate by row and column.",
    "Select-all and per-row checkboxes are real <input type='checkbox'> elements with labels wired via aria-label or wrapping <Label>.",
    "The sort button is a real <button> inside the <th> — keyboard reachable, announces sort direction via column.getIsSorted() state.",
    "Row actions DropdownMenu trigger has an sr-only label ('Open row menu') since it is icon-only.",
    "Disabled pagination buttons use the disabled attribute — screen readers announce them as unavailable.",
  ],
  tokens: [
    { property: "Table wrapper: border / radius", token: "--border-default / --radius-md", light: "gray.200 / 6px", dark: "gray.800" },
    { property: "Table wrapper: bg", token: "--surface-card", light: "white", dark: "gray.900" },
    { property: "Header: height", token: "--control-md", light: "40px", dark: "—" },
    { property: "Header: border-block-end", token: "--border-default", light: "gray.200", dark: "gray.800" },
    { property: "Row hover bg", token: "--surface-sunken", light: "gray.50", dark: "black" },
    { property: "Row selected bg", token: "--action-secondary", light: "gray.100", dark: "gray.800" },
    { property: "Row border", token: "--border-default", light: "gray.200", dark: "gray.800" },
    { property: "Cell text", token: "--text-primary", light: "gray.900 (15:1)", dark: "gray.50 (18:1)" },
    { property: "Filter max-width", token: "--data-table-filter-max-w", light: "384px", dark: "—" },
    { property: "Footer selection count", token: "--text-secondary", light: "gray.600", dark: "gray.400" },
  ],
  usage: `import { DataTable } from "@/design-system/data-table/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/design-system/checkbox/checkbox"
import { Button } from "@/design-system/button/button"
import { ArrowUpDown } from "lucide-react"

type Payment = { id: string; status: string; email: string; amount: number }

const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(e.target.checked)}
        aria-label="Select row"
      />
    ),
  },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button variant="ghost" size="sm" onClick={() => column.toggleSorting()}>
        Email <ArrowUpDown className="size-4" />
      </Button>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-end">Amount</div>,
    cell: ({ row }) => (
      <div className="text-end tabular-nums">\${row.getValue<number>("amount").toFixed(2)}</div>
    ),
  },
]

<DataTable columns={columns} data={payments} filterColumn="email" filterPlaceholder="Filter emails…" />`,
}

const datePicker: ComponentDoc = {
  slug: "date-picker",
  anatomy: `Label        Date of Birth
             ↓
Trigger  ┌───────────────────────────┐  ← Button outline, justify-between, w-48 (192px)
         │  Select a date         v  │    chevron: text.secondary, icon.md (20px)
         └───────────────────────────┘

(when open)

Popover  ┌───────────────────────────┐  ← PopoverContent (surface.card, shadow.md, radius.lg)
         │  ‹  [June v]  [2025 v]  › │    Calendar captionLayout="dropdown"
         │  Su Mo Tu We Th Fr Sa     │
         │   1  2  3  4  5  6  7    │
         │  …         [25]  …        │  ← selected: action.primary bg (blue.600)
         └───────────────────────────┘
         Selecting a day calls onChange and closes the popover.`,
  props: [
    { prop: "label", type: "React.ReactNode", description: "Rendered above the trigger. Wires htmlFor to the trigger id automatically." },
    { prop: "placeholder", type: "string", default: '"Select a date"', description: "Trigger text when no date is selected." },
    { prop: "value", type: "Date", description: "Controlled selected date." },
    { prop: "onChange", type: "(date: Date | undefined) => void", description: "Fired when the user picks a date. Also called with undefined when selection is cleared." },
    { prop: "format", type: "(date: Date) => string", description: "Custom date formatter for the trigger label. Default: toLocaleDateString()." },
    { prop: "disabled", type: "boolean", default: "false", description: "Disables the trigger — opacity:0.5, no focus." },
    { prop: "id", type: "string", description: "Label/trigger association id. Auto-generated via useId when omitted." },
  ],
  states: [
    { state: "Empty / default", description: "Trigger shows placeholder text in text.primary; popover closed." },
    { state: "Open", description: "aria-expanded=true on trigger; Popover panel renders with Calendar inside." },
    { state: "Selected (closed)", description: "Trigger shows formatted date string." },
    { state: "Trigger hover", description: "action.secondary bg (gray.100 light / gray.700 dark)." },
    { state: "Trigger focus-visible", description: "--button-focus-ring double ring (blue.500)." },
    { state: "Trigger disabled", description: "opacity:0.5, pointer-events:none." },
    { state: "Calendar day states", description: "Inherits full Calendar state set: today, hover, selected, outside, disabled (see Calendar docs)." },
  ],
  do: [
    "Always provide a label — either via the label prop or a surrounding <Label htmlFor>. An unlabelled date picker fails WCAG 1.3.1.",
    "Format the trigger date clearly: format={(d) => format(d, 'MMM d, yyyy')} reads better than the default locale string.",
    "Disable past dates when only future dates are valid: pass disabled={{ before: new Date() }} to the Calendar inside.",
    "Use DatePicker over a plain <input type='date'> when you need cross-browser style consistency and the Calendar's richer UX.",
  ],
  dont: [
    "Don't use DatePicker for date-of-birth entry without switching to captionLayout='dropdown' — navigating month-by-month to 1985 is painful.",
    "Don't place the date picker in a position where the popover would be clipped — set side and align props to keep it in the viewport.",
    "Don't skip the placeholder — an empty trigger with only a chevron gives users no affordance.",
  ],
  a11y: [
    "The trigger is a Button (role='button') with aria-expanded and aria-haspopup='dialog' — keyboard users can open the picker with Enter/Space.",
    "The label prop wires htmlFor to the trigger id automatically so screen readers associate 'Date of Birth' with the trigger button.",
    "The Calendar inside the popover implements the full WAI-ARIA Date Picker grid pattern (see Calendar accessibility notes).",
    "Selecting a day closes the popover and returns focus to the trigger — users can continue tabbing forward from the trigger.",
    "The chevron icon is aria-hidden. The trigger's accessible name comes from its text content (placeholder or formatted date).",
  ],
  tokens: [
    { property: "Trigger width", token: "--date-picker-trigger-w", light: "192px (w-48)", dark: "—" },
    { property: "Trigger height", token: "--control-md", light: "40px", dark: "—" },
    { property: "Trigger: bg / border", token: "--button-outline-* (bg / border)", light: "white / gray.200", dark: "gray.900 / gray.800" },
    { property: "Trigger hover bg", token: "--action-secondary", light: "gray.100", dark: "gray.700" },
    { property: "Trigger focus ring", token: "--button-focus-ring", light: "2px+2px blue.500", dark: "same" },
    { property: "Chevron size / color", token: "--icon-md / --text-secondary", light: "20px / gray.600", dark: "gray.400" },
    { property: "Popover bg / border", token: "--surface-card / --border-default", light: "white / gray.200", dark: "gray.900 / gray.800" },
    { property: "Popover shadow", token: "--shadow-md", light: "raised elevation", dark: "—" },
    { property: "Selected day bg", token: "--action-primary", light: "blue.600", dark: "same" },
    { property: "Selected day text", token: "--text-on-action", light: "white", dark: "same" },
  ],
  usage: `import { DatePicker } from "@/design-system/date-picker/date-picker"
import { format } from "date-fns"

{/* Controlled */}
const [date, setDate] = React.useState<Date | undefined>()

<DatePicker
  label="Date of Birth"
  placeholder="Select a date"
  value={date}
  onChange={setDate}
  format={(d) => format(d, "MMM d, yyyy")}
/>

{/* Future dates only — no past */}
<DatePicker
  label="Appointment date"
  value={appt}
  onChange={setAppt}
/>
{/* Pass disabled={{ before: new Date() }} to the inner Calendar via the component's disabledDates prop */}

{/* Uncontrolled */}
<DatePicker label="Start date" placeholder="Pick a start date" />`,
}

const dialog: ComponentDoc = {
  slug: "dialog",
  anatomy: `┌─ scrim (rgba(0,0,0,0.3)) ────────────────────────────────┐
│                                                           │
│      ┌─ DialogContent ──────────────────────── [X] ────┐  │
│      │  Edit profile                       (title)      │  │  max-w: 512px · padding: 24px
│      │  Make changes to your profile here…  (desc)      │  │  radius: radius.lg · shadow: shadow.lg
│      │                                                   │  │  section gap: 16px · header gap: 8px
│      │  Name         [ Pedro Duarte              ]      │  │
│      │  Username     [ @peduarte                 ]      │  │  ← fields (Label + Input atom)
│      │                                                   │  │
│      │                         [Cancel]  [Save changes] │  │  ← DialogFooter (right-aligned)
│      └───────────────────────────────────────────────────┘  │
│                                                           │
└───────────────────────────────────────────────────────────┘
  Close: X button (top-right), Cancel button, Escape key, scrim click`,
  slots: [
    "Dialog — root (controls open state)",
    "DialogTrigger — the element that opens the dialog (asChild supported)",
    "DialogPortal — renders content outside the DOM tree (auto-used by DialogContent)",
    "DialogOverlay — the scrim behind the panel",
    "DialogContent — the centered panel; showCloseButton prop (default true)",
    "DialogHeader — vertical stack for title + description",
    "DialogTitle — required accessible name (aria-labelledby); 18px/600",
    "DialogDescription — supporting context (aria-describedby); 14px/text.secondary",
    "DialogFooter — right-aligned action row",
    "DialogClose — wraps any element to make it close the dialog (asChild supported)",
  ],
  props: [
    { prop: "open", type: "boolean", description: "Controlled open state. Pair with onOpenChange." },
    { prop: "defaultOpen", type: "boolean", default: "false", description: "Uncontrolled initial open state." },
    { prop: "onOpenChange", type: "(open: boolean) => void", description: "Fired when dialog opens or closes." },
    { prop: "showCloseButton (DialogContent)", type: "boolean", default: "true", description: "Render the top-right X close button inside the panel." },
    { prop: "asChild (Trigger / Close)", type: "boolean", default: "false", description: "Render through to a child element — use with <Button> for trigger/close controls." },
  ],
  states: [
    { state: "Closed", description: "Only the DialogTrigger renders." },
    { state: "Open", description: "Scrim + panel animate in (fade + zoom-in-95); focus moves into content and is trapped; page is inert." },
    { state: "Close", description: "Panel scales out + fades; scrim fades; focus returns to trigger. Dismissed by: X, Cancel, Escape, scrim click." },
    { state: "Field focus", description: "Input atom focus ring inside the dialog body." },
    { state: "X hover / focus", description: "opacity 0.7 → 1.0; focus ring shows." },
    { state: "Footer button hover / focus", description: "Each button uses its own variant hover and focus-ring." },
  ],
  do: [
    "Always include a DialogTitle — it is required for aria-labelledby and the dialog's accessible name. Use sr-only if it must be visually hidden.",
    "Use DialogClose asChild to wrap a cancel Button: <DialogClose asChild><Button variant='secondary'>Cancel</Button></DialogClose>.",
    "Keep dialog content short — if the user needs to scroll to see the footer buttons, consider a Sheet (drawer) or a multi-step flow instead.",
    "Use Dialog for informational, form, or confirmation overlays where clicking the scrim to dismiss is acceptable.",
  ],
  dont: [
    "Don't use Dialog for destructive confirmations where accidental scrim-click would be catastrophic — use AlertDialog instead.",
    "Don't nest dialogs without a very clear UX reason — focus management between stacked dialogs is fragile.",
    "Don't skip DialogDescription if the dialog has complex or destructive consequences — it is read by screen readers for additional context.",
    "Don't put navigation inside a Dialog — navigating away from an open dialog without a close affordance strands keyboard users.",
  ],
  a11y: [
    "Radix sets role='dialog' and aria-modal='true'; DialogTitle and DialogDescription are wired as aria-labelledby/aria-describedby automatically.",
    "Focus is trapped inside the panel while open — Tab and Shift+Tab cycle only the interactive elements inside the dialog.",
    "Escape and scrim-click both close and return focus to the trigger (Radix manages the focus return).",
    "The X button has a visually-hidden 'Close' label; its icon is aria-hidden — screen readers announce 'Close, button'.",
    "Dialog vs AlertDialog: Dialog dismisses on overlay click (use for non-destructive); AlertDialog does NOT (use when the user must make an explicit choice).",
  ],
  tokens: [
    { property: "Scrim", token: "--scrim", light: "rgba(0,0,0,0.3)", dark: "same" },
    { property: "Panel bg", token: "--surface-card", light: "white", dark: "gray.900" },
    { property: "Panel border", token: "--border-default", light: "gray.200", dark: "gray.800" },
    { property: "Panel radius", token: "--radius-lg", light: "8px", dark: "—" },
    { property: "Panel shadow", token: "--shadow-lg", light: "multi-stop elevation", dark: "—" },
    { property: "Panel max-width", token: "--dialog-max-w", light: "512px", dark: "—" },
    { property: "Panel padding", token: "--space-6", light: "24px", dark: "—" },
    { property: "Title size / weight", token: "--font-size-lg / --font-weight-semibold", light: "18px / 600", dark: "—" },
    { property: "Title color", token: "--text-primary", light: "gray.900", dark: "gray.50" },
    { property: "Description color", token: "--text-secondary", light: "gray.600 (5.7:1)", dark: "gray.400" },
    { property: "Footer gap", token: "--space-2", light: "8px", dark: "—" },
    { property: "X icon color", token: "--text-secondary", light: "gray.600", dark: "gray.400" },
  ],
  usage: `import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter,
  DialogTitle, DialogDescription, DialogClose,
} from "@/design-system/dialog/dialog"
import { Button } from "@/design-system/button/button"
import { Input } from "@/design-system/input/input"
import { Label } from "@/design-system/label/label"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes to your profile here. Click save when done.</DialogDescription>
    </DialogHeader>

    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-end">Name</Label>
        <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-end">Username</Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
    </div>

    <DialogFooter>
      <DialogClose asChild>
        <Button variant="secondary">Cancel</Button>
      </DialogClose>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
}

const drawer: ComponentDoc = {
  slug: "drawer",
  anatomy: `┌─ scrim (rgba(0,0,0,0.3)) ────────────────────────────────┐
│                                                           │
│  ┌─ DrawerContent (slides up from bottom) ─────────────┐  │
│  │               ▔▔▔▔▔▔   ← drag handle (100px bar)    │  │  top corners: radius.lg
│  │            Move Goal          (title, centered)      │  │  border-top: border.default
│  │   Set your daily activity goal.  (description)       │  │  shadow.lg
│  │                                                      │  │
│  │         body content (consumer-provided)             │  │  max-content-w: 384px (centered)
│  │                                                      │  │
│  │         [ Submit ]   ← full-width primary            │  │  ← DrawerFooter (stacked column)
│  │         [ Cancel ]   ← full-width outline            │  │    gap: 8px · padding: 16px
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
  Drag handle or scrim click dismisses. Escape also closes.`,
  slots: [
    "Drawer — root (Vaul); accepts direction prop",
    "DrawerTrigger — element that opens the drawer (asChild supported)",
    "DrawerPortal — renders content outside DOM tree (auto-used by DrawerContent)",
    "DrawerOverlay — the scrim",
    "DrawerContent — the sliding panel; renders drag handle automatically (bottom direction)",
    "DrawerHeader — top section with title + description (center-aligned for bottom direction)",
    "DrawerTitle — primary heading; wired as aria-labelledby",
    "DrawerDescription — supporting text; wired as aria-describedby",
    "DrawerFooter — stacked column of action buttons (full-width by default)",
    "DrawerClose — wraps any element to close the drawer (asChild supported)",
  ],
  props: [
    { prop: "direction", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: "Edge the panel slides in from. Drag handle is shown on the bottom direction only." },
    { prop: "shouldScaleBackground", type: "boolean", default: "false", description: "Scales and dims the page background when the drawer opens (Vaul perspective effect). Requires setting data-vaul-drawer-wrapper on the page root." },
    { prop: "open", type: "boolean", description: "Controlled open state. Pair with onOpenChange." },
    { prop: "onOpenChange", type: "(open: boolean) => void", description: "Fired when the drawer opens or closes (including drag-dismiss)." },
    { prop: "asChild (Trigger / Close)", type: "boolean", default: "false", description: "Render through to a child element." },
  ],
  states: [
    { state: "Closed", description: "Only the DrawerTrigger renders." },
    { state: "Open", description: "Scrim + panel slide in from the edge; focus moves into panel and is trapped; page is inert." },
    { state: "Dragging", description: "Vaul follows pointer/touch. Releasing past the dismiss threshold closes; releasing before snaps back." },
    { state: "Dismissed", description: "Panel slides out; scrim fades; focus returns to trigger." },
  ],
  do: [
    "Use Drawer instead of Dialog on mobile viewports — the bottom sheet pattern is more thumb-friendly than a centered modal.",
    "Keep DrawerFooter buttons full-width (default) — easier to tap on touch devices.",
    "Use DrawerClose asChild on the cancel button: <DrawerClose asChild><Button variant='outline'>Cancel</Button></DrawerClose>.",
    "Use direction='right' or 'left' for panel-style navigation drawers (settings, filters) — reserve 'bottom' for action sheets.",
  ],
  dont: [
    "Don't use Drawer for complex multi-step forms — the constrained height and drag-to-dismiss make it easy to accidentally lose work.",
    "Don't skip DrawerTitle — it is the accessible name for the drawer modal.",
    "Don't put more content than fits in 80vh without a scroll container — content overflowing past the viewport bottom is unreachable.",
    "Don't use shouldScaleBackground without setting data-vaul-drawer-wrapper on the page root — the scale effect won't apply.",
  ],
  a11y: [
    "Vaul sets role='dialog' and aria-modal='true'; DrawerTitle and DrawerDescription are wired as aria-labelledby/aria-describedby.",
    "Focus is trapped inside the panel while open — Tab/Shift+Tab cycle only the drawer's interactive elements.",
    "Escape closes the drawer and returns focus to the trigger.",
    "The drag handle is decorative (aria-hidden) — dismiss via drag is a touch enhancement, not the only dismiss path. Escape + Cancel button cover keyboard and AT users.",
    "Bottom-aligned footer buttons (full-width) present large touch targets (40px+ height) — meets WCAG 2.5.8 minimum target size.",
  ],
  tokens: [
    { property: "Scrim", token: "--scrim", light: "rgba(0,0,0,0.3)", dark: "same" },
    { property: "Panel bg", token: "--surface-card", light: "white", dark: "gray.900" },
    { property: "Panel leading radius", token: "--radius-lg", light: "8px (top corners)", dark: "—" },
    { property: "Panel leading border", token: "--border-default", light: "gray.200 (top)", dark: "gray.800" },
    { property: "Panel shadow", token: "--shadow-lg", light: "multi-stop elevation", dark: "—" },
    { property: "Drag handle size", token: "--space-2 × --drawer-handle-w", light: "8px × 100px", dark: "—" },
    { property: "Drag handle bg", token: "--border-default", light: "gray.200", dark: "gray.800" },
    { property: "Max content width", token: "--drawer-content-max-w", light: "384px (centered)", dark: "—" },
    { property: "Title size / weight", token: "--font-size-base / --font-weight-semibold", light: "16px / 600", dark: "—" },
    { property: "Description color", token: "--text-secondary", light: "gray.600 (5.7:1)", dark: "gray.400" },
    { property: "Footer gap / padding", token: "--space-2 / --space-4", light: "8px / 16px", dark: "—" },
  ],
  usage: `import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter,
  DrawerTitle, DrawerDescription, DrawerClose,
} from "@/design-system/drawer/drawer"
import { Button } from "@/design-system/button/button"

<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Move Goal</DrawerTitle>
      <DrawerDescription>Set your daily activity goal.</DrawerDescription>
    </DrawerHeader>

    {/* Body content */}
    <div className="px-4 py-2">
      {/* stepper, form fields, etc. */}
    </div>

    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

{/* Left panel (settings / filter) */}
<Drawer direction="left">
  <DrawerTrigger asChild><Button variant="ghost">Filters</Button></DrawerTrigger>
  <DrawerContent>{/* filter UI */}</DrawerContent>
</Drawer>`,
}

const dropdownMenu: ComponentDoc = {
  slug: "dropdown-menu",
  anatomy: `[Trigger button v]
     │ (opens below by default)
     ▼
┌──────────────────────────────────┐  ← DropdownMenuContent
│  Label                           │    bg: surface.card · border: border.default
│  [icon]  Item              ⌘P    │    radius: radius.lg · shadow: shadow.lg
│  ──────────────────────────────  │    min-w: 180px · padding: 4px
│  [x]     Checkbox item           │  ← DropdownMenuCheckboxItem
│  [icon]  Sub trigger          ›  │  ← DropdownMenuSubTrigger
│  [icon]  Disabled item   (0.5α)  │
│  ──────────────────────────────  │
│  [icon]  Destructive        ⇧⌘⌫  │  ← DropdownMenuItem variant="destructive"
└──────────────────────────────────┘
  highlighted: action.secondary bg · shortcut: xs/text.secondary/tracking-widest`,
  slots: [
    "DropdownMenu — root (controls open state)",
    "DropdownMenuTrigger — the button that opens the menu (asChild supported)",
    "DropdownMenuContent — floating panel (portalled; positioned below trigger by default)",
    "DropdownMenuGroup — semantic grouping of related items",
    "DropdownMenuItem — one action row; variant='destructive' for danger actions",
    "DropdownMenuCheckboxItem — togglable item with check indicator",
    "DropdownMenuRadioGroup / DropdownMenuRadioItem — exclusive selection group",
    "DropdownMenuLabel — non-interactive section heading",
    "DropdownMenuSeparator — 1px divider",
    "DropdownMenuShortcut — trailing keyboard hint chip (decorative)",
    "DropdownMenuSub / DropdownMenuSubTrigger / DropdownMenuSubContent — nested sub-menu",
  ],
  props: [
    { prop: "variant (DropdownMenuItem)", type: '"default" | "destructive"', default: '"default"', description: "destructive renders red text + red hover tint. Use for delete/remove/revoke actions exclusively." },
    { prop: "inset (DropdownMenuItem / Label)", type: "boolean", default: "false", description: "Adds 24px inline-start padding to align with icon-leading items." },
    { prop: "checked (DropdownMenuCheckboxItem)", type: "boolean", description: "Controlled checked state." },
    { prop: "onCheckedChange", type: "(checked: boolean) => void", description: "Fired when the checkbox item is toggled." },
    { prop: "value (DropdownMenuRadioItem)", type: "string", description: "The value this radio item represents. Pair with DropdownMenuRadioGroup value + onValueChange." },
    { prop: "side / align (Content)", type: "string", description: "Popover placement — default side='bottom', align='start'." },
  ],
  states: [
    { state: "Trigger closed", description: "Button in its resting variant state; aria-expanded=false." },
    { state: "Trigger open", description: "aria-expanded=true; aria-haspopup='menu'. Focus ring on trigger." },
    { state: "Item resting", description: "Transparent bg, text.primary." },
    { state: "Item highlighted", description: "data-highlighted (Radix): action.secondary bg." },
    { state: "Item disabled", description: "data-disabled: opacity:0.5, pointer-events:none, skipped by keyboard." },
    { state: "Item destructive", description: "red.700 text (light) / red.300 (dark); red.50 hover bg (light)." },
    { state: "CheckboxItem checked", description: "Check icon in the inset gutter; aria-checked=true." },
    { state: "RadioItem selected", description: "Filled circle dot in the inset gutter; aria-checked=true." },
    { state: "SubTrigger open", description: "data-state=open: action.secondary bg (stays highlighted while sub is open)." },
  ],
  do: [
    "Use DropdownMenu for triggered menus from a button — use ContextMenu for right-click menus.",
    "Use variant='destructive' for delete/remove items — the red signals danger. Always pair it with an icon.",
    "Group related items with DropdownMenuGroup + DropdownMenuLabel; use DropdownMenuSeparator between groups.",
    "Register keyboard shortcuts that appear in DropdownMenuShortcut as actual document listeners — the chip is decorative.",
    "Prefer DropdownMenuCheckboxItem over toggling item labels — checked state is communicated via aria-checked, not just text change.",
  ],
  dont: [
    "Don't use DropdownMenu as a Select replacement for form fields — use the Select component (role='listbox') instead.",
    "Don't put primary call-to-action inside a dropdown — it is hidden by default and reduces discoverability.",
    "Don't mix too many items — keep under 10; use sub-menus for grouped overflows.",
    "Don't rely on color alone for the destructive item — pair red text with an icon + clear action label.",
  ],
  a11y: [
    "Radix provides role='menu' on the content, role='menuitem' / 'menuitemcheckbox' / 'menuitemradio' on items.",
    "Trigger gets aria-expanded and aria-haspopup='menu' — screen readers announce 'has popup, menu'.",
    "Keyboard model: ArrowUp/Down navigate; Enter/Space activate; ArrowRight opens sub-menu; Escape / ArrowLeft closes; Home/End jump to first/last; typing does typeahead.",
    "Focus returns to the trigger on close (Radix manages).",
    "Checkbox/radio state is communicated via aria-checked — not just the indicator glyph — so screen readers announce 'checked' or 'unchecked'.",
    "Destructive item: red.700 on surface.card = 6.5:1 (AA); red.300 on gray.900 (dark) = 5.8:1 (AA). Intent conveyed by icon + label, not color alone.",
  ],
  tokens: [
    { property: "Panel background", token: "--surface-card", light: "white", dark: "gray.900" },
    { property: "Panel border", token: "--border-default", light: "gray.200", dark: "gray.800" },
    { property: "Panel radius", token: "--radius-lg", light: "8px", dark: "—" },
    { property: "Panel shadow", token: "--shadow-lg", light: "multi-stop elevation", dark: "—" },
    { property: "Panel min-width", token: "--dropdown-min-w", light: "180px", dark: "—" },
    { property: "Item highlighted bg", token: "--action-secondary", light: "gray.100", dark: "gray.800" },
    { property: "Item resting text", token: "--text-primary", light: "gray.900 (15:1)", dark: "gray.50 (18:1)" },
    { property: "Destructive text", token: "--menu-item-destructive-text", light: "red.700 (6.5:1)", dark: "red.300 (5.8:1)" },
    { property: "Destructive hover bg", token: "--menu-item-destructive-bg-hover", light: "red.50", dark: "neutral hover" },
    { property: "Shortcut / label color", token: "--text-secondary", light: "gray.600", dark: "gray.400" },
    { property: "Separator", token: "--border-default / 1px", light: "gray.200", dark: "gray.800" },
  ],
  usage: `import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem, DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
} from "@/design-system/dropdown-menu/dropdown-menu"
import { Button } from "@/design-system/button/button"
import { User, Settings, LogOut, Trash2 } from "lucide-react"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem><User className="size-4" /> Profile<DropdownMenuShortcut>⌘P</DropdownMenuShortcut></DropdownMenuItem>
      <DropdownMenuItem><Settings className="size-4" /> Settings<DropdownMenuShortcut>⌘,</DropdownMenuShortcut></DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
      Show status bar
    </DropdownMenuCheckboxItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem><LogOut className="size-4" /> Log out<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut></DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive"><Trash2 className="size-4" /> Delete account</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
}

const empty: ComponentDoc = {
  slug: "empty",
  anatomy: `┌──────────────────────────────────────┐
│                                      │  ← Empty root (flex-col, items-center, text-center)
│         [icon]   ← 24px, text.tertiary, aria-hidden   │    padding: 36px/24px · gap: 16px
│                                      │
│         No messages yet              │  ← title (<p>, 16px/600, text.primary)
│                                      │
│         When you receive a message,  │  ← description (14px, text.secondary, max-w: 280px)
│         it will appear here.         │
│                                      │
│         [Button]                     │  ← children / action slot (flex row, gap: 8px)
└──────────────────────────────────────┘`,
  props: [
    { prop: "title", type: "string", description: "Required. Primary heading text visible to all users and announced by screen readers." },
    { prop: "icon", type: "React.ReactNode", description: "Lucide icon or any inline SVG. The wrapper applies text.tertiary color and aria-hidden." },
    { prop: "description", type: "string", description: "Supporting detail text (max-w: 280px, text.secondary). Explain what the empty state means and how to resolve it." },
    { prop: "children", type: "React.ReactNode", description: "Action slot — typically a Button or link that resolves the empty state." },
  ],
  states: [
    { state: "Default", description: "icon + title + description + action all visible." },
    { state: "Title only", description: "icon and description may be omitted; action slot hidden when children is empty." },
    { state: "Dark mode", description: "Semantic tokens auto-switch — no extra overrides needed." },
  ],
  do: [
    "Write a title that describes what is missing: 'No messages yet' not 'Empty'.",
    "Write a description that explains why and what to do: 'When you receive a message, it will appear here. Compose one to get started.'",
    "Always include an action when the user can resolve the empty state themselves — a 'Compose' or 'Create' button reduces friction.",
    "Use a Lucide icon that matches the content type: Inbox for messages, FolderOpen for projects, Users for contacts.",
  ],
  dont: [
    "Don't use vague copy like 'No data' or 'Nothing here' — describe what is missing and how to add it.",
    "Don't use Empty inside a table cell or a very small container — it needs 36px vertical padding minimum to breathe.",
    "Don't omit the action if the user can take one — a descriptive empty state with no CTA leaves users stuck.",
    "Don't put the Empty title in an <h> element via the title prop — it renders as a <p>. If you need a heading, pass it as children or wrap Empty appropriately.",
  ],
  a11y: [
    "The icon wrapper is aria-hidden='true' — icons are decorative; the title is the AT-readable label for the empty state.",
    "title renders as a <p> element, not a heading — consumers should wrap Empty in the appropriate heading hierarchy or pass a heading via children when the empty state anchors a named section.",
    "description is a <p> in text.secondary — contrast 5.7:1 light / 7.3:1 dark, both clear AA at 14px.",
    "The icon color (text.tertiary = gray.400/500) is below the 3:1 graphical object threshold — this is intentional since the icon is decorative and aria-hidden.",
    "Action buttons inside the children slot carry their own focus indicators and a11y attributes.",
  ],
  tokens: [
    { property: "Root padding-block", token: "--space-9", light: "36px", dark: "—" },
    { property: "Root padding-inline", token: "--space-6", light: "24px", dark: "—" },
    { property: "Root gap", token: "--space-4", light: "16px", dark: "—" },
    { property: "Icon color", token: "--text-tertiary", light: "gray.400 (decorative)", dark: "gray.500" },
    { property: "Icon size", token: "--icon-lg", light: "24px", dark: "—" },
    { property: "Title size / weight", token: "--font-size-base / --font-weight-semibold", light: "16px / 600", dark: "—" },
    { property: "Title color", token: "--text-primary", light: "gray.900 (15:1)", dark: "gray.50 (18:1)" },
    { property: "Description size", token: "--font-size-sm", light: "14px", dark: "—" },
    { property: "Description color", token: "--text-secondary", light: "gray.600 (5.7:1)", dark: "gray.400 (7.3:1)" },
    { property: "Description max-width", token: "280px (no scale token at this value)", light: "280px", dark: "—" },
    { property: "Actions gap", token: "--space-2", light: "8px", dark: "—" },
  ],
  usage: `import { Empty } from "@/design-system/empty/empty"
import { Inbox, FolderOpen } from "lucide-react"
import { Button } from "@/design-system/button/button"

{/* Minimal */}
<Empty title="No results found" />

{/* Full — icon + description + action */}
<Empty
  icon={<Inbox />}
  title="No messages yet"
  description="When you receive a message, it will appear here."
>
  <Button size="sm">Compose</Button>
</Empty>

{/* Inside a card */}
<div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)]">
  <Empty
    icon={<FolderOpen />}
    title="No projects"
    description="Create a project to get started."
  >
    <Button>New project</Button>
    <Button variant="outline">Import</Button>
  </Empty>
</div>`,
}

// ─── Batch 4: Field → Label ───────────────────────────────────────────────────

const field: ComponentDoc = {
  slug: "field",
  anatomy: `Label      Email address *            ← <label> (14px/500, text.primary)
                          ↑ required asterisk (text.destructive, aria-hidden)
Control    [ you@example.com         ]  ← children slot (Input, Select, Textarea…)

Hint       We'll never share your email.  ← <p> (12px, text.secondary) — hidden when error present

Error      Password must be at least 8 characters.  ← <p role="alert"> (12px, text.destructive)
           (Error replaces hint when both are provided)

Root gap between stacked parts: 6px (space-1-5)`,
  slots: [
    "Field — root flex-col wrapper; gap: space-1-5 (6px)",
    "label — rendered as <label htmlFor> when label prop is provided (14px/500/text.primary)",
    "required asterisk — inline * after label text; aria-hidden (decorative only)",
    "children — the control slot: any Input, Select, Textarea, or custom control",
    "hint — <p> below the control (12px, text.secondary); hidden when error is shown",
    "error — <p role='alert' aria-live='polite'> (12px, text.destructive); replaces hint",
  ],
  props: [
    { prop: "label", type: "string", description: "Visible label text. Rendered as a <label> element with htmlFor wired automatically." },
    { prop: "htmlFor", type: "string", description: "The id of the control this label targets. Required when using the label prop." },
    { prop: "hint", type: "string", description: "Helper text shown below the control. Hidden when error is present." },
    { prop: "error", type: "string", description: "Validation error message. Replaces hint. Rendered with role='alert' aria-live='polite'." },
    { prop: "required", type: "boolean", default: "false", description: "Shows a red * after the label (visual only). Set aria-required='true' on the control itself." },
    { prop: "id", type: "string", description: "Prefix for the description element id (id + '-desc'). Pass the same value as aria-describedby on the control." },
  ],
  states: [
    { state: "Default", description: "label + control + optional hint below." },
    { state: "Required", description: "Red * rendered after the label text (aria-hidden). Must set aria-required='true' on the control." },
    { state: "Error", description: "error prop shown in red as role='alert' below control. Hint is not rendered." },
    { state: "Hint only", description: "hint shown in text.secondary when no error is present." },
    { state: "Both hint + error", description: "error takes precedence; hint is suppressed." },
    { state: "Dark mode", description: "Semantic tokens flip — label gray.50, error red.400, hint gray.400." },
  ],
  do: [
    "Always pass htmlFor on Field and a matching id on the control — this is the primary accessibility hook.",
    "Set aria-required='true' on the control when using the required prop — the * is visual-only.",
    "Pass id on Field and aria-describedby={id + '-desc'} on the control to link hint/error text to the input for screen readers.",
    "Use Field to wrap every form control — consistent label + hint + error layout removes decision fatigue.",
  ],
  dont: [
    "Don't rely on the red * alone to communicate 'required' — always set aria-required on the control.",
    "Don't pass both hint and error expecting both to show — error wins and hint is hidden.",
    "Don't use Field for display-only content — it is a form layout wrapper, not a general key-value row.",
    "Don't skip the label for inputs with a placeholder — placeholder disappears on input; label is always visible.",
  ],
  a11y: [
    "<label htmlFor> is the primary a11y hook — clicking the label focuses the control and enlarges the click target.",
    "Required asterisk is aria-hidden='true' (decorative). Set aria-required='true' on the control element itself.",
    "error renders with role='alert' aria-live='polite' — screen readers announce the message when it mounts.",
    "Hint and error associate with the control via aria-describedby pointing at the description element id (id + '-desc').",
    "Contrast: label text.primary 15:1 (light) / 18:1 (dark); error text.destructive 5.7:1 / 5.0:1; hint text.secondary 5.7:1 / 7.3:1.",
  ],
  tokens: [
    { property: "Root gap", token: "--space-1-5", light: "6px", dark: "—" },
    { property: "Label font-size", token: "--font-size-sm", light: "14px", dark: "—" },
    { property: "Label font-weight", token: "--font-weight-medium", light: "500", dark: "—" },
    { property: "Label color", token: "--text-primary", light: "gray.900 (15:1)", dark: "gray.50 (18:1)" },
    { property: "Required asterisk color", token: "--text-destructive", light: "red.600 (5.7:1)", dark: "red.400 (5.0:1)" },
    { property: "Hint font-size", token: "--font-size-xs", light: "12px", dark: "—" },
    { property: "Hint color", token: "--text-secondary", light: "gray.600 (5.7:1)", dark: "gray.400 (7.3:1)" },
    { property: "Error font-size", token: "--font-size-xs", light: "12px", dark: "—" },
    { property: "Error color", token: "--text-destructive", light: "red.600 (5.7:1)", dark: "red.400 (5.0:1)" },
  ],
  usage: `import { Field } from "@/design-system/field/field"
import { Input } from "@/design-system/input/input"

{/* Default with hint */}
<Field label="Email address" htmlFor="email" hint="We'll never share your email.">
  <Input id="email" type="email" placeholder="you@example.com" />
</Field>

{/* Required + validation error */}
<Field
  label="Password"
  htmlFor="password"
  required
  error="Password must be at least 8 characters."
  id="password-field"
>
  <Input
    id="password"
    type="password"
    aria-required="true"
    aria-describedby="password-field-desc"
  />
</Field>

{/* No label — control provides its own name */}
<Field hint="Max 280 characters.">
  <textarea className="w-full" aria-label="Bio" rows={3} />
</Field>`,
}

const hoverCard: ComponentDoc = {
  slug: "hover-card",
  anatomy: `[Trigger — any inline element, typically a link]
        | (pointer enters; 700ms openDelay)
        v
+---------------------------------------------------+  <- HoverCardContent
|  [Avatar]  @shadcn                                |    bg: surface.card  border: border.default
|            The creator of shadcn/ui.              |    radius: radius.lg  shadow: shadow.lg
|                                                   |    width: 320px (--hover-card-w)
|  [icon]  Joined December 2021                     |    padding: 16px  side-offset: 4px
+---------------------------------------------------+
  Pointer leaves -> 300ms closeDelay -> card dismisses (pointer may enter card).
  Escape closes. Focus does NOT enter the card (non-modal).`,
  props: [
    { prop: "openDelay", type: "number", default: "700", description: "Milliseconds after pointer enters trigger before the card opens. Prevents accidental triggers." },
    { prop: "closeDelay", type: "number", default: "300", description: "Milliseconds after pointer leaves before closing. Allows pointer to move from trigger to card." },
    { prop: "open", type: "boolean", description: "Controlled open state." },
    { prop: "onOpenChange", type: "(open: boolean) => void", description: "Fired when open state changes." },
    { prop: "align (HoverCardContent)", type: '"start" | "center" | "end"', default: '"center"', description: "Horizontal alignment relative to the trigger." },
    { prop: "sideOffset (HoverCardContent)", type: "number", default: "4", description: "Gap in pixels between trigger and card panel." },
    { prop: "side (HoverCardContent)", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Preferred side. Radix flips automatically on collision." },
  ],
  states: [
    { state: "Closed", description: "Trigger renders; card not mounted." },
    { state: "Open", description: "Card portalled at z-50, positioned with collision avoidance. Fade-in animation." },
    { state: "Pointer in card", description: "Card stays open while pointer is in the card body (within closeDelay window)." },
    { state: "Dark mode", description: "surface.card, border.default, text.primary flip via semantic tokens." },
  ],
  do: [
    "Use HoverCard for supplemental preview content — user profiles, link previews, image thumbnails.",
    "Set openDelay to 500–700ms to prevent accidental triggers during pointer traversal.",
    "Keep card content scannable — under 4 lines. For richer content needing interaction, use Popover.",
    "Use asChild on HoverCardTrigger to render through to a semantic link or button.",
  ],
  dont: [
    "Don't put critical interactive controls in HoverCard — hover is not accessible on touch devices.",
    "Don't use HoverCard as a Tooltip replacement (for text-only labels) or Popover replacement (for click-triggered rich content).",
    "Don't reduce openDelay to 0 — immediate hover cards are distracting and violate WCAG 1.4.13.",
    "Don't assume the card is reachable on mobile — mirror critical content elsewhere in the UI.",
  ],
  a11y: [
    "Radix implements WAI-ARIA disclosure — the card is non-modal and supplemental; Tab still moves through the page normally.",
    "Focus does NOT enter the card — this is intentional. For focusable card content, use a Popover with a button trigger.",
    "Escape closes the card without moving focus.",
    "openDelay of 700ms satisfies WCAG 1.4.13: hover content can be dismissed, hovered over, and persists until dismissed.",
    "The card is not the only path to the information — all critical content should be available on the destination page.",
  ],
  tokens: [
    { property: "Panel width", token: "--hover-card-w", light: "320px", dark: "—" },
    { property: "Panel padding", token: "--space-4", light: "16px", dark: "—" },
    { property: "Panel radius", token: "--radius-lg", light: "8px", dark: "—" },
    { property: "Panel border", token: "--border-default", light: "gray.200", dark: "gray.800" },
    { property: "Panel background", token: "--surface-card", light: "white", dark: "gray.900" },
    { property: "Panel shadow", token: "--shadow-lg", light: "multi-stop elevation", dark: "—" },
    { property: "Side offset", token: "4px (bare — matches Popover/Tooltip)", light: "4px", dark: "—" },
    { property: "Content text", token: "--text-primary", light: "gray.900 (15:1)", dark: "gray.50 (18:1)" },
    { property: "Secondary text", token: "--text-secondary", light: "gray.600 (5.7:1)", dark: "gray.400 (7.3:1)" },
  ],
  usage: `import {
  HoverCard, HoverCardTrigger, HoverCardContent,
} from "@/design-system/hover-card/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/design-system/avatar/avatar"
import { CalendarDays } from "lucide-react"

<HoverCard>
  <HoverCardTrigger asChild>
    <a href="/u/shadcn" className="text-sm underline text-[var(--text-link)]">@shadcn</a>
  </HoverCardTrigger>
  <HoverCardContent side="bottom" align="start">
    <div className="flex gap-[var(--space-4)]">
      <Avatar>
        <AvatarImage src="/avatars/shadcn.jpg" alt="@shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-[var(--space-1)]">
        <p className="text-sm font-semibold">@shadcn</p>
        <p className="text-sm text-[var(--text-secondary)]">
          The creator of shadcn/ui. Building design systems.
        </p>
        <div className="flex items-center gap-[var(--space-2)] pt-[var(--space-2)]">
          <CalendarDays className="size-4 text-[var(--text-tertiary)]" aria-hidden />
          <span className="text-xs text-[var(--text-secondary)]">Joined December 2021</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
}

const input: ComponentDoc = {
  slug: "input",
  anatomy: `+---------------------------------------------+  <- border: field-border (gray.200 / gray.800)
|  you@example.com                            |    bg: field-bg (white / gray.900)
+---------------------------------------------+    radius: field-radius (6px)
                                                   height: 32 / 40 / 48px (sm/md/lg)
  hover    -> border: field-border-hover (gray.500)
  focus    -> border: field-border-focus (blue.500) + field-focus-ring double ring
  error    -> border: field-border-error (red.500)  + field-focus-ring-error (red.500 ring)
  disabled -> opacity:0.5  bg: field-bg-disabled  cursor:not-allowed`,
  props: [
    { prop: "inputSize", type: '"sm" | "md" | "lg"', default: '"md"', description: "Control height and font. sm: 32px/14px, md: 40px/16px, lg: 48px/18px." },
    { prop: "error", type: "boolean", default: "false", description: "Sets aria-invalid='true' and switches to error border + error focus ring. Always pair with a visible message." },
    { prop: "type", type: "string", default: '"text"', description: "Native input type: text, email, password, search, number, url, file, etc." },
    { prop: "disabled", type: "boolean", default: "false", description: "Disables the field — opacity:0.5, surface.disabled bg, cursor:not-allowed." },
    { prop: "readOnly", type: "boolean", default: "false", description: "Value is selectable but not editable. Uses surface.disabled bg to signal non-editable." },
    { prop: "placeholder", type: "string", description: "Hint text shown when empty. Rendered in text.tertiary. Not a label replacement." },
  ],
  states: [
    { state: "Default", description: "field-border (gray.200 light / gray.800 dark)." },
    { state: "Hover", description: "field-border-hover (gray.500 both modes)." },
    { state: "Focus", description: "field-border-focus (blue.500) + field-focus-ring double ring." },
    { state: "Disabled", description: "opacity:0.5, field-bg-disabled (gray.100/gray.800), cursor:not-allowed." },
    { state: "Error", description: "aria-invalid=true, field-border-error (red.500), error focus ring on focus." },
    { state: "Read-only", description: "field-bg-disabled bg; value is text-selectable; border unchanged." },
    { state: "Loading", description: "Compose: add trailing spinner + aria-busy='true' inside a Field wrapper." },
    { state: "Active (typing)", description: "No separate pressed state — caret and value reflect input directly." },
  ],
  do: [
    "Always pair Input with a Label via Field — placeholders disappear on input and cannot substitute a label.",
    "Pass error={true} + aria-describedby pointing at the error message — both visual and AT users need the message.",
    "Use inputSize='sm' in dense layouts (tables, toolbars) and inputSize='lg' for prominent hero fields.",
    "Set type correctly — email, url, password, search give browsers and AT the right affordances.",
  ],
  dont: [
    "Don't use placeholder as the input's label — it disappears the moment the user starts typing.",
    "Don't set error={true} without providing a visible error message — a red border alone fails WCAG 1.4.1.",
    "Don't set a fixed px width that prevents the input from shrinking on mobile — use w-full inside a flexible container.",
    "Don't use the native size attribute — use inputSize prop instead (native size has character-width semantics).",
  ],
  a11y: [
    "aria-invalid='true' is set automatically when error={true} — screen readers announce the field as 'invalid'.",
    "Always pair with a <label htmlFor> or aria-label — placeholder is not an accessible name.",
    "Link hint/error text via aria-describedby so screen readers announce the error after the field name.",
    "Focus ring: outer ring is page bg color, inner ring is blue.500 — meets WCAG 1.4.11 (3:1 against adjacent colors).",
    "Keyboard: Tab/Shift+Tab reach the input; native typing, clipboard, and arrow navigation work without JS.",
  ],
  tokens: [
    { property: "Background", token: "--field-bg", light: "white", dark: "gray.900" },
    { property: "Background: disabled / read-only", token: "--field-bg-disabled", light: "gray.100", dark: "gray.800" },
    { property: "Border: resting", token: "--field-border", light: "gray.200", dark: "gray.800" },
    { property: "Border: hover", token: "--field-border-hover", light: "gray.500", dark: "gray.500" },
    { property: "Border: focus", token: "--field-border-focus", light: "blue.500", dark: "blue.500" },
    { property: "Border: error", token: "--field-border-error", light: "red.500", dark: "red.500" },
    { property: "Text color", token: "--field-text", light: "gray.900 (15:1)", dark: "gray.50 (18:1)" },
    { property: "Placeholder color", token: "--field-placeholder", light: "gray.400", dark: "gray.500" },
    { property: "Border radius", token: "--field-radius", light: "6px (radius.md)", dark: "—" },
    { property: "Focus ring", token: "--field-focus-ring", light: "2px page + 2px blue.500", dark: "same" },
    { property: "Error focus ring", token: "--field-focus-ring-error", light: "2px page + 2px red.500", dark: "same" },
    { property: "Height sm / md / lg", token: "--control-sm / --control-md / --control-lg", light: "32 / 40 / 48px", dark: "—" },
  ],
  usage: `import { Input } from "@/design-system/input/input"
import { Field } from "@/design-system/field/field"

{/* Default */}
<Input placeholder="you@example.com" type="email" />

{/* Inside Field (recommended) */}
<Field label="Email address" htmlFor="email">
  <Input id="email" type="email" placeholder="you@example.com" />
</Field>

{/* Sizes */}
<Input inputSize="sm" placeholder="Small" />
<Input inputSize="md" placeholder="Medium (default)" />
<Input inputSize="lg" placeholder="Large" />

{/* Error state */}
<Field label="Email" htmlFor="email" error="Enter a valid email address." id="email-f">
  <Input id="email" type="email" error aria-describedby="email-f-desc" />
</Field>

{/* Disabled / Read-only */}
<Input disabled placeholder="Disabled" />
<Input readOnly value="read-only value" />`,
}

const inputGroup: ComponentDoc = {
  slug: "input-group",
  anatomy: `+----------------------------------------------------------+  <- InputGroup (border + focus ring host)
|  [icon] |  Enter amount...          |  USD             |    bg: field-bg
|  addon  |  InputGroupField (flex-1) |  suffix addon    |    border: field-border (gray.200)
|  gray.50|  no own border            |  gray.50         |    radius: field-radius (6px)
+----------------------------------------------------------+    height: control-md (40px)
                                                             focus-within: field-border-focus + field-focus-ring
  Prefix addon -> border-right divider
  Suffix addon -> border-left divider
  Addon bg: surface.sunken (gray.50 light / black dark)  color: text.secondary`,
  slots: [
    "InputGroup — outer flex wrapper; hosts border, radius, and :focus-within ring",
    "InputAddon — prefix or suffix block; gets surface.sunken bg + divider border; accepts icon, text, or button",
    "InputGroupField — the <input> inside; flex-1, no own border; forwards all native input attributes",
  ],
  props: [
    { prop: "InputGroup (children)", type: "React.ReactNode", description: "Compose InputAddon + InputGroupField in order. Position determines prefix vs suffix — no explicit side prop." },
    { prop: "InputAddon (children)", type: "React.ReactNode", description: "Icon (aria-hidden when decorative), text string, or a <button>." },
    { prop: "InputGroupField", type: "React.InputHTMLAttributes<HTMLInputElement>", description: "Forwards all native input attributes: type, placeholder, value, onChange, disabled, aria-*, etc." },
  ],
  states: [
    { state: "Resting", description: "field-border outline on the whole group; addons show surface.sunken bg." },
    { state: "Focus (:focus-within)", description: "field-border-focus (blue.500) + field-focus-ring double ring on the whole group." },
    { state: "Disabled", description: "opacity:0.5 on the group; cursor:not-allowed via has-[input:disabled]." },
    { state: "Error", description: "Consumer adds border-[var(--field-border-error)] to InputGroup — same pattern as Input." },
    { state: "Dark mode", description: "surface.sunken -> black; field-border -> gray.800; text.secondary -> gray.400." },
  ],
  do: [
    "Wrap InputGroup in a Field to get label + hint + error layout automatically.",
    "Set aria-hidden='true' on decorative-only addon icons — the input's aria-label carries the accessible name.",
    "Use aria-label on InputGroupField when a prefix/suffix fully describes the field: aria-label='Amount in USD'.",
    "Use a <button> inside InputAddon for clearable inputs or password-reveal toggles.",
  ],
  dont: [
    "Don't add a border to InputGroupField — the border lives on InputGroup; a double border breaks the group visually.",
    "Don't stack more than one InputAddon per side — combine them inside a single InputAddon.",
    "Don't use InputGroup when a plain Input suffices — only add addons when they genuinely aid comprehension.",
    "Don't skip aria-label on InputGroupField when using a decorative-only addon.",
  ],
  a11y: [
    "Decorative addon (icon, symbol) must be aria-hidden='true'; the accessible name comes from <label htmlFor> or aria-label on InputGroupField.",
    "A <button> addon participates in the natural tab order — no extra role needed.",
    "Focus ring is on the InputGroup wrapper via :focus-within — the whole group highlights as a unit when the inner input is focused.",
    "Error: add border-[var(--field-border-error)] to InputGroup and aria-invalid + aria-describedby to InputGroupField.",
  ],
  tokens: [
    { property: "Group height", token: "--control-md", light: "40px", dark: "—" },
    { property: "Group radius", token: "--field-radius", light: "6px", dark: "—" },
    { property: "Group border: resting", token: "--field-border", light: "gray.200", dark: "gray.800" },
    { property: "Group border: focus-within", token: "--field-border-focus", light: "blue.500", dark: "blue.500" },
    { property: "Group focus ring", token: "--field-focus-ring", light: "2px page + 2px blue.500", dark: "same" },
    { property: "Group background", token: "--field-bg", light: "white", dark: "gray.900" },
    { property: "Addon padding-inline", token: "--space-3", light: "12px", dark: "—" },
    { property: "Addon background", token: "--surface-sunken", light: "gray.50", dark: "black" },
    { property: "Addon divider border", token: "--field-border", light: "gray.200", dark: "gray.800" },
    { property: "Addon text/icon color", token: "--text-secondary", light: "gray.600 (5.7:1)", dark: "gray.400 (7.3:1)" },
    { property: "Field padding-inline", token: "--space-3", light: "12px", dark: "—" },
  ],
  usage: `import { InputGroup, InputAddon, InputGroupField } from "@/design-system/input-group/input-group"
import { Field } from "@/design-system/field/field"
import { Search, DollarSign, Globe } from "lucide-react"

{/* Prefix icon */}
<InputGroup>
  <InputAddon aria-hidden><Search className="size-4" /></InputAddon>
  <InputGroupField type="search" placeholder="Search..." aria-label="Search" />
</InputGroup>

{/* Prefix text */}
<InputGroup>
  <InputAddon>https://</InputAddon>
  <InputGroupField type="url" placeholder="example.com" aria-label="Website URL" />
</InputGroup>

{/* Prefix icon + suffix text */}
<InputGroup>
  <InputAddon aria-hidden><DollarSign className="size-4" /></InputAddon>
  <InputGroupField type="number" placeholder="0.00" aria-label="Amount in USD" />
  <InputAddon>USD</InputAddon>
</InputGroup>

{/* Wrapped in Field */}
<Field label="Website" htmlFor="site-url" hint="Include the full URL.">
  <InputGroup>
    <InputAddon aria-hidden><Globe className="size-4" /></InputAddon>
    <InputGroupField id="site-url" type="url" placeholder="https://example.com" />
  </InputGroup>
</Field>`,
}

const inputOtp: ComponentDoc = {
  slug: "input-otp",
  anatomy: `+-----+-----+-----+     +-----+-----+-----+
|  1  |  2  |  3  |  -  |  4  |  5  |  6  |   <- 6-digit, 2 groups of 3
+-----+-----+-----+     +-----+-----+-----+
   InputOTPGroup    Sep    InputOTPGroup

Active slot: field-border-focus (blue.500) + field-focus-ring + blinking caret
Filled slot: character in text.primary (16px/500)
Slot size:   40x40px (--otp-slot-size = control-md)
Group gap:   space-2 (8px) between slots within a group`,
  slots: [
    "InputOTP — root; wraps the native <input> (input-otp library); accepts maxLength, pattern, value, onChange",
    "InputOTPGroup — flex row of adjacent slots sharing merged borders",
    "InputOTPSlot — single character box; index prop required (0-based)",
    "InputOTPSeparator — dash between groups; role='separator' aria-hidden='true'",
  ],
  props: [
    { prop: "maxLength", type: "number", description: "Required. Total number of OTP characters." },
    { prop: "pattern", type: "string", description: "Character constraint regexp. Use REGEXP_ONLY_DIGITS for numeric OTPs." },
    { prop: "value", type: "string", description: "Controlled value. Full when length equals maxLength." },
    { prop: "onChange", type: "(value: string) => void", description: "Fired on every character entry, deletion, or paste." },
    { prop: "disabled", type: "boolean", default: "false", description: "Disables the input — group opacity:0.5, cursor:not-allowed." },
    { prop: "index (InputOTPSlot)", type: "number", description: "Required. Zero-based slot position within InputOTP." },
  ],
  states: [
    { state: "Empty slot (inactive)", description: "field-border, no character, no caret." },
    { state: "Active slot", description: "field-border-focus (blue.500) + field-focus-ring + blinking fake caret." },
    { state: "Filled slot", description: "Character in text.primary (16px/500)." },
    { state: "Disabled", description: "Wrapper opacity:0.5; cursor:not-allowed." },
    { state: "Dark mode", description: "field-border -> gray.800; text.primary -> gray.50; focus ring stays blue.500." },
  ],
  do: [
    "Group digits logically: 6-digit OTP -> 2 groups of 3; 8-char code -> 2 groups of 4.",
    "Use REGEXP_ONLY_DIGITS for numeric codes — prevents alphabetic entry and sets the right mobile keyboard.",
    "Handle onChange to validate when value.length === maxLength (auto-submit or trigger verification).",
    "Wrap in Field with a label: 'Verification code' gives screen reader users context.",
  ],
  dont: [
    "Don't build a fake OTP from individual <input> elements — input-otp uses a single native input for correct AT behavior.",
    "Don't skip the index prop on InputOTPSlot — each slot must know its position.",
    "Don't use InputOTP for codes longer than 8 characters — the slot layout becomes unwieldy; use a plain Input instead.",
    "Don't auto-submit without a brief delay — give the user a moment to see the filled state.",
  ],
  a11y: [
    "input-otp uses a single hidden native <input> — screen readers interact with one field and announce characters naturally.",
    "Copy-paste fills all slots in one action — the library handles distribution automatically.",
    "maxLength maps to the native input maxlength attribute — AT knows the maximum allowed length.",
    "InputOTPSeparator is role='separator' aria-hidden='true' — decorative grouping, not a typeable character.",
    "The fake visual caret is aria-hidden — the library manages a real caret inside the hidden input for AT.",
  ],
  tokens: [
    { property: "Slot size (w + h)", token: "--otp-slot-size (= control-md)", light: "40px", dark: "—" },
    { property: "Slot border: resting", token: "--field-border", light: "gray.200", dark: "gray.800" },
    { property: "Slot border: active", token: "--field-border-focus", light: "blue.500", dark: "blue.500" },
    { property: "Slot focus ring", token: "--field-focus-ring", light: "2px page + 2px blue.500", dark: "same" },
    { property: "Character font-size", token: "--font-size-base", light: "16px", dark: "—" },
    { property: "Character font-weight", token: "--font-weight-medium", light: "500", dark: "—" },
    { property: "Character color", token: "--text-primary", light: "gray.900 (15:1)", dark: "gray.50 (18:1)" },
    { property: "Group slot gap", token: "--space-2", light: "8px", dark: "—" },
    { property: "Separator icon size", token: "--icon-sm", light: "16px", dark: "—" },
    { property: "Separator icon color", token: "--text-tertiary", light: "gray.400", dark: "gray.500" },
  ],
  usage: `import {
  InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator,
} from "@/design-system/input-otp/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"

{/* 6-digit SMS code */}
<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} onChange={(v) => v.length === 6 && verify(v)}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>

{/* 4-digit PIN */}
<InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
  <InputOTPGroup>
    {Array.from({ length: 4 }, (_, i) => <InputOTPSlot key={i} index={i} />)}
  </InputOTPGroup>
</InputOTP>`,
}

const item: ComponentDoc = {
  slug: "item",
  anatomy: `+--------------------------------------------------------------+
|  [icon]   Notifications                        [Badge: 4]   |  <- interactive item
|           New alerts                                        |     padding: 12px/16px  gap: 12px
+--------------------------------------------------------------+     hover: action.secondary bg

+--------------------------------------------------------------+
|  [icon]   Account settings                           [>]    |  <- navigation row
|           Manage your profile and preferences               |
+--------------------------------------------------------------+

Icon:        20px, text.secondary, aria-hidden
Title:       14px/500, text.primary, line-height tight
Description: 12px, text.secondary, line-height normal
Trailing:    text.secondary (badge, count, icon, action)`,
  props: [
    { prop: "title", type: "string", description: "Required. Primary text — the item's visible heading and accessible label." },
    { prop: "icon", type: "React.ReactNode", description: "Leading Lucide icon or SVG. aria-hidden applied automatically." },
    { prop: "description", type: "string", description: "Secondary line below the title (12px, text.secondary)." },
    { prop: "trailing", type: "React.ReactNode", description: "Trailing slot — Badge, count string, ChevronRight icon, or action button." },
    { prop: "interactive", type: "boolean", default: "false", description: "Adds hover/focus/active styles, role='button', tabIndex={0}." },
  ],
  states: [
    { state: "Static", description: "Display-only — no hover/focus states, no role." },
    { state: "Interactive: hover", description: "action.secondary bg (gray.100 light / gray.800 dark)." },
    { state: "Interactive: active", description: "action.secondary.active bg (gray.300 light / gray.500 dark)." },
    { state: "Interactive: focus-visible", description: "focus-ring double ring on the whole row." },
    { state: "Dark mode", description: "title gray.50, description gray.400, icon gray.400." },
  ],
  do: [
    "Set interactive={true} when the row is clickable — adds role='button', tabIndex, and all interactive states.",
    "Wrap static items in <ul><li> for screen readers to announce the list count.",
    "Use the trailing slot for Badge counts, ChevronRight navigation hints, or quick-action icon buttons.",
    "Add a description for items where the title alone is ambiguous.",
  ],
  dont: [
    "Don't make an item interactive without handling keyboard activation — role='button' requires Enter and Space to fire the same action as a click.",
    "Don't nest a real <a> or <button> inside an item that already has interactive={true} — creates conflicting roles.",
    "Don't put critical action buttons in the trailing slot of an interactive row — the whole row is already clickable.",
    "Don't omit the title prop — it is required and serves as the item's accessible label.",
  ],
  a11y: [
    "Static items carry no implicit role — use <ul><li> wrapping so AT announces list count.",
    "Interactive items get role='button' + tabIndex={0} — Enter and Space must fire the same action as onClick.",
    "The icon is aria-hidden='true' automatically — the title carries the accessible name.",
    "Focus ring (double ring) meets WCAG 1.4.11: outer ring matches page bg, inner ring is blue.500.",
  ],
  tokens: [
    { property: "Padding-inline", token: "--space-4", light: "16px", dark: "—" },
    { property: "Padding-block", token: "--space-3", light: "12px", dark: "—" },
    { property: "Gap", token: "--space-3", light: "12px", dark: "—" },
    { property: "Interactive hover bg", token: "--action-secondary", light: "gray.100", dark: "gray.800" },
    { property: "Interactive active bg", token: "--action-secondary-active", light: "gray.300", dark: "gray.500" },
    { property: "Focus ring", token: "--focus-ring", light: "2px page + 2px blue.500", dark: "same" },
    { property: "Icon size", token: "--icon-md", light: "20px", dark: "—" },
    { property: "Icon color", token: "--text-secondary", light: "gray.600", dark: "gray.400" },
    { property: "Title font-size / weight", token: "--font-size-sm / --font-weight-medium", light: "14px / 500", dark: "—" },
    { property: "Title color", token: "--text-primary", light: "gray.900 (15:1)", dark: "gray.50 (18:1)" },
    { property: "Description font-size", token: "--font-size-xs", light: "12px", dark: "—" },
    { property: "Description color", token: "--text-secondary", light: "gray.600 (5.7:1)", dark: "gray.400 (7.3:1)" },
  ],
  usage: `import { Item } from "@/design-system/item/item"
import { Bell, Settings, ChevronRight } from "lucide-react"
import { Badge } from "@/design-system/badge/badge"

{/* Static list */}
<ul>
  <li><Item icon={<Bell />} title="Alerts" description="No new alerts" /></li>
</ul>

{/* Interactive with badge */}
<Item
  icon={<Bell />}
  title="Notifications"
  description="New alerts awaiting review"
  trailing={<Badge>4</Badge>}
  interactive
  onClick={() => router.push("/notifications")}
  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && router.push("/notifications")}
/>

{/* Navigation row */}
<Item
  icon={<Settings />}
  title="Account settings"
  description="Manage your profile and preferences"
  trailing={<ChevronRight className="size-4" aria-hidden />}
  interactive
/>`,
}

const kbd: ComponentDoc = {
  slug: "kbd",
  anatomy: `Inline chip styled as a physical keyboard key:

  +----------+  <- border-radius: radius.sm (4px)
  |   Cmd K  |     bg: surface.sunken (gray.50 light / black dark)
  +----------+     border: border.default (gray.200 / gray.800)
                   box-shadow: 0 1px 0 var(--border-default)  (simulates key depth)
                   padding: 6px/2px (inline/block)
                   font: 12px/500/mono  color: text.secondary

No interactive states. Purely informational.`,
  props: [
    { prop: "children", type: "React.ReactNode", description: "Key label — text or Unicode symbol. Examples: 'Enter', 'Esc', 'Cmd', 'Ctrl', 'Shift', 'Tab', 'Space'." },
  ],
  states: [
    { state: "Default", description: "surface.sunken bg + border.default + 1px bottom depth shadow." },
    { state: "Dark mode", description: "bg: black; border: gray.800; color: gray.400 (7.3:1 on black)." },
  ],
  do: [
    "Use one Kbd per physical key: Ctrl + Shift + P — not one chip with 'Ctrl+Shift+P'.",
    "Use Unicode symbols for modifier keys: Cmd, Shift, Alt/Option, Ctrl.",
    "Pair with DropdownMenuShortcut or ContextMenuShortcut to label shortcuts next to menu items.",
    "Use Kbd inline in prose: 'Press Kbd to open the command palette.'",
  ],
  dont: [
    "Don't use Kbd to label button actions — put the shortcut in a menu shortcut slot alongside a visible label.",
    "Don't make Kbd interactive — it represents a key to press, not a control to activate.",
    "Don't put multi-key combos in a single Kbd — each physical key gets its own chip.",
    "Don't rely on Kbd alone to communicate a shortcut — register the keyboard listener in code.",
  ],
  a11y: [
    "Uses the semantic <kbd> HTML element — some AT (NVDA, JAWS) announce it as 'keyboard key'.",
    "For compound shortcuts, separate each Kbd with visible '+' text so screen readers announce 'Command plus Shift plus P' naturally.",
    "Kbd is informational only — no role or tabIndex needed. Keyboard shortcuts must be registered as actual event listeners.",
    "Contrast: text.secondary on surface.sunken = 4.8:1 light (gray.600 on gray.50); 7.3:1 dark (gray.400 on black) — both AA at 12px.",
  ],
  tokens: [
    { property: "Border radius", token: "--radius-sm", light: "4px", dark: "—" },
    { property: "Border", token: "--border-default", light: "gray.200", dark: "gray.800" },
    { property: "Background", token: "--surface-sunken", light: "gray.50", dark: "black" },
    { property: "Padding-inline", token: "--space-1-5", light: "6px", dark: "—" },
    { property: "Padding-block", token: "--space-0-5", light: "2px", dark: "—" },
    { property: "Font size", token: "--font-size-xs", light: "12px", dark: "—" },
    { property: "Font weight", token: "--font-weight-medium", light: "500", dark: "—" },
    { property: "Font family", token: "font-mono", light: "JetBrains Mono / mono", dark: "—" },
    { property: "Color", token: "--text-secondary", light: "gray.600 (4.8:1 on gray.50)", dark: "gray.400 (7.3:1 on black)" },
    { property: "Depth shadow", token: "0 1px 0 var(--border-default)", light: "simulates key depth", dark: "same" },
  ],
  usage: `import { Kbd } from "@/design-system/kbd/kbd"

{/* Single key */}
<Kbd>Enter</Kbd>
<Kbd>Esc</Kbd>

{/* Compound shortcut */}
<span className="inline-flex items-center gap-1">
  <Kbd>Cmd</Kbd>
  <span className="text-xs text-[var(--text-tertiary)]">+</span>
  <Kbd>Shift</Kbd>
  <span className="text-xs text-[var(--text-tertiary)]">+</span>
  <Kbd>P</Kbd>
</span>

{/* Inline in prose */}
<p className="text-sm text-[var(--text-secondary)]">
  Press <Kbd>Cmd K</Kbd> to open the command palette.
</p>

{/* In a dropdown menu */}
<DropdownMenuItem>
  Find in page
  <DropdownMenuShortcut><Kbd>Cmd F</Kbd></DropdownMenuShortcut>
</DropdownMenuItem>`,
}

const label: ComponentDoc = {
  slug: "label",
  anatomy: `Email address            <- <label> (14px / 500 / text.primary / line-height tight)
[ you@example.com    ]   <- associated <Input id="email"> via htmlFor="email"

Peer-disabled pattern (sibling input has disabled attribute):
  Accept terms           <- opacity:0.7 + cursor:not-allowed via peer-disabled: CSS selector`,
  props: [
    { prop: "htmlFor", type: "string", description: "Ties the label to a control by id. Clicking the label focuses/toggles the control. Omit when using the wrapping pattern." },
    { prop: "children", type: "React.ReactNode", description: "Label text or any inline content (required asterisk, icon, etc.)." },
  ],
  states: [
    { state: "Default", description: "text.primary (gray.900 / gray.50), 14px/500." },
    { state: "Peer-disabled", description: "Sibling input is disabled: opacity:0.7 + cursor:not-allowed via peer-disabled: selector." },
    { state: "Dark mode", description: "text.primary auto-switches to gray.50." },
  ],
  do: [
    "Always use htmlFor matching the control's id — clicking the label focuses the input and enlarges the click target.",
    "Use the wrapping pattern (<Label><Checkbox /> Accept terms</Label>) when no stable id is available.",
    "Use Label inside a Field component for automatic label + hint + error layout.",
    "Keep label text concise: 'Email address', 'Password' — not instructions.",
  ],
  dont: [
    "Don't use a <p> or <span> as a visual-only label — they don't create the programmatic association AT needs.",
    "Don't rely on placeholder text as the label — it disappears on input.",
    "Don't omit a label for any form control — every input needs an accessible name.",
    "Don't put long instructions in the label — use the Field hint prop instead.",
  ],
  a11y: [
    "htmlFor + matching id creates programmatic label association: screen readers announce 'Email address, edit text' when the input is focused.",
    "Clicking the label moves focus to the associated control — enlarges the effective click target, especially useful for checkboxes and radios.",
    "Wrapping pattern: focus on the Checkbox inside announces the wrapping Label text.",
    "peer-disabled: opacity:0.7 is visual-only — the disabled state is conveyed by the control's own disabled attribute.",
    "Contrast: text.primary on page background = 15:1 (light) / 18:1 (dark) — both AAA.",
  ],
  tokens: [
    { property: "Font size", token: "--font-size-sm", light: "14px", dark: "—" },
    { property: "Font weight", token: "--font-weight-medium", light: "500", dark: "—" },
    { property: "Line height", token: "--line-tight", light: "1.25", dark: "—" },
    { property: "Color", token: "--text-primary", light: "gray.900 (15:1)", dark: "gray.50 (18:1)" },
    { property: "Disabled opacity", token: "opacity:0.7 (peer-disabled:)", light: "0.7", dark: "—" },
    { property: "Inline gap with control", token: "--space-2", light: "8px", dark: "—" },
  ],
  usage: `import { Label } from "@/design-system/label/label"
import { Input } from "@/design-system/input/input"
import { Checkbox } from "@/design-system/checkbox/checkbox"

{/* Standard htmlFor association */}
<Label htmlFor="email">Email address</Label>
<Input id="email" type="email" />

{/* Wrapping pattern */}
<Label>
  <Checkbox className="peer" />
  Accept terms and conditions
</Label>

{/* Required asterisk */}
<Label htmlFor="password">
  Password
  <span aria-hidden className="ml-0.5 text-[var(--text-destructive)]">*</span>
</Label>
<Input id="password" type="password" aria-required="true" />`,
}

// ─── Batch 5: Menubar → Scroll Area ──────────────────────────────────────────

const menubar: ComponentDoc = {
  slug: "menubar",
  anatomy: `+-------------------------------------------------------------+  <- Menubar strip
|  File    Edit    View    Help                               |    bg: surface.card  border: border.default
+-------------------------------------------------------------+    height: control-sm (32px)  shadow: shadow.sm
    |
    v (trigger activated)
+-----------------------------+  <- MenubarContent (same tokens as DropdownMenuContent)
|  New tab             Cmd T  |    bg: surface.card  border: border.default
|  New window          Cmd N  |    radius: radius.lg  shadow: shadow.lg  min-w: 180px
|  ─────────────────────────  |
|  Print...            Cmd P  |
+-----------------------------+
  Trigger resting: transparent bg
  Trigger hover/open: action.secondary bg (gray.100 / gray.800)
  Item highlighted: action.secondary bg`,
  slots: [
    "Menubar — root strip (role='menubar'); horizontal flex with border + shadow",
    "MenubarMenu — one top-level menu (wraps trigger + content)",
    "MenubarTrigger — tab-stop button in the strip; opens MenubarContent on activate",
    "MenubarContent — floating menu panel (same surface/border/shadow as DropdownMenuContent)",
    "MenubarItem — one action row; variant='destructive' for danger actions",
    "MenubarCheckboxItem — togglable item with Check indicator",
    "MenubarRadioGroup / MenubarRadioItem — exclusive selection group",
    "MenubarLabel — non-interactive section heading",
    "MenubarSeparator — 1px divider between item groups",
    "MenubarShortcut — trailing keyboard hint chip (decorative)",
    "MenubarSub / MenubarSubTrigger / MenubarSubContent — nested sub-menu",
  ],
  props: [
    { prop: "variant (MenubarItem)", type: '"default" | "destructive"', default: '"default"', description: "destructive renders red text + red hover tint. Use for delete/remove actions." },
    { prop: "inset (MenubarItem / MenubarLabel)", type: "boolean", default: "false", description: "Adds 24px inline-start padding to align with icon-leading items." },
    { prop: "checked (MenubarCheckboxItem)", type: "boolean", description: "Controlled checked state." },
    { prop: "onCheckedChange", type: "(checked: boolean) => void", description: "Fired when a CheckboxItem is toggled." },
    { prop: "value (MenubarRadioItem)", type: "string", description: "The value this radio item represents." },
  ],
  states: [
    { state: "Trigger resting", description: "Transparent bg, text.primary." },
    { state: "Trigger hover / focus", description: "action.secondary bg (gray.100 light / gray.800 dark)." },
    { state: "Trigger open (data-state=open)", description: "action.secondary bg; content panel rendered below." },
    { state: "Item highlighted (data-highlighted)", description: "action.secondary bg." },
    { state: "Item disabled", description: "opacity:0.5, pointer-events:none, skipped by keyboard." },
    { state: "Item destructive", description: "red.700 text (light) / red.300 (dark); red.50 hover bg." },
    { state: "CheckboxItem checked", description: "Check icon in the inset gutter via ItemIndicator; aria-checked=true." },
    { state: "RadioItem selected", description: "Filled circle dot in gutter; aria-checked=true." },
  ],
  do: [
    "Use Menubar for persistent app-level menus (File / Edit / View) — it provides the desktop-app keyboard model users expect.",
    "Match the Menubar keyboard model: register actual Cmd/Ctrl shortcuts as listeners — MenubarShortcut is decorative only.",
    "Group related items with MenubarLabel and MenubarSeparator — long flat menus are hard to scan.",
    "Use variant='destructive' for delete/remove items — pair with an icon so intent isn't conveyed by color alone.",
  ],
  dont: [
    "Don't use Menubar for page navigation — use NavigationMenu for that pattern.",
    "Don't put Menubar inside a page scroll container — it should be fixed or sticky at the top of the app chrome.",
    "Don't omit keyboard shortcuts for power-user actions — Menubar users expect Cmd+S, Cmd+Z etc. to work.",
    "Don't put more than 6–7 top-level triggers — overflow is not handled gracefully on small screens.",
  ],
  a11y: [
    "Radix sets role='menubar' on the strip, role='menu' on each content panel, role='menuitem' / 'menuitemcheckbox' / 'menuitemradio' on items.",
    "Keyboard: Left/Right arrows move between top-level triggers (roving focus); Down or Enter opens the focused trigger's menu; Up/Down navigate items; ArrowRight opens sub-menus; Escape closes.",
    "Typeahead: pressing a letter jumps to the first matching item or trigger.",
    "Focus stays in the strip while navigating triggers; moves into the open panel when a menu is open.",
    "MenubarShortcut hints are aria-hidden — register the actual keyboard listeners at the document level.",
  ],
  tokens: [
    { property: "Strip height", token: "--control-sm", light: "32px", dark: "—" },
    { property: "Strip gap / padding-inline", token: "--space-1", light: "4px", dark: "—" },
    { property: "Strip radius", token: "--radius-md", light: "6px", dark: "—" },
    { property: "Strip border", token: "--border-default", light: "gray.200", dark: "gray.800" },
    { property: "Strip background", token: "--surface-card", light: "white", dark: "gray.900" },
    { property: "Strip shadow", token: "--shadow-sm", light: "subtle elevation", dark: "—" },
    { property: "Trigger padding-inline", token: "--menubar-trigger-px", light: "12px", dark: "—" },
    { property: "Trigger font-size / weight", token: "--font-size-sm / --font-weight-medium", light: "14px / 500", dark: "—" },
    { property: "Trigger hover / open bg", token: "--action-secondary", light: "gray.100", dark: "gray.800" },
    { property: "Content panel", token: "same as --dropdown-* tokens", light: "surface.card + border.default + shadow.lg", dark: "gray.900" },
    { property: "Item destructive text", token: "--menu-item-destructive-text", light: "red.700 (6.5:1)", dark: "red.300 (5.8:1)" },
  ],
  usage: `import {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent,
  MenubarItem, MenubarSeparator, MenubarLabel, MenubarShortcut,
  MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem,
  MenubarSub, MenubarSubTrigger, MenubarSubContent,
} from "@/design-system/menubar/menubar"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New tab <MenubarShortcut>Cmd T</MenubarShortcut></MenubarItem>
      <MenubarItem>New window <MenubarShortcut>Cmd N</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print... <MenubarShortcut>Cmd P</MenubarShortcut></MenubarItem>
    </MenubarContent>
  </MenubarMenu>

  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Undo <MenubarShortcut>Cmd Z</MenubarShortcut></MenubarItem>
      <MenubarItem>Redo <MenubarShortcut>Cmd Shift Z</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>Find</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>Find on page... <MenubarShortcut>Cmd F</MenubarShortcut></MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
    </MenubarContent>
  </MenubarMenu>

  <MenubarMenu>
    <MenubarTrigger>View</MenubarTrigger>
    <MenubarContent>
      <MenubarCheckboxItem checked>Show toolbar</MenubarCheckboxItem>
      <MenubarSeparator />
      <MenubarLabel>Zoom</MenubarLabel>
      <MenubarRadioGroup value="100">
        <MenubarRadioItem value="75">75%</MenubarRadioItem>
        <MenubarRadioItem value="100">100%</MenubarRadioItem>
        <MenubarRadioItem value="125">125%</MenubarRadioItem>
      </MenubarRadioGroup>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
}

const nativeSelect: ComponentDoc = {
  slug: "native-select",
  anatomy: `+-------------------------------------------+  <- <select> (appearance-none)
|  Select a country                    [v]  |    bg: field-bg  border: field-border
+-------------------------------------------+    radius: field-radius (6px)
                                                  height: control-md (40px)
  [v] = ChevronDown icon layered as overlay       padding-inline: 12px start / 36px end
        pointer-events:none  aria-hidden           font-size: 14px  color: field-text

  hover  -> border: field-border-hover (gray.500)
  focus  -> border: field-border-focus (blue.500) + field-focus-ring double ring
  disabled -> bg: field-bg-disabled  opacity:0.5  cursor:not-allowed`,
  props: [
    { prop: "disabled", type: "boolean", default: "false", description: "Disables the select — field-bg-disabled bg, opacity:0.5, cursor:not-allowed." },
    { prop: "value / defaultValue", type: "string", description: "Controlled or uncontrolled selected value." },
    { prop: "onChange", type: "React.ChangeEventHandler<HTMLSelectElement>", description: "Fired when the selected option changes." },
    { prop: "children", type: "React.ReactNode", description: "<option> and <optgroup> elements." },
  ],
  variants: [
    { name: "NativeSelect", description: "Use when mobile usability is paramount (iOS/Android native pickers), the list is long without needing search, or forms must work without JS." },
    { name: "Select (Radix)", description: "Use when custom option rendering, search/filter, icons, or grouped options with rich layout are required." },
  ],
  states: [
    { state: "Resting", description: "field-border (gray.200 light / gray.800 dark)." },
    { state: "Hover", description: "field-border-hover (gray.500)." },
    { state: "Focus", description: "field-border-focus (blue.500) + field-focus-ring double ring." },
    { state: "Disabled", description: "field-bg-disabled bg, opacity:0.5, cursor:not-allowed." },
    { state: "Dark mode", description: "Semantic tokens flip — bg gray.900, border gray.800, text gray.50." },
  ],
  do: [
    "Wrap in a Field component to get label + hint + error layout — always associate a visible label via htmlFor.",
    "Use NativeSelect for long option lists (countries, timezones) — native pickers are faster on mobile.",
    "Include a disabled placeholder option as the first child: <option value='' disabled>Select a country</option>.",
    "Pass aria-required, aria-invalid, and aria-describedby through props when using inside a form with validation.",
  ],
  dont: [
    "Don't use NativeSelect when options need icons, badges, or grouped layouts with rich content — use the Radix Select instead.",
    "Don't style the dropdown panel — the OS controls it; appearance-none only removes the chevron, not the panel chrome.",
    "Don't rely on the ChevronDown icon alone for the field affordance — the full border + height already signals a select control.",
    "Don't skip the label — a select without an associated label fails WCAG 1.3.1.",
  ],
  a11y: [
    "Native <select> is fully keyboard-navigable without any custom code — Tab focuses it, arrow keys change options, Enter/Space confirms.",
    "Associates with a <label htmlFor> or wrapping label automatically via browser behavior.",
    "aria-required, aria-invalid, and aria-describedby pass through via native HTML attributes — no extra wiring needed.",
    "The ChevronDown overlay is pointer-events:none and aria-hidden='true' — it does not intercept clicks or screen reader announcements.",
    "Contrast: field-text (gray.900) on field-bg (white) = 15:1 (light); gray.50 on gray.900 = 18:1 (dark) — both AAA.",
  ],
  tokens: [
    { property: "Height", token: "--control-md", light: "40px", dark: "—" },
    { property: "Border radius", token: "--field-radius", light: "6px", dark: "—" },
    { property: "Border: resting", token: "--field-border", light: "gray.200", dark: "gray.800" },
    { property: "Border: hover", token: "--field-border-hover", light: "gray.500", dark: "gray.500" },
    { property: "Border: focus", token: "--field-border-focus", light: "blue.500", dark: "blue.500" },
    { property: "Focus ring", token: "--field-focus-ring", light: "2px page + 2px blue.500", dark: "same" },
    { property: "Background", token: "--field-bg", light: "white", dark: "gray.900" },
    { property: "Background: disabled", token: "--field-bg-disabled", light: "gray.100", dark: "gray.800" },
    { property: "Padding-inline-start", token: "--space-3", light: "12px", dark: "—" },
    { property: "Padding-inline-end (room for chevron)", token: "--space-9", light: "36px", dark: "—" },
    { property: "Font size", token: "--font-size-sm", light: "14px", dark: "—" },
    { property: "Text color", token: "--field-text", light: "gray.900 (15:1)", dark: "gray.50 (18:1)" },
    { property: "Chevron size / color", token: "--icon-sm / --text-secondary", light: "16px / gray.600", dark: "gray.400" },
  ],
  usage: `import { NativeSelect } from "@/design-system/native-select/native-select"
import { Field } from "@/design-system/field/field"

{/* Standalone */}
<NativeSelect defaultValue="">
  <option value="" disabled>Select a country</option>
  <option value="us">United States</option>
  <option value="gb">United Kingdom</option>
  <option value="ca">Canada</option>
</NativeSelect>

{/* Wrapped in Field */}
<Field label="Country" htmlFor="country">
  <NativeSelect id="country" defaultValue="">
    <option value="" disabled>Select a country</option>
    <option value="us">United States</option>
    <option value="gb">United Kingdom</option>
    <option value="ca">Canada</option>
  </NativeSelect>
</Field>

{/* Disabled */}
<NativeSelect disabled>
  <option>No options available</option>
</NativeSelect>`,
}

const navigationMenu: ComponentDoc = {
  slug: "navigation-menu",
  anatomy: `+------------------------------------------+  <- NavigationMenu (role="navigation")
|  [Products v]  [Docs v]  Pricing  Blog   |    z-index: 10  list gap: space-1
+------------------------------------------+
       |
       v (trigger opens viewport)
+--------------------------------------------------+  <- NavigationMenuViewport
|  Design          Engineering                     |    bg: surface.card  border: border.default
|  Build beautiful  Ship fast reliable code        |    radius: radius.lg  shadow: shadow.lg
|  interfaces.      at scale.                      |    min-w: --nav-viewport-w (400px)
+--------------------------------------------------+
       ^
    [indicator arrow: border.default, 8px]

Trigger resting: transparent bg
Trigger hover/open: action.secondary bg (gray.100 / gray.800)
Active link (data-active): interactive.selected-bg + interactive.selected-text (blue tint)`,
  slots: [
    "NavigationMenu — root nav wrapper (role='navigation')",
    "NavigationMenuList — <ul> of top-level items",
    "NavigationMenuItem — <li> wrapper for each trigger or link",
    "NavigationMenuTrigger — button that opens a content panel; chevron rotates on open",
    "NavigationMenuContent — panel content rendered inside the shared viewport",
    "NavigationMenuLink — plain navigation link (no dropdown); use asChild for real <a>",
    "NavigationMenuViewport — the shared floating panel host; animates height on content change",
    "NavigationMenuIndicator — optional arrow pointing from active trigger to the viewport",
    "navigationMenuTriggerStyle — className helper for asChild link patterns",
  ],
  props: [
    { prop: "value / onValueChange", type: "string / (value: string) => void", description: "Controlled open trigger value." },
    { prop: "defaultValue", type: "string", description: "Uncontrolled initially open trigger." },
    { prop: "delayDuration", type: "number", default: "200", description: "Hover-intent delay before opening a content panel." },
    { prop: "align (Content)", type: '"start" | "center" | "end"', default: '"center"', description: "Viewport alignment relative to the active trigger." },
  ],
  states: [
    { state: "Trigger resting", description: "Transparent bg, text.primary." },
    { state: "Trigger hover / open", description: "action.secondary bg (gray.100 / gray.800)." },
    { state: "Trigger active (data-active)", description: "interactive.selected-bg (blue.50) + interactive.selected-text (blue.700 / blue.300)." },
    { state: "Chevron open", description: "Rotates 180deg when data-state=open." },
    { state: "Viewport", description: "Height animates via --radix-navigation-menu-viewport-height CSS var; content fade-in." },
    { state: "Dark mode", description: "surface.card, border.default, text.primary flip via semantic tokens." },
  ],
  do: [
    "Use NavigationMenu for the primary site/app top nav — it provides the correct hover-intent delay and keyboard model.",
    "Use NavigationMenuLink asChild with a real <a> or Next.js <Link> for plain nav links (Pricing, Blog) so they are proper anchors.",
    "Populate the viewport with a structured grid of links — a 2- or 3-column layout makes mega-menus scannable.",
    "Mark the current page's link with data-active so users can see where they are.",
  ],
  dont: [
    "Don't use NavigationMenu inside a Menubar — they serve different patterns (site nav vs app menu strip).",
    "Don't put form controls (inputs, checkboxes) inside NavigationMenuContent — the escape-and-return focus model is designed for links.",
    "Don't reduce delayDuration to 0 — immediate open on hover is disorienting and causes accidental triggers.",
    "Don't rely on the viewport panel as the only way to access sub-pages — ensure all links are reachable via Tab.",
  ],
  a11y: [
    "Radix sets role='navigation' on the root, aria-haspopup and aria-expanded on triggers, and manages focus on open/close.",
    "Keyboard: Tab navigates between top-level triggers; Enter/Space opens the focused trigger; Arrow keys navigate inside the open content; Escape closes and returns focus to trigger.",
    "Active link gets aria-current='page' — mark it with data-active and wire aria-current in your link component.",
    "NavigationMenuIndicator is decorative — aria-hidden='true'; the open state is communicated via aria-expanded on the trigger.",
    "Viewport height animation uses CSS transitions — respects prefers-reduced-motion when paired with the motion token.",
  ],
  tokens: [
    { property: "List gap", token: "--space-1", light: "4px", dark: "—" },
    { property: "Trigger/Link height", token: "--control-sm", light: "32px", dark: "—" },
    { property: "Trigger/Link padding-inline", token: "--space-3", light: "12px", dark: "—" },
    { property: "Trigger/Link radius", token: "--radius-md", light: "6px", dark: "—" },
    { property: "Trigger/Link font-size / weight", token: "--font-size-sm / --font-weight-medium", light: "14px / 500", dark: "—" },
    { property: "Trigger hover / open bg", token: "--action-secondary", light: "gray.100", dark: "gray.800" },
    { property: "Active bg", token: "--interactive-selected-bg", light: "blue.50", dark: "gray.800" },
    { property: "Active text", token: "--interactive-selected-text", light: "blue.700 (7.5:1)", dark: "blue.300 (10.1:1)" },
    { property: "Viewport min-width", token: "--nav-viewport-w", light: "400px", dark: "—" },
    { property: "Viewport bg / border", token: "--surface-card / --border-default", light: "white / gray.200", dark: "gray.900 / gray.800" },
    { property: "Viewport shadow", token: "--shadow-lg", light: "multi-stop elevation", dark: "—" },
    { property: "Indicator size", token: "--nav-indicator-size", light: "8px", dark: "—" },
  ],
  usage: `import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem,
  NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/design-system/navigation-menu/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    {/* Trigger with dropdown panel */}
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2">
          <li>
            <NavigationMenuLink asChild>
              <a href="/design" className="block rounded-md p-3 hover:bg-[var(--action-secondary)]">
                <p className="text-sm font-medium">Design</p>
                <p className="text-xs text-[var(--text-secondary)]">Build beautiful interfaces.</p>
              </a>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <a href="/engineering" className="block rounded-md p-3 hover:bg-[var(--action-secondary)]">
                <p className="text-sm font-medium">Engineering</p>
                <p className="text-xs text-[var(--text-secondary)]">Ship fast at scale.</p>
              </a>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>

    {/* Plain link — no dropdown */}
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <a href="/pricing" className={navigationMenuTriggerStyle()}>Pricing</a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
}

const pagination: ComponentDoc = {
  slug: "pagination",
  anatomy: `<nav aria-label="Pagination">
  +----+  +---+  +---+  [3]  +---+  ...  +----+  +----+
  | <  |  | 1 |  | 2 |       | 4 |       | 10 |  | >  |
  +----+  +---+  +---+       +---+       +----+  +----+
  Prev    page   page  active  page  ellip  page   Next

PaginationLink default: outline border + white bg  32px square
PaginationLink active (isActive): interactive.selected-bg/border/text (blue tint)
PaginationPrevious / PaginationNext: icon-only  aria-label set automatically
PaginationEllipsis: aria-hidden span with MoreHorizontal icon
Gap between items: space-1 (4px)`,
  slots: [
    "Pagination — <nav role='navigation' aria-label='Pagination'> wrapper",
    "PaginationContent — <ul> flex row of page items",
    "PaginationItem — <li> wrapper for each link or ellipsis",
    "PaginationLink — page number anchor; isActive prop applies selected styles; aria-current='page' when active",
    "PaginationPrevious — ChevronLeft icon link; aria-label='Go to previous page'",
    "PaginationNext — ChevronRight icon link; aria-label='Go to next page'",
    "PaginationEllipsis — MoreHorizontal icon span; aria-hidden='true' (decorative gap indicator)",
  ],
  props: [
    { prop: "isActive (PaginationLink)", type: "boolean", default: "false", description: "Marks the current page — applies interactive.selected-* bg/border/text and aria-current='page'." },
    { prop: "size (PaginationLink)", type: '"default" | "icon"', default: '"icon"', description: "icon: 32px square (page numbers); default: auto-width with horizontal padding." },
    { prop: "href", type: "string", description: "The page URL. Passed to the underlying <a> element." },
  ],
  states: [
    { state: "Resting", description: "outline border (gray.200 / gray.800), white/gray.900 bg." },
    { state: "Hover", description: "button-outline-bg-hover (gray.100 / gray.800)." },
    { state: "Active page (isActive)", description: "interactive.selected-bg (blue.50) + interactive.selected-border (blue.200) + interactive.selected-text (blue.700)." },
    { state: "Focus-visible", description: "button-focus-ring double ring." },
    { state: "Disabled (Prev/Next)", description: "Consumer sets aria-disabled='true' + tabIndex={-1} + pointer-events:none via className." },
    { state: "Dark mode", description: "Tokens flip — border gray.800, hover gray.800, active uses blue.300 text." },
  ],
  do: [
    "Set isActive on the current page's PaginationLink — it applies the correct visual + aria-current='page' for AT.",
    "Disable PaginationPrevious on page 1 and PaginationNext on the last page using aria-disabled='true' + tabIndex={-1}.",
    "Use href for server-rendered pagination (static links) and onClick for client-side data fetching.",
    "Show an ellipsis (PaginationEllipsis) between far-apart page ranges — don't render every page number for large datasets.",
  ],
  dont: [
    "Don't use buttons instead of anchors for page links — page numbers should be URLs so users can share, bookmark, and open in a new tab.",
    "Don't omit the aria-label on PaginationPrevious/PaginationNext when they are icon-only — it is set automatically but ensure it is not overridden.",
    "Don't hide PaginationEllipsis from screen readers with display:none — it is already aria-hidden; removing it from DOM is fine but redundant.",
    "Don't render the Pagination component when there is only one page — an empty nav adds unnecessary noise.",
  ],
  a11y: [
    "<nav role='navigation' aria-label='Pagination'> wraps the control — screen readers announce 'Pagination, navigation'.",
    "Active page link gets aria-current='page' automatically when isActive is true.",
    "PaginationPrevious and PaginationNext carry explicit aria-label ('Go to previous page' / 'Go to next page') since they are icon-only.",
    "PaginationEllipsis is aria-hidden='true' — it is a visual gap indicator, not meaningful content for AT.",
    "Disabled Previous/Next: set aria-disabled='true' and tabIndex={-1} via className — the anchor remains in the DOM but is skipped by Tab.",
  ],
  tokens: [
    { property: "Item gap", token: "--space-1", light: "4px", dark: "—" },
    { property: "Link size (square)", token: "--control-sm", light: "32px", dark: "—" },
    { property: "Link border: resting", token: "--button-outline-border", light: "gray.200", dark: "gray.800" },
    { property: "Link bg: resting", token: "--button-outline-bg", light: "white", dark: "gray.900" },
    { property: "Link bg: hover", token: "--button-outline-bg-hover", light: "gray.100", dark: "gray.800" },
    { property: "Active bg", token: "--interactive-selected-bg", light: "blue.50", dark: "gray.800" },
    { property: "Active border", token: "--interactive-selected-border", light: "blue.200", dark: "blue.400" },
    { property: "Active text", token: "--interactive-selected-text", light: "blue.700 (7.5:1)", dark: "blue.300 (10.1:1)" },
    { property: "Link radius", token: "--button-radius", light: "6px", dark: "—" },
    { property: "Link font-size / weight", token: "--font-size-sm / --font-weight-medium", light: "14px / 500", dark: "—" },
    { property: "Ellipsis / icon color", token: "--text-secondary", light: "gray.600", dark: "gray.400" },
  ],
  usage: `import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext, PaginationEllipsis,
} from "@/design-system/pagination/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="?page=2" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=2">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=3" isActive>3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=10">10</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="?page=4" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
}

const popover: ComponentDoc = {
  slug: "popover",
  anatomy: `[Trigger button]
     |
     v (click to open)
+------------------------------------------+  <- PopoverContent
|  Settings                                |    bg: surface.card  border: border.default
|  Adjust your preferences here.           |    radius: radius.lg  shadow: shadow.lg
|                                          |    width: 320px (--popover-w)
|  [form fields / rich content]            |    padding: 16px  side-offset: 4px
+------------------------------------------+    z-index: 50
  Escape or outside click closes. Focus is trapped inside (modal-like).`,
  slots: [
    "Popover — root (controls open state)",
    "PopoverTrigger — element that opens the popover (asChild supported)",
    "PopoverContent — floating panel (portalled, focus-trapped); accepts all Radix positioning props",
    "PopoverAnchor — optional custom positioning anchor (decouples trigger from anchor position)",
  ],
  props: [
    { prop: "open", type: "boolean", description: "Controlled open state. Pair with onOpenChange." },
    { prop: "defaultOpen", type: "boolean", default: "false", description: "Uncontrolled initial open state." },
    { prop: "onOpenChange", type: "(open: boolean) => void", description: "Fired when open state changes." },
    { prop: "modal", type: "boolean", default: "false", description: "When true, interaction outside the popover is blocked (true modal). Default is non-modal (page remains interactive behind)." },
    { prop: "align (PopoverContent)", type: '"start" | "center" | "end"', default: '"center"', description: "Horizontal alignment relative to the trigger." },
    { prop: "sideOffset (PopoverContent)", type: "number", default: "4", description: "Gap in pixels between trigger and panel." },
    { prop: "side (PopoverContent)", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Preferred side. Radix flips on collision." },
  ],
  states: [
    { state: "Closed", description: "Only trigger renders; content not mounted." },
    { state: "Open", description: "Content rendered in a portal at z-50 with collision avoidance. Focus moves into panel and is trapped." },
    { state: "Dark mode", description: "surface.card, border.default, text.primary flip via semantic tokens." },
  ],
  do: [
    "Use Popover for click-triggered rich content with interactive controls (forms, settings, color pickers).",
    "Use asChild on PopoverTrigger to render through to a Button: <PopoverTrigger asChild><Button>Open</Button></PopoverTrigger>.",
    "Keep the popover width reasonable (--popover-w = 320px default) — wider panels can clip on mobile.",
    "Provide a visible close affordance inside the content (a close button or a form submit) — don't rely on Escape alone.",
  ],
  dont: [
    "Don't use Popover for simple text tooltips — use Tooltip instead (non-modal, hover-triggered, no focus trap).",
    "Don't use Popover for supplemental preview content that doesn't need interaction — use HoverCard.",
    "Don't put navigation links as the only content — clicking an anchor inside a Popover closes it before navigation completes in some setups.",
    "Don't set modal={true} casually — it blocks all page interaction and should be reserved for truly blocking flows.",
  ],
  a11y: [
    "PopoverContent receives role='dialog' and aria-modal='true' via Radix — screen readers announce it as a dialog.",
    "Focus moves into the panel on open; Escape closes and returns focus to trigger.",
    "Tab is trapped within the content — keyboard users navigate only the popover's interactive elements while it's open.",
    "PopoverTrigger automatically gets aria-haspopup='dialog' + aria-expanded — screen readers announce 'has popup, dialog'.",
    "Popover vs Dialog: Popover is positioned relative to trigger (contextual); Dialog is centered on screen (modal). Use Dialog for full-page blocking flows.",
  ],
  tokens: [
    { property: "Panel width", token: "--popover-w", light: "320px", dark: "—" },
    { property: "Panel padding", token: "--space-4", light: "16px", dark: "—" },
    { property: "Panel radius", token: "--radius-lg", light: "8px", dark: "—" },
    { property: "Panel border", token: "--border-default", light: "gray.200", dark: "gray.800" },
    { property: "Panel background", token: "--surface-card", light: "white", dark: "gray.900" },
    { property: "Panel shadow", token: "--shadow-lg", light: "multi-stop elevation", dark: "—" },
    { property: "Side offset", token: "4px (bare — matches HoverCard/Tooltip)", light: "4px", dark: "—" },
    { property: "Content text", token: "--text-primary", light: "gray.900 (15:1)", dark: "gray.50 (18:1)" },
    { property: "Secondary text", token: "--text-secondary", light: "gray.600 (5.7:1)", dark: "gray.400 (7.3:1)" },
  ],
  usage: `import { Popover, PopoverTrigger, PopoverContent } from "@/design-system/popover/popover"
import { Button } from "@/design-system/button/button"
import { Field } from "@/design-system/field/field"
import { Input } from "@/design-system/input/input"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open settings</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom" align="start">
    <div className="flex flex-col gap-[var(--space-3)]">
      <p className="text-sm font-semibold">Display settings</p>
      <Field label="Name" htmlFor="pop-name">
        <Input id="pop-name" placeholder="Your name" />
      </Field>
      <Field label="Username" htmlFor="pop-user">
        <Input id="pop-user" placeholder="@username" />
      </Field>
      <Button className="w-full" size="sm">Save changes</Button>
    </div>
  </PopoverContent>
</Popover>`,
}

const progress: ComponentDoc = {
  slug: "progress",
  anatomy: `+=============================================+  <- Root (track)
|||||||||||||||||||||||||||||||||||||||||||||    <- Indicator (fill, translateX)
+=============================================+
  Track: bg action.secondary (gray.100 / gray.800)  height: 8px (--progress-h)
                                                     radius: radius-full (9999px)
  Fill:  bg action.primary (blue.600)  width: 100%  transform: translateX(-(100-value)%)
         transition: duration-base / ease-out (200ms)

  value=60 -> fill covers 60% from left
  value=undefined -> indeterminate (add shimmer animation via className)`,
  props: [
    { prop: "value", type: "number | undefined", description: "0–100 for determinate progress. Omit or pass undefined for indeterminate (Radix sets aria-valuetext='indeterminate')." },
    { prop: "max", type: "number", default: "100", description: "The maximum value. Radix uses this for aria-valuemax." },
    { prop: "aria-label", type: "string", description: "Required accessible label describing what is being tracked: 'Upload progress', 'Loading content'." },
    { prop: "getValueLabel", type: "(value: number, max: number) => string", description: "Custom function to generate the aria-valuetext string (e.g. '60 of 100 MB uploaded')." },
  ],
  states: [
    { state: "Determinate", description: "value 0–100; indicator translates from left; aria-valuenow set." },
    { state: "Indeterminate", description: "value undefined; Radix sets aria-valuetext='indeterminate'. Add a shimmer/slide animation via className on the indicator." },
    { state: "Complete", description: "value=100; indicator fills the full track width." },
    { state: "Dark mode", description: "Track: action.secondary -> gray.800. Fill: action.primary stays blue.600." },
  ],
  do: [
    "Always provide aria-label describing what is being tracked — 'Progress' alone is not helpful.",
    "Show the numeric percentage alongside the bar for sighted users: '60%' as a separate text element.",
    "Use getValueLabel for human-friendly AT announcements: '60 of 100 files uploaded'.",
    "Use the indeterminate state (value=undefined) when progress cannot be measured — add a CSS shimmer animation for visual feedback.",
  ],
  dont: [
    "Don't use Progress for binary states (loading spinner) — use a Spinner or Skeleton instead.",
    "Don't animate value changes faster than 200ms — the transition token (duration-base) is already set; trust it.",
    "Don't rely on the fill color alone to communicate completion — provide a text label ('Done', '100%') when the task completes.",
    "Don't omit aria-label — a progress bar without a label fails WCAG 1.3.1 (screen readers announce only the percentage with no context).",
  ],
  a11y: [
    "Radix renders role='progressbar' with aria-valuenow, aria-valuemin (0), aria-valuemax (100 or max), and aria-valuetext automatically.",
    "aria-label or aria-labelledby is required — set it directly on the Progress component.",
    "Indeterminate: value=undefined causes Radix to set aria-valuetext='indeterminate' — screen readers announce loading status.",
    "getValueLabel lets you provide a richer aria-valuetext: '3 of 5 steps completed' is more useful than '60%'.",
    "Color alone does not convey completion — always pair with a numeric label or status text.",
  ],
  tokens: [
    { property: "Track height", token: "--progress-h", light: "8px", dark: "—" },
    { property: "Track radius", token: "--progress-radius (= radius-full)", light: "9999px", dark: "—" },
    { property: "Track background", token: "--action-secondary", light: "gray.100", dark: "gray.800" },
    { property: "Fill background", token: "--action-primary", light: "blue.600", dark: "blue.600" },
    { property: "Fill transition", token: "--duration-base / ease-out", light: "200ms", dark: "—" },
    { property: "Track width", token: "100% (full container)", light: "fluid", dark: "—" },
  ],
  usage: `import { Progress } from "@/design-system/progress/progress"

{/* Determinate */}
<Progress value={60} aria-label="Upload progress" />

{/* With text label */}
<div className="flex flex-col gap-[var(--space-2)]">
  <div className="flex justify-between text-sm">
    <span className="text-[var(--text-secondary)]">Uploading file...</span>
    <span className="font-medium">60%</span>
  </div>
  <Progress value={60} aria-label="Upload progress" />
</div>

{/* Custom aria-valuetext */}
<Progress
  value={60}
  aria-label="File upload"
  getValueLabel={(v, max) => \`\${v} of \${max} MB uploaded\`}
/>

{/* Indeterminate */}
<Progress aria-label="Loading content" />`,
}

const radioGroup: ComponentDoc = {
  slug: "radio-group",
  anatomy: `Notify me about...        <- group label (wired via aria-labelledby)

  ( )  All new messages     <- RadioGroupItem (unselected) + Label
  (*)  Direct messages      <- RadioGroupItem (selected) — dot shown
  ( )  Nothing

RadioGroupItem: 16px circle
  Unselected: 1.5px ring (border.strong = gray.500) on surface.card bg
  Selected:   ring + centered 8px dot — both action.primary (blue.600)
  Focus:      --focus-ring double ring (blue.500)
  Disabled:   opacity:0.5
Group gap: space-3 (12px) between rows`,
  props: [
    { prop: "value", type: "string", description: "Controlled selected value." },
    { prop: "defaultValue", type: "string", description: "Uncontrolled initial selection." },
    { prop: "onValueChange", type: "(value: string) => void", description: "Fired when selection changes." },
    { prop: "disabled", type: "boolean", default: "false", description: "Disables all items in the group." },
    { prop: "name", type: "string", description: "Native form field name (for form submission)." },
    { prop: "value (RadioGroupItem)", type: "string", description: "Required. The value this item represents." },
    { prop: "id (RadioGroupItem)", type: "string", description: "Required. Ties the item to its <Label htmlFor>." },
    { prop: "disabled (RadioGroupItem)", type: "boolean", default: "false", description: "Disables this item independently." },
  ],
  states: [
    { state: "Unselected", description: "1.5px border.strong ring on surface.card bg." },
    { state: "Hover", description: "Ring unchanged; row label is the hit target." },
    { state: "Focus-visible", description: "--focus-ring double ring on the focused item." },
    { state: "Selected", description: "data-state=checked: ring and centered dot both use action.primary (blue.600)." },
    { state: "Disabled", description: "opacity:0.5, no pointer events — per item or whole group." },
    { state: "Dark mode", description: "border.strong stays gray.500; surface.card -> gray.900; action.primary stays blue.600." },
  ],
  do: [
    "Name the group with an external label via aria-labelledby or wrap in a <fieldset><legend> — RadioGroup alone has no visible title.",
    "Pair every RadioGroupItem with a <Label htmlFor={id}> — clicking the label selects the radio and enlarges the hit target.",
    "Use RadioGroup for small option sets (2–6 choices) that are mutually exclusive — for many options, use a Select or NativeSelect.",
    "Set defaultValue to pre-select the most common option — a radio group with no default selection requires an extra click.",
  ],
  dont: [
    "Don't use RadioGroup when multiple selections are valid — use CheckboxGroup instead.",
    "Don't skip the item id and Label — an unlabelled radio item fails WCAG 1.3.1.",
    "Don't lay out more than 6 options vertically — users lose track of which group the lower items belong to; use a Select instead.",
    "Don't rely on the filled-dot color alone to communicate selection — the dot shape itself conveys state (color is not the only signal).",
  ],
  a11y: [
    "Radix sets role='radiogroup' on the root; each item gets role='radio' with aria-checked.",
    "Keyboard: Tab enters the group and focuses the selected item (or first if none); arrow keys move between items and select them; Tab exits the group.",
    "Selection is shown by the filled dot, not color alone — WCAG 1.4.1 is satisfied.",
    "Name the group via aria-labelledby pointing at a visible heading/label, or wrap in <fieldset><legend>.",
    "Focus ring (double ring) meets WCAG 1.4.11 — outer ring matches page bg, inner ring is blue.500.",
  ],
  tokens: [
    { property: "Item shape", token: "--radio-radius (= radius-full)", light: "9999px (circle)", dark: "—" },
    { property: "Item size", token: "--control-box-size", light: "16px", dark: "—" },
    { property: "Ring border", token: "--control-box-border (= border.strong)", light: "gray.500", dark: "gray.500" },
    { property: "Item background", token: "--control-box-bg (= surface.card)", light: "white", dark: "gray.900" },
    { property: "Selected ring + dot", token: "--control-checked-bg (= action.primary)", light: "blue.600", dark: "blue.600" },
    { property: "Dot size", token: "--space-2", light: "8px", dark: "—" },
    { property: "Group gap", token: "--space-3", light: "12px", dark: "—" },
    { property: "Focus ring", token: "--focus-ring", light: "2px page + 2px blue.500", dark: "same" },
    { property: "Disabled opacity", token: "0.5", light: "0.5", dark: "—" },
  ],
  usage: `import { RadioGroup, RadioGroupItem } from "@/design-system/radio-group/radio-group"
import { Label } from "@/design-system/label/label"

<RadioGroup defaultValue="all" aria-labelledby="notify-label">
  <p id="notify-label" className="text-sm font-medium">Notify me about...</p>
  <div className="flex flex-col gap-[var(--space-3)]">
    <div className="flex items-center gap-[var(--space-2)]">
      <RadioGroupItem value="all" id="r-all" />
      <Label htmlFor="r-all">All new messages</Label>
    </div>
    <div className="flex items-center gap-[var(--space-2)]">
      <RadioGroupItem value="mentions" id="r-mentions" />
      <Label htmlFor="r-mentions">Direct messages and mentions</Label>
    </div>
    <div className="flex items-center gap-[var(--space-2)]">
      <RadioGroupItem value="none" id="r-none" />
      <Label htmlFor="r-none">Nothing</Label>
    </div>
  </div>
</RadioGroup>`,
}

const scrollArea: ComponentDoc = {
  slug: "scroll-area",
  anatomy: `+------------------------------------------+  <- ScrollArea root (overflow:hidden)
|  Item 1                                  |    |
|  Item 2                                  |    |  <- ScrollAreaViewport (overflow:scroll)
|  Item 3                                  |    |
|  Item 4                            [|||] |  <- ScrollBar (vertical, 10px wide)
|  Item 5                                  |    |     Thumb: border.strong (gray.500)
+------------------------------------------+       radius: radius-full

Scrollbar appears on hover/scroll (Radix type="hover" default).
Horizontal scroll: add <ScrollBar orientation="horizontal" /> inside ScrollArea.
--scrollbar-size: 10px (thumb track width/height)`,
  slots: [
    "ScrollArea — root + viewport + vertical ScrollBar auto-wired; accepts all Radix Root props",
    "ScrollBar — standalone scrollbar; orientation prop selects vertical (default) or horizontal",
  ],
  props: [
    { prop: "orientation (ScrollBar)", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Which axis the scrollbar tracks. Add a second <ScrollBar orientation='horizontal' /> for bidirectional scroll." },
    { prop: "type (ScrollArea)", type: '"auto" | "always" | "scroll" | "hover"', default: '"hover"', description: "When the scrollbar is visible: hover = on pointer enter, scroll = while scrolling, always = persistent." },
    { prop: "scrollHideDelay (ScrollArea)", type: "number", default: "600", description: "Milliseconds after scrolling stops before the scrollbar hides (for type='scroll' or 'hover')." },
    { prop: "className", type: "string", description: "Apply height, width, rounded, and border on the ScrollArea root to define the scroll container dimensions." },
  ],
  states: [
    { state: "Idle", description: "Scrollbar hidden (type='hover' default); viewport shows content normally." },
    { state: "Hovered / scrolling", description: "Scrollbar fades in; thumb shows at gray.500 (border.strong)." },
    { state: "Dark mode", description: "Thumb stays gray.500 (border.strong is the same value in both modes)." },
  ],
  do: [
    "Set a fixed height on the ScrollArea root via className: h-64, h-[400px] — without a constrained height there is nothing to scroll.",
    "Apply rounded-[var(--radius-md)] and border on the ScrollArea root to match the surrounding card or panel style.",
    "Use <ScrollBar orientation='horizontal' /> alongside a whitespace-nowrap inner container for horizontal tag/chip strips.",
    "Use ScrollArea instead of overflow-y:auto when you need consistent cross-browser scrollbar styling.",
  ],
  dont: [
    "Don't nest a ScrollArea inside another ScrollArea without clear visual separation — nested scrollable regions confuse users.",
    "Don't set type='always' unless the content is clearly scrollable and users need a persistent affordance — it adds visual noise.",
    "Don't use ScrollArea for the full page — it wraps a div, not the window; use native body scroll for page-level scrolling.",
    "Don't forget to set a max-height or fixed height — an unconstrained ScrollArea behaves like a plain div.",
  ],
  a11y: [
    "Radix ScrollArea wraps a native scrollable viewport — keyboard scrolling (Arrow keys, Page Up/Down, Home/End) works natively inside.",
    "The custom scrollbar is decorative — the native scroll behavior remains intact; AT users navigate via keyboard, not the scrollbar.",
    "Scrollable regions should have a visible label when their content is non-obvious — use aria-label on the ScrollArea root.",
    "Ensure focusable content inside the viewport is reachable by Tab — Radix does not restrict focus inside the viewport.",
  ],
  tokens: [
    { property: "Scrollbar track width (vertical)", token: "--scrollbar-size", light: "10px", dark: "—" },
    { property: "Scrollbar track height (horizontal)", token: "--scrollbar-size", light: "10px", dark: "—" },
    { property: "Thumb radius", token: "--radius-full", light: "9999px", dark: "—" },
    { property: "Thumb color", token: "--border-strong", light: "gray.500", dark: "gray.500" },
    { property: "Track padding", token: "1px (bare track inset)", light: "1px", dark: "—" },
  ],
  usage: `import { ScrollArea, ScrollBar } from "@/design-system/scroll-area/scroll-area"

{/* Vertical scrollable list */}
<ScrollArea className="h-64 w-full rounded-[var(--radius-md)] border border-[var(--border-default)]">
  <div className="p-[var(--space-4)]">
    {items.map((item) => (
      <div
        key={item.id}
        className="py-[var(--space-2)] border-b border-[var(--border-default)] last:border-0 text-sm"
      >
        {item.name}
      </div>
    ))}
  </div>
</ScrollArea>

{/* Horizontal tag strip */}
<ScrollArea className="w-full whitespace-nowrap rounded-[var(--radius-md)]">
  <div className="flex gap-[var(--space-2)] p-[var(--space-2)]">
    {tags.map((tag) => (
      <Badge key={tag} variant="secondary">{tag}</Badge>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
}

// ─── Registry ─────────────────────────────────────────────────────────────────

const docs: ComponentDoc[] = [
  accordion,
  alert,
  alertDialog,
  aspectRatio,
  avatar,
  badge,
  breadcrumb,
  button,
  buttonGroup,
  calendar,
  card,
  carousel,
  chart,
  checkbox,
  collapsible,
  combobox,
  command,
  contextMenu,
  dataTable,
  datePicker,
  dialog,
  drawer,
  dropdownMenu,
  empty,
  field,
  hoverCard,
  input,
  inputGroup,
  inputOtp,
  item,
  kbd,
  label,
  menubar,
  nativeSelect,
  navigationMenu,
  pagination,
  popover,
  progress,
  radioGroup,
  scrollArea,
]

const docsMap = new Map<string, ComponentDoc>(docs.map((d) => [d.slug, d]))

export function getComponentDoc(slug: string): ComponentDoc | undefined {
  return docsMap.get(slug)
}
