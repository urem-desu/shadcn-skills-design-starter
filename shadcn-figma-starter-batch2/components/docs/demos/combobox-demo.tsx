"use client"

import * as React from "react"
import { Check, ChevronsUpDown, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

function ComboboxBasic() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((f) => f.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((f) => (
                <CommandItem
                  key={f.value}
                  value={f.value}
                  onSelect={(cur) => {
                    setValue(cur === value ? "" : cur)
                    setOpen(false)
                  }}
                >
                  {f.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === f.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

type Status = { value: string; label: string }

const statuses: Status[] = [
  { value: "backlog", label: "Backlog" },
  { value: "todo", label: "Todo" },
  { value: "in progress", label: "In Progress" },
  { value: "done", label: "Done" },
  { value: "canceled", label: "Canceled" },
]

function ComboboxPopover() {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(null)

  return (
    <div className="flex items-center gap-4">
      <p className="text-muted-foreground text-sm">Status</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-[150px] justify-start">
            {selectedStatus ? selectedStatus.label : "+ Set status"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((s) => s.value === value) ?? null
                      )
                      setOpen(false)
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

const labels = [
  "feature",
  "bug",
  "enhancement",
  "documentation",
  "design",
  "question",
  "maintenance",
]

function ComboboxDropdownMenu() {
  const [label, setLabel] = React.useState("feature")
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex w-full items-center justify-between rounded-md border px-4 py-3">
      <p className="flex items-center gap-2 text-sm leading-none font-medium">
        <Badge>{label}</Badge>
        Create a new project
      </p>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>Assign to...</DropdownMenuItem>
            <DropdownMenuItem>Set due date...</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Apply label</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {labels.map((l) => (
                  <DropdownMenuItem
                    key={l}
                    onSelect={() => {
                      setLabel(l)
                      setOpen(false)
                    }}
                  >
                    {l}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
]

function ComboboxForm() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid gap-2">
        <Label>Language</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? languages.find((l) => l.value === value)?.label
                : "Select language..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search language..." className="h-9" />
              <CommandList>
                <CommandEmpty>No language found.</CommandEmpty>
                <CommandGroup>
                  {languages.map((l) => (
                    <CommandItem
                      key={l.value}
                      value={l.value}
                      onSelect={(cur) => {
                        setValue(cur === value ? "" : cur)
                        setOpen(false)
                      }}
                    >
                      {l.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === l.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <p className="text-muted-foreground text-sm">
          This is the language that will be used in the dashboard.
        </p>
      </div>
      <Button type="submit" className="self-start">
        Submit
      </Button>
    </form>
  )
}

export function ComboboxDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <ComboboxBasic />
      <Separator />
      <ComboboxPopover />
      <Separator />
      <ComboboxDropdownMenu />
      <Separator />
      <ComboboxForm />
    </div>
  )
}
