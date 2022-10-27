import type { SVGProps } from "react";

export type CyanSkyBlueGradientProps = SVGProps<SVGLinearGradientElement>;

export const CyanSkyBlueGradient = ({
  x1 = 0,
  x2 = 0,
  y1 = 0,
  y2 = 1,
  ...props
}: CyanSkyBlueGradientProps) => (
  <linearGradient x1={x1} x2={x2} y1={y1} y2={y2} {...props}>
    <stop offset="0%" stopColor="#22d3ee" />
    <stop offset="50%" stopColor="#0ea5e9" />
    <stop offset="100%" stopColor="#2563eb" />
  </linearGradient>
);
