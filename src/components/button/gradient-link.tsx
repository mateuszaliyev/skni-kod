import { Link, type LinkProps } from "@/components/link";

import { cx } from "@/utilities/cx";

import { gradient } from "./styles";

export type ButtonGradientLinkProps = LinkProps;

export const ButtonGradientLink = ({
  children,
  className,
  ...props
}: ButtonGradientLinkProps) => {
  const { background, border, text } = gradient();

  return (
    <Link className={cx(border, className)} {...props}>
      <span className={background}>
        <span className={text}>{children}</span>
      </span>
    </Link>
  );
};
