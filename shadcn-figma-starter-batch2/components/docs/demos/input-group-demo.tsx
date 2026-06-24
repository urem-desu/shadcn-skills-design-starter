"use client"

import * as React from "react"
import {
  ArrowUp,
  Check,
  ChevronDown,
  CircleCheck,
  CircleHelp,
  Copy,
  CornerDownLeft,
  CreditCard,
  Ellipsis,
  FileCode,
  Info,
  Link2,
  Mail,
  Plus,
  RefreshCcw,
  Search,
  Star,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full max-w-md flex-col gap-4">{children}</div>
}

function InputGroupRow() {
  return (
    <Row>
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupText>12 results</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Info">
            <Info />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Ask, Search or Chat..." />
        <InputGroupAddon align="block-end">
          <InputGroupButton variant="outline" className="rounded-full" size="icon-xs" aria-label="Add">
            <Plus />
          </InputGroupButton>
          <InputGroupText>Auto</InputGroupText>
          <InputGroupText className="ml-auto">52% used</InputGroupText>
          <InputGroupButton variant="default" className="rounded-full" size="icon-xs" aria-label="Send">
            <ArrowUp />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput defaultValue="@shadcn" aria-label="Username" />
        <InputGroupAddon align="inline-end">
          <CircleCheck />
        </InputGroupAddon>
      </InputGroup>
    </Row>
  )
}

function IconRow() {
  return (
    <Row>
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Mail />
        </InputGroupAddon>
        <InputGroupInput placeholder="Enter your email" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <CreditCard />
        </InputGroupAddon>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon align="inline-end">
          <Check />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Star />
        </InputGroupAddon>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon align="inline-end">
          <Info />
        </InputGroupAddon>
      </InputGroup>
    </Row>
  )
}

function TextRow() {
  return (
    <Row>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="0.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter your username" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>@company.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Enter your message" />
        <InputGroupAddon align="block-end">
          <InputGroupText className="ml-auto">120 characters left</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Row>
  )
}

function ButtonRow() {
  return (
    <Row>
      <InputGroup>
        <InputGroupInput defaultValue="https://x.com/shadcn" readOnly aria-label="Profile URL" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Copy">
            <Copy />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupButton size="icon-xs" aria-label="Info">
            <Info />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupInput placeholder="https://" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Favorite">
            <Star />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput defaultValue="https://x.com/shadcn" readOnly aria-label="Profile URL" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="sm">Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Row>
  )
}

function TooltipRow() {
  return (
    <Row>
      <InputGroup>
        <InputGroupInput placeholder="Enter password" type="password" />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton size="icon-xs" aria-label="Help">
                <Info />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>Password must be at least 8 characters</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Your email address" />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton size="icon-xs" aria-label="Help">
                <CircleHelp />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>We&apos;ll use this to send you notifications</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton size="icon-xs" aria-label="Help">
                <CircleHelp />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>Click for help with API keys</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
        <InputGroupInput placeholder="Your email address" />
      </InputGroup>
    </Row>
  )
}

function SpinnerRow() {
  return (
    <Row>
      <InputGroup>
        <InputGroupInput placeholder="Searching..." />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
        <InputGroupInput placeholder="Processing..." />
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Saving changes..." />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Saving...</InputGroupText>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
        <InputGroupInput placeholder="Refreshing data..." />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Please wait...</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Row>
  )
}

function DropdownRow() {
  return (
    <Row>
      <InputGroup>
        <InputGroupInput placeholder="Enter file name" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton size="icon-xs" aria-label="More options">
                <Ellipsis />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Copy path</DropdownMenuItem>
              <DropdownMenuItem>Open location</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter search query" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton size="sm">
                Search In... <ChevronDown />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Blog Posts</DropdownMenuItem>
              <DropdownMenuItem>Changelog</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </Row>
  )
}

function CodeEditorTextarea() {
  return (
    <Row>
      <InputGroup>
        <InputGroupAddon align="block-start" className="border-b">
          <FileCode />
          <InputGroupText className="font-medium text-foreground">
            script.js
          </InputGroupText>
          <InputGroupButton size="icon-xs" className="ml-auto" aria-label="Refresh">
            <RefreshCcw />
          </InputGroupButton>
          <InputGroupButton size="icon-xs" aria-label="Copy">
            <Copy />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupTextarea
          defaultValue="console.log('Hello, world!');"
          className="min-h-24 font-mono"
          aria-label="Code editor"
        />
        <InputGroupAddon align="block-end" className="border-t">
          <InputGroupText>Line 1, Column 1</InputGroupText>
          <InputGroupButton variant="default" size="sm" className="ml-auto">
            Run <CornerDownLeft />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Row>
  )
}

function LabelRow() {
  return (
    <Row>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>@</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="shadcn" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="block-start" className="border-b">
          <InputGroupText className="font-medium text-foreground">
            Email
          </InputGroupText>
          <InputGroupButton size="icon-xs" className="ml-auto" aria-label="Info">
            <Info />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupInput placeholder="shadcn@vercel.com" />
      </InputGroup>
    </Row>
  )
}

function ButtonGroupRow() {
  return (
    <Row>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput aria-label="Website domain" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Link">
            <Link2 />
          </InputGroupButton>
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Row>
  )
}

function AutoresizeTextarea() {
  return (
    <Row>
      <InputGroup>
        <InputGroupTextarea placeholder="Autoresize textarea..." />
        <InputGroupAddon align="block-end">
          <InputGroupButton variant="default" size="sm" className="ml-auto">
            Submit
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Row>
  )
}

export function InputGroupDemo() {
  return (
    <TooltipProvider>
      <div className="flex w-full flex-col gap-6">
        <InputGroupRow />
        <Separator />
        <IconRow />
        <Separator />
        <TextRow />
        <Separator />
        <ButtonRow />
        <Separator />
        <TooltipRow />
        <Separator />
        <SpinnerRow />
        <Separator />
        <DropdownRow />
        <Separator />
        <CodeEditorTextarea />
        <Separator />
        <LabelRow />
        <Separator />
        <ButtonGroupRow />
        <Separator />
        <AutoresizeTextarea />
      </div>
    </TooltipProvider>
  )
}
