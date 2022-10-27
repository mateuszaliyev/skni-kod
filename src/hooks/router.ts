import { type NextRouter, useRouter as useNextRouter } from "next/router";

import { getI18nUrl } from "@/i18n/routes";

export const useRouter = (): NextRouter => {
  const { prefetch, push, replace, ...router } = useNextRouter();

  return {
    ...router,
    prefetch: (url, ...parameters) =>
      prefetch(getI18nUrl(url, router.locale), ...parameters),
    push: (url, ...parameters) =>
      push(getI18nUrl(url, router.locale), ...parameters),
    replace: (url, ...parameters) =>
      replace(getI18nUrl(url, router.locale), ...parameters),
  };
};
