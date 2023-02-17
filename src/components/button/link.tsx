import type { ReactNode } from "react";

import { Link, type LinkProps } from "@/components/link";

import { button, type ButtonVariants } from "./styles";

// declare module "react" {
//   function forwardRef<Element, Props = {}>(
//     render: (props: Props, ref: Ref<Element>) => ReactElement | null
//   ): (props: Props & RefAttributes<Element>) => ReactElement | null;
// }

export type ButtonLinkProps = Omit<LinkProps, "variant"> &
  ButtonVariants & {
    icon?: ReactNode;
  };

export const ButtonLink = ({
  children,
  className,
  height,
  icon,
  size,
  variant,
  ...props
}: ButtonLinkProps) => (
  <Link className={button({ className, height, size, variant })} {...props}>
    {icon}
    <span className="inline-block truncate">{children}</span>
  </Link>
);
