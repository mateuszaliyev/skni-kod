import { forwardRef } from "react";
import { mergeProps, useFocusRing } from "react-aria";

import { type LinkProps, Link } from "@/components/link";

import type { Merge } from "@/types";

import { type ButtonVariants, button } from "./styles";

export type ButtonLinkProps = Merge<
  LinkProps,
  Omit<ButtonVariants, "isFocusVisible">
>;

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (props, ref) => {
    const { className, size, variant, ...otherProps } = props;

    const { focusProps, isFocusVisible } = useFocusRing();

    return (
      <Link
        className={button({ className, isFocusVisible, size, variant })}
        ref={ref}
        {...mergeProps(focusProps, otherProps)}
      />
    );
  }
);
