import { type RefObject, useEffect, useState } from "react";

export const useIntersection = (
  ref: RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) => {
  const [hasIntersected, setHasIntersected] = useState(false);
  const [intersectionObserverEntry, setIntersectionObserverEntry] =
    useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        setHasIntersected(
          (hasIntersected) => hasIntersected || (entry?.isIntersecting ?? false)
        );
        setIntersectionObserverEntry(entry ?? null);
      },
      options
    );

    observer.observe(ref.current);

    return () => {
      setHasIntersected(false);
      setIntersectionObserverEntry(null);
      observer.disconnect();
    };
  }, [options, ref]);

  return { ...intersectionObserverEntry, hasIntersected };
};
