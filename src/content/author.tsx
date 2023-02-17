import { Avatar } from "@/components/avatar";

import { cx } from "@/utilities/cx";

export type AuthorProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  image?: string;
  name: string;
};

export const Author = ({
  as: Component = "div",
  className,
  image,
  name,
}: AuthorProps) => (
  <Component className={cx("flex items-center gap-4 font-bold", className)}>
    <Avatar alt={name} size={48} src={image} />
    <span>{name}</span>
  </Component>
);
