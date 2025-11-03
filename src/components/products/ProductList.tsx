"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

interface ProductListProps {
  category?: string;
  subcategory?: string;
}

const ProductList = ({ category, subcategory }: ProductListProps) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    subcategory
      ? trpc.products.getMany.queryOptions({
          subcategory,
        })
      : trpc.products.getMany.queryOptions({
          category: category!,
        })
  );

  console.log(data);

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Products Grid - Auto Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.docs.map((prod: any) => (
            <ProductCard product={prod} key={prod.id} />
          ))}
        </div>

        {/* Empty State */}
        {data.docs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or check back later
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
