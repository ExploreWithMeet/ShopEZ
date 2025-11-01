import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  disabled?: boolean;
}
const SearchInput = ({ disabled }: SearchInputProps) => {
  return (
    <div className="flex items-center gap-2 w-full max-w-full">
      <div className="relative w-full">
        <SearchIcon
          size="20"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
        />
        <Input
          className={cn("py-6 border-none px-10 focus-visible:ring-muted")}
          placeholder="Seach Products..."
          disabled={disabled}
        ></Input>
      </div>
    </div>
  );
};

export default SearchInput;
