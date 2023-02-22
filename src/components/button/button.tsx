import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";

import { button, type ButtonVariants } from "./styles";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    icon?: ReactNode;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      height,
      icon,
      size = "medium",
      variant = "text",
      ...props
    },
    ref
  ) => (
    <button
      className={button({ className, height, size, variant })}
      ref={ref}
      {...props}
    >
      {icon}
      <span className="inline-block truncate">{children}</span>
    </button>
  )
);
