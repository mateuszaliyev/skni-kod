import type { Locale } from "./types";
import { locales } from "./utilities";

export const isLocale = (locale: string): locale is Locale =>
  locales.includes(locale as Locale);
