import type { ReactNode } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  Bell,
  Bold,
  Bot,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  CircleAlert,
  CircleCheck,
  Copy,
  Ellipsis,
  FolderOpen,
  GitCompare,
  Home,
  Inbox,
  Italic,
  Minus,
  Plus,
  Popcorn,
  Search,
  Settings,
  Slash,
  Star,
  TriangleAlert,
  Trash2,
  Underline,
  Upload,
  UserRoundX,
  VolumeOff,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Badge } from "@/components/ui/badge"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
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
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/components/ui/native-select"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ClientOnly } from "@/components/docs/client-only"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import {
  DateTimePickerDemo,
  DobPickerDemo,
  FormDatePickerDemo,
  NaturalLanguagePickerDemo,
  PersianCalendarDemo,
} from "@/components/docs/demos/calendar-demos"
import { ComboboxDemo } from "@/components/docs/demos/combobox-demo"
import { DatePickerDemo } from "@/components/docs/demos/date-picker-demo"
import { FormDemo } from "@/components/docs/demos/form-demo"
import { ChartDemo } from "@/components/docs/demos/chart-demo"
import { DataTableDemo } from "@/components/docs/demos/data-table-demo"
import { ToastDemo } from "@/components/docs/demos/toast-demo"

export type ShowcaseContent = { source: string; tokens: string[]; content: ReactNode }

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
]

const tags = Array.from({ length: 12 }).map((_, i) => `Tag ${i + 1}`)

const sidebarItems = [
  { title: "Home", icon: Home },
  { title: "Inbox", icon: Inbox },
  { title: "Search", icon: Search },
  { title: "Settings", icon: Settings },
]

