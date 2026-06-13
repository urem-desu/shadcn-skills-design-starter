import type { Metadata } from "next"
import { Search } from "lucide-react"
import { PageHeader } from "@/components/docs/page-header"
import { Showcase } from "@/components/docs/showcase"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { ComboboxDemo } from "@/components/docs/demos/combobox-demo"
import { DatePickerDemo } from "@/components/docs/demos/date-picker-demo"
import { FormDemo } from "@/components/docs/demos/form-demo"
import { Calendar } from "@/components/ui/calendar"

export const metadata: Metadata = { title: "Forms & Inputs" }

export default function FormsPage() {
  return (
    <>
      <PageHeader eyebrow="Components" title="Forms & Inputs" description="Text inputs, choices, ranges, pickers, and the Field / Form primitives." />

      <Showcase name="Input" source="components/ui/input.tsx" tokens={["input", "foreground", "ring"]}>
        <div className="flex w-full max-w-sm flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      </Showcase>

      <Showcase name="Input Group" source="components/ui/input-group.tsx" tokens={["input", "muted-foreground", "ring"]}>
        <InputGroup className="max-w-sm">
          <InputGroupAddon><Search /></InputGroupAddon>
          <InputGroupInput placeholder="Search…" />
        </InputGroup>
      </Showcase>

      <Showcase name="Input OTP" source="components/ui/input-otp.tsx" tokens={["input", "ring", "border"]}>
        <InputOTP maxLength={6}>
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
      </Showcase>

      <Showcase name="Textarea" source="components/ui/textarea.tsx" tokens={["input", "foreground", "ring"]}>
        <Textarea placeholder="Type your message here." className="max-w-sm" />
      </Showcase>

      <Showcase name="Checkbox" source="components/ui/checkbox.tsx" tokens={["primary", "primary-foreground", "border"]}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2"><Checkbox id="terms" defaultChecked /><Label htmlFor="terms">Accept terms and conditions</Label></div>
          <div className="flex items-center gap-2"><Checkbox id="news" /><Label htmlFor="news">Subscribe to the newsletter</Label></div>
        </div>
      </Showcase>

      <Showcase name="Radio Group" source="components/ui/radio-group.tsx" tokens={["primary", "border", "ring"]}>
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center gap-2"><RadioGroupItem value="default" id="r1" /><Label htmlFor="r1">Default</Label></div>
          <div className="flex items-center gap-2"><RadioGroupItem value="comfortable" id="r2" /><Label htmlFor="r2">Comfortable</Label></div>
          <div className="flex items-center gap-2"><RadioGroupItem value="compact" id="r3" /><Label htmlFor="r3">Compact</Label></div>
        </RadioGroup>
      </Showcase>

      <Showcase name="Switch" source="components/ui/switch.tsx" tokens={["primary", "input"]}>
        <div className="flex items-center gap-2"><Switch id="airplane" defaultChecked /><Label htmlFor="airplane">Airplane mode</Label></div>
      </Showcase>

      <Showcase name="Slider" source="components/ui/slider.tsx" tokens={["primary", "muted", "ring"]}>
        <Slider defaultValue={[50]} max={100} step={1} className="w-full max-w-sm" />
      </Showcase>

      <Showcase name="Select" source="components/ui/select.tsx" tokens={["popover", "accent", "input"]}>
        <Select>
          <SelectTrigger className="w-[220px]"><SelectValue placeholder="Select a fruit" /></SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Showcase>

      <Showcase name="Native Select" source="components/ui/native-select.tsx" tokens={["input", "foreground", "ring"]}>
        <NativeSelect className="w-[220px]" defaultValue="apple">
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
        </NativeSelect>
      </Showcase>

      <Showcase name="Combobox" source="popover.tsx + command.tsx" tokens={["popover", "accent", "input"]}>
        <ComboboxDemo />
      </Showcase>

      <Showcase name="Date Picker" source="popover.tsx + calendar.tsx" tokens={["popover", "accent", "input"]}>
        <DatePickerDemo />
      </Showcase>

      <Showcase name="Calendar" source="components/ui/calendar.tsx" tokens={["accent", "primary", "muted-foreground"]}>
        <Calendar mode="single" selected={new Date()} className="rounded-md border" />
      </Showcase>

      <Showcase name="Field" source="components/ui/field.tsx" tokens={["foreground", "muted-foreground", "border"]}>
        <FieldGroup className="w-full max-w-sm">
          <Field>
            <FieldLabel htmlFor="project">Project name</FieldLabel>
            <Input id="project" placeholder="Acme website" />
            <FieldDescription>The name shown in your dashboard.</FieldDescription>
          </Field>
        </FieldGroup>
      </Showcase>

      <Showcase name="Form" source="components/ui/form.tsx" tokens={["foreground", "muted-foreground", "destructive"]}>
        <FormDemo />
      </Showcase>
    </>
  )
}
