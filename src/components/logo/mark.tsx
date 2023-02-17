import { type SVGProps, useId } from "react";

import { CyanSkyBlueGradient } from "../gradient/cyan-sky-blue";

import { LogomarkPaths } from "./logomark-paths";

export type LogomarkProps = Omit<SVGProps<SVGSVGElement>, "viewBox" | "xmlns">;

export const Logomark = (props: LogomarkProps) => {
  const id = useId();

  return (
    <svg
      viewBox="0 0 581.57 543.422"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <CyanSkyBlueGradient id={id} x1="0" x2="1" y1="0" y2="1" />
      </defs>
      <g fill={`url(#${id})`}>
        <LogomarkPaths />a
      </g>
    </svg>
  );
};
