import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import {
  type AriaButtonProps,
  mergeProps,
  useButton,
  useFocusRing,
} from "react-aria";

import { useForwardedRef } from "@/hooks/forwarded-ref";

import type { Merge } from "@/types";

import { omit } from "@/utilities/omit";

import { type ButtonVariants, button } from "./styles";

export type ButtonProps = Merge<
  Merge<
    Merge<ButtonHTMLAttributes<HTMLButtonElement>, AriaButtonProps<"button">>,
    ButtonVariants
  >,
  {
    icon?: ReactNode;
  }
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const {
      children,
      className,
      icon,
      size = "medium",
      variant = "text",
      ...otherProps
    } = props;

    const ref = useForwardedRef(forwardedRef);

    const { buttonProps } = useButton(props, ref);
    const { focusProps, isFocusVisible } = useFocusRing();

    const buttonElementProps = omit(otherProps, [
      "elementType",
      "excludeFromTabOrder",
      "href",
      "isDisabled",
      "onFocusChange",
      "onPress",
      "onPressChange",
      "onPressEnd",
      "onPressStart",
      "onPressUp",
      "rel",
      "target",
    ]);

    return (
      <button
        className={button({
          className: className as string,
          isFocusVisible,
          size,
          variant,
        })}
        ref={ref}
        {...mergeProps(buttonElementProps, buttonProps, focusProps)}
      >
        {icon}
        <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap">
          {children}
        </span>
      </button>
    );
  }
);
