import { useEffect, useState } from "react";

import { IS_BROWSER } from "@/constants";

export type WindowSize = {
  height: number;
  width: number;
};

export type UseWindowSizeOptions = {
  onChange?: (size: WindowSize, event: UIEvent) => void;
};

export const useWindowSize = ({
  onChange,
}: UseWindowSizeOptions = {}): WindowSize => {
  const [height, setHeight] = useState(IS_BROWSER ? window.innerHeight : 0);
  const [width, setWidth] = useState(IS_BROWSER ? window.innerWidth : 0);

  useEffect(() => {
    if (IS_BROWSER) {
      const handleResize = (event: UIEvent) => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);

        if (onChange) {
          onChange(
            { height: window.innerHeight, width: window.innerWidth },
            event
          );
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [onChange]);

  return {
    height,
    width,
  };
};
