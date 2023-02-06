import { useEffect, useRef } from "react";

import type { GetStaticPaths, GetStaticProps } from "next";

import { api } from "@/api";

import { Meta } from "@/components/meta";
import { OpenGraph } from "@/components/open-graph";

import { SKNI_KOD, SKNI_KOD_ABBREVIATION } from "@/constants/strings";

import { serializeMdx } from "@/content/mdx/serialize";
import { Post } from "@/content/post";
import { getPostImage } from "@/content/post/image";

import { slugPropertySchema } from "@/schemas/post";

import { getSsg } from "@/server/api/ssg";
import { findPostBySlug, findPosts } from "@/server/database/post";

import type { InferGetStaticProps } from "@/types";

export const getStaticPaths = (async () => {
  const paths = (await findPosts({ public: true })).map(({ slug }) => ({
    params: { slug },
  }));

  return {
    fallback: "blocking",
    paths,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const result = slugPropertySchema.safeParse(params);

  if (!result.success) {
    return {
      notFound: true,
    };
  }

  const { slug } = result.data;

  const ssg = getSsg();
  await ssg.post.find.bySlug.prefetch({ slug });
  const post = await findPostBySlug({ slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  // const katex = /\$.+?\$|\$\$\n.+?\n\$\$/g.test(post.body);

  const source = await serializeMdx(post.body);

  return {
    props: {
      slug,
      source,
      trpcState: ssg.dehydrate(),
    },
  };
}) satisfies GetStaticProps;

const PostPage = ({
  slug,
  source,
}: InferGetStaticProps<typeof getStaticProps>) => {
  const trpcContext = api.useContext();
  const { data: post } = api.post.find.bySlug.useQuery({ slug });
  const { mutate } = api.post.update.views.increment.useMutation({
    onSettled: async () => {
      await trpcContext.post.find.bySlug.invalidate({ slug });
    },
  });

  const incremented = useRef(false);

  useEffect(() => {
    if (!incremented.current && post?.id) {
      mutate({ id: post.id });
      incremented.current = true;
    }
  }, [mutate, post?.id]);

  if (!post) return null;

  return (
    <>
      <Meta
        description={post.summary}
        title={`${post.title} - ${SKNI_KOD_ABBREVIATION}`}
      />
      <OpenGraph
        article={{
          author: post.authors
            .filter(Boolean)
            .map(({ user }) => user.name as string),
          publishedTime: post.publishedAt,
          section: post.category,
        }}
        og={{
          description: post.summary,
          image: [
            {
              alt: post.title,
              height: post.image?.height ?? 1200,
              url:
                post.image?.url ??
                getPostImage({
                  authors: post.authors.map(({ user }) => user),
                  title: post.title,
                }),
              width: post.image?.width ?? 2400,
            },
          ],
          locale: {
            default: "pl_PL",
          },
          siteName: SKNI_KOD,
          title: post.title,
          type: "article",
        }}
      />
      <Post
        post={{ ...post, authors: post.authors.map(({ user }) => user) }}
        source={source}
      />
    </>
  );
};

export default PostPage;
