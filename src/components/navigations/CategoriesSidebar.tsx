"use client";

import { ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { usePathname } from "next/navigation";

interface CategoriesSheetProps {
  trigger?: React.ReactNode;
}

const CategoriesSidebar = ({ trigger }: CategoriesSheetProps) => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.categories.getMany.queryOptions()
  );
  const [open, setOpen] = useState<boolean>(false);
  const [openSubcategories, setOpenSubcategories] = useState<{
    [key: string]: boolean;
  }>({});
  const pathname = usePathname();

  const toggleSubcategory = (categoryId: string) => {
    setOpenSubcategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  const isCategoryActive = (category: any) => {
    if (pathname === `/${category.slug}`) {
      return true;
    }

    if (category.subcategories && category.subcategories.length > 0) {
      return category.subcategories.some(
        (sub: any) => pathname === `/${category.slug}/${sub.slug}`
      );
    }

    return false;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="w-full justify-between">
            Categories
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle>Browse Categories</SheetTitle>
          <SheetDescription>Explore our product categories</SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="space-y-2 px-4 py-4">
            <Link
              prefetch={false}
              href="/"
              onClick={handleLinkClick}
              className={`flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent ${
                pathname === "/" ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              All Categories
            </Link>

            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            )}

            {isError && (
              <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                Error loading categories. Please try again.
              </div>
            )}

            {data &&
              data.map((category: any) => {
                const hasSubcategories =
                  category.subcategories && category.subcategories.length > 0;
                const isActive = isCategoryActive(category);

                if (!hasSubcategories) {
                  return (
                    <Link
                      prefetch={false}
                      key={category.id}
                      href={`/${category.slug}`}
                      onClick={handleLinkClick}
                      className={`flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent ${
                        isActive ? "bg-primary text-primary-foreground" : ""
                      }`}
                    >
                      {category.name}
                    </Link>
                  );
                }

                return (
                  <Collapsible
                    key={category.id}
                    open={openSubcategories[category.id] ?? false}
                    onOpenChange={() => toggleSubcategory(category.id)}
                    className="space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <Link
                        prefetch={false}
                        href={`/${category.slug}`}
                        onClick={handleLinkClick}
                        className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent ${
                          isActive ? "bg-accent text-white" : "text-gray-200"
                        }`}
                      >
                        {category.name}
                      </Link>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 p-0"
                        >
                          <ChevronRight
                            className={`h-4 w-4 transition-transform duration-200 ${
                              openSubcategories[category.id] ? "rotate-90" : ""
                            }`}
                          />
                        </Button>
                      </CollapsibleTrigger>
                    </div>

                    <CollapsibleContent>
                      <div className="ml-4 space-y-1 border-l pl-4">
                        {category.subcategories.map((subcategory: any) => {
                          const isSubActive =
                            pathname ===
                            `/${category.slug}/${subcategory.slug}`;
                          return (
                            <Link
                              prefetch={false}
                              key={subcategory.id}
                              href={`/${category.slug}/${subcategory.slug}`}
                              onClick={handleLinkClick}
                              className={`flex items-center rounded-lg px-4 py-2 text-sm transition-colors hover:bg-accent ${
                                isSubActive
                                  ? "bg-accent text-white font-medium"
                                  : "text-gray-200"
                              }`}
                            >
                              {subcategory.name}
                            </Link>
                          );
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
          </div>
          <SheetFooter></SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CategoriesSidebar;
