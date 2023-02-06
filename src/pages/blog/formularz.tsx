import type { GetServerSideProps } from "next";

import { api } from "@/api";

import { Meta } from "@/components/meta";

import { SKNI_KOD_ABBREVIATION } from "@/constants/strings";

import { PostForm } from "@/content/post/form";

import { useRouter } from "@/hooks/router";

import { PostCategory } from "@/schemas/post";

import { getServerSession } from "@/server/authentication";

import { isModerator } from "@/utilities/permissions";

export const getServerSideProps = (async ({ req, res }) => {
  const session = await getServerSession(req, res);

  if (!isModerator(session?.user?.role)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      session,
    },
  };
}) satisfies GetServerSideProps;

const PostFormPage = () => {
  const { query } = useRouter();

  const hasSlug = Boolean(query.slug && typeof query.slug === "string");

  const { data: post } = api.post.find.bySlug.useQuery(
    { slug: query.slug as string },
    { enabled: hasSlug }
  );

  if (hasSlug && !post) return null;

  return (
    <>
      <Meta
        title={`${post ? "Edytuj" : "Nowy"} post - ${SKNI_KOD_ABBREVIATION}`}
      />
      {post ? (
        <PostForm
          defaultValues={{
            authors:
              post.authors.map(({ user }) => ({
                id: user.id,
                image: user.image as string,
                name: user.name as string,
              })) ?? [],
            body: post.body,
            category: (post.category as PostCategory) ?? "article",
            image: post.image?.url,
            public: post.public ?? false,
            publishedAt: post.publishedAt
              ? (post.publishedAt.toISOString().slice(0, 10) as unknown as Date)
              : undefined,
            slug: post.slug,
            summary: post.summary,
            title: post.title,
          }}
          id={post.id}
          slug={post.slug}
        />
      ) : (
        <PostForm
          defaultValues={{
            authors: [],
            category: "article",
            public: false,
          }}
        />
      )}
    </>
  );
};

export default PostFormPage;
