import CheckoutBody from "@/modules/checkout/ui/CheckoutBody";

interface Props {
  params: Promise<{ tenantSlug: string }>;
}

const CheckoutPage = async ({ params }: Props) => {
  const { tenantSlug } = await params;
  return <CheckoutBody tenantSlug={tenantSlug} />;
};

export default CheckoutPage;
