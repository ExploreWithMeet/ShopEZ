"use client";
import { useProductFilters } from "@/modules/products/hooks/use-product-filters";
import { usePriceFilters } from "@/modules/products/hooks/use-price-filters";

import FilterProduct from "./FilterProduct";
import SortBy from "./SortBy";

import { Button } from "../ui/button";
import { TSortBy } from "@/types";
import { FolderOpen } from "lucide-react";
import CategoriesSidebar from "../navigations/CategoriesSidebar";

const FilterOptions = () => {
  const [filters, setFilters] = useProductFilters();

  const priceFilters = usePriceFilters({
    minPrice: filters.min_price,
    maxPrice: filters.max_price,
  });

  const handlePriceChange = (newPrice: { min: number; max: number }) => {
    setFilters({
      min_price: newPrice.min > 0 ? newPrice.min : null,
      max_price: newPrice.max > 0 ? newPrice.max : null,
    });
  };

  const handleSortChange = (sortby: TSortBy) => {
    setFilters({ sortby });
  };

  const handleClearAllFilters = () => {
    setFilters({ min_price: null, max_price: null, sortby: "nosort" });
  };

  return (
    <div className="grid gap-2">
      <CategoriesSidebar
        trigger={
          <Button variant="secondary">
            <FolderOpen />
            Categories
          </Button>
        }
      />
      <div className="grid grid-cols-2 gap-2 w-full">
        <FilterProduct
          price={{ min: priceFilters.min, max: priceFilters.max }}
          setPrice={handlePriceChange}
          onClearAll={handleClearAllFilters}
        />
        <SortBy
          sortby={filters.sortby || "nosort"}
          setSortby={handleSortChange}
        />
      </div>
    </div>
  );
};

export default FilterOptions;
