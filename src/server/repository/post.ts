import { z } from "zod";

import { prisma } from "@/server/database/client";

import { fromModel } from "@/utilities/from-model";

export type PostType = typeof POST_TYPES[number];

export const POST_TYPES = ["article", "news"] as const;

export const getPostByType = async (type: PostType) =>
  fromModel(
    await prisma.post.findMany({
      select: {
        authors: {
          select: {
            user: {
              select: {
                image: true,
                name: true,
                publicId: true,
              },
            },
          },
          where: {
            deletedAt: null,
            user: {
              deletedAt: null,
            },
          },
        },
        contents: {
          select: {
            locale: true,
            publicId: true,
            slug: true,
            summary: true,
            title: true,
          },
          where: {
            deletedAt: {
              equals: null,
            },
          },
        },
        image: true,
        publicId: true,
        publishedAt: true,
        views: true,
      },
      where: {
        deletedAt: null,
        type,
      },
    })
  );

export const getPostByTypeOutput = z
  .object({
    authors: z
      .object({
        user: z.object({
          id: z.string(),
          image: z.string().nullable(),
          name: z.string().nullable(),
        }),
      })
      .array(),
    contents: z
      .object({
        id: z.string(),
        locale: z.string(),
        slug: z.string(),
        summary: z.string(),
        title: z.string(),
      })
      .array(),
    id: z.string(),
    image: z.string().nullable(),
    publishedAt: z.date().nullable(),
    views: z.bigint(),
  })
  .array();
