import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { GetInferenceHelpers } from "@trpc/server";
import superjson from "superjson";

import { TRPC_URL } from "@/environment";

import type { ApplicationRouter } from "@/server/router";

/**
 * Inference helpers
 * @example type HelloOutput = ApplicationRouterTypes["example"]["hello"]["output"]
 **/
export type ApplicationRouterTypes = GetInferenceHelpers<ApplicationRouter>;

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
