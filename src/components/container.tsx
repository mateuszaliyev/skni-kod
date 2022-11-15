import { forwardRef } from "react";

import type { ForwardRefComponent } from "@/types";

import { cx } from "@/utilities/cx";

export const Container = forwardRef(
  ({ as: Component = "div", className, ...props }, ref) => (
    <Component
      className={cx("mx-auto w-full max-w-screen-xl px-4", className)}
      ref={ref}
      {...props}
    />
  )
) as ForwardRefComponent<"div">;
