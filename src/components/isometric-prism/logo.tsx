import { type HTMLAttributes, lazy, Suspense } from "react";

import { clsx } from "clsx";

import type { IsometricPrismCanvasProps } from "./canvas";

export type IsometricPrismLogoProps = HTMLAttributes<HTMLDivElement> &
  IsometricPrismCanvasProps;

const IsometricPrismCanvas = lazy(() =>
  import("@/components/isometric-prism/canvas").then(
    ({ IsometricPrismCanvas }) => ({
      default: IsometricPrismCanvas,
    })
  )
);

export const IsometricPrismLogo = ({
  animationFrequency,
  animationSpeed,
  background,
  className,
  height,
  hue,
  lightness,
  saturation,
  size,
  width,
  ...props
}: IsometricPrismLogoProps) => (
  <div
    className={clsx(
      "[mask-image:url(/images/logo/logomark.svg)] [mask-repeat:no-repeat]",
      className
    )}
    {...props}
  >
    <Suspense fallback={null}>
      <IsometricPrismCanvas
        animationFrequency={animationFrequency}
        animationSpeed={animationSpeed}
        background={background}
        height={height}
        hue={hue}
        lightness={lightness}
        saturation={saturation}
        size={size}
        width={width}
      />
    </Suspense>
  </div>
);
