"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { SearchIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import SearchResults from "./SearchResults";

interface SearchDialogProps {
  products?: any[];
  onClose: () => void;
}

const SearchDialog = ({ products = [], onClose }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Search Header */}
      <div className="p-4 border-b sticky top-0 bg-background z-10">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <SearchIcon
              size="20"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            />
            <Input
              className="pl-10 pr-10"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchQuery("")}
              >
                <X size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>

      <SearchResults
        products={filteredProducts}
        searchQuery={searchQuery}
        onProductClick={onClose}
      />
    </div>
  );
};

export default SearchDialog;
