import { forwardRef } from "react";

import { clsx } from "clsx";

import type { ForwardRefComponent } from "@/types";

export const Container = forwardRef(
  ({ as: Component = "div", className, ...props }, ref) => {
    return (
      <Component
        className={clsx("mx-auto w-full max-w-screen-xl px-4", className)}
        ref={ref}
        {...props}
      />
    );
  }
) as ForwardRefComponent<"div">;
