"use client";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import SearchDialog from "./SearchDialog";

const SearchInput = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center px-4 sm:px-8 pt-4 pb-1 gap-2 w-full max-w-full">
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
            onClick={() => setOpen(true)}
            readOnly
          />
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col p-0">
          <DialogHeader className={cn("pt-5 px-5")}>
            <DialogTitle>Search Products</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <SearchDialog onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchInput;
