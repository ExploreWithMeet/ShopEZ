import { useMemo } from "react";

interface UsePriceFiltersParams {
  minPrice?: string | number | null;
  maxPrice?: string | number | null;
}

export const usePriceFilters = ({
  minPrice,
  maxPrice,
}: UsePriceFiltersParams) => {
  return useMemo(() => {
    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : 0;

    const isValidMin = !isNaN(min) && min >= 0;
    const isValidMax = !isNaN(max) && max >= 0;

    return {
      min: isValidMin ? min : 0,
      max: isValidMax ? max : 0,
      hasMinFilter: isValidMin && min > 0,
      hasMaxFilter: isValidMax && max > 0,
      hasAnyFilter: (isValidMin && min > 0) || (isValidMax && max > 0),
    };
  }, [minPrice, maxPrice]);
};
