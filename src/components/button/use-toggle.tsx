import type { RefObject } from "react";
import {
  type AriaToggleButtonProps,
  useFocusRing,
  useToggleButton,
} from "react-aria";
import { type ToggleProps, useToggleState } from "react-stately";

import type { Merge } from "@/types";

export type UseToggleOptions = Merge<
  Merge<ToggleProps, AriaToggleButtonProps>,
  {
    ref: RefObject<HTMLButtonElement>;
  }
>;

export const useToggle = (options: UseToggleOptions) => {
  const { ref, ...props } = options;

  const { focusProps, isFocusVisible } = useFocusRing();
  const state = useToggleState(props);
  const { buttonProps, isPressed } = useToggleButton(props, state, ref);

  return { buttonProps, focusProps, isFocusVisible, isPressed, ...state };
};
