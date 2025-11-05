import { Skeleton } from "../ui/skeleton";

export const SearchAndFiltersSkeleton = () => {
  return (
    <div className="px-4 sm:px-8 py-4 grid gap-4 ">
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
};

export const SearchInputSkeleton = () => {
  return <Skeleton className="h-10 w-full rounded-xl" />;
};

export const SearchFiltersSkeleton = () => {
  return (
    <div className="grid gap-4 ">
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
};
