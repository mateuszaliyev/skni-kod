import { cva, type VariantProps } from "class-variance-authority";

import { cx } from "@/utilities/cx";

export type ButtonVariants = VariantProps<typeof button>;

export const button = cva(
  "flex select-none items-center justify-center gap-2 outline-none transition disabled:cursor-not-allowed",
  {
    compoundVariants: [
      {
        className: "h-12",
        height: true,
        size: "large",
      },
      {
        className: "h-10",
        height: true,
        size: "medium",
      },
      {
        className: "h-8",
        height: true,
        size: "small",
      },
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
      height: {
        false: "",
      },
      size: {
        large: "text-base",
        medium: "text-base",
        small: "text-sm",
      },
      variant: {
        contained:
          "rounded-md border border-black bg-black font-bold text-white transition-colors hover:bg-transparent hover:text-gray-800 focus-visible:bg-transparent focus-visible:text-current disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-400 dark:border-white dark:bg-white dark:text-black dark:disabled:text-gray-400 dark:hover:bg-transparent dark:hover:text-current dark:focus-visible:bg-transparent dark:focus-visible:text-current dark:disabled:border-gray-700 dark:disabled:bg-gray-800",
        input:
          "rounded-r-md border-y border-r border-gray-300 bg-gray-50 px-3 py-2 shadow-sm transition enabled:hover:bg-gray-200 enabled:focus-visible:bg-gray-200 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:shadow-none dark:border-white dark:bg-white dark:enabled:border-l dark:enabled:text-black dark:enabled:hover:bg-black dark:enabled:hover:text-white dark:enabled:focus-visible:bg-black dark:enabled:focus-visible:text-white dark:disabled:border-gray-700 dark:disabled:bg-gray-800",
        text: "rounded-md font-bold hover:text-sky-500 focus-visible:text-sky-500 disabled:text-gray-500 disabled:hover:text-gray-500 disabled:focus-visible:text-gray-500",
      },
    },
  }
);

export const gradient = () => ({
  background: cx(
    "relative flex h-full w-full items-center justify-center rounded-md bg-white px-3 text-base font-bold text-black transition group-hover:bg-white/0 group-hover:text-white group-focus-visible:bg-white/0 group-focus-visible:text-white dark:bg-black dark:text-white dark:group-hover:bg-black/0 dark:group-hover:text-black dark:group-focus-visible:bg-black/0 dark:group-focus-visible:text-black"
  ),
  border:
    "group relative flex h-12 w-48 cursor-pointer select-none rounded-md bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 p-px before:absolute before:block before:h-full before:w-full before:border-[12px] before:border-transparent before:bg-gradient-to-br before:from-cyan-400 before:via-sky-500 before:to-blue-600 before:bg-clip-padding before:blur-2xl focus-visible:outline-none",
  text: "inline-block w-full truncate text-center",
});

export const hamburger = cva(
  "h-6 w-6 transition before:block before:h-px before:bg-current before:transition after:block after:h-px after:bg-current after:transition",
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