/** Live preview + source + token chips for every component, keyed by slug. */
export const showcases: Record<string, ShowcaseContent> = {
  button: {
    source: "components/ui/button.tsx",
    tokens: ["primary", "secondary", "accent", "destructive", "ring"],
    content: (
      <>
        <Button>Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="outline" size="icon" aria-label="Next"><ChevronRight /></Button>
        <Button variant="outline"><GitCompare />New Branch</Button>
        <Button disabled><Spinner />Please wait</Button>
      </>
    ),
  },
  "button-group": {
    source: "components/ui/button-group.tsx",
    tokens: ["secondary", "border", "ring"],
    content: (
      <div className="flex flex-col gap-6">
        <ButtonGroup>
          <Button variant="outline" size="icon" aria-label="Go back"><ArrowLeft /></Button>
          <Button variant="outline">Archive</Button>
          <Button variant="outline">Report</Button>
          <Button variant="outline">Snooze</Button>
          <Button variant="outline" size="icon" aria-label="More"><Ellipsis /></Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical" className="w-fit">
          <Button variant="outline" size="icon" aria-label="Increase"><Plus /></Button>
          <Button variant="outline" size="icon" aria-label="Decrease"><Minus /></Button>
        </ButtonGroup>
        <div className="flex flex-col gap-3">
          <ButtonGroup>
            <Button variant="outline" size="sm">Button</Button>
            <Button variant="outline" size="sm">Group</Button>
            <Button variant="outline" size="sm" aria-label="Add"><Plus /></Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">Button</Button>
            <Button variant="outline">Group</Button>
            <Button variant="outline" size="icon" aria-label="Add"><Plus /></Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="lg">Button</Button>
            <Button variant="outline" size="lg">Group</Button>
            <Button variant="outline" size="lg" aria-label="Add"><Plus /></Button>
          </ButtonGroup>
        </div>
        <ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="icon">1</Button>
            <Button variant="outline" size="icon">2</Button>
            <Button variant="outline" size="icon">3</Button>
            <Button variant="outline" size="icon">4</Button>
            <Button variant="outline" size="icon">5</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="icon" aria-label="Previous"><ArrowLeft /></Button>
            <Button variant="outline" size="icon" aria-label="Next"><ArrowRight /></Button>
          </ButtonGroup>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Copy</Button>
          <ButtonGroupSeparator />
          <Button variant="outline">Paste</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Button</Button>
          <Button variant="outline" size="icon" aria-label="Add"><Plus /></Button>
        </ButtonGroup>
        <ButtonGroup className="w-full max-w-sm">
          <Input placeholder="Search..." />
          <Button variant="outline" size="icon" aria-label="Search"><Search /></Button>
        </ButtonGroup>
        <InputGroup className="max-w-sm">
          <InputGroupAddon>
            <InputGroupButton size="icon-xs" aria-label="Add"><Plus /></InputGroupButton>
          </InputGroupAddon>
          <InputGroupInput placeholder="Send a message..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs" aria-label="Voice"><AudioLines /></InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <ButtonGroup>
          <Button variant="outline">Follow</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="More options"><ChevronDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><VolumeOff />Mute Conversation</DropdownMenuItem>
              <DropdownMenuItem><Check />Mark as Read</DropdownMenuItem>
              <DropdownMenuItem><TriangleAlert />Report Conversation</DropdownMenuItem>
              <DropdownMenuItem><UserRoundX />Block User</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Upload />Share Conversation</DropdownMenuItem>
              <DropdownMenuItem><Copy />Copy Conversation</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive"><Trash2 />Delete Conversation</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
        <ButtonGroup>
          <Select defaultValue="usd">
            <SelectTrigger className="w-16"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">$ US Dollar</SelectItem>
              <SelectItem value="eur">€ Euro</SelectItem>
              <SelectItem value="gbp">£ British Pound</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="10.00" className="w-28" />
          <Button variant="outline" size="icon" aria-label="Send"><ArrowRight /></Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline"><Bot />Copilot</Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Agent tasks"><ChevronDown /></Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="flex w-72 flex-col gap-3">
              <p className="text-sm font-medium">Agent Tasks</p>
              <Textarea placeholder="Describe your task in natural language." />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Start a new task with Copilot</p>
                <p className="text-sm text-muted-foreground">Describe your task in natural language. Copilot will work in the background and open a pull request for your review.</p>
              </div>
            </PopoverContent>
          </Popover>
        </ButtonGroup>
      </div>
    ),
  },
  toggle: {
    source: "components/ui/toggle.tsx",
    tokens: ["accent", "accent-foreground", "muted-foreground"],
    content: (
      <>
        <Toggle aria-label="Bold"><Bold /></Toggle>
        <Toggle aria-label="Italic" defaultPressed><Italic /></Toggle>
        <Toggle aria-label="Underline" variant="outline"><Underline /></Toggle>
        <Toggle aria-label="Italic with text"><Italic />Italic</Toggle>
        <Toggle aria-label="Small" size="sm"><Bold /></Toggle>
        <Toggle aria-label="Large" size="lg"><Bold /></Toggle>
        <Toggle aria-label="Disabled" disabled><Underline /></Toggle>
      </>
    ),
  },
  "toggle-group": {
    source: "components/ui/toggle-group.tsx",
    tokens: ["accent", "accent-foreground", "border"],
    content: (
      <div className="flex flex-col gap-4">
        <ToggleGroup type="multiple" defaultValue={["bold"]}>
          <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="multiple" defaultValue={["bold"]} variant="outline">
          <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="multiple" defaultValue={["bold"]} variant="outline" size="sm">
          <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
        </ToggleGroup>
      </div>
    ),
  },
  badge: {
    source: "components/ui/badge.tsx",
    tokens: ["primary", "secondary", "destructive", "border"],
    content: (
      <>
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge><CircleCheck />Verified</Badge>
        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>
        <Badge variant="destructive" className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">99</Badge>
        <Badge variant="secondary" className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">20+</Badge>
      </>
    ),
  },
  kbd: {
    source: "components/ui/kbd.tsx",
    tokens: ["muted", "muted-foreground"],
    content: (
      <>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <span className="text-sm text-muted-foreground">to open the command menu</span>
      </>
    ),
  },
  label: {
    source: "components/ui/label.tsx",
    tokens: ["foreground", "muted-foreground", "destructive"],
    content: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="label-email">Email</Label>
          <Input id="label-email" type="email" placeholder="you@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="label-password">
            Password <span className="text-destructive">*</span>
          </Label>
          <Input id="label-password" type="password" placeholder="Required" />
        </div>
      </div>
    ),
  },
  input: {
    source: "components/ui/input.tsx",
    tokens: ["input", "foreground", "ring"],
    content: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <Input type="file" aria-label="Upload file" />
        <Input placeholder="Disabled" disabled />
        <div className="flex gap-2">
          <Input type="email" placeholder="you@example.com" />
          <Button variant="outline">Subscribe</Button>
        </div>
      </div>
    ),
  },
  "input-group": {
    source: "components/ui/input-group.tsx",
    tokens: ["input", "muted-foreground", "ring"],
    content: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <InputGroup>
          <InputGroupAddon><Search /></InputGroupAddon>
          <InputGroupInput placeholder="Search…" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="Search…" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="sm">Go</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="Loading…" />
          <InputGroupAddon align="inline-end"><Spinner /></InputGroupAddon>
        </InputGroup>
      </div>
    ),
  },
  "input-otp": {
    source: "components/ui/input-otp.tsx",
    tokens: ["input", "ring", "border"],
    content: (
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
    ),
  },
  textarea: {
    source: "components/ui/textarea.tsx",
    tokens: ["input", "foreground", "ring"],
    content: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Textarea placeholder="Type your message here." />
        <div className="flex flex-col gap-2">
          <Label htmlFor="ta-message">Your message</Label>
          <Textarea id="ta-message" placeholder="Type your message here." />
          <p className="text-sm text-muted-foreground">Your message will be copied to the support team.</p>
        </div>
        <Textarea placeholder="Disabled" disabled />
        <div className="flex flex-col gap-2">
          <Textarea placeholder="Type your message here." />
          <Button className="self-end">Send message</Button>
        </div>
      </div>
    ),
  },
  checkbox: {
    source: "components/ui/checkbox.tsx",
    tokens: ["primary", "primary-foreground", "border"],
    content: (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2"><Checkbox id="terms" defaultChecked /><Label htmlFor="terms">Accept terms and conditions</Label></div>
        <div className="flex items-start gap-2">
          <Checkbox id="news" defaultChecked />
          <div className="flex flex-col gap-1">
            <Label htmlFor="news">Subscribe to the newsletter</Label>
            <p className="text-sm text-muted-foreground">Get product updates once a month. No spam.</p>
          </div>
        </div>
        <div className="flex items-center gap-2"><Checkbox id="cb-disabled" disabled /><Label htmlFor="cb-disabled">Disabled option</Label></div>
        <Label className="flex items-start gap-3 rounded-lg border p-3 has-[[data-state=checked]]:border-primary">
          <Checkbox id="cb-card" defaultChecked />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Enable notifications</span>
            <span className="text-sm text-muted-foreground">Send me alerts about account activity.</span>
          </div>
        </Label>
      </div>
    ),
  },
  "radio-group": {
    source: "components/ui/radio-group.tsx",
    tokens: ["primary", "border", "ring"],
    content: (
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center gap-2"><RadioGroupItem value="default" id="r1" /><Label htmlFor="r1">Default</Label></div>
        <div className="flex items-center gap-2"><RadioGroupItem value="comfortable" id="r2" /><Label htmlFor="r2">Comfortable</Label></div>
        <div className="flex items-center gap-2"><RadioGroupItem value="compact" id="r3" /><Label htmlFor="r3">Compact</Label></div>
      </RadioGroup>
    ),
  },
  switch: {
    source: "components/ui/switch.tsx",
    tokens: ["primary", "input"],
    content: <div className="flex items-center gap-2"><Switch id="airplane" defaultChecked /><Label htmlFor="airplane">Airplane mode</Label></div>,
  },
  slider: {
    source: "components/ui/slider.tsx",
    tokens: ["primary", "muted", "ring"],
    content: <Slider defaultValue={[50]} max={100} step={1} className="w-full max-w-sm" />,
  },
  select: {
    source: "components/ui/select.tsx",
    tokens: ["popover", "accent", "input"],
    content: (
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
    ),
  },
  "native-select": {
    source: "components/ui/native-select.tsx",
    tokens: ["input", "foreground", "ring"],
    content: (
      <div className="flex flex-col gap-4">
        <NativeSelect className="w-56" defaultValue="apple">
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
        </NativeSelect>
        <NativeSelect className="w-56" defaultValue="apple">
          <NativeSelectOptGroup label="Fruits">
            <NativeSelectOption value="apple">Apple</NativeSelectOption>
            <NativeSelectOption value="banana">Banana</NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Vegetables">
            <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
            <NativeSelectOption value="potato">Potato</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
        <NativeSelect className="w-56" defaultValue="apple" disabled>
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
        </NativeSelect>
      </div>
    ),
  },
  combobox: {
    source: "popover.tsx + command.tsx",
    tokens: ["popover", "accent", "input"],
    content: <ComboboxDemo />,
  },
  "date-picker": {
    source: "popover.tsx + calendar.tsx",
    tokens: ["popover", "accent", "input"],
    content: <DatePickerDemo />,
  },
  calendar: {
    source: "components/ui/calendar.tsx",
    tokens: ["accent", "primary", "muted-foreground"],
    content: (
      <ClientOnly fallback={<div className="h-80 w-full" />}>
        <div className="flex flex-wrap items-start gap-6">
          <Calendar mode="single" selected={new Date()} className="rounded-md border" />
          <PersianCalendarDemo />
          <Calendar
            mode="range"
            numberOfMonths={2}
            defaultMonth={new Date(2025, 5)}
            selected={{ from: new Date(2025, 5, 9), to: new Date(2025, 5, 26) }}
            className="rounded-md border"
          />
          <Calendar
            mode="single"
            captionLayout="dropdown"
            defaultMonth={new Date()}
            className="rounded-md border"
          />
          <DobPickerDemo />
          <DateTimePickerDemo />
          <NaturalLanguagePickerDemo />
          <FormDatePickerDemo />
        </div>
      </ClientOnly>
    ),
  },
  field: {
    source: "components/ui/field.tsx",
    tokens: ["foreground", "muted-foreground", "border"],
    content: (
      <FieldGroup className="w-full max-w-sm">
        <Field>
          <FieldLabel htmlFor="project">Project name</FieldLabel>
          <Input id="project" placeholder="Acme website" />
          <FieldDescription>The name shown in your dashboard.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="field-bio">Bio</FieldLabel>
          <Textarea id="field-bio" placeholder="Tell us about yourself" />
        </Field>
        <Field>
          <FieldLabel htmlFor="field-plan">Plan</FieldLabel>
          <NativeSelect id="field-plan" defaultValue="free">
            <NativeSelectOption value="free">Free</NativeSelectOption>
            <NativeSelectOption value="pro">Pro</NativeSelectOption>
          </NativeSelect>
          <FieldDescription>Change how you are billed.</FieldDescription>
        </Field>
        <Field orientation="horizontal">
          <Switch id="field-notify" defaultChecked />
          <FieldLabel htmlFor="field-notify">Email notifications</FieldLabel>
        </Field>
      </FieldGroup>
    ),
  },
  form: {
    source: "components/ui/form.tsx",
    tokens: ["foreground", "muted-foreground", "destructive"],
    content: <FormDemo />,
  },
  dialog: {
    source: "components/ui/dialog.tsx",
    tokens: ["popover", "background-color", "border"],
    content: (
      <Dialog>
        <DialogTrigger asChild><Button variant="outline">Edit profile</Button></DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2"><Label htmlFor="dn">Name</Label><Input id="dn" defaultValue="Pedro Duarte" /></div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <DialogClose asChild><Button>Save changes</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  },
  "alert-dialog": {
    source: "components/ui/alert-dialog.tsx",
    tokens: ["popover", "destructive", "muted"],
    content: (
      <AlertDialog>
        <AlertDialogTrigger asChild><Button variant="outline">Show dialog</Button></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
  sheet: {
    source: "components/ui/sheet.tsx",
    tokens: ["background", "border", "muted-foreground"],
    content: (
      <Sheet>
        <SheetTrigger asChild><Button variant="outline">Open sheet</Button></SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>Make changes to your profile here. Click save when you&apos;re done.</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild><Button>Save changes</Button></SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    ),
  },
  drawer: {
    source: "components/ui/drawer.tsx",
    tokens: ["background", "border", "muted-foreground"],
    content: (
      <Drawer>
        <DrawerTrigger asChild><Button variant="outline">Open drawer</Button></DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Move goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    ),
  },
  popover: {
    source: "components/ui/popover.tsx",
    tokens: ["popover", "popover-foreground", "border"],
    content: (
      <Popover>
        <PopoverTrigger asChild><Button variant="outline">Open popover</Button></PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex flex-col gap-2">
            <h4 className="font-medium">Dimensions</h4>
            <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          </div>
        </PopoverContent>
      </Popover>
    ),
  },
  "hover-card": {
    source: "components/ui/hover-card.tsx",
    tokens: ["popover", "popover-foreground", "border"],
    content: (
      <HoverCard>
        <HoverCardTrigger asChild><Button variant="link">@nextjs</Button></HoverCardTrigger>
        <HoverCardContent className="w-80">
          <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
        </HoverCardContent>
      </HoverCard>
    ),
  },
  tooltip: {
    source: "components/ui/tooltip.tsx",
    tokens: ["primary", "primary-foreground"],
    content: (
      <Tooltip>
        <TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger>
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
    ),
  },
  "dropdown-menu": {
    source: "components/ui/dropdown-menu.tsx",
    tokens: ["popover", "accent", "border"],
    content: (
      <div className="flex flex-wrap gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="outline">Open menu</Button></DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="outline">Checkboxes</Button></DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Status Bar</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Activity Bar</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Panel</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="outline">Radio group</Button></DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Panel position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value="bottom">
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
  "context-menu": {
    source: "components/ui/context-menu.tsx",
    tokens: ["popover", "accent", "border"],
    content: (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-24 w-full max-w-sm items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
          Right-click here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuItem>Back<ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuItem>Forward<ContextMenuShortcut>⌘]</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Reload<ContextMenuShortcut>⌘R</ContextMenuShortcut></ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
  },
  menubar: {
    source: "components/ui/menubar.tsx",
    tokens: ["background", "accent", "border"],
    content: (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Tab<MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
            <MenubarItem>New Window<MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print<MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo<MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
            <MenubarItem>Redo<MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),
  },
  command: {
    source: "components/ui/command.tsx",
    tokens: ["popover", "accent", "muted-foreground"],
    content: (
      <Command className="w-full max-w-md rounded-lg border">
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile<CommandShortcut>⌘P</CommandShortcut></CommandItem>
            <CommandItem>Settings<CommandShortcut>⌘S</CommandShortcut></CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    ),
  },
  tabs: {
    source: "components/ui/tabs.tsx",
    tokens: ["muted", "background", "foreground"],
    content: (
      <Tabs defaultValue="account" className="w-full max-w-md">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="pt-3 text-sm text-muted-foreground">Make changes to your account here.</TabsContent>
        <TabsContent value="password" className="pt-3 text-sm text-muted-foreground">Change your password here.</TabsContent>
      </Tabs>
    ),
  },
  breadcrumb: {
    source: "components/ui/breadcrumb.tsx",
    tokens: ["foreground", "muted-foreground"],
    content: (
      <div className="flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator><Slash /></BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator><Slash /></BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator><Slash /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  Components <ChevronDown className="size-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Documentation</DropdownMenuItem>
                  <DropdownMenuItem>Themes</DropdownMenuItem>
                  <DropdownMenuItem>GitHub</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator><Slash /></BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="#">Data Fetching</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Caching and Revalidating</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    ),
  },
  pagination: {
    source: "components/ui/pagination.tsx",
    tokens: ["accent", "border", "foreground"],
    content: (
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
          <PaginationItem><PaginationEllipsis /></PaginationItem>
          <PaginationItem><PaginationNext href="#" /></PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
  },
  "navigation-menu": {
    source: "components/ui/navigation-menu.tsx",
    tokens: ["popover", "accent", "muted-foreground"],
    content: (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-1 p-2">
                <li><NavigationMenuLink href="#" className="block rounded-md p-2 text-sm">Introduction</NavigationMenuLink></li>
                <li><NavigationMenuLink href="#" className="block rounded-md p-2 text-sm">Installation</NavigationMenuLink></li>
                <li><NavigationMenuLink href="#" className="block rounded-md p-2 text-sm">Typography</NavigationMenuLink></li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className="px-3 py-2 text-sm">Docs</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ),
  },
  table: {
    source: "components/ui/table.tsx",
    tokens: ["border", "muted", "muted-foreground"],
    content: (
      <Table className="max-w-xl">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((i) => (
            <TableRow key={i.invoice}>
              <TableCell className="font-medium">{i.invoice}</TableCell>
              <TableCell>{i.status}</TableCell>
              <TableCell>{i.method}</TableCell>
              <TableCell className="text-right">{i.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
  },
  "data-table": {
    source: "table.tsx + checkbox.tsx + badge.tsx",
    tokens: ["border", "muted", "muted-foreground"],
    content: <DataTableDemo />,
  },
  avatar: {
    source: "components/ui/avatar.tsx",
    tokens: ["muted", "muted-foreground", "border"],
    content: (
      <div className="flex items-center gap-6">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="rounded-lg">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <AvatarGroup>
          <Avatar><AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /><AvatarFallback>CN</AvatarFallback></Avatar>
          <Avatar><AvatarImage src="https://github.com/leerob.png" alt="@leerob" /><AvatarFallback>LR</AvatarFallback></Avatar>
          <Avatar><AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" /><AvatarFallback>ER</AvatarFallback></Avatar>
        </AvatarGroup>
      </div>
    ),
  },
  card: {
    source: "components/ui/card.tsx",
    tokens: ["card", "card-foreground", "border"],
    content: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one click.</CardDescription>
          <CardAction><Button variant="link" size="sm">Sign up</Button></CardAction>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Start from a template or import an existing repository.</CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    ),
  },
  accordion: {
    source: "components/ui/accordion.tsx",
    tokens: ["border", "foreground", "muted-foreground"],
    content: (
      <Accordion type="single" collapsible defaultValue="a" className="w-full max-w-[503px]">
        <AccordionItem value="a">
          <AccordionTrigger className="data-[state=open]:font-bold">Product Information</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-foreground">
            <p>Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.</p>
            <p>Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger className="data-[state=open]:font-bold">Shipping Details</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-foreground">
            <p>We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days, while express shipping ensures delivery within 1-2 business days</p>
            <p>All orders are carefully packaged and fully insured. Track your shipment in real-time through our dedicated tracking portal.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="c">
          <AccordionTrigger className="data-[state=open]:font-bold">Return Policy</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-foreground">
            <p>We stand behind our products with a comprehensive 30-day return policy. If you&apos;re not completely satisfied, simply return the item in its original condition.</p>
            <p>Our hassle-free return process includes free return shipping and full refunds processed within 48 hours of receiving the returned item.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  collapsible: {
    source: "components/ui/collapsible.tsx",
    tokens: ["muted", "foreground"],
    content: (
      <Collapsible className="w-full max-w-sm">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium">@peduarte starred 3 repositories</span>
          <CollapsibleTrigger asChild><Button variant="ghost" size="icon"><ChevronsUpDown /></Button></CollapsibleTrigger>
        </div>
        <div className="mt-2 rounded-md border px-3 py-2 text-sm">@radix-ui/primitives</div>
        <CollapsibleContent className="flex flex-col gap-2">
          <div className="mt-2 rounded-md border px-3 py-2 text-sm">@radix-ui/colors</div>
          <div className="rounded-md border px-3 py-2 text-sm">@stitches/react</div>
        </CollapsibleContent>
      </Collapsible>
    ),
  },
  carousel: {
    source: "components/ui/carousel.tsx",
    tokens: ["card", "border", "foreground"],
    content: (
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, i) => (
            <CarouselItem key={i}>
              <div className="flex aspect-square items-center justify-center rounded-lg border bg-card text-4xl font-semibold">
                {i + 1}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    ),
  },
  chart: {
    source: "components/ui/chart.tsx",
    tokens: ["chart-2", "border", "muted-foreground"],
    content: <ChartDemo />,
  },
  item: {
    source: "components/ui/item.tsx",
    tokens: ["card", "muted", "muted-foreground"],
    content: (
      <ItemGroup className="w-full max-w-sm gap-3">
        <Item variant="outline">
          <ItemMedia><Star className="size-5" /></ItemMedia>
          <ItemContent>
            <ItemTitle>Starred project</ItemTitle>
            <ItemDescription>Updated 2 hours ago</ItemDescription>
          </ItemContent>
          <ItemActions><Button variant="ghost" size="icon" aria-label="More"><ChevronsUpDown /></Button></ItemActions>
        </Item>
        <Item variant="muted">
          <ItemMedia variant="icon"><Bell /></ItemMedia>
          <ItemContent>
            <ItemTitle>Notifications</ItemTitle>
            <ItemDescription>Muted variant</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline" size="sm">
          <ItemMedia>
            <Avatar className="size-6"><AvatarFallback>CN</AvatarFallback></Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Small with avatar</ItemTitle>
          </ItemContent>
          <ItemActions><Button variant="outline" size="sm">View</Button></ItemActions>
        </Item>
      </ItemGroup>
    ),
  },
  alert: {
    source: "components/ui/alert.tsx",
    tokens: ["card", "card-foreground", "destructive"],
    content: (
      <div className="flex w-full max-w-xl flex-col gap-4">
        <Alert>
          <CircleCheck />
          <AlertTitle>Success! Your changes have been saved</AlertTitle>
          <AlertDescription>This is an alert with icon, title and description.</AlertDescription>
        </Alert>
        <Alert>
          <Popcorn />
          <AlertTitle>This Alert has a title and an icon. No description.</AlertTitle>
        </Alert>
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Unable to process your payment.</AlertTitle>
          <AlertDescription>
            <p>Please verify your billing information and try again.</p>
            <ul className="list-inside list-disc text-sm">
              <li>Check your card details</li>
              <li>Ensure sufficient funds</li>
              <li>Verify billing address</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    ),
  },
  progress: {
    source: "components/ui/progress.tsx",
    tokens: ["primary", "muted"],
    content: <Progress value={60} className="w-full max-w-sm" />,
  },
  skeleton: {
    source: "components/ui/skeleton.tsx",
    tokens: ["muted", "accent"],
    content: (
      <div className="flex items-center gap-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[160px]" />
        </div>
      </div>
    ),
  },
  spinner: {
    source: "components/ui/spinner.tsx",
    tokens: ["muted-foreground", "primary"],
    content: (
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-4">
          <Spinner className="size-3" />
          <Spinner className="size-4" />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
        </div>
        <Button disabled><Spinner />Loading…</Button>
        <Badge variant="secondary"><Spinner className="size-3" />Syncing</Badge>
        <InputGroup className="w-48">
          <InputGroupInput placeholder="Loading…" />
          <InputGroupAddon align="inline-end"><Spinner /></InputGroupAddon>
        </InputGroup>
      </div>
    ),
  },
  sonner: {
    source: "components/ui/sonner.tsx",
    tokens: ["popover", "popover-foreground", "border"],
    content: <ToastDemo />,
  },
  empty: {
    source: "components/ui/empty.tsx",
    tokens: ["muted", "muted-foreground", "border"],
    content: (
      <div className="grid w-full gap-4 sm:grid-cols-2">
        <Empty className="rounded-lg border">
          <EmptyHeader>
            <EmptyMedia variant="icon"><FolderOpen /></EmptyMedia>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>Create your first project to get started.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent><Button size="sm">Create project</Button></EmptyContent>
        </Empty>
        <Empty className="rounded-lg border bg-muted/50">
          <EmptyHeader>
            <EmptyMedia variant="default">
              <Avatar className="size-12"><AvatarFallback>CN</AvatarFallback></Avatar>
            </EmptyMedia>
            <EmptyTitle>No members</EmptyTitle>
            <EmptyDescription>Invite a teammate to collaborate.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent><Button variant="outline" size="sm"><Plus />Invite</Button></EmptyContent>
        </Empty>
      </div>
    ),
  },
  "aspect-ratio": {
    source: "components/ui/aspect-ratio.tsx",
    tokens: ["muted", "border"],
    content: (
      <div className="w-full max-w-md">
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg bg-muted">
          <Image
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Photo by Drew Beamer"
            fill
            className="object-cover"
          />
        </AspectRatio>
      </div>
    ),
  },
  separator: {
    source: "components/ui/separator.tsx",
    tokens: ["border"],
    content: (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium">Radix Primitives</p>
        <Separator />
        <div className="flex h-5 items-center gap-3 text-sm">
          <span>Blog</span>
          <Separator orientation="vertical" />
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Source</span>
        </div>
      </div>
    ),
  },
  "scroll-area": {
    source: "components/ui/scroll-area.tsx",
    tokens: ["border", "muted-foreground"],
    content: (
      <div className="flex flex-wrap gap-6">
        <ScrollArea className="h-48 w-64 rounded-md border">
          <div className="flex flex-col gap-2 p-4">
            <p className="text-sm font-medium">Tags</p>
            {tags.map((t) => (
              <div key={t} className="text-sm text-muted-foreground">{t}</div>
            ))}
          </div>
        </ScrollArea>
        <ScrollArea className="w-72 rounded-md border whitespace-nowrap">
          <div className="flex gap-3 p-4">
            {tags.map((t) => (
              <div key={t} className="flex size-24 shrink-0 items-center justify-center rounded-md border bg-muted text-sm text-muted-foreground">{t}</div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    ),
  },
  resizable: {
    source: "components/ui/resizable.tsx",
    tokens: ["border", "muted"],
    content: (
      <ResizablePanelGroup orientation="horizontal" className="h-40 max-w-md rounded-lg border">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-4 text-sm">One</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-4 text-sm">Two</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    ),
  },
  sidebar: {
    source: "components/ui/sidebar.tsx",
    tokens: ["sidebar", "sidebar-foreground", "sidebar-accent", "sidebar-border"],
    content: (
      <div className="h-[320px] w-full overflow-hidden rounded-lg border">
        <SidebarProvider className="min-h-0 h-full items-stretch">
          <Sidebar collapsible="none" className="border-r">
            <SidebarHeader className="px-3 py-2 text-sm font-semibold">Acme Inc</SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {sidebarItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton isActive={item.title === "Home"}>
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="min-h-0">
            <header className="flex h-12 items-center gap-2 border-b px-3">
              <SidebarTrigger />
              <span className="text-sm font-medium">Dashboard</span>
            </header>
            <div className="p-4 text-sm text-muted-foreground">Main content area</div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    ),
  },
}

export function getShowcase(slug: string): ShowcaseContent | undefined {
  return showcases[slug]
}
