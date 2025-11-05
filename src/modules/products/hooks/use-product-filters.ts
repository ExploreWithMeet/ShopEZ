import { useQueryStates } from "nuqs";
import {
  parseAsInteger,
  parseAsStringEnum,
  createLoader,
  parseAsString,
} from "nuqs/server";

export const params = {
  min_price: parseAsInteger.withDefault(0).withOptions({
    clearOnDefault: true,
    history: "push",
  }),
  max_price: parseAsInteger.withDefault(0).withOptions({
    clearOnDefault: true,
    history: "push",
  }),
  sortby: parseAsStringEnum([
    "nosort",
    "name-a",
    "name-z",
    "price-l",
    "price-h",
    "new",
  ])
    .withDefault("nosort")
    .withOptions({
      clearOnDefault: true,
      history: "push",
    }),
  tenantSlug: parseAsString.withOptions({
    clearOnDefault: true,
    history: "push",
  }),
};

export const useProductFilters = () => {
  return useQueryStates(params, {
    history: "push",
    scroll: false,
  });
};

export const loadProductFilters = createLoader(params);
