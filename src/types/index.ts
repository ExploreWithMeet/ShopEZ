import type { Stripe } from "stripe";

export type NavItem = {
  href: string;
  label: string;
  isActive: boolean;
};

export type TSortBy =
  | "nosort"
  | "name-a"
  | "name-z"
  | "price-l"
  | "price-h"
  | "new";

export type TPriceStates = {
  min: number;
  max: number;
};

export type TProductMetaData = {
  stripeAccountId: string;
  id: string;
  name: string;
  price: number;
};

export type TCheckoutMetadata = {
  userId: string;
};

export type TExpandedLineItem = Stripe.LineItem & {
  price: Stripe.Price & {
    product: Stripe.Product & {
      metadata: TProductMetaData;
    };
  };
};
