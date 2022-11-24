import { type VariantProps, cva } from "class-variance-authority";

export type ButtonVariants = VariantProps<typeof button>;

export const button = cva(
  "flex select-none items-center justify-center gap-2 rounded-md font-bold transition focus:outline-none",
  {
    compoundVariants: [
      {
        className: "bg-black text-white",
        isFocusVisible: false,
        variant: "contained",
      },
      {
        className:
          "bg-transparent text-current dark:bg-transparent dark:text-current",
        isFocusVisible: true,
        variant: "contained",
      },
      {
        className: "text-sky-400",
        isFocusVisible: true,
        variant: "text",
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
      isFocusVisible: {
        false: "",
        true: "",
      },
      size: {
        large: "h-12 text-base",
        medium: "h-10 text-base",
        small: "h-8 text-sm",
      },
      variant: {
        contained:
          "border border-black transition-colors hover:bg-transparent hover:text-gray-800 dark:border-white dark:bg-white dark:text-gray-800 dark:hover:bg-transparent dark:hover:text-current",
        text: "hover:text-sky-400",
      },
    },
  }
);

export const hamburger = cva(
  "h-6 w-6 transition before:block before:h-px before:bg-current before:transition-transform after:block after:h-px after:bg-current after:transition-transform focus:outline-none",
  {
    defaultVariants: {
      isFocusVisible: false,
      open: false,
    },
    variants: {
      isFocusVisible: {
        false: "",
        true: "ring ring-sky-400 ring-offset-2 ring-offset-white dark:ring-offset-black",
      },
      open: {
        false: "before:-translate-y-1 after:translate-y-1",
        true: "before:translate-y-px before:rotate-45 after:-rotate-45",
      },
    },
  }
);
