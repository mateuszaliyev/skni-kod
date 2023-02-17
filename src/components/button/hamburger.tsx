import type { ButtonHTMLAttributes } from "react";

import { hamburger } from "./styles";

export type ButtonHamburgerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  open?: boolean;
};

export const ButtonHamburger = ({
  className,
  open,
  ...props
}: ButtonHamburgerProps) => (
  <button className={hamburger({ className, open })} {...props} />
);
