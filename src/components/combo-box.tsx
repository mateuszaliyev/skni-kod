import { Fragment, useState } from "react";
import { MdExpandMore } from "react-icons/md";

import { Combobox, Transition } from "@headlessui/react";
import type { EnsureArray } from "@headlessui/react/dist/types";

import { input, item } from "@/components/input/styles";
import { SelectOption, type SelectProps } from "@/components/select";

import { POLISH_LOCALE_IDENTIFIER } from "@/constants/strings";

import { useSelect } from "@/hooks/select";

import { OPTIONS_STYLES, TRANSITION_STYLES } from "@/styles";

import { cx } from "@/utilities/cx";

export type ComboBoxProps<Value> = SelectProps<Value> & {
  displayValue?: (value: Value) => string;
};

export const ComboBox = <Value,>({
  by,
  displayValue,
  invalid,
  onChange,
  options,
  value,
}: ComboBoxProps<Value>) => {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.text
            .replace(/\s+/g, "")
            .toLocaleLowerCase(POLISH_LOCALE_IDENTIFIER)
            .includes(
              query
                .replace(/\s+/g, "")
                .toLocaleLowerCase(POLISH_LOCALE_IDENTIFIER)
            );
        });

  const { handleChange, HiddenSelect } = useSelect({ onChange });

  return (
    <>
      <HiddenSelect />
      <Combobox
        as="div"
        by={by}
        className="relative"
        multiple={Array.isArray(value) as true}
        onChange={handleChange as (value: EnsureArray<Value>) => void}
        value={value as EnsureArray<Value>}
      >
        <div className="relative">
          <Combobox.Input
            className={input({ invalid })}
            displayValue={displayValue}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute right-0 top-0 bottom-0 ml-auto px-3">
            {({ open }) => (
              <MdExpandMore
                aria-hidden="true"
                className={cx(
                  "ml-auto h-5 w-5 text-gray-400 transition",
                  open && "rotate-180"
                )}
              />
            )}
          </Combobox.Button>
        </div>
        <Transition
          afterLeave={() => setQuery("")}
          as={Fragment}
          {...TRANSITION_STYLES}
        >
          <Combobox.Options className={OPTIONS_STYLES}>
            {filteredOptions.map(({ key, value, ...option }) => (
              <Combobox.Option
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
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </>
  );
};
