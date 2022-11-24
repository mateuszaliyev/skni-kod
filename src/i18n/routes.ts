import type { Locale } from "./types";

export const getI18nUrl = <Url>(url: Url, locale?: string) =>
  typeof url === "string" ? i18nRoutes[url]?.[locale as Locale] ?? url : url;

export const i18nRoutes: Record<string, Record<Locale, string>> = {
  // "/sign-in": {
  //   en: "/en/sign-in",
  //   pl: "/zaloguj",
  // },
};
