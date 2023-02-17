import type { LabelHTMLAttributes, ReactNode } from "react";

import { cx } from "@/utilities/cx";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  error?: boolean;
  label: string;
  message?: ReactNode;
  messageIcon?: ReactNode;
};

export const Label = ({
  children,
  className,
  error,
  label,
  message,
  messageIcon,
  ...props
}: LabelProps) => (
  <label className={cx("flex flex-col gap-1", className)} {...props}>
    <div className="font-bold">{label}</div>
    {children}
    <div
      className={cx(
        "flex h-6 items-center gap-2",
        error ? "text-rose-500" : "text-sky-500"
      )}
    >
      {messageIcon}
      <span>{message}</span>
    </div>
  </label>
);
