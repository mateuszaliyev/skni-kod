import { createNextApiHandler } from "@trpc/server/adapters/next";

import { NODE_ENV } from "@/environment";

import { createContext } from "@/server/api";
import { applicationRouter as router } from "@/server/api/router";

export const nextApiHandler = createNextApiHandler({
  createContext,
  onError:
    NODE_ENV === "development"
      ? ({ error, path }) => {
          console.error(`❌ tRPC failed on ${path ?? ""}:`, error);
        }
      : undefined,
  router,
});
