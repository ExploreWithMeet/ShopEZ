import SearchInput from "@/components/search-filters/SearchInput";
import SearchCategories from "./SearchCategories";

interface SearchFilterProps {
  data: any;
}
export const SearchFilters = ({ data }: SearchFilterProps) => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput />
      <SearchCategories data={data} />
      {JSON.stringify(data)}
    </div>
  );
};
