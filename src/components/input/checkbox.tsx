import { GoCheck } from "react-icons/go";

import { Switch } from "@headlessui/react";

import { cx } from "@/utilities/cx";

export type CheckboxProps = {
  checked?: boolean;
  onChange?: (value: boolean) => void;
};

export const Checkbox = ({ checked, onChange }: CheckboxProps) => (
  <Switch
    checked={checked}
    className={cx(
      "h-4 w-4 rounded border outline-none transition focus-visible:border-sky-500 focus-visible:ring-1 focus-visible:ring-sky-500",
      checked ? "border-sky-500" : "border-gray-300 dark:border-gray-700"
    )}
    onChange={onChange}
  >
    <span
      aria-hidden="true"
      className={cx(
        "flex h-full items-center justify-center bg-sky-500 text-white transition dark:text-black",
        checked ? "opacity-100" : "opacity-0"
      )}
    >
      <GoCheck className="h-4 w-4" />
    </span>
  </Switch>
);
