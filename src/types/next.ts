import type { NextApiHandler } from "next";
import type { AppType } from "next/app";
import type { Session } from "next-auth";

import type { Locale, Translations } from "@/i18n";

export type ApiHandler<ResponseBody = unknown> = NextApiHandler<ResponseBody>;

export type Application = AppType<ApplicationPageProps>;

export type ApplicationPageProps = {
  i18n?: Record<Locale, Translations>;
  session: Session;
};
