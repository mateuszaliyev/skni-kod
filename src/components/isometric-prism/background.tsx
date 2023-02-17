import { useTheme } from "next-themes";

import {
  type HSLRanges,
  IsometricPrismCanvas,
  type IsometricPrismCanvasProps,
} from "./canvas";

export type IsometricPrismCanvasBackgroundProps = Omit<
  IsometricPrismCanvasProps,
  keyof HSLRanges | "animationFrequency" | "background" | "size"
>;

export const IsometricPrismCanvasBackground = (
  props: IsometricPrismCanvasBackgroundProps
) => {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) return null;

  if (resolvedTheme === "dark") {
    return (
      <div className="absolute h-full w-full animate-fade-in">
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500" />
        <div className="absolute inset-0 bg-prism" />
        {/* <div className="absolute inset-0 [background-image:radial-gradient(circle,#000_35%,#00000000_75%)]" /> */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/0 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/0 to-black" />
      </div>
    );
  }

  return (
    <IsometricPrismCanvas
      animationFrequency={0.5}
      background="#f8f8fa"
      hue={{
        max: 210,
        min: 210,
      }}
      lightness={{
        max: 100,
        min: 95,
      }}
      saturation={{
        max: 16,
        min: 16,
      }}
      size={40} // TODO: Pick the best `size` value (24-92?).
      {...props}
    />
  );
};
