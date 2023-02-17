import { MdPerson } from "react-icons/md";

import { Image, type ImageProps } from "@/components/image";

import { colorFromText } from "@/utilities/color";
import { cx } from "@/utilities/cx";

export type AvatarProps = Omit<
  ImageProps,
  "alt" | "height" | "src" | "unoptimized" | "width"
> & {
  alt?: ImageProps["alt"];
  size?: ImageProps["height"];
  src?: ImageProps["src"];
};

export const Avatar = ({ alt, className, size, src, ...props }: AvatarProps) =>
  alt && src ? (
    <Image
      alt={alt}
      className={cx("select-none rounded-full", className)}
      height={size}
      src={src}
      unoptimized
      width={size}
      {...props}
    />
  ) : (
    <div
      className="flex select-none items-center justify-center rounded-full bg-gray-400 font-normal dark:bg-gray-500"
      style={{
        backgroundColor: alt ? colorFromText(alt) : undefined,
        fontSize: Number(size ?? 48) / 2,
        height: size,
        width: size,
      }}
    >
      {alt && size ? (
        <svg className="fill-current" viewBox={`0 0 ${size} ${size}`}>
          <text
            dominantBaseline="middle"
            fill="#fff"
            textAnchor="middle"
            x="50%"
            y="55%"
          >
            {alt[0]}
          </text>
        </svg>
      ) : (
        <MdPerson className="h-2/3 w-2/3 text-white" />
      )}
    </div>
  );
