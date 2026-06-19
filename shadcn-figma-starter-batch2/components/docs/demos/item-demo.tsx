"use client"

import * as React from "react"
import {
  BadgeCheck,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Plus,
  ShieldAlert,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"

function BasicItems() {
  return (
    <ItemGroup className="w-full max-w-lg gap-4">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Basic Item</ItemTitle>
          <ItemDescription>A simple item with title and description.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="outline" asChild>
        <a href="#">
          <ItemMedia>
            <BadgeCheck className="size-5" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Your profile has been verified.</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRight className="size-4" />
          </ItemActions>
        </a>
      </Item>
    </ItemGroup>
  )
}

function VariantItems() {
  return (
    <ItemGroup className="w-full max-w-lg gap-4">
      <Item variant="default">
        <ItemContent>
          <ItemTitle>Default Variant</ItemTitle>
          <ItemDescription>Standard styling with subtle background and borders.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">Open</Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline Variant</ItemTitle>
          <ItemDescription>Outlined style with clear borders and transparent background.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">Open</Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted Variant</ItemTitle>
          <ItemDescription>Subdued appearance with muted colors for secondary content.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">Open</Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  )
}

function SizeItems() {
  return (
    <ItemGroup className="w-full max-w-lg gap-4">
      <Item variant="outline" size="default">
        <ItemContent>
          <ItemTitle>Basic Item</ItemTitle>
          <ItemDescription>A simple item with title and description.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm">
        <ItemMedia>
          <BadgeCheck className="size-5" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Your profile has been verified.</ItemTitle>
        </ItemContent>
        <ItemActions>
          <ChevronRight className="size-4" />
        </ItemActions>
      </Item>
    </ItemGroup>
  )
}

function IconItem() {
  return (
    <Item variant="outline" className="w-full max-w-lg">
      <ItemMedia variant="icon">
        <ShieldAlert />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Security Alert</ItemTitle>
        <ItemDescription>New login detected from unknown device.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">Review</Button>
      </ItemActions>
    </Item>
  )
}

function AvatarItems() {
  return (
    <ItemGroup className="w-full max-w-lg gap-4">
      <Item variant="outline">
        <ItemMedia>
          <Avatar>
            <AvatarImage src="https://github.com/evilrabbit.png" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Evil Rabbit</ItemTitle>
          <ItemDescription>Last seen 5 months ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="icon" className="size-8 rounded-full" aria-label="Add">
            <Plus />
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia>
          <AvatarGroup>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/maxleiter.png" />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/evilrabbit.png" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>No Team Members</ItemTitle>
          <ItemDescription>Invite your team to collaborate on this project.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">Invite</Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  )
}

const tracks = [
  { title: "Midnight City Lights", artist: "Electric Nights", album: "Neon Dreams", duration: "3:45" },
  { title: "Coffee Shop Conversations", artist: "Urban Stories", album: "The Morning Brew", duration: "4:05" },
  { title: "Digital Rain", artist: "Binary Beats", album: "Cyber Symphony", duration: "3:30" },
]

function ImageItems() {
  return (
    <ItemGroup className="w-full max-w-lg gap-4">
      {tracks.map((t) => (
        <Item key={t.title} variant="outline">
          <ItemMedia variant="image">
            <div className="size-full bg-muted" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              {t.title}{" "}
              <span className="text-muted-foreground font-normal">- {t.artist}</span>
            </ItemTitle>
            <ItemDescription>{t.album}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <span className="text-muted-foreground text-sm tabular-nums">{t.duration}</span>
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  )
}

const people = [
  { user: "shadcn", email: "shadcn@vercel.com", img: "https://github.com/shadcn.png", fallback: "CN" },
  { user: "maxleiter", email: "maxleiter@vercel.com", img: "https://github.com/maxleiter.png", fallback: "ML" },
  { user: "evilrabbit", email: "evilrabbit@vercel.com", img: "https://github.com/evilrabbit.png", fallback: "ER" },
]

function GroupItems() {
  return (
    <ItemGroup className="w-full max-w-lg rounded-lg border">
      {people.map((p, i) => (
        <React.Fragment key={p.user}>
          {i > 0 && <ItemSeparator />}
          <Item>
            <ItemMedia>
              <Avatar>
                <AvatarImage src={p.img} />
                <AvatarFallback>{p.fallback}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{p.user}</ItemTitle>
              <ItemDescription>{p.email}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="ghost" size="icon" className="size-8 rounded-full" aria-label="Add">
                <Plus />
              </Button>
            </ItemActions>
          </Item>
        </React.Fragment>
      ))}
    </ItemGroup>
  )
}

const models = [
  { name: "v0-1.5-sm", desc: "Everyday tasks and UI generation." },
  { name: "v0-1.5-lg", desc: "Advanced thinking or reasoning." },
  { name: "v0-2.0-mini", desc: "Open Source model for everyone." },
]

function HeaderItems() {
  return (
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-3">
      {models.map((m) => (
        <Item key={m.name} variant="outline" className="flex-col">
          <ItemHeader>
            <div className="aspect-square w-full rounded-md bg-muted" />
          </ItemHeader>
          <ItemContent>
            <ItemTitle>{m.name}</ItemTitle>
            <ItemDescription>{m.desc}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}

function LinkItems() {
  return (
    <ItemGroup className="w-full max-w-lg gap-4">
      <Item variant="outline" asChild>
        <a href="#">
          <ItemContent>
            <ItemTitle>Visit our documentation</ItemTitle>
            <ItemDescription>Learn how to get started with our components.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRight className="size-4" />
          </ItemActions>
        </a>
      </Item>
      <Item variant="outline" asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <ItemContent>
            <ItemTitle>External resource</ItemTitle>
            <ItemDescription>Opens in a new tab with security attributes.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ExternalLink className="size-4" />
          </ItemActions>
        </a>
      </Item>
    </ItemGroup>
  )
}

function PeopleDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          Select
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]" align="start">
        {people.map((p) => (
          <DropdownMenuItem key={p.user} className="p-0">
            <Item size="sm" className="w-full">
              <ItemMedia>
                <Avatar className="size-6">
                  <AvatarImage src={p.img} />
                  <AvatarFallback>{p.fallback}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{p.user}</ItemTitle>
                <ItemDescription>{p.email}</ItemDescription>
              </ItemContent>
            </Item>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function DropdownItems() {
  return (
    <div className="flex w-full max-w-lg gap-4">
      <PeopleDropdown />
      <PeopleDropdown />
    </div>
  )
}

export function ItemDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      <BasicItems />
      <Separator />
      <VariantItems />
      <Separator />
      <SizeItems />
      <Separator />
      <IconItem />
      <Separator />
      <AvatarItems />
      <Separator />
      <ImageItems />
      <Separator />
      <GroupItems />
      <Separator />
      <HeaderItems />
      <Separator />
      <LinkItems />
      <Separator />
      <DropdownItems />
    </div>
  )
}
