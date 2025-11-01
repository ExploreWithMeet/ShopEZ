"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import { Button } from "../ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { Command } from "lucide-react";
import SidebarUser from "./SidebarUser";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

interface NavItem {
  href: string;
  label: string;
  isActive: boolean;
}

const SidebarFooterItems = ({ isLogin }: { isLogin: boolean }) => {
  return (
    <>
      {isLogin ? (
        <SidebarUser
          user={{
            name: "Meet Sanghvi",
            email: "meetsanghvi2347@gmail.com",
            avatar: "",
          }}
        />
      ) : (
        <>
          <Button variant="outline" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </>
      )}
    </>
  );
};

const SidebarItems = ({ navItems }: { navItems: NavItem[] }) => {
  return (
    <>
      {/* <SidebarGroup> */}
      {/* <SidebarGroupLabel> */}
      <SidebarMenu className={cn("mt-5")}>
        {navItems.map((item, idx) => {
          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild size="lg">
                <Link
                  href={item.href}
                  className={cn(
                    item.isActive
                      ? "text-white bg-sidebar-accent"
                      : "text-gray-200"
                  )}
                >
                  {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
      {/* </SidebarGroupLabel> */}
      {/* </SidebarGroup> */}
    </>
  );
};

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
      className={cn(poppins.className)}
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
        <SidebarItems navItems={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterItems isLogin={true} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
