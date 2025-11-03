import ProductList from "@/components/products/ProductList";
import ProductsListSkeleteon from "@/components/products/ProductsListSkeleteon";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";

const SubCategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) => {
  const { category, subcategory } = await params;
  prefetch(trpc.products.getMany.queryOptions({ subcategory }));
  return (
    <div>
      <HydrateClient>
        <Suspense fallback={<ProductsListSkeleteon />}>
          <ProductList subcategory={subcategory} />
        </Suspense>
      </HydrateClient>
    </div>
  );
};

export default SubCategoryPage;
