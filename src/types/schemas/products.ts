import { DEFAULT_LIMIT } from "@/constants";
import z from "zod";

export const getManyProductSchema = z.object({
  cursor: z.number().default(1),
  limit: z.number().default(DEFAULT_LIMIT),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  min_price: z.number().optional().nullable(),
  max_price: z.number().optional().nullable(),
  sortby: z
    .enum(["nosort", "name-a", "name-z", "price-l", "price-h", "new"])
    .default("nosort"),
  tenantSlug: z.string().nullable().optional(),
});

export const getOneProductSchema = z.object({
  productId: z.string(),
});

export const searchProductSchema = z.object({
  query: z.string(),
  cursor: z.number().default(1),
  limit: z.number().default(DEFAULT_LIMIT),
});
