import {
  default as NextImage,
  type ImageProps as NextImageProps,
} from "next/image";

export type ImageProps = NextImageProps;

export const Image = (props: ImageProps) => <NextImage {...props} />;
