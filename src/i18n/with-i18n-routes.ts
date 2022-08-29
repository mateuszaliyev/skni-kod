import { type NextMiddleware, NextResponse } from "next/server";

export type WithI18nRoutesOptions<
  Locales extends readonly [string, ...string[]]
> = {
  locales: Locales;
  routes: Partial<
    Record<
      string,
      {
        action: "redirect" | "rewrite";
        destination: string;
        locale: Locales[number];
      }
    >
  >;
};

/**
 * @see {@link https://nextjs.org/docs/advanced-features/i18n-routing#prefixing-the-default-locale Next.js Internationalized Routing}
 */
export const withI18nRoutes =
  <Locales extends readonly [string, ...string[]]>(
    options: WithI18nRoutesOptions<Locales>,
    middleware?: NextMiddleware
  ): NextMiddleware =>
  (...parameters: Parameters<NextMiddleware>) => {
    const [request] = parameters;

    if (
      request.nextUrl.pathname.startsWith("/_next") ||
      request.nextUrl.pathname.includes("/api/") ||
      /\.(.*)$/.test(request.nextUrl.pathname)
    ) {
      if (middleware) {
        return middleware(...parameters);
      }

      return;
    }

    const url = request.nextUrl.clone();

    const i18nRoute =
      options.routes[request.nextUrl.href.slice(request.nextUrl.origin.length)];

    if (i18nRoute) {
      url.locale = i18nRoute.locale;
      url.pathname = i18nRoute.destination;

      return NextResponse[i18nRoute.action](
        i18nRoute.action === "redirect"
          ? new URL(i18nRoute.destination, request.url)
          : url
      );
    }
  };
