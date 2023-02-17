import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import type { VariantProps } from "class-variance-authority";

import { input } from "./styles";

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  Omit<VariantProps<typeof input>, "button" | "padding"> & {
    button?: ReactNode;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ button, className, disabled, invalid, ...props }, ref) => (
    <div className="flex">
      <input
        className={input({ button: Boolean(button), className, invalid })}
        disabled={disabled}
        ref={ref}
        {...props}
      />
      {button}
    </div>
  )
);
