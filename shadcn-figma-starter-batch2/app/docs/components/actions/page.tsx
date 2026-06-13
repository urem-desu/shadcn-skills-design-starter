import type { Metadata } from "next"
import { Bold, Italic, Settings, Underline } from "lucide-react"
import { PageHeader } from "@/components/docs/page-header"
import { Showcase } from "@/components/docs/showcase"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Badge } from "@/components/ui/badge"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export const metadata: Metadata = { title: "Buttons & Actions" }

export default function ActionsPage() {
  return (
    <>
      <PageHeader eyebrow="Components" title="Buttons & Actions" description="Buttons, button groups, toggles, badges and keyboard hints." />

      <Showcase name="Button" source="components/ui/button.tsx" tokens={["primary", "secondary", "accent", "destructive", "ring"]}>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Settings"><Settings /></Button>
        <Button disabled>Disabled</Button>
      </Showcase>

      <Showcase name="Button Group" source="components/ui/button-group.tsx" tokens={["secondary", "border", "ring"]}>
        <ButtonGroup>
          <Button variant="outline">Years</Button>
          <Button variant="outline">Months</Button>
          <Button variant="outline">Days</Button>
        </ButtonGroup>
      </Showcase>

      <Showcase name="Toggle" source="components/ui/toggle.tsx" tokens={["accent", "accent-foreground", "muted-foreground"]}>
        <Toggle aria-label="Bold"><Bold /></Toggle>
        <Toggle aria-label="Italic" defaultPressed><Italic /></Toggle>
        <Toggle aria-label="Underline" variant="outline"><Underline /></Toggle>
      </Showcase>

      <Showcase name="Toggle Group" source="components/ui/toggle-group.tsx" tokens={["accent", "accent-foreground", "border"]}>
        <ToggleGroup type="multiple" defaultValue={["bold"]} variant="outline">
          <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
        </ToggleGroup>
      </Showcase>

      <Showcase name="Badge" source="components/ui/badge.tsx" tokens={["primary", "secondary", "destructive", "border"]}>
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </Showcase>

      <Showcase name="Kbd" source="components/ui/kbd.tsx" tokens={["muted", "muted-foreground"]}>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <span className="text-sm text-muted-foreground">to open the command menu</span>
      </Showcase>
    </>
  )
}
