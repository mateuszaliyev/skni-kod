import type { GetStaticProps } from "next";

import { api } from "@/api";

import { BalancerProvider } from "@/components/balancer";
import { LayoutIsometricPrism } from "@/components/layout/isometric-prism";
import { Meta } from "@/components/meta";
import { OpenGraph } from "@/components/open-graph";

import {
  CATEGORIES,
  SKNI_KOD,
  SKNI_KOD_ABBREVIATION,
} from "@/constants/strings";

import { PostCard } from "@/content/post/card";

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
  };
}) satisfies GetStaticProps;

const ArticlesPage = () => {
  const { data: posts } = api.post.find.all.useQuery({
    public: true,
  });

  const title = `Blog - ${SKNI_KOD_ABBREVIATION}`;

  return (
    <LayoutIsometricPrism
      className="gap-16"
      header={<h1 className={cx(HEADLINE_STYLES)}>Blog</h1>}
    >
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
      <section
        className={cx(
          CONTAINER_STYLES,
          "flex flex-col gap-16 md:gap-24 lg:gap-32"
        )}
      >
        <BalancerProvider>
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
        </BalancerProvider>
      </section>
    </LayoutIsometricPrism>
  );
};

export default ArticlesPage;
