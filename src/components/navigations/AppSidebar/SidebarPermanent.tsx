import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavItem } from "@/types";
import Link from "next/link";

const SidebarPermanentLinks = ({ navItems }: { navItems: NavItem[] }) => {
  return (
    <>
      <SidebarGroup className="mt-5">
        <SidebarGroupLabel>Main</SidebarGroupLabel>
        <SidebarMenu>
          {navItems.map((item, idx) => {
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className={
                      item.isActive
                        ? "text-white bg-sidebar-accent"
                        : "text-gray-200"
                    }
                  >
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};

export default SidebarPermanentLinks;
