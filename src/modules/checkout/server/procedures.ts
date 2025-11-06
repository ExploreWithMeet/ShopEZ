import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { getCheckoutProductsSchema } from "@/types/schemas/checkout";
import { TRPCError } from "@trpc/server";

export const checkoutRouter = createTRPCRouter({
  getProducts: baseProcedure
    .input(getCheckoutProductsSchema)
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "products",
        depth: 1,
        where: {
          id: {
            in: input.ids,
          },
        },
      });

      if (data.totalDocs !== input.ids.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Products Not`,
        });
      }

      return { docs: data.docs };
    }),
});
