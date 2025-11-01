import {
  ArrowUpDown,
  ArrowDown01Icon,
  ArrowUp10Icon,
  ArrowDownAZ,
  ArrowUpZA,
  Stars,
} from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "../ui/menubar";

const SortBy = () => {
  return (
    <Menubar className="w-fit ml-auto">
      <MenubarMenu>
        <MenubarTrigger>
          Sort <ArrowUpDown size="14" className="ml-1" />
        </MenubarTrigger>
        <MenubarContent side="left">
          <MenubarRadioGroup value="nosort">
            <MenubarRadioItem value="nosort">None</MenubarRadioItem>
            <MenubarRadioItem value="p-l-h">
              Price <ArrowUp10Icon />
            </MenubarRadioItem>
            <MenubarRadioItem value="p-h-l">
              Price <ArrowDown01Icon />
            </MenubarRadioItem>
            <MenubarRadioItem value="name-a">
              Name <ArrowDownAZ />
            </MenubarRadioItem>
            <MenubarRadioItem value="name-z">
              Name <ArrowUpZA />
            </MenubarRadioItem>
            <MenubarRadioItem value="new">Newest Arrivals</MenubarRadioItem>
            <MenubarRadioItem value="reviews">
              Reviews <Stars />
            </MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default SortBy;
