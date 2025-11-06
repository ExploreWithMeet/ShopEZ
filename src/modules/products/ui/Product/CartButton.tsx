import { Button } from "@/components/ui/button";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { MinusCircle, ShoppingCart } from "lucide-react";

interface Props {
  tenantSlug: string;
  productId: string;
}

const CartButton = ({ tenantSlug, productId }: Props) => {
  const cart = useCart(tenantSlug);
  return (
    <Button
      className="w-full mt-5 text-md cursor-pointer"
      variant={cart.isProductInCart(productId) ? "secondary" : "default"}
      onClick={() => cart.toggleProduct(productId)}
    >
      {cart.isProductInCart(productId) ? (
        <>
          <MinusCircle />
          Remove From Cart
        </>
      ) : (
        <>
          <ShoppingCart size={24} />
          Add to Cart
        </>
      )}
    </Button>
  );
};

export default CartButton;
