import { type ButtonHTMLAttributes, forwardRef } from "react";
import { mergeProps } from "react-aria";

import { useForwardedRef } from "@/hooks/forwarded-ref";

import type { Merge } from "@/types";

import { omit } from "@/utilities/omit";

import { hamburger } from "./styles";
import { type UseToggleOptions, useToggle } from "./use-toggle";

export type ButtonHamburgerProps = Merge<
  Merge<
    ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<UseToggleOptions, "isSelected" | "ref">
  >,
  {
    open?: boolean;
  }
>;

export const ButtonHamburger = forwardRef<
  HTMLButtonElement,
  ButtonHamburgerProps
>((props, forwardedRef) => {
  const { className, open, ...otherProps } = props;

  const ref = useForwardedRef(forwardedRef);

  const { buttonProps, focusProps, isFocusVisible, isSelected } = useToggle({
    ...props,
    isSelected: open,
    ref,
  });

  const buttonElementProps = omit(otherProps, [
    "defaultSelected",
    "elementType",
    "excludeFromTabOrder",
    "isDisabled",
    "isReadOnly",
    "isRequired",
    "onFocusChange",
    "onPress",
    "onPressChange",
    "onPressEnd",
    "onPressStart",
    "onPressUp",
    "validationState",
  ]);

  return (
    <button
      className={hamburger({ className, isFocusVisible, open: isSelected })}
      ref={ref}
      {...mergeProps(buttonElementProps, buttonProps, focusProps)}
    />
  );
});
