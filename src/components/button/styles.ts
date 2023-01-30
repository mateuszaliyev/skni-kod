import { cva, type VariantProps } from "class-variance-authority";

import { cx } from "@/utilities/cx";

export type ButtonVariants = VariantProps<typeof button>;

export const button = cva(
  "flex select-none items-center justify-center gap-2 transition focus:outline-none disabled:cursor-not-allowed",
  {
    compoundVariants: [
      {
        className: "px-4",
        size: "large",
        variant: "contained",
      },
      {
        className: "px-3",
        size: "medium",
        variant: "contained",
      },
      {
        className: "px-2",
        size: "small",
        variant: "contained",
      },
    ],
    defaultVariants: {
      size: "medium",
      variant: "text",
    },
    variants: {
      size: {
        large: "h-12 text-base",
        medium: "h-10 text-base",
        small: "h-8 text-sm",
      },
      variant: {
        contained:
          "rounded-md border border-black bg-black font-bold text-white transition-colors hover:bg-transparent hover:text-gray-800 focus:bg-transparent focus:text-current dark:border-white dark:bg-white dark:enabled:text-black dark:enabled:hover:bg-transparent dark:enabled:hover:text-current focus:dark:bg-transparent focus:dark:text-current disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 dark:disabled:bg-gray-800 dark:disabled:border-gray-700",
        input:
          "rounded-r-md border-y border-r border-gray-300 bg-gray-50 px-3 py-2 shadow-sm transition enabled:hover:bg-gray-200 enabled:focus:bg-gray-200 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:shadow-none dark:border-white dark:bg-white dark:enabled:border-l dark:enabled:text-black dark:enabled:hover:bg-black dark:enabled:hover:text-white dark:enabled:focus:bg-black dark:enabled:focus:text-white dark:disabled:border-gray-700 dark:disabled:bg-gray-800",
        text: "rounded-md font-bold hover:text-sky-500 focus:text-sky-500 disabled:text-gray-500 disabled:hover:text-gray-500 disabled:focus:text-gray-500",
      },
    },
  }
);

export const gradient = () => ({
  background: cx(
    "relative flex h-full w-full items-center justify-center rounded-md bg-white px-3 text-base font-bold text-black transition group-hover:bg-white/0 group-hover:text-white group-focus:bg-white/0 group-focus:text-white dark:bg-black dark:text-white dark:group-hover:bg-black/0 dark:group-hover:text-black dark:group-focus:bg-black/0 dark:group-focus:text-black"
  ),
  border:
    "group relative flex h-12 w-48 cursor-pointer select-none rounded-md bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 p-px before:absolute before:block before:h-full before:w-full before:border-[12px] before:border-transparent before:bg-gradient-to-br before:from-cyan-400 before:via-sky-500 before:to-blue-600 before:bg-clip-padding before:blur-2xl focus:outline-none",
  text: "inline-block w-full truncate text-center",
});

export const hamburger = cva(
  "h-6 w-6 transition before:block before:h-px before:bg-current before:transition after:block after:h-px after:bg-current after:transition focus:outline-none focus:ring focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black",
  {
    defaultVariants: {
      open: false,
    },
    variants: {
      open: {
        false: "before:-translate-y-1 after:translate-y-1",
        true: "before:translate-y-px before:rotate-45 after:-rotate-45",
      },
    },
  }
);
