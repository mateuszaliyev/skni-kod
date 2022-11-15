import { type LinkProps, Link } from "@/components/link";

import { cx } from "@/utilities/cx";

export type NavigationLinkProps = LinkProps;

export const NavigationLink = ({ className, ...props }: LinkProps) => (
  <Link
    className={cx(
      "overflow-hidden text-ellipsis whitespace-nowrap py-4 font-bold lg:transition-colors lg:hover:text-sky-400",
      className
    )}
    {...props}
  />
);
