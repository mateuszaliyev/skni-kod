import { createNextApiHandler } from "@trpc/server/adapters/next";

import { router } from "@/server/router";
import { createContext } from "@/server/router/context";

export default createNextApiHandler({
  createContext,
  router,
});
