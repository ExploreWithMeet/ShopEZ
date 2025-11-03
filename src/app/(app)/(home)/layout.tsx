import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigations/AppSidebar";
import AppTopbar from "@/components/navigations/AppTopbar";
import SearchInput from "@/components/search-filters/SearchInput";

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
          <SearchInput />
          <div>{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
