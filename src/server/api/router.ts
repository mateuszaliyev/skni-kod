import { router } from "@/server/api";

import { post } from "./routers/post";
import { user } from "./routers/user";

export type ApplicationRouter = typeof applicationRouter;

export const applicationRouter = router({
  post,
  user,
});
