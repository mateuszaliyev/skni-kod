import type { ButtonHTMLAttributes, ReactNode } from "react";

import { button, type ButtonVariants } from "./styles";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    icon?: ReactNode;
  };

export const Button = ({
  children,
  className,
  height,
  icon,
  size = "medium",
  variant = "text",
  ...props
}: ButtonProps) => (
  <button className={button({ className, height, size, variant })} {...props}>
    {icon}
    <span className="inline-block truncate">{children}</span>
  </button>
);
