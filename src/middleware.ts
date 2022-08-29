import { withI18nRoutes } from "@/i18n";

export const config = {
  matcher: "/:path*",
};

export const middleware = withI18nRoutes({
  locales: ["en", "pl"] as const,
  routes: {
    "/sign-in": {
      action: "rewrite",
      destination: "/404",
      locale: "pl",
    },
    "/zaloguj": {
      action: "rewrite",
      destination: "/sign-in",
      locale: "pl",
    },
  },
});
