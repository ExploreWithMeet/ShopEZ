"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavItem } from "@/types";
import Link from "next/link";
import { generateTenantURL } from "@/lib/utils";

const TenantTopbar = ({ slug }: { slug: string }) => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useSuspenseQuery(
    trpc.tenants.getOne.queryOptions({ slug })
  );
  console.log(data);
  const pathname = usePathname();
  const tenantNavItems = useMemo<NavItem[]>(
    () => [
      {
        href: "/",
        label: "Explore",
        isActive: pathname === `/tenants/${data.slug}`,
      },
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 md:px-6 **:no-underline">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-6">
            <Link href={`/tenants/${data.slug}`}>
              <span className="hidden font-bold text-xl sm:inline-block">
                {data.name}
              </span>
            </Link>

            <NavigationMenu className="flex">
              <NavigationMenuList className="gap-1"></NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TenantTopbar;
