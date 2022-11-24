import { AnchorHTMLAttributes, forwardRef } from "react";
import { type AriaLinkOptions, mergeProps, useLink } from "react-aria";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";

import { useForwardedRef } from "@/hooks/forwarded-ref";

import type { Locale } from "@/i18n";
import { getI18nUrl } from "@/i18n/routes";

import type { Merge } from "@/types";

export type LinkProps = Merge<
  Merge<
    Merge<AnchorHTMLAttributes<HTMLAnchorElement>, AriaLinkOptions>,
    Omit<NextLinkProps, "locale">
  >,
  {
    locale?: Locale;
  }
>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, forwardedRef) => {
    const { href, locale, rel, target, ...otherProps } = props;

    const ref = useForwardedRef(forwardedRef);

    const { locale: currentLocale } = useRouter();

    const { linkProps } = useLink(props, ref);

    const newRel =
      target === "_blank"
        ? rel
          ? rel.includes("noreferrer")
            ? rel
            : `noreferrer ${rel}`
          : "noreferrer"
        : rel;

    if (typeof href === "string" && !href.startsWith("/")) {
      return (
        <a
          href={href}
          rel={rel}
          target={target}
          {...mergeProps(linkProps, otherProps)}
        />
      );
    }

    const newHref = getI18nUrl(href, currentLocale);

    return (
      <NextLink
        href={newHref}
        locale={locale}
        rel={newRel}
        target={target}
        {...mergeProps(linkProps, otherProps)}
      />
    );
  }
);
