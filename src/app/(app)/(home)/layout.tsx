import { SearchFilters } from "@/components/search-filters";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigations/AppSidebar";
import AppTopbar from "@/components/navigations/AppTopbar";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid w-full min-h-s">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppTopbar />
          <SearchFilters />
          <div className="">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
