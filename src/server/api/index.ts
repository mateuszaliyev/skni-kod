import type { Session } from "next-auth";

import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import type { OpenApiMeta } from "trpc-openapi";

import { getServerSession } from "@/server/authentication";
import { prisma } from "@/server/database/client";

import { isModerator } from "@/utilities/permissions";

export type CreateContextOptions = {
  request?: CreateNextContextOptions["req"];
  response?: CreateNextContextOptions["res"];
  session: Session | null;
};

/**
 * Context to use for:
 * - testing, to avoid mocking Next.js' request and response,
 * - tRPC's `createSSGHelpers`.
 */
export const createInnerContext = (
  options: CreateContextOptions = { session: null }
) => ({
  ...options,
  prisma,
});

/**
 * Context to use in a router.
 *
 * @see {@link https://trpc.io/docs/context tRPC Context Documentation}
 */
export const createContext = async ({
  req: request,
  res: response,
}: CreateNextContextOptions) =>
  createInnerContext({
    request,
    response,
    session: await getServerSession(request, response),
  });

export const { middleware, procedure, router } = initTRPC
  .context<typeof createContext>()
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

const moderatorMiddleware = authenticationMiddleware.unstable_pipe(
  ({ ctx: { session }, next }) => {
    if (!isModerator(session.user.role)) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return next({
      ctx: {
        session: {
          ...session,
          user: {
            ...session.user,
            role: session.user.role,
          },
        },
      },
    });
  }
);

const requestResponseMiddleware = middleware(
  ({ ctx: { request, response, ...context }, next }) => {
    if (!request || !response) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Either `request` or `response` is unavailable.",
      });
    }

    return next({
      ctx: {
        ...context,
        request,
        response,
      },
    });
  }
);

export const requestResponseProcedure = procedure.use(
  requestResponseMiddleware
);

export const moderatorProcedure =
  requestResponseProcedure.use(moderatorMiddleware);

export const protectedProcedure = requestResponseProcedure.use(
  authenticationMiddleware
);
