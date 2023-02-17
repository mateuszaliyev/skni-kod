import type { ComponentProps } from "react";
import ReactWrapBalancer from "react-wrap-balancer";

export const Balancer = ({
  ratio,
  ...props
}: ComponentProps<typeof ReactWrapBalancer>) => (
  <ReactWrapBalancer ratio={ratio ?? 0.65} {...props} />
);
