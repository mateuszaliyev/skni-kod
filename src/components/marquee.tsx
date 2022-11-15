import { type HTMLAttributes, useEffect, useRef, useState } from "react";

import { useWindowSize } from "@/hooks/window-size";

import { cx } from "@/utilities/cx";

type MarqueeBooleanOption =
  | boolean
  | ((internalState: MarqueeInternalState) => boolean);

export type MarqueeInternalState = {
  containerWidth: number;
  duration: number;
  marqueeWidth: number;
};

export type MarqueeProps = Omit<HTMLAttributes<HTMLDivElement>, "speed"> & {
  enabled?: MarqueeBooleanOption;
  fade?: MarqueeBooleanOption;
  marqueeProps?: Omit<HTMLAttributes<HTMLDivElement>, "aria-hidden" | "ref">;
  play?: MarqueeBooleanOption;
  speed?: number;
};

const getBooleanOption = (
  option: MarqueeBooleanOption,
  internalState: MarqueeInternalState
): boolean =>
  option && typeof option !== "boolean" ? option(internalState) : option;

const marqueeBaseClassName = "flex min-w-full shrink-0 items-center";

export const Marquee = ({
  children,
  className,
  enabled = true,
  fade = false,
  marqueeProps = {},
  play = true,
  speed = 20,
  ...props
}: MarqueeProps) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [marqueeWidth, setMarqueeWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const handleWindowSizeChange = () => {
    if (containerRef.current && marqueeRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
      setMarqueeWidth(marqueeRef.current.getBoundingClientRect().width);
    }
  };

  useWindowSize({
    onChange: handleWindowSizeChange,
  });

  useEffect(() => {
    handleWindowSizeChange();
  }, []);

  const duration =
    (containerWidth > marqueeWidth ? containerWidth : marqueeWidth) /
    (speed || 20);

  const isEnabled = getBooleanOption(enabled, {
    containerWidth,
    duration,
    marqueeWidth,
  });

  const hasFade = getBooleanOption(fade, {
    containerWidth,
    duration,
    marqueeWidth,
  });

  const shouldPlay = getBooleanOption(play, {
    containerWidth,
    duration,
    marqueeWidth,
  });

  const animationPlayState = isEnabled && shouldPlay ? "running" : "paused";

  const {
    className: marqueeClassName,
    style: marqueeStyle,
    ...marqueeRemainingProps
  } = marqueeProps;

  return (
    <div
      className={cx("relative flex w-full overflow-x-hidden", className)}
      ref={containerRef}
      {...props}
    >
      <div
        className={cx(
          marqueeBaseClassName,
          isEnabled && "animate-marquee",
          marqueeClassName
        )}
        ref={marqueeRef}
        style={{
          ...marqueeStyle,
          ["--marquee-duration" as string]: `${duration}s`,
          animationPlayState,
        }}
        {...marqueeRemainingProps}
      >
        {children}
      </div>
      {isEnabled && (
        <div
          aria-hidden="true"
          className={cx(
            marqueeBaseClassName,
            "animate-marquee",
            marqueeClassName
          )}
          style={{
            ...marqueeStyle,
            ["--marquee-duration" as string]: `${duration}s`,
            animationPlayState,
          }}
          {...marqueeRemainingProps}
        >
          {children}
        </div>
      )}
      {hasFade && (
        <>
          <div className="absolute left-0 h-full w-32 bg-gradient-to-r from-white dark:from-black"></div>
          <div className="absolute right-0 h-full w-32 bg-gradient-to-l from-white dark:from-black"></div>
        </>
      )}
    </div>
  );
};
