import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(10),
        category: z.string().optional(),
        subcategory: z.string().optional(),
        min_price: z.number().optional().nullable(),
        max_price: z.number().optional().nullable(),
        sortby: z
          .enum(["nosort", "name-a", "name-z", "price-l", "price-h", "new"])
          .default("nosort"),
      })
    )
    .query(async ({ ctx, input }) => {
      let categoryIds: (string | number)[] | undefined;

      if (input.category) {
        const findCategory = await ctx.db.find({
          collection: "categories",
          limit: 1,
          pagination: false,
          where: { slug: { equals: input.category } },
        });

        if (findCategory.docs.length === 0) {
          return { docs: [], totalDocs: 0, nextCursor: undefined };
        }

        const category = findCategory.docs[0];

        const subcategories = await ctx.db.find({
          collection: "categories",
          pagination: false,
          where: { parent: { equals: category.id } },
        });

        categoryIds = [category.id, ...subcategories.docs.map((s) => s.id)];
      }

      if (input.subcategory) {
        const findSubcategory = await ctx.db.find({
          collection: "categories",
          limit: 1,
          pagination: false,
          where: { slug: { equals: input.subcategory } },
        });

        if (findSubcategory.docs.length === 0) {
          return { docs: [], totalDocs: 0, nextCursor: undefined };
        }

        categoryIds = [findSubcategory.docs[0].id];
      }

      const whereClause: any = {};

      if (categoryIds?.length) {
        whereClause.category =
          categoryIds.length === 1
            ? { equals: categoryIds[0] }
            : { in: categoryIds };
      }

      const priceConditions: any = {};
      if (input.min_price != null)
        priceConditions.greater_than_equal = input.min_price;
      if (input.max_price != null)
        priceConditions.less_than_equal = input.max_price;
      if (Object.keys(priceConditions).length)
        whereClause.price = priceConditions;

      let sort: string | undefined;
      switch (input.sortby) {
        case "price-l":
          sort = "price";
          break;
        case "price-h":
          sort = "-price";
          break;
        case "name-a":
          sort = "name";
          break;
        case "name-z":
          sort = "-name";
          break;
        case "new":
          sort = "-createdAt";
          break;
        default:
          sort = undefined;
          break;
      }

      const products = await ctx.db.find({
        collection: "products",
        depth: 1,
        where: Object.keys(whereClause).length ? whereClause : undefined,
        sort,
        page: input.cursor,
        limit: input.limit,
      });

      const hasNextPage = products.totalPages > input.cursor;
      const nextCursor = hasNextPage ? input.cursor + 1 : undefined;

      return {
        docs: products.docs,
        totalDocs: products.totalDocs,
        totalPages: products.totalPages,
        nextCursor,
      };
    }),

  search: baseProcedure
    .input(
      z.object({
        query: z.string(),
        cursor: z.number().default(1),
        limit: z.number().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { query, cursor, limit } = input;

      const products = await ctx.db.find({
        collection: "products",
        where: {
          or: [{ name: { like: query } }, { description: { like: query } }],
        },
        limit,
        sort: "-createdAt",
        depth: 1,
        page: cursor,
      });

      const nextCursor = products.docs.length < limit ? undefined : cursor + 1;

      return {
        docs: products.docs,
        nextCursor,
      };
    }),
});
