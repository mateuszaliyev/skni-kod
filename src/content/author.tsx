import { Avatar } from "@/components/avatar";

export type AuthorProps = {
  image?: string;
  name: string;
};

export const Author = ({ image, name }: AuthorProps) => (
  <div className="flex items-center gap-4 font-bold">
    <Avatar alt={name} size={48} src={image} />
    <span>{name}</span>
  </div>
);
