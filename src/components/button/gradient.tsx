import { forwardRef } from "react";

import { clsx } from "clsx";

import type { ForwardRefComponent } from "@/types";

export const GradientButton = forwardRef(
  ({ as: Component = "button", children, className, ...props }, ref) => (
    <Component
      className={clsx(
        "group relative flex h-12 w-48 cursor-pointer select-none rounded-md bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 p-px before:absolute before:block before:h-full before:w-full before:border-[12px] before:border-transparent before:bg-gradient-to-br before:from-cyan-400 before:via-sky-500 before:to-blue-600 before:bg-clip-padding before:blur-2xl",
        className
      )}
      ref={ref}
      {...props}
    >
      <span className="relative flex h-full w-full items-center justify-center rounded-md bg-white px-3 text-base font-bold text-black transition-all group-hover:bg-white/0 group-hover:text-white dark:bg-black dark:text-white dark:group-hover:bg-black/0 dark:group-hover:text-black">
        <span className="inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap text-center">
          {children}
        </span>
      </span>
    </Component>
  )
) as ForwardRefComponent<"button">;
