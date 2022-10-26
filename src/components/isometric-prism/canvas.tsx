import { memo, useCallback, useEffect, useRef } from "react";

import { useMediaQuery } from "@/hooks/media-query";
import { useWindowSize } from "@/hooks/window-resize";

type GetTrianglesOptions = HSLRanges & {
  height?: number;
  size: number;
  width?: number;
};

type HSLRanges = {
  hue: {
    max: number;
    min: number;
  };
  lightness: {
    max: number;
    min: number;
  };
  saturation: {
    max: number;
    min: number;
  };
};

export type IsometricPrismProps = HSLRanges & {
  animationFrequency?: number;
  animationSpeed?: number;
  background?: string;
  size: number;
};

type Triangle = {
  animationDirection: "down" | "up";
  hue: number;
  lightness: number;
  path: Path2D;
  saturation: number;
};

const clamp = (value: number, min: number, max: number): number =>
  Math.max(Math.min(value, max), min);

const getRandomValue = (min: number, max: number): number =>
  Math.floor(Math.random() * (Math.max(max, min) - Math.min(max, min))) +
  Math.min(max, min);

const getTriangle = (
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number
): Path2D => {
  const triangle = new Path2D();

  triangle.moveTo(ax, ay);
  triangle.lineTo(bx, by);
  triangle.lineTo(cx, cy);
  triangle.closePath();

  return triangle;
};

const getRandomHSL = ({
  hue,
  lightness,
  saturation,
}: HSLRanges): Record<keyof HSLRanges, number> => ({
  hue: getRandomValue(clamp(hue.min, 0, 360), clamp(hue.max, 0, 360)) % 360,
  lightness: getRandomValue(
    clamp(lightness.min, 0, 100),
    clamp(lightness.max, 0, 100)
  ),
  saturation: getRandomValue(
    clamp(saturation.min, 0, 100),
    clamp(saturation.max, 0, 100)
  ),
});

const getTriangles = ({
  height,
  hue,
  lightness,
  saturation,
  size,
  width,
}: GetTrianglesOptions): Map<number, Triangle> => {
  if (!height || !width) {
    return new Map();
  }

  const triangles: Triangle[] = [];

  const triangleHeight = 2 * size;
  const triangleWidth = Math.sqrt(3) * size;

  const columns = Math.ceil(width / triangleWidth);
  const rows = Math.ceil(height / triangleHeight);

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const color1 = getRandomHSL({
        hue,
        lightness,
        saturation,
      });

      const color2 = getRandomHSL({
        hue,
        lightness,
        saturation,
      });

      triangles.push(
        {
          ...color1,
          animationDirection: Math.random() < 0.5 ? "down" : "up",
          path: getTriangle(
            column * triangleWidth,
            row * triangleHeight,
            (column + 1) * triangleWidth,
            row * triangleHeight - triangleHeight / 2,
            (column + 1) * triangleWidth,
            row * triangleHeight + triangleHeight / 2
          ),
        },
        {
          ...color2,
          animationDirection: Math.random() < 0.5 ? "down" : "up",
          path: getTriangle(
            column * triangleWidth,
            row * triangleHeight,
            (column + 1) * triangleWidth,
            row * triangleHeight + triangleHeight / 2,
            column * triangleWidth,
            (row + 1) * triangleHeight
          ),
        }
      );
    }
  }

  return new Map(triangles.map((triangle, index) => [index, triangle]));
};

export const IsometricPrism = memo(
  ({
    animationFrequency = 0,
    animationSpeed = 0.0625,
    background = "#000",
    hue,
    lightness,
    saturation,
    size,
  }: IsometricPrismProps) => {
    const prefersReducedMotion = useMediaQuery(
      "(prefers-reduced-motion)",
      true
    );

    const canvas = useRef<HTMLCanvasElement | null>(null);

    const animationFrame = useRef<number | null>(null);

    const triangles = useRef(new Map<number, Triangle>());

    const { height, width } = useWindowSize();

    const renderFrame = useCallback(() => {
      if (!canvas.current) {
        return;
      }

      const context = canvas.current.getContext("2d");

      if (!context) {
        return;
      }

      context.clearRect(0, 0, canvas.current.width, canvas.current.height);

      context.fillStyle = background;
      context.fillRect(0, 0, canvas.current.width, canvas.current.height);

      triangles.current.forEach((triangle, key) => {
        if (Math.random() < animationFrequency) {
          const newLightNess =
            triangle.animationDirection === "down"
              ? Math.max(lightness.min, triangle.lightness - animationSpeed)
              : Math.min(lightness.max, triangle.lightness + animationSpeed);

          let newAnimationDirection = triangle.animationDirection;

          if (
            newAnimationDirection === "down" &&
            lightness.min >= triangle.lightness
          ) {
            newAnimationDirection = "up";
          }

          if (
            newAnimationDirection === "up" &&
            lightness.max <= triangle.lightness
          ) {
            newAnimationDirection = "down";
          }

          triangles.current.set(key, {
            ...triangle,
            animationDirection: newAnimationDirection,
            lightness: newLightNess,
          });
        }

        const color = getRandomHSL({
          hue: {
            max: triangle.hue,
            min: triangle.hue,
          },
          lightness: {
            max: triangle.lightness,
            min: triangle.lightness,
          },
          saturation: {
            max: triangle.saturation,
            min: triangle.saturation,
          },
        });

        context.fillStyle = `hsl(${color.hue}, ${color.saturation.toFixed(
          2
        )}%, ${color.lightness.toFixed(2)}%)`;
        context.fill(triangle.path);
      });
    }, [animationFrequency, animationSpeed, background, lightness]);

    const tick = useCallback(() => {
      if (!canvas.current || animationFrequency <= 0) {
        return;
      }

      renderFrame();
      animationFrame.current = requestAnimationFrame(tick);
    }, [animationFrequency, renderFrame]);

    useEffect(() => {
      if (canvas.current) {
        canvas.current.height = height;
        canvas.current.width = width;
        triangles.current = getTriangles({
          height,
          hue,
          lightness,
          saturation,
          size,
          width,
        });
      }
    }, [height, hue, lightness, saturation, size, width]);

    useEffect(() => {
      if (animationFrequency > 0 && !prefersReducedMotion) {
        animationFrame.current = requestAnimationFrame(tick);
      } else {
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
          animationFrame.current = null;
        }

        renderFrame();
      }

      return () => {
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
          animationFrame.current = null;
        }
      };
    }, [animationFrequency, prefersReducedMotion, renderFrame, tick]);

    return <canvas ref={canvas} />;
  },
  (previousProps, nextProps) => {
    if (
      previousProps.animationFrequency !== nextProps.animationFrequency ||
      previousProps.animationSpeed !== nextProps.animationSpeed ||
      previousProps.background !== nextProps.background ||
      previousProps.hue.max !== nextProps.hue.max ||
      previousProps.hue.min !== nextProps.hue.min ||
      previousProps.lightness.max !== nextProps.lightness.max ||
      previousProps.lightness.min !== nextProps.lightness.min ||
      previousProps.saturation.max !== nextProps.saturation.max ||
      previousProps.saturation.min !== nextProps.saturation.min ||
      previousProps.size !== nextProps.size
    )
      return false;

    return true;
  }
);
