import { Skeleton } from "../ui/skeleton";

export const TopbarSkeleton = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 p-4 md:px-6 **:no-underline">
      <Skeleton className="h-10 w-full rounded-xl" />
    </header>
  );
};

export const TopbarEndItemSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="h-10 min-w-30 rounded-xl" />
      <Skeleton className="h-10 min-w-16 rounded-xl" />
    </div>
  );
};
