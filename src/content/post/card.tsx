import { MdChevronRight } from "react-icons/md";

import { Balancer } from "@/components/balancer";
import { DateTime } from "@/components/date-time";
import { Image } from "@/components/image";
import { Link } from "@/components/link";

import { viewsPlural } from "@/constants/strings";

import { KICKER_STYLES } from "@/styles";

import { cx } from "@/utilities/cx";

import { Author } from "../author";

export type PostCardProps = {
  authors?: {
    id: string;
    image?: string;
    name?: string;
  }[];
  category: string;
  date?: Date;
  href: string;
  image?: {
    height: number;
    id: string;
    priority?: boolean;
    url: string;
    width: number;
  };
  summary: string;
  title: string;
  views: number;
};

export const PostCard = ({
  authors,
  category,
  date,
  href,
  image,
  summary,
  title,
  views,
}: PostCardProps) => (
  <article
    className={cx(
      "grid gap-y-4 md:grid-cols-2",
      image
        ? "[grid-template-areas:'category_category'_'title_title'_'authors_authors'_'date_date'_'image_image'_'summary_summary'_'read-more_read-more'_'views_views'] md:[grid-template-areas:'category_category'_'title_title'_'authors_authors'_'date_date'_'summary_image'_'read-more_image'_'views_image'_'._image'] lg:[grid-template-areas:'category_date'_'title_authors'_'summary_image'_'read-more_image'_'views_image'_'._image']"
        : "[grid-template-areas:'category_category'_'title_title'_'authors_authors'_'date_date'_'summary_summary'_'read-more_read-more'_'views_views'] lg:[grid-template-areas:'category_date'_'title_authors'_'summary_.'_'read-more_.'_'views_.']"
    )}
  >
    <div className={cx(KICKER_STYLES, "[grid-area:category]")}>{category}</div>
    <h2 className="text-4xl font-bold leading-snug [grid-area:title] md:pr-16">
      <Balancer>
        <Link href={href}>{title}</Link>
      </Balancer>
    </h2>
    <div className="grid grid-cols-1 items-start gap-y-4 [grid-area:authors] sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {authors?.map((author) => (
        <Author
          image={author.image}
          key={author.id}
          name={author.name ?? "Anonimowy użytkownik"}
        />
      ))}
    </div>
    <DateTime
      className="flex gap-2 text-gray-600 [grid-area:date] dark:text-gray-400"
      date={date}
      options={{
        dateStyle: "long",
      }}
    />
    {image && (
      <Image
        alt={title}
        className="rounded-xl shadow-lg [grid-area:image]"
        height={image.height}
        priority={image.priority}
        src={image.url}
        width={image.width}
      />
    )}
    <p className="text-gray-600 [grid-area:summary] dark:text-gray-400 sm:text-lg md:pr-16">
      {summary}
    </p>
    <div className="flex [grid-area:read-more]">
      <Link
        className="flex items-end gap-1 font-bold text-sky-500 transition hover:text-current"
        href={href}
      >
        <span>Czytaj dalej</span>
        <MdChevronRight className="h-5 w-5" />
      </Link>
    </div>
    <div className="text-gray-600 [grid-area:views] dark:text-gray-400">
      {views} {viewsPlural(views).toLocaleLowerCase()}
    </div>
  </article>
);
