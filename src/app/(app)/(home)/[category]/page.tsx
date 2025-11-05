// app/(home)/[category]/page.tsx
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/hooks/use-product-filters";
import { Suspense } from "react";
import ProductsListSkeleteon from "@/modules/products/ui/ProductsListSkeleteon";
import ProductList from "@/modules/products/ui/ProductList";

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<SearchParams>;
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { category } = await params;
  const filters = await loadProductFilters(searchParams);

  prefetch(
    trpc.products.getMany.infiniteQueryOptions({
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
