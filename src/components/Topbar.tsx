"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavItem {
  href: string;
  label: string;
  isActive: boolean;
}

const TopbarButtons = () => (
  <>
    <Button variant="outline" asChild>
      <Link href="/signup">Sign Up</Link>
    </Button>
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  </>
);

const DesktopTopbar = ({ navItems }: { navItems: NavItem[] }) => (
  <NavigationMenu className="w-full max-w-full h-14  flex items-center justify-between px-5 border-b">
    <NavigationMenuList>
      <NavigationMenuItem>
        <Link
          href="/"
          className={cn(
            poppins.className,
            "text-primary text-2xl font-bold outline-none select-none"
          )}
        >
          ShopEZ
        </Link>
      </NavigationMenuItem>
    </NavigationMenuList>

    <NavigationMenuList className="flex-wrap gap-1">
      {navItems.map((item) => (
        <NavigationMenuItem key={item.href}>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href={item.href}
              className={cn(
                poppins.className,
                item.isActive ? "text-white bg-sidebar-accent" : "text-gray-300"
              )}
              draggable={false}
            >
              {item.label}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>

    <NavigationMenuList>
      <NavigationMenuItem className="flex gap-3">
        <TopbarButtons />
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

const MobileMenu = ({ navItems }: { navItems: NavItem[] }) => (
  <Sheet>
    <SheetTrigger asChild className="absolute right-2.5 top-2.5">
      <Button variant="outline" size="icon-lg">
        <Menu />
      </Button>
    </SheetTrigger>

    <SheetContent
      side="right"
      aria-describedby={"blah"}
      className="flex flex-col justify-between"
    >
      <div>
        <SheetHeader>
          <SheetTitle
            className={cn(
              poppins.className,
              "text-primary text-2xl font-bold select-none"
            )}
          >
            ShopEZ
          </SheetTitle>
          <SheetDescription>An Easy Ecomm App.</SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col gap-4 mt-6 px-2.5">
          {navItems.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  poppins.className,
                  "p-2.5 text-lg font-medium hover:text-primary transition-colors text-center rounded-lg",
                  item.isActive
                    ? "text-white bg-sidebar-accent"
                    : "text-gray-300"
                )}
                draggable={false}
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </div>

      <SheetFooter className="flex flex-col gap-3 mt-6">
        <TopbarButtons />
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

const Topbar = () => {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const navItems = useMemo<NavItem[]>(
    () => [
      { href: "/", label: "Home", isActive: pathname === "/" },
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

  return isMobile ? (
    <MobileMenu navItems={navItems} />
  ) : (
    <DesktopTopbar navItems={navItems} />
  );
};

export default Topbar;
