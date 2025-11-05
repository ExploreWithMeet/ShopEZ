import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { getOneTenantSchema } from "@/types/schemas/tenants";
import { TRPCError } from "@trpc/server";

export const tenantRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(getOneTenantSchema)
    .query(async ({ ctx, input }) => {
      const tenants = await ctx.db.find({
        collection: "tenants",
        depth: 1,
        limit: 1,
        pagination: false,
        where: {
          slug: {
            equals: input.slug,
          },
        },
      });

      const tenant = tenants.docs[0];

      if (!tenant)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tenant Not Found!",
        });

      return tenants.docs[0];
    }),
});
