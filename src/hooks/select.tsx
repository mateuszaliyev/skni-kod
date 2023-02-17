import { useRef } from "react";

export type UseSelectParameters<Value> = {
  onChange?: (value: Value) => void;
};

export const useSelect = <Value,>({ onChange }: UseSelectParameters<Value>) => {
  const ref = useRef<HTMLSelectElement>(null);

  /**
   * @see {@link https://github.com/react-hook-form/react-hook-form/discussions/9359#discussioncomment-4131515}
   * @see {@link https://github.com/tailwindlabs/headlessui/issues/2003}
   */
  const handleChange = (value: Value) => {
    onChange?.(value);
    ref.current?.dispatchEvent(new Event("change", { bubbles: true }));
  };

  return {
    handleChange,
    HiddenSelect: () => <select className="hidden" ref={ref} />,
  };
};
