import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";

import { TRPC_URL } from "@/environment";

import type { ApplicationRouter } from "@/server/router";

export const trpc = createTRPCNext<ApplicationRouter>({
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
          staleTime: 1000 * 60 * 5,
        },
      },
    },
    transformer: superjson,
  }),
  ssr: false,
});
