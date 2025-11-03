import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().optional(),
        subcategory: z.string().optional(),
        min_price: z.number().optional().nullable(),
        max_price: z.number().optional().nullable(),
      })
    )
    .query(async ({ ctx, input }) => {
      // Build the where clause dynamically
      let categoryIds: (string | number)[] | undefined;

      // Handle category filtering
      if (input.category) {
        const findCategory = await ctx.db.find({
          collection: "categories",
          limit: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        if (findCategory.docs.length === 0) {
          return { docs: [], totalDocs: 0 };
        }

        const category = findCategory.docs[0];

        // Find all subcategories of this category
        const subcategories = await ctx.db.find({
          collection: "categories",
          pagination: false,
          where: {
            parent: {
              equals: category.id,
            },
          },
        });

        categoryIds = [category.id, ...subcategories.docs.map((sub) => sub.id)];
      }

      // Handle subcategory filtering (overrides category if both provided)
      if (input.subcategory) {
        const findSubcategory = await ctx.db.find({
          collection: "categories",
          limit: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.subcategory,
            },
          },
        });

        if (findSubcategory.docs.length === 0) {
          return { docs: [], totalDocs: 0 };
        }

        categoryIds = [findSubcategory.docs[0].id];
      }

      // Build where clause
      const whereClause: any = {};

      // Add category filter if we have categoryIds
      if (categoryIds && categoryIds.length > 0) {
        if (categoryIds.length === 1) {
          whereClause.category = {
            equals: categoryIds[0],
          };
        } else {
          whereClause.category = {
            in: categoryIds,
          };
        }
      }

      // Add price filters if provided
      const priceConditions: any = {};

      if (input.min_price !== null && input.min_price !== undefined) {
        priceConditions.greater_than_equal = input.min_price;
      }

      if (input.max_price !== null && input.max_price !== undefined) {
        priceConditions.less_than_equal = input.max_price;
      }

      // Only add price to where clause if we have conditions
      if (Object.keys(priceConditions).length > 0) {
        whereClause.price = priceConditions;
      }

      // Fetch products
      const products = await ctx.db.find({
        collection: "products",
        depth: 1,
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      });

      return products;
    }),
});
