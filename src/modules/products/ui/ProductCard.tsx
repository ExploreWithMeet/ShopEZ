import { useState } from "react";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/file-optimization/OptimizedImage";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface ProductCardProps {
  product: any;
}

export const MobileProductCard = ({ product }: ProductCardProps) => {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <Card className="relative flex-row px-3 py-3 flex gap-0 overflow-hidden border-violet-900/30 bg-card/50 hover:shadow-xl transition-all duration-300">
      <div className="max-w-48 w-40 min-w-28">
        <OptimizedImage
          image={product.image}
          size="thumbnail"
          className="h-full rounded-md aspect-square"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between min-w-0 px-3">
        <CardHeader className="p-0 space-y-2 mb-2">
          <Badge variant="secondary" className="">
            {product.category.name}
          </Badge>
          <div className="flex flex-col">
            <Link
              href={`/tenants/${product.tenant.slug}/product/${product.id}`}
              prefetch={false}
              className="text-sm w-fit font-semibold hover:underline hover:underline-offset-2 text-foreground"
            >
              {product.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              {product.description}
            </p>
          </div>
        </CardHeader>

        <CardFooter className="p-0 flex items-center justify-between gap-2">
          <div className="space-y-1">
            <div className="space-y-0.5">
              <span className="text-xs text-muted-foreground font-medium">
                Price
              </span>
              <p className="text-sm font-semibold text-foreground">
                ₹{product.price.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-0.5 mt-2">
              <Star size={14} className="fill-yellow-300 stroke-yellow-300" />
              <Star size={14} className="fill-yellow-300 stroke-yellow-300" />
              <Star size={14} className="fill-yellow-300 stroke-yellow-300" />
              <Star size={14} className="fill-yellow-300 stroke-yellow-300" />
              <Star size={14} className="stroke-muted-foreground" />
            </div>
          </div>
          <Button size="sm" variant="default">
            <ShoppingCart />
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export const DesktopProductCard = ({ product }: ProductCardProps) => {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <Card className="p-0 relative bg-card border rounded-2xl transition-all duration-300 overflow-hidden h-auto flex flex-col">
      <CardHeader className="p-0 relative   aspect-4/3 overflow-hidden ">
        <OptimizedImage image={product.image} size="card" className="w-full " />

        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="rounded-sm">
            {product.category.name}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-4 flex flex-col py-0">
        <Link
          href={`/tenants/${product.tenant.slug}/product/${product.id}`}
          prefetch={false}
          className="w-fit"
        >
          <h3 className="text-lg font-semibold hover:underline hover:underline-offset-4 text-foreground">
            {product.name}
          </h3>
        </Link>

        <div className="flex gap-1 mt-2 mb-2">
          <Star size={16} className="fill-yellow-300 stroke-yellow-300" />
          <Star size={16} className="fill-yellow-300 stroke-yellow-300" />
          <Star size={16} className="fill-yellow-300 stroke-yellow-300" />
          <Star size={16} className="fill-yellow-300 stroke-yellow-300" />
          <Star size={16} className="stroke-muted-foreground" />
        </div>

        <p className="text-xs text-muted-foreground">{product.description}</p>
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-0 flex-col gap-2">
        <div className="flex items-center justify-between gap-2 w-full">
          <span className="text-lg font-bold text-foreground">
            ₹{product.price.toLocaleString()}
          </span>
          <Badge variant="outline" className="rounded-sm text-sm" asChild>
            <Link href={`/tenants/${product.tenant.slug}`} prefetch={false}>
              {product.tenant.name}
            </Link>
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-2 justify-between w-full">
          <Button size="default" className="flex-1 cursor-pointer">
            <ShoppingCart />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
