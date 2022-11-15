import { forwardRef } from "react";

import type { ForwardRefComponent } from "@/types";

import { cx } from "@/utilities/cx";

export const Deck = forwardRef(
  ({ as: Component = "p", className, ...props }, ref) => (
    <Component
      className={cx(
        "mx-auto max-w-prose text-center text-xl text-gray-500",
        className
      )}
      ref={ref}
      {...props}
    />
  )
) as ForwardRefComponent<"p">;
