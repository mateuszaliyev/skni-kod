import { cx } from "@/utilities/cx";

import type { ButtonProps } from "./button";
import { type ButtonVariants, gradient } from "./styles";

export type ButtonGradientProps = Omit<ButtonProps, keyof ButtonVariants>;

export const ButtonGradient = ({
  children,
  className,
  icon,
  ...props
}: ButtonGradientProps) => {
  const { background, border, text } = gradient();

  return (
    <button className={cx(border, className)} {...props}>
      <span className={background}>
        {icon}
        <span className={text}>{children}</span>
      </span>
    </button>
  );
};
