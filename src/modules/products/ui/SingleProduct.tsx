"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Poppins } from "next/font/google";
import Link from "next/link";
import CarouselSection from "./Product/CarouselSection";

import ReviewTable from "./Product/ReviewTable";
import DetailCards from "./Product/DetailCards";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
const CartButton = dynamic(
  () => import("./Product/CartButton").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <Button
        disabled
        className="w-full mt-5 text-md cursor-pointer"
        variant={"secondary"}
      >
        <Spinner />
      </Button>
    ),
  }
);

interface Props {
  productId: string;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const SingleProduct = ({ productId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({ productId })
  );

  const returnPolicyString = (refundpolicy: string) => {
    if (refundpolicy.includes("day")) {
      let split = refundpolicy.split("-");
      let str = `${split[0]} ${split[1].charAt(0).toUpperCase() + "" + split[1].slice(1).toLowerCase()}s`;
      return `You can get Refund on this product within ${str}`;
    } else if (refundpolicy.includes("no")) {
      return "This Product does not support Refund Policy.";
    }
  };

  return (
    <section className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-12 min-h-screen">
      <h1
        className={cn(
          "text-xl sm:text-2xl lg:text-3xl font-bold",
          poppins.className
        )}
      >
        {data.name}
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 text-sm mt-3">
        <span className="flex font-semibold gap-1">
          Seller:
          <Link
            href={`tenants/${data.tenant.slug}`}
            className="text-muted-foreground font-light hover:underline"
          >
            {data.tenant.name}
          </Link>
        </span>

        <span className="flex font-semibold gap-1">
          Published on:
          <p className="text-muted-foreground font-light">
            {new Intl.DateTimeFormat("en-IN", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(data.createdAt))}
          </p>
        </span>
      </div>

      <div className="w-full gap-4 lg:gap-6 mt-6 flex flex-col xl:flex-row">
        <div className="w-full xl:w-[35%] xl:shrink-0">
          <CarouselSection image={data.image} images={data.images} />
        </div>

        <div className="rounded-lg p-4 sm:p-6 flex-1 flex flex-col w-full xl:w-[65%]">
          <DetailCards
            price={data.price}
            categoryName={data.category.name}
            rating={4.7}
          />

          <div className="border h-full w-full mt-5 p-5 rounded-lg">
            <div className="flex justify-between">
              <div className="flex-1 grid ">
                <span className="font-bold text-lg">
                  Description:
                  <p className="text-md text-muted-foreground font-normal">
                    {data.description}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                    sequi error et laudantium praesentium dolores ipsam nostrum
                    vitae quibusdam pariatur saepe, cumque fuga voluptas impedit
                    dolore, quis necessitatibus, ullam alias. Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Aut sequi error et
                    laudantium praesentium dolores ipsam nostrum vitae quibusdam
                    pariatur saepe, cumque fuga voluptas impedit dolore, quis
                    necessitatibus, ullam alias. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Aut sequi error et laudantium
                    praesentium dolores ipsam nostrum vitae quibusdam pariatur
                    saepe, cumque fuga voluptas impedit dolore, quis
                    necessitatibus, ullam alias.
                  </p>
                </span>
                <span className="mt-5 font-bold text-lg">
                  Note:
                  <p className="text-md text-muted-foreground font-normal">
                    {returnPolicyString(data.refundpolicy)}
                  </p>
                </span>
              </div>

              <ReviewTable />
            </div>

            {/* <Button className="w-full mt-5 text-md cursor-pointer">
              <ShoppingCart size={24} />
              Add to Cart
            </Button> */}
            <CartButton
              productId={String(productId)}
              tenantSlug={data.tenant.slug}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
