import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import SearchInput from "./SearchInput";
import FilterOptions from "./FilterOptions";
import { Suspense } from "react";
import {
  SearchAndFiltersSkeleton,
  SearchFiltersSkeleton,
  SearchInputSkeleton,
} from "./SFSkeleton";

const SearchAndFilters = () => {
  prefetch(trpc.categories.getMany.queryOptions());
  return (
    <HydrateClient>
      <Suspense fallback={<SearchAndFiltersSkeleton />}>
        <div className="px-4 sticky top-16 z-20 sm:px-8 py-4 grid gap-4 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
          <Suspense fallback={<SearchInputSkeleton />}>
            <SearchInput />
          </Suspense>
          <Suspense fallback={<SearchFiltersSkeleton />}>
            <FilterOptions />
          </Suspense>
        </div>
      </Suspense>
    </HydrateClient>
  );
};

export default SearchAndFilters;
