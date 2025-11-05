import { useMemo } from "react";

interface UseProductQueryParams {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  sortby?: string;
  tenantSlug?: string;
}

export const useProductQuery = ({
  category,
  tenantSlug,
  subcategory,
  minPrice,
  maxPrice,
  sortby,
}: UseProductQueryParams) => {
  return useMemo(() => {
    const baseQuery = subcategory ? { subcategory } : { category: category! };

    const query: Record<string, any> = { ...baseQuery };

    // Only add price filters if they're valid and non-zero
    if (minPrice && minPrice > 0) {
      query.min_price = minPrice;
    }
    if (maxPrice && maxPrice > 0) {
      query.max_price = maxPrice;
    }

    // Add sorting parameter (defaults to "nosort" in the backend)
    if (sortby && sortby !== "nosort") {
      query.sortby = sortby;
    }

    if (tenantSlug) {
      query.tenantSlug = tenantSlug;
    }

    return query;
  }, [category, subcategory, minPrice, maxPrice, sortby, tenantSlug]);
};
