import ProductList from "@/components/products/ProductList";
import ProductsListSkeleteon from "@/components/products/ProductsListSkeleteon";
import { loadProductFilters } from "@/modules/products/hooks/use-product-filters";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<SearchParams>;
}) => {
  const { category } = await params;
  const filters = await loadProductFilters(searchParams);
  prefetch(
    trpc.products.getMany.queryOptions({
      category,
      max_price: filters.max_price,
      min_price: filters.min_price,
      sortby: filters.sortby,
    })
  );
  return (
    <div>
      <HydrateClient>
        <Suspense fallback={<ProductsListSkeleteon />}>
          <ProductList category={category} />
        </Suspense>
      </HydrateClient>
    </div>
  );
};

export default CategoryPage;
