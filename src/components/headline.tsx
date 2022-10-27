import { forwardRef } from "react";

import clsx from "clsx";

import type { ForwardRefComponent } from "@/types";

export const Headline = forwardRef(
  ({ as: Component = "h2", className, ...props }, ref) => (
    <Component
      className={clsx("text-center text-4xl font-bold md:text-6xl", className)}
      ref={ref}
      {...props}
    />
  )
) as ForwardRefComponent<"h2">;
