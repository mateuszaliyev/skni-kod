import { type ImageProps, Image } from "@/components/image";

import { cx } from "@/utilities/cx";

export type AvatarProps = Omit<
  ImageProps,
  "height" | "unoptimized" | "width"
> & {
  size?: ImageProps["height"];
};

export const Avatar = ({ alt, className, size, ...props }: AvatarProps) => (
  <Image
    alt={alt}
    className={cx("rounded-full", className)}
    height={size}
    unoptimized
    width={size}
    {...props}
  />
);
