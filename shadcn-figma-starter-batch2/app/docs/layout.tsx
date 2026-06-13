import { DocsHeader } from "@/components/docs/docs-header"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <div className="min-h-svh bg-background">
        <DocsHeader />
        <div className="mx-auto flex w-full max-w-[100rem]">
          <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-60 shrink-0 border-r border-sidebar-border bg-sidebar md:block">
            <ScrollArea className="h-full">
              <DocsSidebar />
            </ScrollArea>
          </aside>
          <main className="min-w-0 flex-1 px-4 py-8 md:px-10">
            <div className="mx-auto flex max-w-4xl flex-col gap-8">{children}</div>
          </main>
        </div>
        <Toaster />
      </div>
    </TooltipProvider>
  )
}
