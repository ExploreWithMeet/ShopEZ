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
