import {
  type ForwardedRef,
  type RefObject,
  useImperativeHandle,
  useRef,
} from "react";

export const useForwardedRef = <T>(
  forwardedRef: ForwardedRef<T>
): RefObject<T> => {
  const ref = useRef<T>(null);

  useImperativeHandle<T | null, T | null>(forwardedRef, () => ref.current);

  return ref;
};
