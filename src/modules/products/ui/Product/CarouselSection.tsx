import { OptimizedImage } from "@/components/file-optimization/OptimizedImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

interface Props {
  image: any;
  images: any[];
}

const CarouselSection = ({ image, images }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  const allImages = [image, ...images.map((item) => item.sliderImage)];

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Main Carousel */}
      <div className="relative px-4 sm:px-8 xl:px-4 py-4">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {allImages.map((img, index) => (
              <CarouselItem key={img?.filename || index}>
                <div className="w-full aspect-4/3 overflow-hidden rounded-lg sm:rounded-xl">
                  <OptimizedImage
                    size="card"
                    image={img}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant="ghost"
            className="absolute h-full -left-8 w-8"
          />
          <CarouselNext
            variant="ghost"
            className="absolute h-full -right-8  w-8"
          />
        </Carousel>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4 px-2 xl:px-4">
        {allImages.map((img, index) => (
          <div
            key={img?.filename || index}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "w-full aspect-4/3 overflow-hidden rounded-md cursor-pointer transition-all relative",
              "hover:ring-2 hover:ring-gray-400",
              activeIndex === index
                ? "ring-2 ring-black shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)] p-1"
                : "p-0.5"
            )}
          >
            <OptimizedImage
              size="thumbnail"
              image={img}
              className={cn(
                "h-full w-full object-cover transition-all rounded-sm",
                activeIndex === index && "brightness-95"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselSection;
