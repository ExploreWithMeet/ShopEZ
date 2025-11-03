import ProductList from "@/components/products/ProductList";
import ProductsListSkeleteon from "@/components/products/ProductsListSkeleteon";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  prefetch(trpc.products.getMany.queryOptions({ category }));

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
