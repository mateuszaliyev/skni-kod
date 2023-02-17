import {
  type HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { useMediaQuery } from "@/hooks/media-query";

type GetTrianglesOptions = HSLRanges & {
  height?: number;
  size: number;
  width?: number;
};

export type HSLRanges = Record<
  "hue" | "lightness" | "saturation",
  { max: number; min: number }
>;

export type IsometricPrismCanvasProps = HTMLAttributes<HTMLDivElement> &
  HSLRanges & {
    animationFrequency?: number;
    animationSpeed?: number;
    background?: string;
    size: number;
  };

type Triangle = Record<keyof HSLRanges, number> & {
  animationDirection: "down" | "up";
  path: Path2D;
};

const clamp = (value: number, min: number, max: number): number =>
  Math.max(Math.min(value, max), min);

const getPath = (
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number
) => {
  const path = new Path2D();
  path.moveTo(ax, ay);
  path.lineTo(bx, by);
  path.lineTo(cx, cy);
  path.closePath();
  return path;
};

const getRandomValue = (min: number, max: number): number =>
  Math.floor(Math.random() * (Math.max(max, min) - Math.min(max, min))) +
  Math.min(max, min);

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
}: GetTrianglesOptions) => {
  if (!height || !width) return new Map<number, Triangle>();

  const triangles = new Map<number, Triangle>();
  const triangleHeight = 2 * size;
  const triangleWidth = Math.sqrt(3) * size;
  const columns = Math.ceil(width / triangleWidth);
  const rows = Math.ceil(height / triangleHeight);
  let index = 0;

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const colors = [
        getRandomHSL({ hue, lightness, saturation }),
        getRandomHSL({ hue, lightness, saturation }),
      ];

      for (const color of colors) {
        triangles.set(index++, {
          ...color,
          animationDirection: Math.random() < 0.5 ? "down" : "up",
          path: getPath(
            column * triangleWidth,
            row * triangleHeight,
            (column + 1) * triangleWidth,
            ...(index % 2
              ? ([
                  row * triangleHeight + triangleHeight / 2,
                  column * triangleWidth,
                  (row + 1) * triangleHeight,
                ] as const)
              : ([
                  row * triangleHeight - triangleHeight / 2,
                  (column + 1) * triangleWidth,
                  row * triangleHeight + triangleHeight / 2,
                ] as const))
          ),
        });
      }
    }
  }

  return triangles;
};

export const IsometricPrismCanvas = memo(
  ({
    animationFrequency = 0,
    animationSpeed = 0.0625,
    background = "#000",
    hue,
    lightness,
    saturation,
    size,
    ...props
  }: IsometricPrismCanvasProps) => {
    const animationFrame = useRef<number | null>(null);
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const container = useRef<HTMLDivElement | null>(null);
    const triangles = useRef(new Map<number, Triangle>());
    const height = container.current?.getBoundingClientRect().height ?? 0;
    const width = container.current?.getBoundingClientRect().width ?? 0;
    const prefersReducedMotion = useMediaQuery(
      "(prefers-reduced-motion)",
      true
    );

    const renderFrame = useCallback(() => {
      if (!canvas.current) return;
      const context = canvas.current.getContext("2d");
      if (!context) return;

      context.clearRect(0, 0, canvas.current.width, canvas.current.height);
      context.fillStyle = background;
      context.fillRect(0, 0, canvas.current.width, canvas.current.height);

      for (const [key, triangle] of triangles.current) {
        if (Math.random() < animationFrequency) {
          const newLightness =
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
            lightness: newLightness,
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
      }
    }, [animationFrequency, animationSpeed, background, lightness]);

    const tick = useCallback(() => {
      if (!canvas.current || animationFrequency <= 0) return;
      renderFrame();
      animationFrame.current = requestAnimationFrame(tick);
    }, [animationFrequency, renderFrame]);

    useEffect(() => {
      if (!container.current) return;

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (!canvas.current) break;

          const { height, width } = entry.target.getBoundingClientRect();
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

          break;
        }
      });

      resizeObserver.observe(container.current);
      return () => resizeObserver.disconnect();
    }, [height, hue, lightness, saturation, size, width]);

    useEffect(() => {
      const cancelAnimation = () => {
        if (!animationFrame.current) return;
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      };

      if (animationFrequency <= 0 || prefersReducedMotion) {
        cancelAnimation();
        renderFrame();
      } else animationFrame.current = requestAnimationFrame(tick);

      return () => cancelAnimation();
    }, [animationFrequency, prefersReducedMotion, renderFrame, tick]);

    return (
      <div ref={container} {...props}>
        <canvas ref={canvas} />
      </div>
    );
  },
  (previousProps, nextProps) =>
    previousProps.animationFrequency === nextProps.animationFrequency &&
    previousProps.animationSpeed === nextProps.animationSpeed &&
    previousProps.background === nextProps.background &&
    previousProps.hue.max === nextProps.hue.max &&
    previousProps.hue.min === nextProps.hue.min &&
    previousProps.lightness.max === nextProps.lightness.max &&
    previousProps.lightness.min === nextProps.lightness.min &&
    previousProps.saturation.max === nextProps.saturation.max &&
    previousProps.saturation.min === nextProps.saturation.min &&
    previousProps.size === nextProps.size
);
