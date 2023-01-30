import { useCallback, useEffect, useRef } from "react";

export const useTimeout = (
  callback: (...parameters: unknown[]) => unknown,
  delay = 0
) => {
  const callbackRef = useRef(callback);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const ready = useRef<boolean | null>(false);
  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      callbackRef.current();
    }, delay);
  }, [delay]);

  const clear = useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    set();

    return clear;
  }, [clear, delay, set]);

  return { clear, isReady, reset: set };
};
