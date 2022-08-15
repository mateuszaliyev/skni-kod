import { isLocale } from "./is-locale";
import type { Locale, Namespace, Translations } from "./types";
import { baseLocale, loadedLocales } from "./utilities";
import { loadLocaleAsync, loadNamespaceAsync } from "./utilities.async";

export const getI18nProps = async (
  locale: string = baseLocale,
  namespaces?: Namespace[]
): Promise<{ i18n: Record<Locale, Translations> }> => {
  if (isLocale(locale)) {
    await loadLocaleAsync(locale);

    if (namespaces && namespaces.length > 0) {
      await Promise.all(
        namespaces.map(
          async (namespace) => await loadNamespaceAsync(locale, namespace)
        )
      );
    }
  }

  return {
    i18n: loadedLocales,
  };
};
