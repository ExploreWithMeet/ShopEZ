import z from "zod";

export const getCheckoutProductsSchema = z.object({
  ids: z.array(z.string()),
});
