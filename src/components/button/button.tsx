import { type ButtonHTMLAttributes, type ReactNode } from "react";

import { button, type ButtonVariants } from "./styles";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    icon?: ReactNode;
  };

export const Button = ({
  children,
  className,
  icon,
  size = "medium",
  variant = "text",
  ...props
}: ButtonProps) => (
  <button
    className={button({
      className: className as string,
      size,
      variant,
    })}
    {...props}
  >
    {icon}
    <span className="inline-block truncate">{children}</span>
  </button>
);
