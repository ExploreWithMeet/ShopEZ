"use client";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import SearchDialog from "./SearchDialog";
import SortBy from "./SortBy";
import { Button } from "../ui/button";

interface SearchInputProps {
  disabled?: boolean;
}

const SearchInput = ({ disabled }: SearchInputProps) => {
  const products = ["asd"];
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 w-full max-w-full">
        <div className="relative w-full">
          <SearchIcon
            size="20"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
          />
          <Input
            className={cn(
              "py-6 border-none px-10 focus-visible:ring-muted cursor-pointer"
            )}
            placeholder="Search Products..."
            disabled={disabled}
            onClick={() => setOpen(true)}
            readOnly
          />
        </div>
      </div>

      <div className="flex gap-5">
        <Button size="sm" className="cursor-pointer">
          Filter{" "}
        </Button>
        <SortBy />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col p-0">
          <DialogHeader className={cn("pt-5 px-5")}>
            <DialogTitle>Search Products</DialogTitle>
          </DialogHeader>
          <SearchDialog products={products} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchInput;
