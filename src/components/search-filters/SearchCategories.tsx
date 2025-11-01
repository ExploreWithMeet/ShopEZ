"use client";
import { Category } from "@/payload-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

interface ISubCategoriesProps {
  category: Category;
  isActive: boolean;
  //   onCheckedChange: (checked: boolean) => void;
}

const SearchCategoriesDropDown = ({
  category,
  isActive,
  //   onCheckedChange,
}: ISubCategoriesProps) => {
  return (
    <DropdownMenuItem
      //   onClick={() => onCheckedChange(!isActive)}
      asChild
    >
      <Button
        variant="outline"
        asChild
        className={cn(isActive ? "bg-neutral-800" : "", "hover:bg-neutral-800")}
      >
        <Link href="/">{category.name}</Link>
      </Button>
    </DropdownMenuItem>
  );
};

const SearchCategories = ({ data }: { data: Category[] }) => {
  return (
    <div className="flex gap-2.5">
      {data.map((category: any) => {
        if (!category.subcategories || category.subcategories.length === 0) {
          return (
            <DropdownMenu key={category.id}>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" asChild>
                  <Link href="/" key={category.slug}>
                    {category.name}
                  </Link>
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
          );
        } else {
          return (
            <DropdownMenu key={category.id}>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">{category.name}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col gap-2">
                {category.subcategories.map((subcategory: any) => {
                  return (
                    <SearchCategoriesDropDown
                      category={subcategory}
                      isActive={false}
                      key={subcategory.slug}
                    />
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }
      })}
    </div>
  );
};

export default SearchCategories;
