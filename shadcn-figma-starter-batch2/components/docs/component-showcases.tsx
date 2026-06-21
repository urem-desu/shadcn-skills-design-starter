import { Fragment } from "react"
import type { ReactNode } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
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
  Cloud,
  Copy,
  Ellipsis,
  FolderCode,
  GitCompare,
  Italic,
  Minus,
  Plus,
  Popcorn,
  RefreshCcw,
  Search,
  Slash,
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
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  TableFooter,
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

import {
  DateTimePickerDemo,
  DobPickerDemo,
  FormDatePickerDemo,
  NaturalLanguagePickerDemo,
  PersianCalendarDemo,
} from "@/components/docs/demos/calendar-demos"
import { ComboboxDemo } from "@/components/docs/demos/combobox-demo"
import { DatePickerDemo } from "@/components/docs/demos/date-picker-demo"
import { ChartDemo } from "@/components/docs/demos/chart-demo"
import { CarouselDemos } from "@/components/docs/demos/carousel-demos"
import { CommandDemo } from "@/components/docs/demos/command-demo"
import { ContextMenuDemo } from "@/components/docs/demos/context-menu-demo"
import { DropdownMenuDemo } from "@/components/docs/demos/dropdown-menu-demo"
import { DrawerDemo } from "@/components/docs/demos/drawer-demo"
import { FieldDemo } from "@/components/docs/demos/field-demo"
import { InputGroupDemo } from "@/components/docs/demos/input-group-demo"
import { InputOTPDemo } from "@/components/docs/demos/input-otp-demo"
import { ItemDemo } from "@/components/docs/demos/item-demo"
import { KbdDemo } from "@/components/docs/demos/kbd-demo"
import { MenubarDemo } from "@/components/docs/demos/menubar-demo"
import { NavigationMenuDemo } from "@/components/docs/demos/navigation-menu-demo"
import { SidebarDemo } from "@/components/docs/demos/sidebar-demo"
import { DataTableDemo } from "@/components/docs/demos/data-table-demo"
import { ToastDemo } from "@/components/docs/demos/toast-demo"

