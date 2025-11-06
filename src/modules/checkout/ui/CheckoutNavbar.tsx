import { Button } from "@/components/ui/button";
import { generateTenantURL } from "@/lib/utils";
import Link from "next/link";

interface Props {
  slug: string;
}

const CheckoutNavbar = ({ slug }: Props) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 px-4 md:px-6 **:no-underline">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
        <div className="flex justify-between items-center w-full gap-6">
          <p className="text-xl font-bold">Checkout</p>
          <Button asChild>
            <Link href={generateTenantURL(slug)}>Continue Shopping</Link>
          </Button>
          {/* <NavigationMenu className="w-full flex justify-end">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}
        </div>
      </div>
    </header>
  );
};

export default CheckoutNavbar;
