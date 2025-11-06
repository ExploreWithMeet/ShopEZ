import { useCartStore } from "../store/use-cart-store";

export const useCart = (tenantSlug: string) => {
  const {
    addProduct,
    clearAllCart,
    clearCart,
    getCartByTenant,
    removeProduct,
  } = useCartStore();

  const productIds = getCartByTenant(tenantSlug);

  const isProductInCart = (productId: string) => {
    return productIds.includes(productId);
  };

  const toggleProduct = (productId: string) => {
    if (isProductInCart(productId)) {
      removeProduct(tenantSlug, productId);
    } else {
      addProduct(tenantSlug, productId);
    }
  };

  const clearTenantCart = () => {
    clearCart(tenantSlug);
  };

  return {
    productIds,
    addProduct: (productId: string) => addProduct(tenantSlug, productId),
    removeProduct: (productId: string) => removeProduct(tenantSlug, productId),
    clearCart: clearTenantCart,
    clearAllCart,
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,
  };
};
