import { useTheme } from "next-themes";

import { cx } from "@/utilities/cx";

import {
  type HSLRanges,
  IsometricPrismCanvas,
  type IsometricPrismCanvasProps,
} from "./canvas";

export type IsometricPrismCanvasLogoProps = Omit<
  IsometricPrismCanvasProps,
  keyof HSLRanges | "background"
>;

export const IsometricPrismCanvasLogo = ({
  className,
  ...props
}: IsometricPrismCanvasLogoProps) => {
  const { resolvedTheme } = useTheme();

  const hue = resolvedTheme === "light" ? 200 : 220;

  return (
    <IsometricPrismCanvas
      background={resolvedTheme === "light" ? "#0ea5e9" : "#2563eb"}
      className={cx(
        "[mask-image:url(/assets/images/logo/logomark.svg)]",
        className
      )}
      hue={{
        max: hue,
        min: hue,
      }}
      lightness={{
        max: 55,
        min: 45,
      }}
      saturation={{
        max: 83,
        min: 83,
      }}
      {...props}
    />
  );
};
