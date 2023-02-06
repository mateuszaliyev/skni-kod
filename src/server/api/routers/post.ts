import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { serializeMdx } from "@/content/mdx/serialize";

import {
  createPostSchema,
  findPostBySlugSchema,
  findPostSlugSchema,
  findPostsSchema,
  incrementPostViewsSchema,
  updatePostByIdProcedureSchema,
} from "@/schemas/post";

import { moderatorProcedure, procedure, router } from "@/server/api";
import {
  createPost,
  findPostBySlug,
  findPosts,
  findPostSlug,
  incrementPostViews,
  updatePostById,
} from "@/server/database/post";

export const post = router({
  create: moderatorProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx: { response }, input }) => {
      const post = await createPost(input);
      await response.revalidate("/blog");
      await response.revalidate(`/blog/${input.slug}`);
      return post;
    }),
  find: router({
    all: procedure
      .input(findPostsSchema)
      .query(({ input }) => findPosts(input)),
    bySlug: procedure.input(findPostBySlugSchema).query(async ({ input }) => {
      const post = await findPostBySlug(input);

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return post;
    }),
    slug: moderatorProcedure
      .input(findPostSlugSchema)
      .query(({ input }) => input.slug === "formularz" || findPostSlug(input)),
  }),
  serialize: moderatorProcedure
    .input(z.object({ body: z.string() }))
    .mutation(({ input }) => serializeMdx(input.body)),
  update: router({
    byId: moderatorProcedure
      .input(updatePostByIdProcedureSchema)
      .mutation(async ({ ctx: { response }, input: { oldSlug, ...input } }) => {
        const result = await updatePostById(input);
        await response.revalidate("/blog");
        await response.revalidate(`/blog/${oldSlug}`);
        await response.revalidate(`/blog/${input.slug}`);
        return result;
      }),
    views: router({
      increment: procedure
        .input(incrementPostViewsSchema)
        .mutation(({ input }) => incrementPostViews(input)),
    }),
  }),
});
