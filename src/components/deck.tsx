import { forwardRef } from "react";

import clsx from "clsx";

import type { ForwardRefComponent } from "@/types";

export const Deck = forwardRef(
  ({ as: Component = "p", className, ...props }, ref) => (
    <Component
      className={clsx(
        "mx-auto max-w-prose text-center text-xl text-gray-500 dark:text-gray-400",
        className
      )}
      ref={ref}
      {...props}
    />
  )
) as ForwardRefComponent<"p">;
