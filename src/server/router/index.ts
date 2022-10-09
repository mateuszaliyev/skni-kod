import superjson from "superjson";

import { articleRouter } from "./article";
import { createRouter } from "./create";
import { newsRouter } from "./news";

export type AppRouter = typeof router;

export const router = createRouter()
  .transformer(superjson)
  .merge("article.", articleRouter)
  .merge("news.", newsRouter);
