import type { GetStaticProps } from "next";

import { api } from "@/api";

import { LayoutMain } from "@/components/layout";
import { Meta } from "@/components/meta";
import { OpenGraph } from "@/components/open-graph";

import {
  CATEGORIES,
  SKNI_KOD,
  SKNI_KOD_ABBREVIATION,
} from "@/constants/strings";

import { PostCard } from "@/content/post-card";

import { BASE_URL } from "@/environment";

import type { PostCategory } from "@/schemas/post";

import { getSsg } from "@/server/api/ssg";

import { CONTAINER_STYLES, HEADLINE_STYLES } from "@/styles";

import { cx } from "@/utilities/cx";

export const getStaticProps = (async () => {
  const ssg = getSsg();

  await ssg.post.find.all.prefetch({
    public: true,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 600,
  };
}) satisfies GetStaticProps;

const ArticlesPage = () => {
  const { data: posts } = api.post.find.all.useQuery({
    public: true,
  });

  const title = `Blog - ${SKNI_KOD_ABBREVIATION}`;

  return (
    <LayoutMain className="pt-20">
      <Meta title={title} />
      <OpenGraph
        og={{
          image: [
            {
              alt: "SKNI KOD Logo",
              height: 701,
              type: "image/png",
              url: `${BASE_URL}/assets/images/logo/logo-color.png`,
              width: 1304,
            },
          ],
          locale: {
            default: "pl_PL",
          },
          siteName: SKNI_KOD,
          title,
          type: "website",
        }}
      />
      <h1 className={cx(CONTAINER_STYLES, HEADLINE_STYLES, "py-16")}>Blog</h1>
      <section
        className={cx(
          CONTAINER_STYLES,
          "flex flex-col gap-16 md:gap-24 lg:gap-32"
        )}
      >
        {posts?.map((post, index) => (
          <PostCard
            authors={post.authors.map(({ user }) => ({
              id: user.id,
              image: user.image ?? undefined,
              name: user.name ?? undefined,
            }))}
            category={CATEGORIES[post.category as PostCategory]}
            date={post.publishedAt ?? undefined}
            href={`/blog/${post.slug}`}
            image={
              index
                ? post.image
                : post.image
                ? { ...post.image, priority: true }
                : undefined
            }
            key={post.id}
            summary={post.summary}
            title={post.title}
            views={Number(post.views)}
          />
        ))}
      </section>
    </LayoutMain>
  );
};

export default ArticlesPage;
