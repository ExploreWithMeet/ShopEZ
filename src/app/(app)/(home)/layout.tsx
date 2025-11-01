import configPromise from "@payload-config";
import { getPayload } from "payload";
import { SearchFilters } from "@/components/search-filters";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigations/AppSidebar";
import AppTopbar from "@/components/navigations/AppTopbar";
import { Category } from "@/payload-types";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: "name",
  });

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc: Category) => ({
      ...doc,
      subcategories: undefined,
    })),
  }));

  return (
    <div className="grid w-full min-h-s">
      <SidebarProvider>
        <AppSidebar data={formattedData} />
        <SidebarInset>
          <AppTopbar />
          <SearchFilters data={formattedData} />
          <div className="">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
