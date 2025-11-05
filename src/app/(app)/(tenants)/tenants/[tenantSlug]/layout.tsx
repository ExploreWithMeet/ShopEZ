import { prefetch, trpc } from "@/trpc/server";
import TenantTopbar from "@/modules/tenant/ui/TenantTopbar";

interface Props {
  children: React.ReactNode;
  params: Promise<{ tenantSlug: string }>;
}

export default async function TenantLayout({ children, params }: Props) {
  const { tenantSlug } = await params;
  prefetch(trpc.tenants.getOne.queryOptions({ slug: tenantSlug }));

  return (
    <section>
      <TenantTopbar slug={tenantSlug} />
      <main className="px-5">{children}</main>
    </section>
  );
}
