import { router } from "@trpc/server";
import type { OpenApiMeta } from "trpc-openapi";

import type { Context } from "@/server/router/context";

export const createRouter = () => router<Context, OpenApiMeta>();
