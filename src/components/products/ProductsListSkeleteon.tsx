import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

// Mobile Skeleton (Horizontal Layout)
const MobileProductSkeleton = () => (
  <Card className="flex-row flex gap-0 overflow-hidden border-violet-900/30 bg-card/50">
    <Skeleton className="w-32 min-w-32 aspect-square bg-violet-950/20" />
    <div className="flex-1 flex flex-col justify-between min-w-0 p-3">
      <CardHeader className="p-0 space-y-2 mb-2">
        <Skeleton className="h-4 w-3/4 bg-violet-950/20" />
        <Skeleton className="h-3 w-full bg-violet-950/20" />
        <Skeleton className="h-3 w-2/3 bg-violet-950/20" />
      </CardHeader>

      <CardContent className="p-0 mb-2">
        <Skeleton className="h-4 w-20 bg-violet-950/20" />
      </CardContent>

      <CardFooter className="p-0 flex items-center justify-between gap-2">
        <div className="space-y-1">
          <Skeleton className="h-3 w-12 bg-violet-950/20" />
          <Skeleton className="h-5 w-20 bg-violet-950/20" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-8 w-8 rounded-full bg-violet-950/20" />
          <Skeleton className="h-8 w-8 rounded-full bg-violet-950/20" />
        </div>
      </CardFooter>
    </div>
  </Card>
);

// Desktop Skeleton (Vertical Layout)
const DesktopProductSkeleton = () => (
  <Card className="overflow-hidden border-violet-900/30 bg-card/50 flex flex-col h-full">
    <CardHeader className="p-0">
      <Skeleton className="aspect-4/3 w-full bg-violet-950/20" />
    </CardHeader>

    <CardContent className="flex-1 flex flex-col p-5 space-y-4">
      <Skeleton className="h-6 w-3/4 bg-violet-950/20" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full bg-violet-950/20" />
        <Skeleton className="h-4 w-5/6 bg-violet-950/20" />
      </div>
      <Skeleton className="h-4 w-24 bg-violet-950/20" />
    </CardContent>

    <CardFooter className="flex items-center justify-between gap-3 p-5 pt-0">
      <div className="space-y-2">
        <Skeleton className="h-3 w-12 bg-violet-950/20" />
        <Skeleton className="h-8 w-24 bg-violet-950/20" />
      </div>
      <Skeleton className="h-10 w-32 rounded-md bg-violet-950/20" />
    </CardFooter>
  </Card>
);

// Product List Skeleton - Shows multiple skeleton cards
const ProductListSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <>
      {/* Mobile: Stack layout */}
      <div className="md:hidden space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <MobileProductSkeleton key={i} />
        ))}
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <DesktopProductSkeleton key={i} />
        ))}
      </div>
    </>
  );
};

export default ProductListSkeleton;
