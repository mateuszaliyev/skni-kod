import type { AnchorHTMLAttributes } from "react";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";

import type { Locale } from "@/i18n";
import { i18nRoutes } from "@/i18n/routes";

import { Component } from "@/types";

export type LinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof NextLinkProps
> &
  Omit<NextLinkProps, "locale"> & {
    locale?: Locale;
  };

export const Link: Component<LinkProps> = ({
  href,
  locale,
  rel,
  target,
  ...props
}) => {
  const { locale: currentLocale } = useRouter();

  const newHref =
    typeof href === "string"
      ? i18nRoutes[href]?.[locale ?? (currentLocale as Locale)] ?? href
      : href;

  const newRel =
    target === "_blank"
      ? rel
        ? rel.includes("noreferrer")
          ? rel
          : `noreferrer ${rel}`
        : "noreferrer"
      : rel;

  return (
    <NextLink
      href={newHref}
      locale={locale}
      rel={newRel}
      target={target}
      {...props}
    />
  );
};
