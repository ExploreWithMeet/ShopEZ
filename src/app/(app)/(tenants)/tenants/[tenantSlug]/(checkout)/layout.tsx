import CheckoutNavbar from "@/modules/checkout/ui/CheckoutNavbar";

interface Props {
  children: React.ReactNode;
  params: Promise<{ tenantSlug: string }>;
}

export default async function CheckoutLayout({ children, params }: Props) {
  const { tenantSlug } = await params;
  return (
    <>
      <div className="min-h-screen">
        <CheckoutNavbar slug={tenantSlug} />
        <main className="p-5">{children}</main>
      </div>
    </>
  );
}
