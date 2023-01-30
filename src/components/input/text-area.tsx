import { forwardRef, type TextareaHTMLAttributes } from "react";

import { type VariantProps } from "class-variance-authority";

import { input } from "./styles";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  Omit<VariantProps<typeof input>, "button">;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, disabled, invalid, ...props }, ref) => (
    <textarea
      className={input({ className, invalid })}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  )
);
