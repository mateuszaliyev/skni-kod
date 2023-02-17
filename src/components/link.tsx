import { type AnchorHTMLAttributes, forwardRef } from "react";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";

import { cva, VariantProps } from "class-variance-authority";

import type { Merge } from "@/types";

// declare module "react" {
//   function forwardRef<Element, Props = {}>(
//     render: (props: Props, ref: Ref<Element>) => ReactElement | null
//   ): (props: Props & RefAttributes<Element>) => ReactElement | null;
// }

export type LinkProps = Merge<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  NextLinkProps
> &
  VariantProps<typeof link>;

const link = cva("", {
  variants: {
    variant: {
      content:
        "break-words text-sky-500 outline-none transition hover:text-black focus-visible:text-black dark:hover:text-white dark:focus-visible:text-white",
    },
  },
});

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, href, rel, target, variant, ...props }, ref) => {
    const newRel =
      target === "_blank"
        ? rel
          ? rel.includes("noreferrer")
            ? rel
            : `noreferrer ${rel}`
          : "noreferrer"
        : rel;

    const samePage = typeof href === "string" && href.startsWith("#");

    return samePage ? (
      <a
        className={link({ className, variant })}
        href={href}
        ref={ref}
        rel={newRel}
        target={target}
        {...props}
      />
    ) : (
      <NextLink
        className={link({ className, variant })}
        href={href}
        ref={ref}
        rel={newRel}
        target={target}
        {...props}
      />
    );
  }
);
