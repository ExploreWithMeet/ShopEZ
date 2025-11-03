import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter } from "lucide-react";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

interface IPriceState {
  min: number;
  max: number;
}

interface FilterAccordionItemProps {
  value: string;
  title: string;
  children: React.ReactNode;
}

interface FilterProductProps {
  price: IPriceState;
  setPrice: (price: IPriceState) => void;
  onClearAll: () => void;
}

const FilterAccordionItem = ({
  title,
  value,
  children,
}: FilterAccordionItemProps) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="no-underline">{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};

const FilterProduct = ({ price, setPrice, onClearAll }: FilterProductProps) => {
  const [localPrice, setLocalPrice] = useState(price);
  const [open, setOpen] = useState(false);

  // Sync local state when price prop changes
  useEffect(() => {
    setLocalPrice(price);
  }, [price]);

  const handlePriceChange = (field: "min" | "max", value: string) => {
    // Allow empty string
    if (value === "") {
      setLocalPrice({ ...localPrice, [field]: 0 });
      return;
    }

    // Parse the value
    const numValue = Number(value);

    // Only update if it's a valid number and non-negative
    if (!isNaN(numValue) && numValue >= 0) {
      setLocalPrice({ ...localPrice, [field]: numValue });
    }
    // If invalid (NaN or negative), don't update - ignore the input
  };

  const handleApply = () => {
    setPrice(localPrice);
    setOpen(false);
  };

  const handleReset = () => {
    setLocalPrice({ min: 0, max: 0 });
  };

  const hasActiveFilters = price.min > 0 || price.max > 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={hasActiveFilters ? "default" : "outline"}
          className="relative"
        >
          Filters <Filter className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" side="right" align="start">
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="leading-none font-medium">Filter By</h4>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onClearAll();
                    setLocalPrice({ min: 0, max: 0 });
                  }}
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              )}
            </div>
            <p className="text-muted-foreground text-sm">
              Set the filters for deep search.
            </p>
          </div>
          <div className="grid gap-2">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="price"
            >
              <FilterAccordionItem value="price" title="Price: ₹">
                <div className="grid gap-3">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="min_price">Min</Label>
                    <Input
                      id="min_price"
                      type="number"
                      placeholder="0"
                      className="col-span-2 h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      value={localPrice.min || ""}
                      onChange={(e) => handlePriceChange("min", e.target.value)}
                      min="0"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="max_price">Max</Label>
                    <Input
                      id="max_price"
                      type="number"
                      placeholder="0"
                      className="col-span-2 h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      value={localPrice.max || ""}
                      onChange={(e) => handlePriceChange("max", e.target.value)}
                      min="0"
                    />
                  </div>
                </div>
              </FilterAccordionItem>
            </Accordion>
          </div>
          <div className="flex gap-2 pt-2 border-t">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleReset}
              disabled={localPrice.min === 0 && localPrice.max === 0}
            >
              Reset
            </Button>
            <Button className="flex-1" onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterProduct;
