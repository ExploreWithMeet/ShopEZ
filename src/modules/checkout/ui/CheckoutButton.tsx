import { Button } from "@/components/ui/button";
import { useCart } from "../hooks/use-cart";
import { generateTenantURL } from "@/lib/utils";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface Props {
  tenantSlug: string;
  className?: string;
}

const CheckoutButton = ({ tenantSlug, className }: Props) => {
  const { totalItems } = useCart(tenantSlug);

  if (totalItems === 0) return null;

  return (
    <Button variant="default" asChild>
      <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
        <ShoppingCart /> {totalItems > 0 && totalItems}
      </Link>
    </Button>
  );
};

export default CheckoutButton;
