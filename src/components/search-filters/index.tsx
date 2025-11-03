"use client";
import FilterProduct from "./FilterProduct";
import SortBy from "./SortBy";

interface IPriceState {
  min: number;
  max: number;
}

interface SearchFiltersProps {
  price: IPriceState;
  setPrice: (price: IPriceState) => void;
  sortby: string;
  setSortby: (sortby: any) => void;
  onClearAll: () => void;
}

export const SearchFilters = ({
  price,
  setPrice,
  sortby,
  setSortby,
  onClearAll,
}: SearchFiltersProps) => {
  return (
    <div className="px-4 lg:px-12 py-4 grid grid-cols-2 border-b gap-2 w-full">
      <FilterProduct
        price={price}
        setPrice={setPrice}
        onClearAll={onClearAll}
      />
      <SortBy sortby={sortby} setSortby={setSortby} />
    </div>
  );
};
