import { forwardRef } from "react";

import clsx from "clsx";

import type { ForwardRefComponent } from "@/types";

export const Kicker = forwardRef(
  ({ as: Component = "div", className, ...props }, ref) => (
    <Component
      className={clsx(
        "text-center text-sm font-black uppercase tracking-kicker text-sky-400",
        className
      )}
      ref={ref}
      {...props}
    />
  )
) as ForwardRefComponent<"div">;
