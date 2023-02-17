import { cva } from "class-variance-authority";

export const input = cva(
  "flex w-full resize-none border bg-white px-3 py-2 text-left shadow-sm outline-none transition placeholder:text-gray-400 focus:ring-1 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:shadow-none dark:bg-black dark:placeholder:text-gray-500 dark:disabled:border-gray-700 dark:disabled:bg-gray-800 sm:text-sm",
  {
    defaultVariants: {
      button: false,
      invalid: false,
    },
    variants: {
      button: {
        false: "rounded-md",
        true: "rounded-l-md",
      },
      invalid: {
        false:
          "border-gray-300 focus:border-sky-500 focus:ring-sky-500 dark:border-gray-700 dark:focus:border-sky-500",
        true: "border-rose-500 text-rose-600 focus:border-rose-500 focus:ring-rose-500",
      },
    },
  }
);

export const item = cva(
  "flex cursor-pointer select-none items-center gap-2 rounded-md p-2 transition",
  {
    variants: {
      active: {
        true: "bg-sky-500 text-white dark:bg-gray-700",
      },
    },
  }
);
