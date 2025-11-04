import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "../file-optimization/OptimizedImage";
import Link from "next/link";

const ProductCard = ({ product }: { product: any }) => {
  const [liked, setLiked] = useState<boolean>(false);
  console.log(product);
  return (
    <div className="group relative bg-card border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <OptimizedImage
          image={product.image}
          size="card"
          className="w-full h-full"
        />

        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-all duration-300" />
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 rounded-full backdrop-blur-sm transition-all duration-200 shadow-lg h-10 w-10"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-all duration-200",
              liked ? "fill-destructive stroke-destructive" : ""
            )}
          />
        </Button>

        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="backdrop-blur-sm shadow-lg">
            {product.category.name}
          </Badge>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold hover:underline hover:underline-offset-4 text-foreground">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-2.5 line-clamp-2 flex-1">
          {product.description}
        </p>

        {product.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
              <span className="text-sm font-medium text-foreground">
                {product.rating}
              </span>
            </div>
            {product.reviews && (
              <span className="text-xs text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-3 mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-medium">
              Price
            </span>
            <span className="text-md font-bold text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
          </div>
          <Button
            size="default"
            className="flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to cart</span>
          </Button>
        </div>
        <p className="text-xs text-gray-200 mt-2 w-fit">
          From:{" "}
          <Link
            href={`/user/${product.tenant.slug}`}
            className="hover:underline"
            prefetch={false}
          >
            {product.tenant.name}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
