import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../ui/sidebar";
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

const SidebarChangableLinks = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.categories.getMany.queryOptions()
  );
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(true);
  const [openSubcategories, setOpenSubcategories] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSubcategory = (categoryId: string) => {
    setOpenSubcategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Shop By</SidebarGroupLabel>
      <SidebarMenu className="mt-5">
        <Collapsible
          key="categories-collapse"
          asChild
          open={isCategoriesOpen}
          onOpenChange={setIsCategoriesOpen}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Each Categories">
                <span>Categories</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/">
                      <span>All Categories</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                {isLoading && (
                  <SidebarMenuSubItem key="loading-categories">
                    <SidebarMenuSubButton asChild>
                      <span>Loading...</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                )}
                {isError && (
                  <SidebarMenuSubItem key="error-categories">
                    <SidebarMenuSubButton asChild className="text-red-600">
                      <span>Error Fetching</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                )}
                {data &&
                  data?.map((category: any) => {
                    const hasSubcategories =
                      category.subcategories &&
                      category.subcategories.length > 0;

                    if (!hasSubcategories) {
                      return (
                        <SidebarMenuSubItem key={category.id}>
                          <SidebarMenuSubButton asChild>
                            <Link href="/">
                              <span>{category.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    }

                    return (
                      <Collapsible
                        key={category.id}
                        open={openSubcategories[category.id]}
                        onOpenChange={() => toggleSubcategory(category.id)}
                        className="group/subcollapsible"
                      >
                        <SidebarMenuSubItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuSubButton>
                              <span>{category.name}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/subcollapsible:rotate-90" />
                            </SidebarMenuSubButton>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {category.subcategories.map(
                                (subcategory: any) => (
                                  <SidebarMenuSubItem key={subcategory.id}>
                                    <SidebarMenuSubButton asChild>
                                      <Link href="/">
                                        <span>{subcategory.name}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                )
                              )}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuSubItem>
                      </Collapsible>
                    );
                  })}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default SidebarChangableLinks;
