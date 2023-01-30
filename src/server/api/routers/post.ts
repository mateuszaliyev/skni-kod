import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { serializeMdx } from "@/content/mdx/serialize";

import {
  checkSlugAvailabilitySchema,
  createPostSchema,
  findPostBySlugSchema,
  findPostsSchema,
  incrementPostViewsSchema,
  updatePostByIdSchema,
} from "@/schemas/post";

import { moderatorProcedure, procedure, router } from "@/server/api";
import {
  checkSlugAvailability,
  createPost,
  findPostBySlug,
  findPosts,
  incrementPostViews,
  updatePostById,
} from "@/server/database/post";

export const post = router({
  checkSlugAvailability: moderatorProcedure
    .input(checkSlugAvailabilitySchema)
    .query(
      ({ input }) => input.slug !== "nowy" && checkSlugAvailability(input)
    ),
  create: moderatorProcedure
    .input(createPostSchema)
    .mutation(({ input }) => createPost(input)),
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
  }),
  serialize: moderatorProcedure
    .input(z.object({ body: z.string() }))
    .query(async ({ input }) => await serializeMdx(input.body)),
  update: router({
    byId: moderatorProcedure
      .input(updatePostByIdSchema)
      .mutation(({ input }) => {
        const result = updatePostById(input);
        return result;
      }),
    views: router({
      increment: procedure
        .input(incrementPostViewsSchema)
        .mutation(({ input }) => incrementPostViews(input)),
    }),
  }),
});
