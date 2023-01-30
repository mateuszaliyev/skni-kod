import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

import { TRPC_URL } from "@/environment";

import type { ApplicationRouter } from "@/server/api/router";

export type RouterOutput = inferRouterOutputs<ApplicationRouter>;

export const api = createTRPCNext<ApplicationRouter>({
  config: () => ({
    links: [
      loggerLink({
        enabled: (options) =>
          process.env.NODE_ENV === "development" ||
          (options.direction === "down" && options.result instanceof Error),
      }),
      httpBatchLink({
        url: TRPC_URL,
      }),
    ],
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 1000 * 60 * 5,
        },
      },
    },
    transformer: superjson,
  }),
  ssr: false,
});
