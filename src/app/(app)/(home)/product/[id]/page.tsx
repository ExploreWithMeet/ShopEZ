const Product = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <>{id}</>;
};

export default Product;