export type ShowcaseContent = { source: string; tokens: string[]; content: ReactNode }

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { invoice: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  { invoice: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
  { invoice: "INV006", status: "Pending", method: "Bank Transfer", amount: "$200.00" },
  { invoice: "INV007", status: "Unpaid", method: "Credit Card", amount: "$300.00" },
]

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

const works = [
  { artist: "Ornella Binni", art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?w=300&dpr=2&q=80" },
  { artist: "Tom Byrom", art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?w=300&dpr=2&q=80" },
  { artist: "Vladimir Malyavko", art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?w=300&dpr=2&q=80" },
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
    content: <KbdDemo />,
  },
  label: {
    source: "components/ui/label.tsx",
    tokens: ["foreground", "muted-foreground", "destructive"],
    content: (
      <div className="flex items-center gap-3">
        <Checkbox id="label-terms" />
        <Label htmlFor="label-terms">Accept terms and conditions</Label>
      </div>
    ),
  },
  input: {
    source: "components/ui/input.tsx",
    tokens: ["input", "foreground", "ring"],
    content: (
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Input type="email" placeholder="Email" />
        <Separator />
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" />
        </div>
        <Separator />
        <Input type="email" placeholder="Email" disabled />
        <Separator />
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="email-2">Email</Label>
          <Input id="email-2" type="email" placeholder="Email" />
        </div>
        <Separator />
        <div className="flex w-full max-w-sm items-center gap-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit" variant="outline">Subscribe</Button>
        </div>
        <Separator />
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="username-input">Username</Label>
          <Input id="username-input" placeholder="shadcn" />
          <p className="text-muted-foreground text-sm">This is your public display name.</p>
          <Button type="submit" className="w-fit">Submit</Button>
        </div>
      </div>
    ),
  },
  "input-group": {
    source: "components/ui/input-group.tsx",
    tokens: ["input", "muted-foreground", "ring"],
    content: <InputGroupDemo />,
  },
  "input-otp": {
    source: "components/ui/input-otp.tsx",
    tokens: ["input", "ring", "border"],
    content: <InputOTPDemo />,
  },
  textarea: {
    source: "components/ui/textarea.tsx",
    tokens: ["input", "foreground", "ring"],
    content: (
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Textarea placeholder="Type your message here." />
        <Separator />
        <Textarea placeholder="Type your message here." disabled />
        <Separator />
        <div className="flex flex-col gap-2">
          <Label htmlFor="ta-message">Your message</Label>
          <Textarea id="ta-message" placeholder="Type your message here." />
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <Label htmlFor="ta-message-2">Your message</Label>
          <Textarea id="ta-message-2" placeholder="Type your message here." />
          <p className="text-sm text-muted-foreground">Your message will be copied to the support team.</p>
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <Textarea placeholder="Type your message here." />
          <Button className="w-full">Send message</Button>
        </div>
        <Separator />
        <form className="flex flex-col gap-2">
          <Label htmlFor="ta-bio">Bio</Label>
          <Textarea id="ta-bio" placeholder="Tell us a bit about yourself" />
          <p className="text-sm text-muted-foreground">You can @mention other users and organizations.</p>
          <Button type="submit" className="w-fit">Submit</Button>
        </form>
      </div>
    ),
  },
  checkbox: {
    source: "components/ui/checkbox.tsx",
    tokens: ["primary", "primary-foreground", "border"],
    content: (
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex items-center gap-3">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        <Separator />
        <div className="flex items-start gap-3">
          <Checkbox id="terms-2" />
          <div className="grid gap-1.5">
            <Label htmlFor="terms-2">Accept terms and conditions</Label>
            <p className="text-sm text-muted-foreground">By clicking this checkbox, you agree to the terms and conditions.</p>
          </div>
        </div>
        <Separator />
        <div className="flex items-center gap-3">
          <Checkbox id="cb-disabled" disabled className="peer" />
          <Label htmlFor="cb-disabled">Enable notifications</Label>
        </div>
        <Separator />
        <div className="flex flex-col gap-3">
          <Label htmlFor="cb-card-1" className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50">
            <Checkbox id="cb-card-1" />
            <div className="grid gap-1.5 font-normal">
              <span className="text-sm font-medium leading-none">Enable notifications</span>
              <span className="text-sm text-muted-foreground">You can enable or disable notifications at any time.</span>
            </div>
          </Label>
          <Label htmlFor="cb-card-2" className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-muted/50">
            <Checkbox id="cb-card-2" defaultChecked />
            <div className="grid gap-1.5 font-normal">
              <span className="text-sm font-medium leading-none">Enable notifications</span>
              <span className="text-sm text-muted-foreground">You can enable or disable notifications at any time.</span>
            </div>
          </Label>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <div className="grid gap-1.5">
            <span className="text-sm font-medium leading-none">Sidebar</span>
            <span className="text-sm text-muted-foreground">Select the items you want to display in the sidebar.</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3"><Checkbox id="sb-recents" /><Label htmlFor="sb-recents" className="font-normal">Recents</Label></div>
            <div className="flex items-center gap-3"><Checkbox id="sb-home" /><Label htmlFor="sb-home" className="font-normal">Home</Label></div>
            <div className="flex items-center gap-3"><Checkbox id="sb-applications" defaultChecked /><Label htmlFor="sb-applications" className="font-normal">Applications</Label></div>
            <div className="flex items-center gap-3"><Checkbox id="sb-desktop" /><Label htmlFor="sb-desktop" className="font-normal">Desktop</Label></div>
            <div className="flex items-center gap-3"><Checkbox id="sb-downloads" defaultChecked /><Label htmlFor="sb-downloads" className="font-normal">Downloads</Label></div>
            <div className="flex items-center gap-3"><Checkbox id="sb-documents" /><Label htmlFor="sb-documents" className="font-normal">Documents</Label></div>
          </div>
          <Button className="self-start">Submit</Button>
        </div>
      </div>
    ),
  },
  "radio-group": {
    source: "components/ui/radio-group.tsx",
    tokens: ["primary", "border", "ring"],
    content: (
      <div className="flex w-full max-w-md flex-col gap-6">
        <RadioGroup defaultValue="default">
          <div className="flex items-center gap-3"><RadioGroupItem value="default" id="r1" /><Label htmlFor="r1">Default</Label></div>
          <div className="flex items-center gap-3"><RadioGroupItem value="comfortable" id="r2" /><Label htmlFor="r2">Comfortable</Label></div>
          <div className="flex items-center gap-3"><RadioGroupItem value="compact" id="r3" /><Label htmlFor="r3">Compact</Label></div>
        </RadioGroup>
        <Separator />
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Label>Notify me about...</Label>
            <RadioGroup defaultValue="all">
              <div className="flex items-center gap-3"><RadioGroupItem value="all" id="r-all" /><Label htmlFor="r-all" className="font-normal">All new messages</Label></div>
              <div className="flex items-center gap-3"><RadioGroupItem value="mentions" id="r-mentions" /><Label htmlFor="r-mentions" className="font-normal">Direct messages and mentions</Label></div>
              <div className="flex items-center gap-3"><RadioGroupItem value="none" id="r-none" /><Label htmlFor="r-none" className="font-normal">Nothing</Label></div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-fit">Submit</Button>
        </form>
      </div>
    ),
  },
  switch: {
    source: "components/ui/switch.tsx",
    tokens: ["primary", "input"],
    content: (
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2">
          <Switch id="airplane" defaultChecked />
          <Label htmlFor="airplane">Airplane mode</Label>
        </div>
        <Separator />
        <form className="flex flex-col gap-6">
          <div>
            <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="marketing" className="text-base">Marketing emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new products, features, and more.
                  </p>
                </div>
                <Switch id="marketing" defaultChecked />
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="security" className="text-base">Security emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about your account security.
                  </p>
                </div>
                <Switch id="security" />
              </div>
            </div>
          </div>
          <Button type="submit" className="w-fit">Submit</Button>
        </form>
      </div>
    ),
  },
  slider: {
    source: "components/ui/slider.tsx",
    tokens: ["primary", "muted", "ring"],
    content: <Slider defaultValue={[31]} max={100} step={1} className="w-full max-w-sm" />,
  },
  select: {
    source: "components/ui/select.tsx",
    tokens: ["popover", "accent", "input"],
    content: (
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Select>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Select a fruit" /></SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Separator />
        <Select>
          <SelectTrigger className="w-[280px]"><SelectValue placeholder="Select a timezone" /></SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>North America</SelectLabel>
              <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
              <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
              <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
              <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
              <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
              <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Europe &amp; Africa</SelectLabel>
              <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
              <SelectItem value="cet">Central European Time (CET)</SelectItem>
              <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
              <SelectItem value="west">Western European Summer Time (WEST)</SelectItem>
              <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
              <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Asia</SelectLabel>
              <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
              <SelectItem value="ist">India Standard Time (IST)</SelectItem>
              <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
              <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
              <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
              <SelectItem value="ist_indonesia">Indonesia Central Standard Time (WITA)</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Australia &amp; Pacific</SelectLabel>
              <SelectItem value="awst">Australian Western Standard Time (AWST)</SelectItem>
              <SelectItem value="acst">Australian Central Standard Time (ACST)</SelectItem>
              <SelectItem value="aest">Australian Eastern Standard Time (AEST)</SelectItem>
              <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
              <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>South America</SelectLabel>
              <SelectItem value="art">Argentina Time (ART)</SelectItem>
              <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
              <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
              <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Separator />
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="select-email">Username</Label>
            <Select>
              <SelectTrigger id="select-email" className="w-[280px]"><SelectValue placeholder="Select a verified email to display" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="m@example.com">m@example.com</SelectItem>
                <SelectItem value="m@google.com">m@google.com</SelectItem>
                <SelectItem value="m@support.com">m@support.com</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">You can manage email addresses in your email settings.</p>
          </div>
          <Button type="submit" className="w-fit">Submit</Button>
        </form>
      </div>
    ),
  },
  "native-select": {
    source: "components/ui/native-select.tsx",
    tokens: ["input", "foreground", "ring"],
    content: (
      <div className="flex w-full max-w-sm flex-col gap-6">
        <NativeSelect className="w-56" defaultValue="">
          <NativeSelectOption value="">Select a status</NativeSelectOption>
          <NativeSelectOption value="todo">Todo</NativeSelectOption>
          <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
          <NativeSelectOption value="done">Done</NativeSelectOption>
          <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
        </NativeSelect>
        <Separator />
        <NativeSelect className="w-64" defaultValue="">
          <NativeSelectOption value="">Select department</NativeSelectOption>
          <NativeSelectOptGroup label="Engineering">
            <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
            <NativeSelectOption value="backend">Backend</NativeSelectOption>
            <NativeSelectOption value="devops">DevOps</NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Sales">
            <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
            <NativeSelectOption value="account-manager">Account Manager</NativeSelectOption>
            <NativeSelectOption value="sales-director">Sales Director</NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Operations">
            <NativeSelectOption value="customer-support">Customer Support</NativeSelectOption>
            <NativeSelectOption value="product-manager">Product Manager</NativeSelectOption>
            <NativeSelectOption value="operations-manager">Operations Manager</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
        <Separator />
        <NativeSelect className="w-56" defaultValue="" disabled>
          <NativeSelectOption value="">Select priority</NativeSelectOption>
          <NativeSelectOption value="low">Low</NativeSelectOption>
          <NativeSelectOption value="medium">Medium</NativeSelectOption>
          <NativeSelectOption value="high">High</NativeSelectOption>
        </NativeSelect>
        <Separator />
        <NativeSelect className="w-56" defaultValue="" aria-invalid>
          <NativeSelectOption value="">Select role</NativeSelectOption>
          <NativeSelectOption value="todo">Todo</NativeSelectOption>
          <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
          <NativeSelectOption value="done">Done</NativeSelectOption>
          <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
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
    content: <FieldDemo />,
  },
  dialog: {
    source: "components/ui/dialog.tsx",
    tokens: ["popover", "background-color", "border"],
    content: (
      <div className="flex flex-wrap gap-3">
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dialog-name">Name</Label>
                <Input id="dialog-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dialog-username">Username</Label>
                <Input id="dialog-username" defaultValue="@peduarte" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Share</Button></DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="share-link" className="sr-only">Link</Label>
                <Input id="share-link" defaultValue="https://ui.shadcn.com/docs/installation" readOnly />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild><Button type="button" variant="secondary">Close</Button></DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
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
        <SheetTrigger asChild><Button variant="outline">Open</Button></SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>Make changes to your profile here. Click save when you&apos;re done.</SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-name">Name</Label>
              <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-username">Username</Label>
              <Input id="sheet-demo-username" defaultValue="@peduarte" />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose asChild><Button variant="outline">Close</Button></SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    ),
  },
  drawer: {
    source: "components/ui/drawer.tsx",
    tokens: ["background", "border", "muted-foreground"],
    content: <DrawerDemo />,
  },
  popover: {
    source: "components/ui/popover.tsx",
    tokens: ["popover", "popover-foreground", "border"],
    content: (
      <Popover>
        <PopoverTrigger asChild><Button variant="outline">Open popover</Button></PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <h4 className="leading-none font-medium">Dimensions</h4>
              <p className="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Width</Label>
                <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxWidth">Max. width</Label>
                <Input id="maxWidth" defaultValue="320px" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="height">Height</Label>
                <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxHeight">Max. height</Label>
                <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
              </div>
            </div>
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
          <div className="flex justify-between gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-semibold">@nextjs</h4>
              <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
              <p className="text-muted-foreground text-xs">Joined December 2021</p>
            </div>
          </div>
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
    content: <DropdownMenuDemo />,
  },
  "context-menu": {
    source: "components/ui/context-menu.tsx",
    tokens: ["popover", "accent", "border"],
    content: <ContextMenuDemo />,
  },
  menubar: {
    source: "components/ui/menubar.tsx",
    tokens: ["background", "accent", "border"],
    content: <MenubarDemo />,
  },
  command: {
    source: "components/ui/command.tsx",
    tokens: ["popover", "accent", "muted-foreground"],
    content: <CommandDemo />,
  },
  tabs: {
    source: "components/ui/tabs.tsx",
    tokens: ["muted", "background", "foreground"],
    content: (
      <Tabs defaultValue="account" className="w-full max-w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-name">Name</Label>
                <Input id="tabs-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-username">Username</Label>
                <Input id="tabs-username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-current">Current password</Label>
                <Input id="tabs-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-new">New password</Label>
                <Input id="tabs-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
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
    content: <NavigationMenuDemo />,
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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
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
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
          <CardAction><Button variant="link">Sign up</Button></CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="card-email">Email</Label>
                <Input id="card-email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="card-password">Password</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">Forgot password?</a>
                </div>
                <Input id="card-password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">Login</Button>
          <Button variant="outline" className="w-full">Login with Google</Button>
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
      <Collapsible className="flex w-full max-w-sm flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-4">
          <span className="text-sm font-semibold">@peduarte starred 3 repositories</span>
          <CollapsibleTrigger asChild><Button variant="ghost" size="icon" className="size-8"><ChevronsUpDown /></Button></CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/primitives</div>
        <CollapsibleContent className="flex flex-col gap-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/colors</div>
          <div className="rounded-md border px-4 py-2 font-mono text-sm">@stitches/react</div>
        </CollapsibleContent>
      </Collapsible>
    ),
  },
  carousel: {
    source: "components/ui/carousel.tsx",
    tokens: ["card", "border", "foreground"],
    content: <CarouselDemos />,
  },
  chart: {
    source: "components/ui/chart.tsx",
    tokens: ["chart-2", "border", "muted-foreground"],
    content: <ChartDemo />,
  },
  item: {
    source: "components/ui/item.tsx",
    tokens: ["card", "muted", "muted-foreground"],
    content: <ItemDemo />,
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
    content: <Progress value={44} className="w-full max-w-sm" />,
  },
  skeleton: {
    source: "components/ui/skeleton.tsx",
    tokens: ["muted", "accent"],
    content: (
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    ),
  },
  spinner: {
    source: "components/ui/spinner.tsx",
    tokens: ["muted-foreground", "primary"],
    content: (
      <div className="flex w-full max-w-md flex-col gap-6">
        <Item variant="muted">
          <ItemMedia><Spinner /></ItemMedia>
          <ItemContent><ItemTitle className="line-clamp-1">Processing payment...</ItemTitle></ItemContent>
          <ItemContent className="flex-none justify-end"><ItemTitle>$100.00</ItemTitle></ItemContent>
        </Item>
        <Separator />
        <Spinner />
        <Separator />
        <div className="flex items-center gap-4">
          <Spinner className="size-3" />
          <Spinner className="size-4" />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
        </div>
        <Separator />
        <div className="flex items-center gap-4">
          <Spinner className="text-red-500" />
          <Spinner className="text-green-500" />
          <Spinner className="text-blue-500" />
          <Spinner className="text-yellow-500" />
        </div>
        <Separator />
        <div className="flex flex-col items-start gap-3">
          <Button disabled><Spinner />Loading...</Button>
          <Button variant="outline" disabled><Spinner />Loading...</Button>
          <Button variant="secondary" disabled><Spinner />Loading...</Button>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center gap-2">
          <Badge><Spinner className="size-3" />Syncing</Badge>
          <Badge variant="secondary"><Spinner className="size-3" />Updating</Badge>
          <Badge variant="outline"><Spinner className="size-3" />Processing</Badge>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <InputGroup>
            <InputGroupInput placeholder="Send a message..." />
            <InputGroupAddon align="inline-end"><Spinner /></InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupTextarea placeholder="Send a message..." />
            <InputGroupAddon align="block-end">
              <Spinner />
              <InputGroupText>Validating...</InputGroupText>
              <InputGroupButton variant="default" className="ml-auto rounded-full" size="icon-xs" aria-label="Send">
                <ArrowUp />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Separator />
        <Empty className="w-full">
          <EmptyHeader>
            <EmptyMedia variant="icon"><Spinner /></EmptyMedia>
            <EmptyTitle>Processing your request</EmptyTitle>
            <EmptyDescription>Please wait while we process your request. Do not refresh the page.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" size="sm">Cancel</Button>
          </EmptyContent>
        </Empty>
        <Separator />
        <Item variant="outline" className="flex-col items-stretch">
          <ItemHeader>
            <ItemMedia><Spinner /></ItemMedia>
            <ItemContent>
              <ItemTitle>Downloading...</ItemTitle>
              <ItemDescription>129 MB / 1000 MB</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">Cancel</Button>
            </ItemActions>
          </ItemHeader>
          <Progress value={43} />
        </Item>
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
      <div className="flex w-full flex-col gap-6">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon"><FolderCode /></EmptyMedia>
            <EmptyTitle>No Projects Yet</EmptyTitle>
            <EmptyDescription>You haven&apos;t created any projects yet. Get started by creating your first project.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Button size="sm">Create Project</Button>
              <Button variant="outline" size="sm">Import Project</Button>
            </div>
            <Button variant="link" size="sm" className="text-muted-foreground">
              Learn More <ArrowUpRight />
            </Button>
          </EmptyContent>
        </Empty>
        <Separator />
        <Empty className="rounded-lg border">
          <EmptyHeader>
            <EmptyMedia variant="icon"><Cloud /></EmptyMedia>
            <EmptyTitle>Cloud Storage Empty</EmptyTitle>
            <EmptyDescription>Upload files to your cloud storage to access them anywhere.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent><Button variant="outline" size="sm">Upload Files</Button></EmptyContent>
        </Empty>
        <Separator />
        <Empty className="bg-muted/50 rounded-lg">
          <EmptyHeader>
            <EmptyMedia variant="icon"><Bell /></EmptyMedia>
            <EmptyTitle>No Notifications</EmptyTitle>
            <EmptyDescription>You&apos;re all caught up. New notifications will appear here.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" size="sm"><RefreshCcw />Refresh</Button>
          </EmptyContent>
        </Empty>
        <Separator />
        <Empty>
          <EmptyHeader>
            <EmptyMedia>
              <Avatar className="size-12"><AvatarImage src="https://github.com/shadcn.png" /><AvatarFallback>CN</AvatarFallback></Avatar>
            </EmptyMedia>
            <EmptyTitle>User Offline</EmptyTitle>
            <EmptyDescription>This user is currently offline. You can leave a message to notify them or try again later.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent><Button size="sm">Leave Message</Button></EmptyContent>
        </Empty>
        <Separator />
        <Empty>
          <EmptyHeader>
            <EmptyMedia>
              <AvatarGroup>
                <Avatar><AvatarImage src="https://github.com/shadcn.png" /><AvatarFallback>CN</AvatarFallback></Avatar>
                <Avatar><AvatarImage src="https://github.com/vercel.png" /><AvatarFallback>VC</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
              </AvatarGroup>
            </EmptyMedia>
            <EmptyTitle>No Team Members</EmptyTitle>
            <EmptyDescription>Invite your team to collaborate on this project.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent><Button size="sm"><Plus />Invite Members</Button></EmptyContent>
        </Empty>
        <Separator />
        <Empty>
          <EmptyHeader>
            <EmptyTitle>404 - Not Found</EmptyTitle>
            <EmptyDescription>The page you&apos;re looking for doesn&apos;t exist. Try searching for what you need below.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <InputGroup className="sm:w-3/4">
              <InputGroupInput placeholder="Try searching for pages..." />
              <InputGroupAddon><Search /></InputGroupAddon>
              <InputGroupAddon align="inline-end"><kbd className="text-muted-foreground text-xs">/</kbd></InputGroupAddon>
            </InputGroup>
            <EmptyDescription>
              Need help? <a href="#" className="underline underline-offset-4">Contact support</a>
            </EmptyDescription>
          </EmptyContent>
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
      <div>
        <div className="flex flex-col gap-1">
          <h4 className="text-sm leading-none font-medium">Radix Primitives</h4>
          <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center gap-4 text-sm">
          <div>Blog</div>
          <Separator orientation="vertical" />
          <div>Docs</div>
          <Separator orientation="vertical" />
          <div>Source</div>
        </div>
      </div>
    ),
  },
  "scroll-area": {
    source: "components/ui/scroll-area.tsx",
    tokens: ["border", "muted-foreground"],
    content: (
      <div className="flex flex-col gap-6">
        <ScrollArea className="h-72 w-48 rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
            {tags.map((tag) => (
              <Fragment key={tag}>
                <div className="text-sm">{tag}</div>
                <Separator className="my-2" />
              </Fragment>
            ))}
          </div>
        </ScrollArea>
        <Separator />
        <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
          <div className="flex w-max gap-4 p-4">
            {works.map((artwork) => (
              <figure key={artwork.artist} className="shrink-0">
                <div className="overflow-hidden rounded-md">
                  <Image
                    src={artwork.art}
                    alt={`Photo by ${artwork.artist}`}
                    className="aspect-3/4 h-fit w-fit object-cover"
                    width={150}
                    height={200}
                  />
                </div>
                <figcaption className="text-muted-foreground pt-2 text-xs">
                  Photo by{" "}
                  <span className="text-foreground font-semibold">{artwork.artist}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    ),
  },
  sidebar: {
    source: "components/ui/sidebar.tsx",
    tokens: ["sidebar", "sidebar-foreground", "sidebar-accent", "sidebar-border"],
    content: <SidebarDemo />,
  },
}

export function getShowcase(slug: string): ShowcaseContent | undefined {
  return showcases[slug]
}
