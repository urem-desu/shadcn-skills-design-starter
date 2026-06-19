"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function KbdKeys() {
  return (
    <div className="flex flex-col gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  )
}

function KbdInline() {
  return (
    <p className="text-muted-foreground text-sm">
      Use{" "}
      <KbdGroup>
        <Kbd>Ctrl + B</Kbd>
        <Kbd>Ctrl + K</Kbd>
      </KbdGroup>{" "}
      to open the command palette
    </p>
  )
}

function KbdButtons() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        Accept <Kbd>⏎</Kbd>
      </Button>
      <Button variant="outline" size="sm">
        Cancel <Kbd>Esc</Kbd>
      </Button>
    </div>
  )
}

function KbdTooltip() {
  return (
    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Save
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Save Changes <Kbd>S</Kbd>
        </TooltipContent>
      </Tooltip>
      <Button variant="outline" size="sm">
        Print
      </Button>
    </ButtonGroup>
  )
}

function KbdInputGroup() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}

export function KbdDemo() {
  return (
    <TooltipProvider>
      <div className="flex w-full max-w-md flex-col gap-6">
        <KbdKeys />
        <Separator />
        <KbdInline />
        <Separator />
        <KbdButtons />
        <Separator />
        <KbdTooltip />
        <Separator />
        <KbdInputGroup />
      </div>
    </TooltipProvider>
  )
}
