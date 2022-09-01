import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC as setupTRPC } from "@trpc/next";
import superjson from "superjson";

import { BASE_URL } from "@/environment";

import type { AppRouter } from "@/server/router";

export const withTRPC = setupTRPC<AppRouter>({
  config: () => ({
    links: [
      loggerLink({
        enabled: (options) =>
          process.env.NODE_ENV === "development" ||
          (options.direction === "down" && options.result instanceof Error),
      }),
      httpBatchLink({
        url: `${BASE_URL}/api/trpc`,
      }),
    ],
    /**
     * TODO: Choose a sane `staleTime` for React Query.
     *
     * @see {@link https://react-query.tanstack.com/reference/QueryClient QueryClient Reference}
     */
    queryClientConfig: {
      defaultOptions: {
        queries: {
          staleTime: 60,
        },
      },
    },
    transformer: superjson,
    url: `${BASE_URL}/api/trpc`,
  }),
  ssr: false,
});
