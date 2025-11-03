import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { loginSchema, registerSchema } from "@/types/schemas/auth";
import { TRPCError } from "@trpc/server";
import { generateAuthCookies } from "@/lib/auth";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.db.auth({ headers });
    return session;
  }),

  registerUser: baseProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const existing = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: {
          or: [
            { username: { equals: input.username } },
            { email: { equals: input.email } },
          ],
        },
      });

      if (existing.docs[0]) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User Already Exists ",
        });
      }

      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
          username: input.username,
        },
      });

      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed Login",
        });
      }

      await generateAuthCookies({
        prefix: ctx.db.config.cookiePrefix,
        value: data.token,
      });

      return data;
    }),

  loginUser: baseProcedure
    .input(loginSchema)
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed Login",
        });
      }

      await generateAuthCookies({
        prefix: ctx.db.config.cookiePrefix,
        value: data.token,
      });

      return data;
    }),

  logoutUser: baseProcedure.mutation(async ({ ctx }) => {
    const cookies = await getCookies();
    cookies.delete(`${ctx.db.config.cookiePrefix}-token`);
  }),
});
