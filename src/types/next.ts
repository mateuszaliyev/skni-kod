import type {
  GetStaticProps,
  InferGetStaticPropsType,
  NextApiHandler,
  NextComponentType,
} from "next";
import type { AppContextType, AppPropsType } from "next/dist/shared/lib/utils";
import type { NextRouter } from "next/router";
import type { Session } from "next-auth";

export type ApiHandler<ResponseBody = unknown> = NextApiHandler<ResponseBody>;

/**
 * TODO: Currently `router` type is inferred as `any`. Simplify this type
 * definition when the issue is resolved.
 *
 * @example export type Application = AppType<ApplicationPageProps>
 */
export type Application = NextComponentType<
  AppContextType,
  ApplicationPageProps,
  AppPropsType<NextRouter, ApplicationPageProps>
>;

export type ApplicationPageProps = {
  session: Session;
};

export type InferGetStaticProps<GetStaticPropsFunction extends GetStaticProps> =
  Omit<InferGetStaticPropsType<GetStaticPropsFunction>, "trpcState">;
