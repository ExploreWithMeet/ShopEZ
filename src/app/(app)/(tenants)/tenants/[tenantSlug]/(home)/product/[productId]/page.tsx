import SingleProduct from "@/modules/products/ui/SingleProduct";

interface Props {
  params: Promise<{ tenantSlug: string; productId: string }>;
}

const Product = async ({ params }: Props) => {
  const { tenantSlug, productId } = await params;
  return <SingleProduct productId={productId} />;
};

export default Product;
