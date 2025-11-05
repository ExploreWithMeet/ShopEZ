"use client";
import Link from "next/link";
import { Package } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface SearchResultsProps {
  products: any[];
  searchQuery: string;
  onProductClick: () => void;
}

const SearchResults = ({
  products,
  searchQuery,
  onProductClick,
}: SearchResultsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  if (!searchQuery) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center text-muted-foreground">
          <Package size={48} className="mx-auto mb-4 opacity-50" />
          <p>Start typing to search products</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center text-muted-foreground">
          <Package size={48} className="mx-auto mb-4 opacity-50" />
          <p>No products found for "{searchQuery}"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-2">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            onClick={onProductClick}
            className="flex items-center gap-4 p-4 rounded-lg border hover:bg-sidebar transition-colors"
          >
            {product.image ? (
              <Image
                src={product.image.url}
                loading="lazy"
                quality={75}
                alt={product.image.alt}
                width={150}
                height={100}
                onLoad={() => setIsLoading(false)}
                placeholder="empty"
                className={`
          object-cover duration-300 ease-in-out aspect-video
          ${isLoading ? "scale-105 blur-sm" : "scale-100 blur-0"}
        `}
              />
            ) : (
              <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                <Package className="text-muted-foreground" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              {product.description && (
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {product.description}
                </p>
              )}
              {product.price && (
                <p className="text-sm font-semibold mt-1">₹{product.price}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
