import { unstable_getServerSession as getServerSession } from "next-auth";

import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

import { nextAuthOptions } from "@/server/authentication";
import { prisma } from "@/server/database/client";

export type Context = inferAsyncReturnType<typeof createContext>;

export const createContext = async (options?: CreateNextContextOptions) => {
  const request = options?.req;
  const response = options?.res;

  const session =
    request &&
    response &&
    (await getServerSession(request, response, nextAuthOptions));

  return {
    prisma,
    request,
    response,
    session,
  };
};
