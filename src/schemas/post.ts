import { z } from "zod";

import { idSchema } from "@/utilities/id";

export type PostCategory = (typeof POST_CATEGORIES)[number];

export type CheckSlugAvailabilitySchema = z.infer<
  typeof checkSlugAvailabilitySchema
>;
export type CreatePostSchema = z.infer<typeof createPostSchema>;
export type FindPostBySlugSchema = z.infer<typeof findPostBySlugSchema>;
export type FindPostsSchema = z.infer<typeof findPostsSchema>;
export type IncrementPostViewsSchema = z.infer<typeof incrementPostViewsSchema>;
export type PostFormSchema = z.infer<typeof postFormSchema>;
export type UpdatePostByIdSchema = z.infer<typeof updatePostByIdSchema>;

export const POST_CATEGORIES = ["article", "news"] as const;

export const slugSchema = z
  .string()
  .min(1, "Slug jest wymagany.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug może zawierać wyłącznie małe litery, cyfry oraz łącznik."
  );

export const slugPropertySchema = z.object({
  slug: slugSchema,
});

export const checkSlugAvailabilitySchema = slugPropertySchema;

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
      url: z.string().url(),
      width: z.number().min(1),
    })
    .optional(),
  slug: slugSchema,
  summary: z
    .string()
    .max(900, "Pdsumowanie nie może zawierać więcej niż 900 znaków.")
    .min(1, "Podsumowanie jest wymagane."),
  title: z.string().min(1, "Tytuł jest wymagany."),
});

export const createPostSchema = z.union([
  createPostSchemaBase.merge(
    z.object({
      public: z.literal(true),
      publishedAt: z.date(),
    })
  ),
  createPostSchemaBase.merge(
    z.object({
      public: z.literal(false).optional(),
      publishedAt: z.date().optional(),
    })
  ),
]);

export const findPostBySlugSchema = slugPropertySchema;

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
    image: z
      .string()
      .url("Nieprawidłowy adres URL.")
      .or(z.literal(""))
      .transform((url) => url || undefined),
    public: z.boolean(),
    publishedAt: z.date({
      errorMap: () => ({ message: "Data publikacji jest wymagana." }),
    }),
  });

export const updatePostByIdSchemaBase = createPostSchemaBase.extend({
  id: idSchema,
});

export const updatePostByIdSchema = z.union([
  updatePostByIdSchemaBase.merge(
    z.object({
      public: z.literal(true),
      publishedAt: z.date(),
    })
  ),
  updatePostByIdSchemaBase.merge(
    z.object({
      public: z.literal(false).optional(),
      publishedAt: z.date().optional(),
    })
  ),
]);
