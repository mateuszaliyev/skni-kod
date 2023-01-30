import { type DependencyList, type EffectCallback, useEffect } from "react";

import { useTimeout } from "@/hooks/timeout";

export const useDebounce = (
  effect: EffectCallback,
  delay = 0,
  dependencies: DependencyList = []
) => {
  const { clear, isReady, reset } = useTimeout(effect, delay);

  useEffect(reset, [reset, ...dependencies]);

  return { cancel: clear, isReady };
};
