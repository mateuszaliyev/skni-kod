import NextHead from "next/head";

import { useUrl } from "@/hooks/url";

import { useI18nContext } from "@/i18n";

export type Font =
  | "black"
  | "black-italic"
  | "bold"
  | "bold-italic"
  | "extrabold"
  | "extrabold-italic"
  | "extralight"
  | "extralight-italic"
  | "italic"
  | "light"
  | "light-italic"
  | "medium"
  | "medium-italic"
  | "semibold"
  | "semibold-italic"
  | "thin"
  | "thin-italic";

export type MetaProps = {
  description?: string;
  preloadFonts?: Font[];
  title?: string;
};

export const Meta = ({ description, preloadFonts = [], title }: MetaProps) => {
  const { LL } = useI18nContext();

  const url = useUrl();

  return (
    <NextHead>
      {["regular", ...preloadFonts].map((font) => (
        <link
          as="font"
          crossOrigin="anonymous"
          href={`/fonts/lato/lato-latin-${font}.woff2`}
          key={font}
          rel="preload"
          type="font/woff2"
        />
      ))}
      <link href={url} rel="canonical" />
      <meta content={description ?? LL.skniKod.name()} name="description" />
      <title>{title ?? LL.skniKod.name()}</title>
    </NextHead>
  );
};
