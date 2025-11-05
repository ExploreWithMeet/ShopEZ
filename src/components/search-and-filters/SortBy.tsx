import {
  ArrowUpDown,
  ArrowDown01Icon,
  ArrowUp10Icon,
  ArrowDownAZ,
  ArrowUpZA,
  Stars,
  ShoppingBag,
} from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "../ui/menubar";

interface Props {
  sortby: string;
  setSortby: (sortby: any) => void;
}

const SortBy = ({ sortby, setSortby }: Props) => {
  const getSortLabel = (value: string) => {
    switch (value) {
      case "price-l":
        return "Price: Low to High";
      case "price-h":
        return "Price: High to Low";
      case "name-a":
        return "Name: A-Z";
      case "name-z":
        return "Name: Z-A";
      case "new":
        return "Newest Arrivals";
      case "reviews":
        return "Reviews";
      case "nosort":
      default:
        return "None";
    }
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center justify-center w-full">
          Sort by: {getSortLabel(sortby)}{" "}
          <ArrowUpDown size="16" className="ml-2" />
        </MenubarTrigger>
        <MenubarContent side="bottom">
          <MenubarRadioGroup value={sortby} onValueChange={setSortby}>
            <MenubarRadioItem value="nosort">None</MenubarRadioItem>
            <MenubarRadioItem value="price-l">
              Price <ArrowUp10Icon className="inline-block ml-1" size={16} />
            </MenubarRadioItem>
            <MenubarRadioItem value="price-h">
              Price <ArrowDown01Icon className="inline-block ml-1" size={16} />
            </MenubarRadioItem>
            <MenubarRadioItem value="name-a">
              Name <ArrowDownAZ className="inline-block ml-1" size={16} />
            </MenubarRadioItem>
            <MenubarRadioItem value="name-z">
              Name <ArrowUpZA className="inline-block ml-1" size={16} />
            </MenubarRadioItem>
            <MenubarRadioItem value="new">
              Newest Arrivals
              <ShoppingBag className="inline-block ml-1" size={16} />
            </MenubarRadioItem>
            <MenubarRadioItem value="reviews">
              Reviews <Stars className="inline-block ml-1" size={16} />
            </MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default SortBy;
