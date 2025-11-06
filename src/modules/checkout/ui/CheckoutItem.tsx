import { OptimizedImage } from "@/components/file-optimization/OptimizedImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { generateTenantURL } from "@/lib/utils";
import { BadgeMinus } from "lucide-react";

interface Props {
  isLast: boolean;
  image: any;
  name: string;
  productUrl: string;
  tenantName: string;
  tenantSlug: string;
  price: string;
  categoryName: string;
  onRemove: () => void;
}

const CheckoutItem = ({
  isLast,
  image,
  name,
  price,
  productUrl,
  tenantName,
  tenantSlug,
  categoryName,
  onRemove,
}: Props) => {
  return (
    <div className="border p-5 flex rounded-lg">
      <div className="aspect-square w-40  rounded-md overflow-hidden">
        <OptimizedImage
          image={image}
          size="thumbnail"
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col flex-2 px-5 ">
        <Badge variant="secondary" className="rounded-sm  px-2.5">
          {categoryName}
        </Badge>
        <Link
          href={productUrl}
          className="w-fit hover:underline hover:underline-offset-4 mt-auto"
        >
          <span className="text-xl font-bold">{name}</span>
        </Link>

        <Link
          href={generateTenantURL(tenantSlug)}
          className="w-fit hover:underline hover:underline-offset-2 mb-auto"
        >
          <span className="text-md">{tenantName}</span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="text-2xl text-foreground font-bold my-auto mx-auto">
          ₹ {price}
        </div>
        <Button
          variant="destructive"
          size="lg"
          className="cursor-pointer"
          onClick={onRemove}
        >
          <BadgeMinus /> Remove Item
        </Button>
      </div>
    </div>
  );
};

export default CheckoutItem;
