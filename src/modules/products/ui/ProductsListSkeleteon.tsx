import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const MobileProductSkeleton = () => (
  <Card className="px-4 flex-row flex gap-0 overflow-hidden border-violet-900/30 bg-card/50">
    <Skeleton className="w-28 min-w-28 aspect-square bg-violet-950/20" />
    <div className="flex-1 flex flex-col justify-between min-w-0 p-3">
      <CardHeader className="p-0 space-y-2 mb-2">
        <Skeleton className="h-3 w-3/4 bg-violet-950/20" />
        <Skeleton className="h-2 w-full bg-violet-950/20" />
        <Skeleton className="h-2 w-2/3 bg-violet-950/20" />
      </CardHeader>

      <CardContent className="p-0 mb-1">
        <Skeleton className="h-3 w-20 bg-violet-950/20" />
      </CardContent>

      <CardFooter className="p-0 flex items-center justify-between gap-2">
        <div className="space-y-1">
          <Skeleton className="h-2 w-12 bg-violet-950/20" />
          <Skeleton className="h-4 w-20 bg-violet-950/20" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-8 w-8 rounded-full bg-violet-950/20" />
          <Skeleton className="h-8 w-8 rounded-full bg-violet-950/20" />
        </div>
      </CardFooter>
    </div>
  </Card>
);

const DesktopProductSkeleton = () => (
  <Card className="overflow-hidden border-violet-900/30 bg-card/50 flex flex-col h-full">
    <CardHeader className="px-5">
      <Skeleton className="h-40 w-full bg-violet-950/20" />
    </CardHeader>

    <CardContent className="flex-1 flex flex-col px-5 py-2 space-y-2">
      <Skeleton className="h-4 w-3/4 bg-violet-950/20" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-3 w-full bg-violet-950/20" />
        <Skeleton className="h-3 w-5/6 bg-violet-950/20" />
      </div>
      <Skeleton className="h-3 w-24 bg-violet-950/20" />
    </CardContent>

    <CardFooter className="flex items-center justify-between gap-2 px-5 py-2 pt-0">
      <div className="space-y-1">
        <Skeleton className="h-3 w-12 bg-violet-950/20" />
        <Skeleton className="h-6 w-24 bg-violet-950/20" />
      </div>
      <Skeleton className="h-10 w-28 rounded-md bg-violet-950/20" />
    </CardFooter>
  </Card>
);

const ProductListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <>
      <div className="md:hidden space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <MobileProductSkeleton key={i} />
        ))}
      </div>

      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <DesktopProductSkeleton key={i} />
        ))}
      </div>
    </>
  );
};

export default ProductListSkeleton;
