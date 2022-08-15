import type { FC, ReactElement, ReactNode } from "react";

import type { NextApiHandler, NextPage } from "next";
import type { AppContext, AppProps } from "next/app";
import type {
  AppInitialProps,
  NextComponentType,
} from "next/dist/shared/lib/utils";
import type { Session } from "next-auth";

import type { Locale, Translations } from "@/i18n";

export type ApiHandler<ResponseBody = unknown> = NextApiHandler<ResponseBody>;

export type Application = NextComponentType<
  ApplicationContext,
  ApplicationInitialProps,
  ApplicationProps
>;

export type ApplicationContext = AppContext;

export type ApplicationInitialProps = AppInitialProps;

export type ApplicationPageProps = {
  i18n?: Record<Locale, Translations>;
  session: Session;
};

export type ApplicationProps = Omit<AppProps, "pageProps"> & {
  pageProps: ApplicationPageProps;
};

export type Component<
  Props extends Record<string, unknown> = Record<string, never>
> = FC<Props>;

export type Page<
  Props extends Record<string, unknown> = Record<string, never>
> = NextPage<Props> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
