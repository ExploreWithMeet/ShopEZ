import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavItem } from "@/types/nav";
import Link from "next/link";

const SidebarPermanentLinks = ({ navItems }: { navItems: NavItem[] }) => {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Main</SidebarGroupLabel>
        <SidebarMenu className="mt-5">
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
