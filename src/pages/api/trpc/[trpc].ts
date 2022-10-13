import { createNextApiHandler } from "@trpc/server/adapters/next";

import { NODE_ENV } from "@/environment";

import { applicationRouter } from "@/server/router";
import { createContext } from "@/server/trpc/context";

export default createNextApiHandler({
  createContext,
  onError:
    NODE_ENV === "development"
      ? ({ error, path }) => {
          console.error(`❌ tRPC failed on ${path ?? ""}:`, error);
        }
      : undefined,
  router: applicationRouter,
});
