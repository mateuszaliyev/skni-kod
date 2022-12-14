// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */

import { initFormatters } from "./formatters";
import type { Locales, Translations } from "./generated-types";
import { loadedFormatters, loadedLocales, locales } from "./utilities";

import en from "./en";
import pl from "./pl";

import en_home from "./en/home";
import pl_home from "./pl/home";

const localeTranslations = {
  en: {
    ...en,
    home: en_home,
  },
  pl: {
    ...pl,
    home: pl_home,
  },
};

export const loadLocale = (locale: Locales): void => {
  if (loadedLocales[locale]) return;

  loadedLocales[locale] = localeTranslations[locale] as unknown as Translations;
  loadFormatters(locale);
};

export const loadAllLocales = (): void => locales.forEach(loadLocale);

export const loadFormatters = (locale: Locales): void =>
  void (loadedFormatters[locale] = initFormatters(locale));
