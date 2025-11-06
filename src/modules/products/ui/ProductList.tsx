"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

import { useProductFilters } from "@/modules/products/hooks/use-product-filters";
import { usePriceFilters } from "@/modules/products/hooks/use-price-filters";
import { useProductQuery } from "@/modules/products/hooks/use-product-query";

import { DesktopProductCard, MobileProductCard } from "./ProductCard";
import ProductListSkeleton from "./ProductsListSkeleteon";

interface Props {
  category?: string;
  subcategory?: string;
  tenantSlug?: string;
}

const ProductList = ({ category, subcategory, tenantSlug }: Props) => {
  const trpc = useTRPC();
  const [filters] = useProductFilters();

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
    tenantSlug,
  });

  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions(queryOptions)
  );

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-8 py-8">
        <Suspense fallback={<ProductListSkeleton count={5} />}>
          <div className="md:hidden space-y-3">
            {data.docs.map((prod) => (
              <MobileProductCard product={prod} key={prod.id} />
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.docs.map((prod) => (
              <DesktopProductCard product={prod} key={prod.id} />
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
  );
};

export default ProductList;
