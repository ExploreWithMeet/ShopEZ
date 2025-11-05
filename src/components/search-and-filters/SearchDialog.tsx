"use client";
import { useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { ChevronLeft, ChevronRight, SearchIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import SearchResults from "./SearchResults";
import debounce from "lodash.debounce";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { DialogFooter } from "../ui/dialog";

interface SearchDialogProps {
  onClose: () => void;
}

const SearchDialog = ({ onClose }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const trpc = useTRPC();

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedQuery(value);
      }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    fetchPreviousPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery(
    trpc.products.search.infiniteQueryOptions(
      { query: debouncedQuery },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        enabled: !!debouncedQuery,
      }
    )
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b sticky top-0 bg-background z-10">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <SearchIcon
              size="20"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            />
            <Input
              className="pl-10 pr-10"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleChange}
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => {
                  setSearchQuery("");
                  setDebouncedQuery("");
                }}
              >
                <X size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>

      <SearchResults
        products={data.pages.flatMap((page) => page.docs)}
        searchQuery={debouncedQuery}
        onProductClick={onClose}
      />

      <DialogFooter>
        <div className="flex justify-between px-4 bg-background z-20 w-full py-2 items-center">
          <Button
            onClick={() => fetchPreviousPage()}
            disabled={isFetchingPreviousPage || !hasPreviousPage}
            variant={hasPreviousPage ? "default" : "outline"}
            size="icon"
          >
            <ChevronLeft />
          </Button>
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage || !hasNextPage}
            variant={hasNextPage ? "default" : "outline"}
            size="icon"
          >
            <ChevronRight />
          </Button>
        </div>
      </DialogFooter>
    </div>
  );
};

export default SearchDialog;
