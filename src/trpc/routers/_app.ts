import { createTRPCRouter } from "../init";
import { authRouter } from "@/modules/auth/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { checkoutRouter } from "@/modules/checkout/server/procedures";
import { productsRouter } from "@/modules/products/server/procedures";
import { tenantRouter } from "@/modules/tenant/server/procedures";
export const appRouter = createTRPCRouter({
  auth: authRouter,
  products: productsRouter,
  categories: categoriesRouter,
  tenants: tenantRouter,
  checkout: checkoutRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
