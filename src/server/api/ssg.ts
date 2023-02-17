import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";

import { createInnerContext } from "@/server/api";
import { applicationRouter as router } from "@/server/api/router";

export const getSsg = () =>
  createProxySSGHelpers({
    ctx: createInnerContext(),
    router,
    transformer: superjson,
  });
