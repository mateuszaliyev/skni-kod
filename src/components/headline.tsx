import { forwardRef } from "react";

import type { ForwardRefComponent } from "@/types";

import { cx } from "@/utilities/cx";

export const Headline = forwardRef(
  ({ as: Component = "h2", className, ...props }, ref) => (
    <Component
      className={cx("text-center text-4xl font-bold md:text-6xl", className)}
      ref={ref}
      {...props}
    />
  )
) as ForwardRefComponent<"h2">;
