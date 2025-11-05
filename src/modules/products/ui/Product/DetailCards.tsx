import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IndianRupee, LayoutGrid, Star, UserStar } from "lucide-react";

interface Props {
  price: number;
  categoryName: string;
  rating: number;
}

const DetailCards = ({ price, categoryName, rating }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-5">
      <Card className="p-4 sm:p-5 shadow-sm bg-linear-to-t from-card-foreground/10">
        <CardHeader className="p-0 space-y-2">
          <CardTitle className="text-base sm:text-lg lg:text-xl flex items-center gap-2 font-bold">
            <IndianRupee size={16} className="sm:w-5 sm:h-5" />
            Price
          </CardTitle>
          <CardDescription className="ml-6 sm:ml-7 p-0 text-base sm:text-lg lg:text-xl font-semibold">
            ₹{price.toLocaleString("en-IN")}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="p-4 sm:p-5 shadow-sm bg-linear-to-t from-card-foreground/10">
        <CardHeader className="p-0 space-y-2">
          <CardTitle className="text-base sm:text-lg lg:text-xl flex items-center gap-2 font-bold">
            <LayoutGrid size={18} className="sm:w-5 sm:h-5" />
            Category
          </CardTitle>
          <CardDescription className="ml-6 sm:ml-7 p-0 text-base sm:text-lg lg:text-xl">
            {categoryName}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="p-4 sm:p-5 shadow-sm bg-linear-to-t from-card-foreground/10 sm:col-span-2 2xl:col-span-1">
        <CardHeader className="p-0 space-y-2">
          <CardTitle className="text-base sm:text-lg lg:text-xl flex items-center gap-2 font-bold">
            <UserStar size={20} className="sm:w-5 sm:h-5" />
            Reviews
          </CardTitle>
          <CardDescription className="ml-6 sm:ml-7 flex gap-1 p-0">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default DetailCards;
