import { forwardRef } from "react";

import type { ForwardRefComponent } from "@/types";

import { cx } from "@/utilities/cx";

export const Kicker = forwardRef(
  ({ as: Component = "div", className, ...props }, ref) => (
    <Component
      className={cx(
        "text-center text-sm font-black uppercase tracking-kicker text-sky-400",
        className
      )}
      ref={ref}
      {...props}
    />
  )
) as ForwardRefComponent<"div">;
