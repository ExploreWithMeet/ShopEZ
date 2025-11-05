import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/hooks/use-product-filters";
import { Suspense } from "react";
import ProductsListSkeleteon from "@/modules/products/ui/ProductsListSkeleteon";
import ProductList from "@/modules/products/ui/ProductList";

interface Props {
  params: Promise<{ tenantSlug: string }>;
  searchParams: Promise<SearchParams>;
}

const TenantPage = async ({ params, searchParams }: Props) => {
  const { tenantSlug } = await params;
  const filters = await loadProductFilters(searchParams);
  prefetch(
    trpc.products.getMany.infiniteQueryOptions({
      max_price: filters.max_price,
      min_price: filters.min_price,
      sortby: filters.sortby,
      tenantSlug,
    })
  );

  return (
    <div>
      <HydrateClient>
        <Suspense fallback={<ProductsListSkeleteon />}>
          <ProductList tenantSlug={tenantSlug} />
        </Suspense>
      </HydrateClient>
    </div>
  );
};

export default TenantPage;
