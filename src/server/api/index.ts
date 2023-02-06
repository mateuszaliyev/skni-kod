import type { Session } from "next-auth";

import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import type { OpenApiMeta } from "trpc-openapi";

import { getServerSession } from "@/server/authentication";
import { prisma } from "@/server/database/client";

import { isModerator } from "@/utilities/permissions";

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
export const createContext = async ({
  req: request,
  res: response,
}: CreateNextContextOptions) => {
  const session = await getServerSession(request, response);

  return {
    ...createInnerContext({ session }),
    request,
    response,
  };
};

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
export const moderatorProcedure = procedure.use(moderatorMiddleware);
export const protectedProcedure = procedure.use(authenticationMiddleware);
