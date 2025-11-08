"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCart } from "../hooks/use-cart";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { generateTenantURL } from "@/lib/utils";
import CheckoutItem from "./CheckoutItem";
import CheckoutSidebar from "./CheckoutSidebar";
import { useCheckoutStates } from "../hooks/use-checkout-states";

interface Props {
  tenantSlug: string;
}

const CheckoutBody = ({ tenantSlug }: Props) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [checkoutStates, setCheckoutStates] = useCheckoutStates();
  const { productIds, clearCart, removeProduct } = useCart(tenantSlug);

  const trpc = useTRPC();
  const { data, error, isLoading } = useQuery({
    ...trpc.checkout.getProducts.queryOptions({ ids: productIds }),
    enabled: productIds.length > 0 && hasMounted,
    staleTime: Infinity,
  });

  const { mutate: purchaseMutate, isPending } = useMutation(
    trpc.checkout.purchase.mutationOptions({
      onSuccess: (data) => {
        // setCheckoutStates({ success: true, cancel: false });
        window.location.href = data.url;
      },
      onMutate: () => {
        setCheckoutStates({ success: false, cancel: false });
      },
      onError: (err) => {
        if (err.data?.code === "UNAUTHORIZED") router.push("/login");
        toast.error(err.message);
        setCheckoutStates({ success: false, cancel: true });
      },
    })
  );

  const router = useRouter();

  const displayedProducts = useMemo(() => {
    if (!data?.docs) return [];
    return data.docs.filter((item) => productIds.includes(String(item.id)));
  }, [data?.docs, productIds]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (checkoutStates.success) {
      clearCart();
      // router.push("/products");
    }
  }, [checkoutStates.success]);

  useEffect(() => {
    if (hasMounted && productIds.length === 0) {
      router.push(generateTenantURL(tenantSlug));
    }
  }, [productIds, router, tenantSlug, hasMounted]);

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      toast.error("Products in Cart Doesn't Exist Anymore!", {
        position: "bottom-right",
      });
      clearCart();
      router.push(generateTenantURL(tenantSlug));
    }
  }, [error, router, tenantSlug]);

  if (!hasMounted) {
    return (
      <div className="flex max-lg:flex-col gap-5 border p-5">
        <div className="flex flex-col gap-2.5 border p-5 flex-2">
          <div className="text-center py-8">Loading...</div>
        </div>
        <div className="flex flex-col gap-2.5 border p-5 flex-1"></div>
      </div>
    );
  }

  if (isLoading && !data) {
    return (
      <div className="flex max-lg:flex-col gap-5 p-5">
        <div className="flex flex-col gap-2.5 border p-5 flex-2">
          <div className="text-center py-8">Loading...</div>
        </div>
        <div className="flex flex-col gap-2.5 border p-5 flex-1"></div>
      </div>
    );
  }

  return (
    <div className="flex max-lg:flex-col gap-5 p-5">
      <div className="flex flex-col gap-2.5 p-5 flex-2">
        {displayedProducts.length === 0 ? (
          <div className="text-center py-8">Your cart is empty</div>
        ) : (
          displayedProducts.map((item, idx) => {
            return (
              <CheckoutItem
                key={String(item.id)}
                isLast={displayedProducts.length - 1 === idx}
                image={item.image}
                name={item.name}
                price={item.price}
                tenantSlug={item.tenant.slug}
                productUrl={`${generateTenantURL(item.tenant.slug)}/product/${item.id}`}
                tenantName={item.tenant.name}
                categoryName={item.category.name}
                onRemove={() => removeProduct(String(item.id))}
              />
            );
          })
        )}
      </div>
      <CheckoutSidebar
        totalItems={displayedProducts.length}
        totalPrice={String(
          data?.docs.reduce((acc, product) => {
            const price = Number(product.price);
            return acc + (isNaN(price) ? 0 : price);
          }, 0) || 0
        )}
        isPending={isPending}
        isCanceled={checkoutStates.cancel}
        onPurchase={() => purchaseMutate({ tenantSlug, productIds })}
      />
    </div>
  );
};

export default CheckoutBody;
