import { z } from "zod";

import { idSchema } from "@/utilities/id";

export type PostCategory = (typeof POST_CATEGORIES)[number];

export type CreatePostSchema = z.infer<typeof createPostSchema>;
export type FindPostBySlugSchema = z.infer<typeof findPostBySlugSchema>;
export type FindPostSlugSchema = z.infer<typeof findPostSlugSchema>;
export type FindPostsSchema = z.infer<typeof findPostsSchema>;
export type IncrementPostViewsSchema = z.infer<typeof incrementPostViewsSchema>;
export type PostFormSchema = z.infer<typeof postFormSchema>;
export type UpdatePostByIdSchema = z.infer<typeof updatePostByIdSchema>;

export const POST_CATEGORIES = ["article", "news"] as const;

export const privatePostSchema = z.object({
  public: z.literal(false).optional(),
  publishedAt: z.date().optional(),
});

export const publicPostSchema = z.object({
  public: z.literal(true),
  publishedAt: z.date(),
});

export const imageUrlSchema = z
  .string()
  .max(767, "Adres URL obrazu nie może zawierać więcej niż 767 znaków.")
  .url();

export const slugSchema = z
  .string()
  .max(190, "Slug nie może zawierać więcej niż 190 znaków.")
  .min(1, "Slug jest wymagany.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug może zawierać wyłącznie małe litery, cyfry oraz łącznik."
  );

export const slugPropertySchema = z.object({
  slug: slugSchema,
});

const createPostSchemaBase = z.object({
  authors: z
    .object({
      userId: idSchema,
    })
    .array()
    .min(1),
  body: z.string().min(1, "Treść jest wymagana."),
  category: z.enum(POST_CATEGORIES),
  image: z
    .object({
      height: z.number().min(1),
      url: imageUrlSchema,
      width: z.number().min(1),
    })
    .optional(),
  slug: slugSchema,
  summary: z
    .string()
    .max(900, "Podsumowanie nie może zawierać więcej niż 900 znaków.")
    .min(1, "Podsumowanie jest wymagane."),
  title: z
    .string()
    .max(190, "Tytuł nie może zawierać więcej niż 190 znaków.")
    .min(1, "Tytuł jest wymagany."),
});

export const createPostSchema = z.union([
  createPostSchemaBase.merge(publicPostSchema),
  createPostSchemaBase.merge(privatePostSchema),
]);

export const findPostBySlugSchema = slugPropertySchema;

export const findPostSlugSchema = slugPropertySchema;

export const findPostsSchema = z
  .object({
    category: z.enum(POST_CATEGORIES),
    public: z.boolean(),
  })
  .partial()
  .optional();

export const incrementPostViewsSchema = z.object({
  id: idSchema,
});

export const postFormSchema = createPostSchemaBase
  .pick({
    body: true,
    category: true,
    slug: true,
    summary: true,
    title: true,
  })
  .extend({
    authors: z
      .object({
        id: idSchema,
        image: z.string().optional(),
        name: z.string().optional(),
      })
      .array()
      .min(1, "Co najmniej 1 autor jest wymagany."),
    image: imageUrlSchema
      .or(z.literal(""))
      .transform((url) => url || undefined),
    public: z.boolean(),
    publishedAt: z
      .string()
      .min(1, "Data publikacji jest wymagana.")
      .transform((value) => new Date(value)),
  });

export const updatePostByIdSchemaBase = createPostSchemaBase.extend({
  id: idSchema,
});

export const updatePostByIdProcedureSchemaBase =
  updatePostByIdSchemaBase.extend({
    oldSlug: slugSchema,
  });

export const updatePostByIdProcedureSchema = z.union([
  updatePostByIdProcedureSchemaBase.merge(publicPostSchema),
  updatePostByIdProcedureSchemaBase.merge(privatePostSchema),
]);

export const updatePostByIdSchema = z.union([
  updatePostByIdSchemaBase.merge(publicPostSchema),
  updatePostByIdSchemaBase.merge(privatePostSchema),
]);
