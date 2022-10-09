import {
  type HTMLAttributes,
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";

export type PrismSpinnerProps = Omit<HTMLAttributes<HTMLDivElement>, "ref"> & {
  animationDuration?: number;
  height: number;
};

export const PrismSpinner = ({
  animationDuration = 5000,
  children,
  height,
  ...props
}: PrismSpinnerProps) => {
  const [face, setFace] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const faces = Children.count(children);

  const childrenRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const animate = () => {
      setFace((face) => (face + 1) % faces);
    };

    const interval = setInterval(animate, animationDuration);

    return () => {
      clearInterval(interval);
    };
  }, [animationDuration, faces]);

  return (
    <div
      ref={ref}
      style={{
        ...props.style,
        height,
      }}
      {...props}
    >
      {Children.map(children, (child, currentFace) => {
        if (isValidElement(child)) {
          const props = child.props as HTMLAttributes<HTMLElement>;

          const previousFace = currentFace === 0 ? faces - 1 : currentFace - 1;

          const nextFace = (currentFace + 1) % faces;

          return cloneElement(child, {
            ...props,
            ref: (ref: HTMLElement) => (childrenRef.current[currentFace] = ref),
            style: {
              ...props.style,
              height,
              position: "absolute",
              transform: `${
                face === previousFace
                  ? " rotateX(120deg)"
                  : face === currentFace
                  ? " rotateX(0deg)"
                  : " rotateX(-120deg)"
              }`,
              transformOrigin: `center center ${height * 0.4}px`,
              transition:
                face === currentFace || face === nextFace
                  ? "transform 1250ms ease-in-out"
                  : undefined,
              WebkitBackfaceVisibility: "hidden",
            },
          } as HTMLAttributes<HTMLElement>);
        }

        return child;
      })}
    </div>
  );
};
