import z from "zod";

export const getCheckoutProductsSchema = z.object({
  ids: z.array(z.string()),
});

export const getPurchaseProductSchema = z.object({
  productIds: z.array(z.string()).min(1),
  tenantSlug: z.string().min(1),
});
