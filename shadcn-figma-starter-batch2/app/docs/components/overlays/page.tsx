import type { Metadata } from "next"
import { PageHeader } from "@/components/docs/page-header"
import { Showcase } from "@/components/docs/showcase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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

export const metadata: Metadata = { title: "Overlays" }

export default function OverlaysPage() {
  return (
    <>
      <PageHeader eyebrow="Components" title="Overlays" description="Modal and floating surfaces — dialogs, sheets, drawers, popovers, menus and the command palette." />

      <Showcase name="Dialog" source="components/ui/dialog.tsx" tokens={["popover", "background-color", "border"]}>
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
      </Showcase>

      <Showcase name="Alert Dialog" source="components/ui/alert-dialog.tsx" tokens={["popover", "destructive", "muted"]}>
        <AlertDialog>
          <AlertDialogTrigger asChild><Button variant="outline">Delete account</Button></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone and will permanently delete your account.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Showcase>

      <Showcase name="Sheet" source="components/ui/sheet.tsx" tokens={["background", "border", "muted-foreground"]}>
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
      </Showcase>

      <Showcase name="Drawer" source="components/ui/drawer.tsx" tokens={["background", "border", "muted-foreground"]}>
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
      </Showcase>

      <Showcase name="Popover" source="components/ui/popover.tsx" tokens={["popover", "popover-foreground", "border"]}>
        <Popover>
          <PopoverTrigger asChild><Button variant="outline">Open popover</Button></PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="flex flex-col gap-2">
              <h4 className="font-medium">Dimensions</h4>
              <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
            </div>
          </PopoverContent>
        </Popover>
      </Showcase>

      <Showcase name="Hover Card" source="components/ui/hover-card.tsx" tokens={["popover", "popover-foreground", "border"]}>
        <HoverCard>
          <HoverCardTrigger asChild><Button variant="link">@nextjs</Button></HoverCardTrigger>
          <HoverCardContent className="w-80">
            <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
          </HoverCardContent>
        </HoverCard>
      </Showcase>

      <Showcase name="Tooltip" source="components/ui/tooltip.tsx" tokens={["primary", "primary-foreground"]}>
        <Tooltip>
          <TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger>
          <TooltipContent>Add to library</TooltipContent>
        </Tooltip>
      </Showcase>

      <Showcase name="Dropdown Menu" source="components/ui/dropdown-menu.tsx" tokens={["popover", "accent", "border"]}>
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
      </Showcase>

      <Showcase name="Context Menu" source="components/ui/context-menu.tsx" tokens={["popover", "accent", "border"]}>
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
      </Showcase>

      <Showcase name="Menubar" source="components/ui/menubar.tsx" tokens={["background", "accent", "border"]}>
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
      </Showcase>

      <Showcase name="Command" source="components/ui/command.tsx" tokens={["popover", "accent", "muted-foreground"]}>
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
      </Showcase>
    </>
  )
}
