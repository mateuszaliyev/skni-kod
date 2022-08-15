import { createOpenApiNextHandler } from "trpc-openapi";

import { router } from "@/server/router";
import { createContext } from "@/server/router/context";

export default createOpenApiNextHandler({
  createContext,
  router,
});
