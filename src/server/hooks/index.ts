import { createReactQueryHooks } from "@trpc/react";
import type { inferProcedureInput, inferProcedureOutput } from "@trpc/server";

import type { AppRouter } from "@/server/router";

export type inferMutationInput<
  TRouteKey extends keyof AppRouter["_def"]["mutations"]
> = inferProcedureInput<AppRouter["_def"]["mutations"][TRouteKey]>;

export type inferMutationOutput<
  TRouteKey extends keyof AppRouter["_def"]["mutations"]
> = inferProcedureOutput<AppRouter["_def"]["mutations"][TRouteKey]>;

export type inferQueryInput<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureInput<AppRouter["_def"]["queries"][TRouteKey]>;

export type inferQueryOutput<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;

export const {
  createClient,
  Provider,
  useContext,
  useDehydratedState,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useSubscription,
} = createReactQueryHooks<AppRouter>();
