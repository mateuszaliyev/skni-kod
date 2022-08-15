import type { FormattersInitializer } from "typesafe-i18n";

import type { Formatters, Locales } from "./generated-types";

export const initFormatters: FormattersInitializer<Locales, Formatters> = (
  _locale: Locales
) => {
  const formatters: Formatters = {
    // add your formatter functions here
  };

  return formatters;
};
