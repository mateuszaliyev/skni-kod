import type { Session } from "next-auth";

import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

import { getServerSession } from "@/server/authentication";
import { prisma } from "@/server/database/client";

export type Context = inferAsyncReturnType<typeof createContext>;

export type CreateContextOptions = {
  session: Session | null;
};

/**
 * Use this helper for:
 * - testing, to avoid mocking Next.js' request and response,
 * - tRPC's `createSSGHelpers`.
 */
export const createInnerContext = ({ session }: CreateContextOptions) => ({
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

  return createInnerContext({ session });
};
