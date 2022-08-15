import { TRPCError } from "@trpc/server";

import { createRouter } from "./create";

export const createProtectedRouter = () =>
  createRouter().middleware(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return next({
      ctx: {
        ...ctx,
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });
