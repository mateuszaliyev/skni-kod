import {
  type ImageProps as NextImageProps,
  default as NextImage,
} from "next/image";

export type ImageProps = NextImageProps;

export const Image = (props: ImageProps) => <NextImage {...props} />;
