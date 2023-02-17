import type { SVGProps } from "react";

export type ArrowProps = Omit<SVGProps<SVGSVGElement>, "viewBox" | "xmlns">;

export const Arrow = (props: ArrowProps) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      className="origin-[60%_50%] scale-x-0 transition-transform group-hover:scale-x-100"
      d="M7 11H17V13H7z"
    ></path>
    <path
      className="transition-transform group-hover:translate-x-[12.5%]"
      d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
    ></path>
  </svg>
);
