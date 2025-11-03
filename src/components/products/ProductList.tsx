"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { SearchFilters } from "../search-filters";
import { useProductFilters } from "@/modules/products/hooks/use-product-filters";
import { usePriceFilters } from "@/modules/products/hooks/use-price-filters";
import { useProductQuery } from "@/modules/products/hooks/use-product-query";
import { Suspense } from "react";
import ProductListSkeleton from "./ProductsListSkeleteon";
import { TSortBy } from "@/types";

interface ProductListProps {
  category?: string;
  subcategory?: string;
}

const ProductList = ({ category, subcategory }: ProductListProps) => {
  const trpc = useTRPC();
  const [filters, setFilters] = useProductFilters();

  const priceFilters = usePriceFilters({
    minPrice: filters.min_price,
    maxPrice: filters.max_price,
  });

  const queryOptions = useProductQuery({
    category,
    subcategory,
    minPrice: priceFilters.min,
    maxPrice: priceFilters.max,
    sortby: filters.sortby || "nosort",
  });

  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions(queryOptions)
  );

  const handlePriceChange = (newPrice: { min: number; max: number }) => {
    setFilters({
      min_price: newPrice.min > 0 ? newPrice.min : null,
      max_price: newPrice.max > 0 ? newPrice.max : null,
    });
  };

  const handleSortChange = (sortby: TSortBy) => {
    setFilters({ sortby });
  };

  const handleClearAllFilters = () => {
    setFilters({ min_price: null, max_price: null, sortby: "nosort" });
  };

  return (
    <>
      <SearchFilters
        price={{ min: priceFilters.min, max: priceFilters.max }}
        setPrice={handlePriceChange}
        sortby={filters.sortby || "nosort"}
        setSortby={handleSortChange}
        onClearAll={handleClearAllFilters}
      />

      <div className="w-full min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Suspense fallback={<ProductListSkeleton count={8} />}>
            <div className="md:hidden space-y-3">
              {data.docs.map((prod: any) => (
                <ProductCard product={prod} key={prod.id} />
              ))}
            </div>

            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.docs.map((prod: any) => (
                <ProductCard product={prod} key={prod.id} />
              ))}
            </div>
          </Suspense>

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
    </>
  );
};

export default ProductList;
