import { type ElementType, forwardRef } from "react";
import { mergeProps, useFocusRing } from "react-aria";

import type {
  PolymorphicComponent,
  PolymorphicProps,
  PolymorphicRef,
} from "@/types";

import { cx } from "@/utilities/cx";

export type GradientButtonDefaultElement =
  typeof GRADIENT_BUTTON_DEFAULT_ELEMENT;

export const GRADIENT_BUTTON_DEFAULT_ELEMENT = "button";

export const GradientButton: PolymorphicComponent<GradientButtonDefaultElement> =
  forwardRef(
    <Element extends ElementType = GradientButtonDefaultElement>(
      props: PolymorphicProps<Element>,
      ref: PolymorphicRef<Element>
    ) => {
      const {
        children,
        className,
        component: Component = GRADIENT_BUTTON_DEFAULT_ELEMENT,
        ...otherProps
      } = props;

      const { focusProps, isFocusVisible } = useFocusRing();

      return (
        <Component
          className={cx(
            "group relative flex h-12 w-48 cursor-pointer select-none rounded-md bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 p-px before:absolute before:block before:h-full before:w-full before:border-[12px] before:border-transparent before:bg-gradient-to-br before:from-cyan-400 before:via-sky-500 before:to-blue-600 before:bg-clip-padding before:blur-2xl focus:outline-none",
            className as string
          )}
          ref={ref}
          {...mergeProps(focusProps as Record<string, unknown>, otherProps)}
        >
          <span
            className={cx(
              "relative flex h-full w-full items-center justify-center rounded-md bg-white px-3 text-base font-bold text-black transition group-hover:bg-white/0 group-hover:text-white dark:bg-black dark:text-white dark:group-hover:bg-black/0 dark:group-hover:text-black",
              isFocusVisible &&
                "bg-white/0 text-white dark:bg-black/0 dark:text-black"
            )}
          >
            <span className="inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap text-center">
              {children}
            </span>
          </span>
        </Component>
      );
    }
  );
