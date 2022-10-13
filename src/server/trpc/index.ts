import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { OpenApiMeta } from "trpc-openapi";

import type { Context } from "@/server/context";

const t = initTRPC
  .context<Context>()
  .meta<OpenApiMeta>()
  .create({
    errorFormatter: ({ shape }) => shape,
    transformer: superjson,
  });

const isAuthenticated = t.middleware(({ ctx: { session }, next }) => {
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

export const router = t.router;

export const protectedProcedure = t.procedure.use(isAuthenticated);

export const publicProcedure = t.procedure;
