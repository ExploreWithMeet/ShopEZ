"use client";
import { usePathname } from "next/navigation";
import {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { NavItem } from "@/types";
import { MenuIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import TopbarEndItems from "./TopbarEndItems";

interface Props extends HTMLAttributes<HTMLElement> {}

const Topbar = forwardRef<HTMLElement, Props>(({ ...props }, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const checkWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setIsMobile(width < 800);
      }
    };
    checkWidth();
    const resizeObserver = new ResizeObserver(checkWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const combinedRef = useCallback(
    (node: HTMLElement | null) => {
      containerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

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
    <header
      ref={combinedRef}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 px-4 md:px-6 **:no-underline"
      {...props}
    >
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                  variant="ghost"
                  size="icon"
                >
                  <MenuIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-32 p-2">
                <NavigationMenu className="max-w-none">
                  <NavigationMenuList className="flex-col items-start gap-1">
                    {navItems.map((navItem, idx) => {
                      return (
                        <NavigationMenuItem
                          key={navItem.href}
                          className="w-full"
                        >
                          <Link
                            href={navItem.href}
                            prefetch={false}
                            className={cn(
                              "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer no-underline",
                              navItem.isActive
                                ? "bg-accent text-accent-foreground"
                                : "text-foreground/80"
                            )}
                          >
                            {navItem.label}
                          </Link>
                        </NavigationMenuItem>
                      );
                    })}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          )}

          <div className="flex items-center gap-6">
            <Link
              prefetch={false}
              href="/"
              className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
            >
              <span className="hidden font-bold text-xl sm:inline-block">
                ShopEZ
              </span>
            </Link>
            {!isMobile && (
              <NavigationMenu className="flex">
                <NavigationMenuList className="gap-1">
                  {navItems.map((navItem) => (
                    <NavigationMenuItem key={navItem.href}>
                      <Link
                        prefetch={false}
                        href={navItem.href}
                        className={cn(
                          "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline",
                          navItem.isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground/80 hover:text-foreground"
                        )}
                      >
                        {navItem.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>
        </div>
        <TopbarEndItems />
      </div>
    </header>
  );
});

export default Topbar;
