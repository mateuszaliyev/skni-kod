import type { Session } from "next-auth";

import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import type { OpenApiMeta } from "trpc-openapi";

import { getServerSession } from "@/server/authentication";
import { prisma } from "@/server/database/client";

import { isModerator } from "@/utilities/permissions";

export type Context = inferAsyncReturnType<typeof createContext>;

export type CreateContextOptions = {
  session: Session | null;
};

/**
 * Context to use for:
 * - testing, to avoid mocking Next.js' request and response,
 * - tRPC's `createSSGHelpers`.
 */
export const createInnerContext = (
  { session }: CreateContextOptions = { session: null }
) => ({
  prisma,
  session,
});

/**
 * Context to use in a router.
 *
 * @see {@link https://trpc.io/docs/context tRPC Context Documentation}
 */
export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await getServerSession(req, res);

  return createInnerContext({ session });
};

export const { middleware, procedure, router } = initTRPC
  .context<Context>()
  .meta<OpenApiMeta>()
  .create({
    errorFormatter: ({ shape }) => shape,
    transformer: superjson,
  });

const authenticationMiddleware = middleware(({ ctx: { session }, next }) => {
  if (!session?.user) {
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

const moderatorMiddleware = middleware(({ ctx: { session }, next }) => {
  if (!session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (!isModerator(session.user.role)) {
    throw new TRPCError({ code: "FORBIDDEN" });
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

export const moderatorProcedure = procedure.use(moderatorMiddleware);
export const protectedProcedure = procedure.use(authenticationMiddleware);
