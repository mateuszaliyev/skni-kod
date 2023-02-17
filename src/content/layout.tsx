import { MdEdit } from "react-icons/md";

import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

import { Balancer } from "@/components/balancer";
import { ButtonLink } from "@/components/button/link";
import { DateTime } from "@/components/date-time";
import { Image } from "@/components/image";
import { LayoutMain, type LayoutMainProps } from "@/components/layout";

import { CONTAINER_STYLES, KICKER_STYLES } from "@/styles";

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
  category: string;
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
  category,
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
      <article className="flex flex-col items-center gap-8 lg:gap-16">
        <header className="relative w-full">
          <div className="absolute top-0 left-0 right-0 h-full border-b border-gray-200 dark:border-none">
            <IsometricPrismCanvasBackground className="h-full" />
          </div>
          <div
            className={cx(
              CONTAINER_STYLES,
              "relative mt-8 flex flex-col justify-center gap-6 py-16 sm:mt-24"
            )}
          >
            <div className={KICKER_STYLES}>{category}</div>
            <h1 className="text-4xl font-bold lg:text-6xl">
              <Balancer>{title}</Balancer>
            </h1>
            {date && (
              <DateTime
                className="font-bold text-gray-500"
                date={date}
                options={{ dateStyle: "full" }}
              />
            )}
          </div>
        </header>
        <section
          className={cx(
            CONTAINER_STYLES,
            "flex flex-col gap-6 lg:flex-row-reverse lg:gap-16"
          )}
        >
          <aside className="flex flex-shrink-0 flex-grow flex-col gap-4 border-b border-gray-200 pb-6 dark:border-gray-700 lg:border-l lg:border-b-0 lg:px-8 lg:pb-0">
            {!preview &&
            slug &&
            session.data?.user?.role &&
            isModerator(session.data.user.role) ? (
              <ButtonLink
                className="self-start"
                height
                href={`/blog/formularz?slug=${slug}`}
                icon={<MdEdit />}
              >
                Edytuj
              </ButtonLink>
            ) : null}
            <ul className="flex gap-4 overflow-x-auto lg:flex-col">
              {authors.map((author) => (
                <Author
                  as="li"
                  className="flex-shrink-0"
                  image={author.image}
                  key={author.id}
                  name={author.name ?? "Anonimowy użytkownik"}
                />
              ))}
            </ul>
          </aside>
          <div className="min-w-0 flex-shrink">
            {image && (
              <Image
                alt={title}
                className="mb-8 w-full max-w-prose rounded-xl border border-gray-200 dark:border-gray-700 lg:text-lg xl:text-xl"
                height={image.height}
                priority
                src={image.url}
                width={image.width}
              />
            )}
            {children}
          </div>
        </section>
      </article>
    </LayoutMain>
  );
};
