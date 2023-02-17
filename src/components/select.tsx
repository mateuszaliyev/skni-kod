import { Fragment, type Key, type ReactNode } from "react";
import { MdDone, MdExpandMore } from "react-icons/md";

import { Listbox, Transition } from "@headlessui/react";
import type { VariantProps } from "class-variance-authority";

import { input, item } from "@/components/input/styles";

import { useSelect } from "@/hooks/select";

import { OPTIONS_STYLES, TRANSITION_STYLES } from "@/styles";

import { cx } from "@/utilities/cx";

export type Option<Value> = {
  icon?: ReactNode;
  key: Key;
  text: string;
  value: Value;
};

export type SelectOptionProps = Pick<Option<unknown>, "icon" | "text"> & {
  active: boolean;
  selected: boolean;
};

export type SelectProps<Value> = Pick<VariantProps<typeof input>, "invalid"> & {
  by?: (
    a: Value extends (infer Item)[] ? Item : Value,
    b: Value extends (infer Item)[] ? Item : Value
  ) => boolean;
  onChange?: (value: Value) => void;
  options: Option<Value extends (infer Item)[] ? Item : Value>[];
  value: Value;
};

export const SelectOption = ({
  active,
  icon,
  selected,
  text,
}: SelectOptionProps) => (
  <>
    <span
      className={cx(
        "block transition",
        active ? "text-white" : "text-sky-500 dark:text-gray-500"
      )}
    >
      {icon}
    </span>
    <span className="block truncate">{text}</span>
    {selected && (
      <MdDone
        aria-hidden="true"
        className={cx(
          "ml-auto h-5 w-5 transition",
          active ? "text-white" : "text-sky-500"
        )}
      />
    )}
  </>
);

export const Select = <Value,>({
  by,
  invalid,
  onChange,
  options,
  value,
}: SelectProps<Value>) => {
  const displayValue = options
    .filter((option) =>
      Array.isArray(value)
        ? value.includes(option.value)
        : value === option.value
    )
    .map((option) => option.text)
    .join(", ");

  const { handleChange, HiddenSelect } = useSelect({ onChange });

  return (
    <>
      <HiddenSelect />
      <Listbox
        as="div"
        by={by}
        className="relative"
        multiple={Array.isArray(value)}
        onChange={handleChange}
        value={value}
      >
        <Listbox.Button className={input({ invalid })}>
          {({ open }) => (
            <>
              <span className="inline-block truncate">{displayValue}</span>
              <MdExpandMore
                aria-hidden="true"
                className={cx(
                  "ml-auto h-5 w-5 text-gray-400 transition",
                  open && "rotate-180"
                )}
              />
            </>
          )}
        </Listbox.Button>
        <Transition as={Fragment} {...TRANSITION_STYLES}>
          <Listbox.Options className={OPTIONS_STYLES}>
            {options.map(({ key, value, ...option }) => (
              <Listbox.Option
                className={({ active }) => item({ active })}
                key={key}
                value={value}
              >
                {({ active, selected }) => (
                  <SelectOption
                    active={active}
                    selected={selected}
                    {...option}
                  />
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </>
  );
};
