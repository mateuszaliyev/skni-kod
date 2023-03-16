import { useRef } from "react";

import type { RouterOutput } from "@/api";

import { Arrow } from "@/components/arrow";
import { Balancer } from "@/components/balancer";
import { ButtonLink } from "@/components/button/link";
import { DateTime } from "@/components/date-time";
import { Link } from "@/components/link";

import { useIntersection } from "@/hooks/intersection";

import {
  CONTAINER_STYLES,
  DECK_STYLES,
  HEADLINE_STYLES,
  KICKER_STYLES,
} from "@/styles";

import { cx } from "@/utilities/cx";

export type LatestPostsProps = {
  posts: RouterOutput["post"]["find"]["all"];
};

export const LatestPosts = ({ posts }: LatestPostsProps) => {
  const ref = useRef<HTMLElement>(null);

  const { hasIntersected } = useIntersection(ref);

  return (
    <section ref={ref}>
      <div className={CONTAINER_STYLES}>
        <div
          className={cx(
            KICKER_STYLES,
            "mb-6 text-center",
            hasIntersected ? "animate-fade-in" : "opacity-0"
          )}
        >
          Bądź na bieżąco
        </div>
        <h2
          className={cx(
            HEADLINE_STYLES,
            "text-center",
            hasIntersected ? "animate-fade-in" : "opacity-0"
          )}
        >
          <Balancer>Co słychać w SKNI KOD?</Balancer>
        </h2>
        <p
          className={cx(
            DECK_STYLES,
            "mt-6 mb-12 animation-delay-500",
            hasIntersected ? "animate-fade-in" : "opacity-0"
          )}
        >
          <Balancer>
            Nie przegap najnowszych aktualności dotyczących działalności naszego
            koła naukowego.
          </Balancer>
        </p>
        <div
          className={cx(
            "flex flex-col items-center py-16 animation-delay-1000",
            hasIntersected ? "animate-fade-in" : "opacity-0"
          )}
        >
          {posts.map((post, index) => (
            <article
              className="relative flex flex-col gap-2 sm:flex-row sm:gap-8"
              key={post.id}
            >
              <div aria-hidden className="hidden flex-col items-center sm:flex">
                <div className="my-1 h-[11px] w-[11px] flex-shrink-0 rounded-full border-2 border-gray-300 dark:border-gray-700 xl:my-2.5" />
                <div
                  className={cx(
                    "h-full w-px",
                    index === posts.length - 1
                      ? "bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-800"
                      : "bg-gray-200 dark:bg-gray-800"
                  )}
                />
              </div>
              <div className="flex flex-col gap-2 pb-16">
                <DateTime
                  className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 xl:absolute xl:right-full xl:top-1.5 xl:mr-8 xl:text-right"
                  date={post.publishedAt}
                  options={{
                    dateStyle: "long",
                  }}
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold">
                    <Balancer>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </Balancer>
                  </h3>
                  <p className="max-w-prose text-gray-500 line-clamp-2 dark:text-gray-400 md:text-lg">
                    {post.summary}
                  </p>
                  <Link
                    className="group flex items-center self-start font-bold text-sky-500 transition hover:text-current"
                    href={`/blog/${post.slug}`}
                  >
                    <span>Czytaj dalej</span>
                    <Arrow className="h-6 w-6 translate-y-px fill-current" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
          <ButtonLink className="w-72" height href="/blog" variant="contained">
            Zobacz więcej
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};
