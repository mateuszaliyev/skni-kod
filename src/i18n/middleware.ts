import { type NextMiddleware, NextResponse } from "next/server";

import { i18nRoutes } from "./routes";
import type { Locale } from "./types";

export const withI18nRoutes =
  (middleware?: NextMiddleware): NextMiddleware =>
  (...parameters: Parameters<NextMiddleware>) => {
    const [request] = parameters;

    /**
     * @see {@link https://nextjs.org/docs/advanced-features/i18n-routing#prefixing-the-default-locale Next.js Internationalized Routing}
     */
    if (
      request.nextUrl.pathname.startsWith("/_next") ||
      request.nextUrl.pathname.includes("/api/") ||
      /\.(.*)$/.test(request.nextUrl.pathname)
    ) {
      return middleware?.(...parameters);
    }

    const path = request.nextUrl.href.slice(request.nextUrl.origin.length);

    let i18nRoute: {
      locale: Locale;
      pathname: string;
      source: string;
    } | null = null;

    for (const [pathname, locales] of Object.entries(i18nRoutes)) {
      for (const [locale, source] of Object.entries(locales)) {
        if (path === source) {
          i18nRoute = {
            locale: locale as Locale,
            pathname,
            source,
          };
          break;
        }
      }

      if (i18nRoute) {
        break;
      }
    }

    const url = request.nextUrl.clone();

    if (i18nRoute) {
      url.locale = i18nRoute.locale;
      url.pathname = i18nRoute.pathname;

      return NextResponse.rewrite(url);
    }

    if (path in i18nRoutes) {
      url.pathname = "/404";

      return NextResponse.rewrite(url);
    }

    return middleware?.(...parameters);
  };
