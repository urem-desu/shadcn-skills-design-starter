import type { Metadata } from "next"
import { PageHeader } from "@/components/docs/page-header"
import { Showcase } from "@/components/docs/showcase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
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

export const metadata: Metadata = { title: "Navigation" }

export default function NavigationPage() {
  return (
    <>
      <PageHeader eyebrow="Components" title="Navigation" description="Moving between views — tabs, breadcrumbs, pagination and navigation menus." />

      <Showcase name="Tabs" source="components/ui/tabs.tsx" tokens={["muted", "background", "foreground"]}>
        <Tabs defaultValue="account" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="pt-3 text-sm text-muted-foreground">Make changes to your account here.</TabsContent>
          <TabsContent value="password" className="pt-3 text-sm text-muted-foreground">Change your password here.</TabsContent>
        </Tabs>
      </Showcase>

      <Showcase name="Breadcrumb" source="components/ui/breadcrumb.tsx" tokens={["foreground", "muted-foreground"]}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Showcase>

      <Showcase name="Pagination" source="components/ui/pagination.tsx" tokens={["accent", "border", "foreground"]}>
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
      </Showcase>

      <Showcase name="Navigation Menu" source="components/ui/navigation-menu.tsx" tokens={["popover", "accent", "muted-foreground"]}>
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
      </Showcase>
    </>
  )
}
