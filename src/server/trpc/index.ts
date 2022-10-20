import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { OpenApiMeta } from "trpc-openapi";

import type { Context } from "@/server/trpc/context";

export const { middleware, procedure, router } = initTRPC
  .context<Context>()
  .meta<OpenApiMeta>()
  .create({
    errorFormatter: ({ shape }) => shape,
    transformer: superjson,
  });

const isAuthenticated = middleware(({ ctx: { session }, next }) => {
  if (!session || !session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: {
        ...session,
        user: session.user,
      },
    },
  });
});

export const protectedProcedure = procedure.use(isAuthenticated);
