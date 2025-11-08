import { useCartStore } from "../store/use-cart-store";
import { useCallback } from "react";

export const useCart = (tenantSlug: string) => {
  const {
    addProduct: addProductStore,
    clearAllCart,
    clearCart: clearCartStore,
    getCartByTenant,
    removeProduct: removeProductStore,
  } = useCartStore();

  const productIds = getCartByTenant(tenantSlug);

  const isProductInCart = useCallback(
    (productId: string) => {
      return productIds.includes(productId);
    },
    [productIds]
  );

  const toggleProduct = useCallback(
    (productId: string) => {
      if (isProductInCart(productId)) {
        removeProductStore(tenantSlug, productId);
      } else {
        addProductStore(tenantSlug, productId);
      }
    },
    [isProductInCart, removeProductStore, addProductStore, tenantSlug]
  );

  const clearTenantCart = useCallback(() => {
    clearCartStore(tenantSlug);
  }, [clearCartStore, tenantSlug]);

  const addProduct = useCallback(
    (productId: string) => addProductStore(tenantSlug, productId),
    [addProductStore, tenantSlug]
  );

  const removeProduct = useCallback(
    (productId: string) => removeProductStore(tenantSlug, productId),
    [removeProductStore, tenantSlug]
  );

  return {
    productIds,
    addProduct,
    removeProduct,
    clearCart: clearTenantCart,
    clearAllCart,
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,
  };
};
