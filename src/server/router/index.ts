import superjson from "superjson";

import { createRouter } from "./create";
import { exampleRouter } from "./example";

export type AppRouter = typeof router;

export const router = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter);
