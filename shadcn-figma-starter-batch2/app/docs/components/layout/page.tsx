import type { Metadata } from "next"
import { Home, Inbox, Search, Settings } from "lucide-react"
import { PageHeader } from "@/components/docs/page-header"
import { Showcase } from "@/components/docs/showcase"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
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

export const metadata: Metadata = { title: "Layout" }

const sidebarItems = [
  { title: "Home", icon: Home },
  { title: "Inbox", icon: Inbox },
  { title: "Search", icon: Search },
  { title: "Settings", icon: Settings },
]

const tags = Array.from({ length: 12 }).map((_, i) => `Tag ${i + 1}`)

export default function LayoutPage() {
  return (
    <>
      <PageHeader eyebrow="Components" title="Layout" description="Structural primitives — aspect ratio, separators, scroll areas, resizable panels and the app sidebar." />

      <Showcase name="Aspect Ratio" source="components/ui/aspect-ratio.tsx" tokens={["muted", "border"]}>
        <div className="w-full max-w-sm">
          <AspectRatio ratio={16 / 9} className="rounded-lg border bg-muted">
            <div className="flex size-full items-center justify-center text-sm text-muted-foreground">16 / 9</div>
          </AspectRatio>
        </div>
      </Showcase>

      <Showcase name="Separator" source="components/ui/separator.tsx" tokens={["border"]}>
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
      </Showcase>

      <Showcase name="Scroll Area" source="components/ui/scroll-area.tsx" tokens={["border", "muted-foreground"]}>
        <ScrollArea className="h-48 w-64 rounded-md border">
          <div className="flex flex-col gap-2 p-4">
            <p className="text-sm font-medium">Tags</p>
            {tags.map((t) => (
              <div key={t} className="text-sm text-muted-foreground">{t}</div>
            ))}
          </div>
        </ScrollArea>
      </Showcase>

      <Showcase name="Resizable" source="components/ui/resizable.tsx" tokens={["border", "muted"]}>
        <ResizablePanelGroup orientation="horizontal" className="h-40 max-w-md rounded-lg border">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-4 text-sm">One</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-4 text-sm">Two</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Showcase>

      <Showcase name="Sidebar" source="components/ui/sidebar.tsx" tokens={["sidebar", "sidebar-foreground", "sidebar-accent", "sidebar-border"]}>
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
      </Showcase>
    </>
  )
}
