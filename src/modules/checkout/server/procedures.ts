import { stripe } from "@/lib/stripe";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TCheckoutMetadata, TProductMetaData } from "@/types";
import {
  getCheckoutProductsSchema,
  getPurchaseProductSchema,
} from "@/types/schemas/checkout";
import { TRPCError } from "@trpc/server";
import Stripe from "stripe";

export const checkoutRouter = createTRPCRouter({
  purchase: protectedProcedure
    .input(getPurchaseProductSchema)
    .mutation(async ({ ctx, input }) => {
      const products = await ctx.db.find({
        collection: "products",
        depth: 2,
        where: {
          and: [
            {
              id: {
                in: input.productIds,
              },
            },
            {
              "tenant.slug": {
                equals: input.tenantSlug,
              },
            },
          ],
        },
      });

      if (products.totalDocs !== input.productIds.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Products Not Found!",
        });
      }

      const tenants = await ctx.db.find({
        collection: "tenants",
        limit: 1,
        pagination: false,
        where: {
          slug: {
            equals: input.tenantSlug,
          },
        },
      });

      const tenant = tenants.docs[0];

      if (!tenant) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Tenants Not Found!",
        });
      }

      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        products.docs.map((prod) => ({
          quantity: 1,
          price_data: {
            unit_amount: prod.price * 100,
            currency: "inr",
            product_data: {
              name: prod.name,
              metadata: {
                stripeAccountId: tenant.stripeAccountId,
                id: prod.id,
                name: prod.name,
                price: prod.price * 100,
              } as TProductMetaData,
            },
          },
        }));

      const checkout = await stripe.checkout.sessions.create({
        customer_email: ctx.session.user.email,
        success_url: `${process.env.NEXT_APP_URL}/tenants/${input.tenantSlug}/checkout?success=true`,
        cancel_url: `${process.env.NEXT_APP_URL}/tenants/${input.tenantSlug}/checkout?cancel=true`,
        mode: "payment",
        line_items: lineItems,
        invoice_creation: {
          enabled: true,
        },
        metadata: {
          userId: ctx.session.user.id,
        } as TCheckoutMetadata,
      });

      if (!checkout.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create Checkout Session",
        });
      }

      return { url: checkout.url };
    }),

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
