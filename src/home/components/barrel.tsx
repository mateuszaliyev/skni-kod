import { type HTMLAttributes, useEffect, useState } from "react";

import { clsx } from "clsx";

export type AnimatedHeadlineProps = HTMLAttributes<HTMLDivElement> & {
  animationDuration?: number;
  lineProps?: HTMLAttributes<HTMLSpanElement>;
  lines: string[];
};

const getLine = (index: number, current: number, total: number) => {
  const currentPlusIndex = current + index;

  if (currentPlusIndex >= 0) {
    return currentPlusIndex % total;
  }

  const absoluteCurrentPlusIndex = Math.abs(currentPlusIndex);

  if (absoluteCurrentPlusIndex <= total) {
    return total - absoluteCurrentPlusIndex;
  }

  return total - (absoluteCurrentPlusIndex % total);
};

export const Barrel = ({
  animationDuration = 5000,
  className,
  lineProps: { className: lineClassName, style: lineStyle, ...lineProps } = {},
  lines,
  ...props
}: AnimatedHeadlineProps) => {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const animate = () => {
      setCurrentLine((line) => (line + 1) % lines.length);
    };

    const interval = setInterval(animate, animationDuration);

    return () => {
      clearInterval(interval);
    };
  }, [animationDuration, lines.length]);

  return (
    <div className={clsx("relative overflow-y-hidden", className)} {...props}>
      {lines.map((line, index) => {
        const isPreviousLine = index === getLine(-1, currentLine, lines.length);
        const isCurrentLine = index === currentLine;
        const isNextLine = index === getLine(1, currentLine, lines.length);
        const isSecondNextLine =
          index === getLine(2, currentLine, lines.length);

        const opacity = Number(isPreviousLine || isCurrentLine || isNextLine);
        const translateY =
          (index && -100) +
          (isNextLine || isSecondNextLine ? 100 : !isCurrentLine ? -100 : 0);

        return (
          <span
            className={clsx(
              "block w-full transition-transform duration-1000",
              index === 0 ? "relative" : "absolute",
              lineClassName
            )}
            key={index}
            style={{
              ...lineStyle,
              opacity,
              transform: `translateY(${translateY}%)`,
            }}
            {...lineProps}
          >
            {line}
          </span>
        );
      })}
    </div>
  );
};