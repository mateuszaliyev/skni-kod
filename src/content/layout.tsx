import { MdEdit } from "react-icons/md";

import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

import { ButtonLink } from "@/components/button";
import { DateTime } from "@/components/date-time";
import { Image } from "@/components/image";
import { LayoutMain, type LayoutMainProps } from "@/components/layout";

import { CONTAINER_STYLES } from "@/styles";

import { cx } from "@/utilities/cx";
import { isModerator } from "@/utilities/permissions";

import { Author } from "./author";

const IsometricPrismCanvasBackground = dynamic(
  () =>
    import("@/components/isometric-prism/background").then(
      ({ IsometricPrismCanvasBackground }) => IsometricPrismCanvasBackground
    ),
  {
    ssr: false,
  }
);

export type LayoutContentProps = LayoutMainProps & {
  authors: {
    id: string;
    image?: string;
    name?: string;
  }[];
  date?: Date;
  image?: {
    height: number;
    url: string;
    width: number;
  };
  preview?: boolean;
  slug?: string;
  title: string;
};

export const LayoutContent = ({
  authors,
  children,
  className,
  date,
  image,
  preview,
  slug,
  title,
  ...props
}: LayoutContentProps) => {
  const session = useSession();

  return (
    <LayoutMain className={cx("relative flex-grow", className)} {...props}>
      <article className="flex flex-col items-center gap-8">
        <header className="relative w-full">
          <div className="absolute top-0 left-0 right-0 h-full border-b border-gray-200 dark:border-none">
            <IsometricPrismCanvasBackground className="h-full" />
          </div>
          <div
            className={cx(
              CONTAINER_STYLES,
              "relative my-20 flex flex-col justify-center gap-8 py-8"
            )}
          >
            <div className="flex flex-wrap items-center gap-4 font-bold text-gray-500">
              {date && <DateTime date={date} options={{ dateStyle: "full" }} />}
              {!preview &&
              slug &&
              session.data?.user &&
              isModerator(session.data.user.role) ? (
                <ButtonLink
                  className="ml-auto"
                  href={`/blog/${slug}/edytuj`}
                  icon={<MdEdit />}
                >
                  Edytuj
                </ButtonLink>
              ) : null}
            </div>
            <h1 className="text-4xl font-bold lg:text-6xl">{title}</h1>
            <ul className="flex items-center gap-4">
              {authors.map((author) => (
                <Author
                  image={author.image}
                  key={author.id}
                  name={author.name ?? "Anonimowy użytkownik"}
                />
              ))}
            </ul>
          </div>
        </header>
        {image && (
          <figure className={cx(CONTAINER_STYLES, "flex justify-center")}>
            <Image
              alt={title}
              className="relative -mt-28 w-full max-w-prose rounded-xl border border-gray-200 dark:border-gray-700 lg:text-lg xl:text-xl"
              height={image.height}
              priority
              src={image.url}
              width={image.width}
            />
          </figure>
        )}
        <section className={cx(CONTAINER_STYLES, "flex flex-col items-center")}>
          {children}
        </section>
      </article>
    </LayoutMain>
  );
};
