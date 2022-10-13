import { createNextApiHandler } from "@trpc/server/adapters/next";

import { NODE_ENV } from "@/environment";

import { createContext } from "@/server/context";
import { applicationRouter } from "@/server/router";

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
