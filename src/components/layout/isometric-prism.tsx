import { ReactNode } from "react";

import dynamic from "next/dynamic";

import { LayoutMain, type LayoutMainProps } from "@/components/layout";

import { CONTAINER_STYLES } from "@/styles";

import { cx } from "@/utilities/cx";

const IsometricPrismCanvasBackground = dynamic(
  () =>
    import("@/components/isometric-prism/background").then(
      ({ IsometricPrismCanvasBackground }) => IsometricPrismCanvasBackground
    ),
  {
    ssr: false,
  }
);

export type LayoutIsometricPrismProps = LayoutMainProps & {
  header?: ReactNode;
};

export const LayoutIsometricPrism = ({
  children,
  className,
  header,
  ...props
}: LayoutIsometricPrismProps) => (
  <LayoutMain className={cx("flex flex-grow flex-col", className)} {...props}>
    <header className="relative w-full">
      <div className="absolute top-0 left-0 right-0 h-full border-b border-gray-200 dark:border-none">
        <IsometricPrismCanvasBackground className="h-full" />
      </div>
      <div
        className={cx(
          CONTAINER_STYLES,
          "relative my-20 flex flex-col justify-center gap-8 py-8"
        )}
      >
        {header}
      </div>
    </header>
    {children}
  </LayoutMain>
);
