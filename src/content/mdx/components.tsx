import type { AnchorHTMLAttributes } from "react";

import type { MDXRemoteProps } from "next-mdx-remote";

import { Image, type ImageProps } from "@/components/image";
import { Link, type LinkProps } from "@/components/link";

import { cx } from "@/utilities/cx";

const MdxLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <Link variant="content" {...(props as LinkProps)} />
);

const MdxImage = ({
  alt,
  caption,
  className,
  ...props
}: ImageProps & { caption?: string }) => (
  <figure className="flex flex-col items-center">
    <Image alt={alt ?? ""} className={cx("rounded-xl", className)} {...props} />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);

export const mdxComponents: MDXRemoteProps["components"] = {
  a: MdxLink,
  Image: MdxImage,
};
