import { withI18nRoutes } from "@/i18n";

export const config = {
  matcher: "/:path*",
};

export const middleware = withI18nRoutes();
