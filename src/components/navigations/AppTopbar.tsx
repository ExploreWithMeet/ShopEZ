"use client";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";

const AppTopbar = (): React.JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);

    const items = segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");

      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return {
        label,
        href,
        isLast: index === segments.length - 1,
      };
    });

    return items;
  }, [pathname]);

  const visibleBreadcrumbs = useMemo(() => {
    if (breadcrumbs.length <= 3) {
      return { visible: breadcrumbs, hidden: [] };
    }

    return {
      visible: [breadcrumbs[0], ...breadcrumbs.slice(-2)],
      hidden: breadcrumbs.slice(1, -2),
    };
  }, [breadcrumbs]);

  if (pathname === "/") {
    return (
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="ml-1" size="lg" />
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-4"
          />
          <ButtonGroup className="hidden sm:flex">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Go Back"
              className="cursor-pointer"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon size="10" />
            </Button>
          </ButtonGroup>
        </div>
      </header>
    );
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="ml-1" size="lg" />
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-4"
        />
        <ButtonGroup className="hidden sm:flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Go Back"
            className="cursor-pointer"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon size="10" />
          </Button>
        </ButtonGroup>
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {/* Home Link */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {breadcrumbs.length > 0 && <BreadcrumbSeparator />}

            {visibleBreadcrumbs.hidden.length > 0 && (
              <>
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {visibleBreadcrumbs.hidden.map((item, index) => (
                        <DropdownMenuItem key={index} asChild>
                          <Link href={item.href}>{item.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}

            {visibleBreadcrumbs.visible.map((item, index) => {
              const isLastVisible =
                index === visibleBreadcrumbs.visible.length - 1;

              return (
                <div key={item.href} className="flex items-center gap-2">
                  <BreadcrumbItem className="hidden md:block">
                    {item.isLast ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLastVisible && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default AppTopbar;
