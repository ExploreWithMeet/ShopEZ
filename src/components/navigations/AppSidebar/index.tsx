"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../ui/sidebar";
import { Command } from "lucide-react";
import SidebarChangableLinks from "./SidebarChangeable";
import SidebarPermanentLinks from "./SidebarPermanent";
import SidebarFooterItems from "./SidebarFooterItems";
import { NavItem } from "@/types";
import { useMemo } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname();
  const { isMobile } = useSidebar();
  const navItems = useMemo<NavItem[]>(
    () => [
      { href: "/", label: "Explore", isActive: pathname === "/" },
      { href: "/about", label: "About", isActive: pathname === "/about" },
      {
        href: "/features",
        label: "Features",
        isActive: pathname === "/features",
      },
      { href: "/pricing", label: "Pricing", isActive: pathname === "/pricing" },
      { href: "/contact", label: "Contact", isActive: pathname === "/contact" },
    ],
    [pathname]
  );

  return (
    <Sidebar
      {...props}
      variant={isMobile ? "floating" : "inset"}
      className={cn(
        poppins.className,
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      )}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-5" />
                </div>
                <div className="grid flex-1 text-3xl">
                  <span className="font-medium text-pretty text-primary">
                    ShopEZ
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarPermanentLinks navItems={navItems} />
        <SidebarChangableLinks />
      </SidebarContent>

      <SidebarFooter>
        <SidebarFooterItems />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
