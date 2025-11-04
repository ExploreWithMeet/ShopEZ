import ProductList from "@/components/products/ProductList";
import ProductsListSkeleteon from "@/components/products/ProductsListSkeleteon";
import { loadProductFilters } from "@/modules/products/hooks/use-product-filters";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

const CategoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const filters = await loadProductFilters(searchParams);
  prefetch(
    trpc.products.getMany.infiniteQueryOptions({
      max_price: filters.max_price,
      min_price: filters.min_price,
      sortby: filters.sortby,
    })
  );
  return (
    <div>
      <HydrateClient>
        <Suspense fallback={<ProductsListSkeleteon />}>
          <ProductList />
        </Suspense>
      </HydrateClient>
    </div>
  );
};

export default CategoryPage;
