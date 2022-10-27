import { clsx } from "clsx";

import { type LinkProps, Link } from "@/components/link";

export type NavigationLinkProps = LinkProps;

export const NavigationLink = ({ className, ...props }: LinkProps) => (
  <Link
    className={clsx(
      "overflow-hidden text-ellipsis whitespace-nowrap py-4 font-bold lg:transition-colors lg:hover:text-sky-400",
      className
    )}
    {...props}
  />
);
