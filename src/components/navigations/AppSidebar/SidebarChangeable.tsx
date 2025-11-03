import { BookmarkCheck } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";
import Link from "next/link";
import CategoriesSidebar from "./CategoriesSidebar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const SidebarChangableLinks = () => {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  return (
    <>
      {session.data?.user && (
        <SidebarGroup>
          <SidebarGroupLabel>For You</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/Bookmarks">
                  <BookmarkCheck />
                  Bookmarks
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      )}

      <SidebarGroup>
        <SidebarGroupLabel>Shop By</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <CategoriesSidebar />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};

export default SidebarChangableLinks;
