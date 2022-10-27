import type { ButtonHTMLAttributes } from "react";

import { clsx } from "clsx";

export type ButtonMenuProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label" | "children"
> & {
  label: {
    close: string;
    open: string;
  };
  open?: boolean;
};

export const ButtonMenu = ({
  className,
  label,
  open,
  ...props
}: ButtonMenuProps) => (
  <button
    aria-label={open ? label.close : label.open}
    className={clsx(
      "h-6 w-6 before:block before:h-px before:bg-current before:transition-transform after:block after:h-px after:bg-current after:transition-transform",
      open
        ? "before:translate-y-px before:rotate-45 after:-rotate-45"
        : "before:-translate-y-1 after:translate-y-1",
      className
    )}
    {...props}
  />
);
