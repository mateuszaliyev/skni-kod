import type {
  CheckSlugAvailabilitySchema,
  CreatePostSchema,
  FindPostBySlugSchema,
  FindPostsSchema,
  IncrementPostViewsSchema,
  UpdatePostByIdSchema,
} from "@/schemas/post";

import { prisma } from "@/server/database/client";

import { generateId } from "@/utilities/id";
import { nullToUndefined } from "@/utilities/null-to-undefined";

export const checkSlugAvailability = async ({
  slug,
}: CheckSlugAvailabilitySchema) =>
  !(await prisma.post.findUnique({
    where: {
      slug,
    },
  }));

export const createPost = async ({
  authors,
  image,
  ...post
}: CreatePostSchema) =>
  nullToUndefined(
    await prisma.post.create({
      data: {
        ...post,
        authors: {
          create: await Promise.all(
            authors.map(async ({ userId }) => ({
              id: await generateId(),
              userId,
            }))
          ),
        },
        id: await generateId(),
        image: image
          ? {
              connectOrCreate: {
                create: {
                  height: image.height,
                  id: await generateId(),
                  url: image.url,
                  width: image.width,
                },
                where: {
                  url: image.url,
                },
              },
            }
          : undefined,
      },
      select: {
        authors: {
          select: {
            user: {
              select: {
                id: true,
                image: true,
                name: true,
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
        body: true,
        category: true,
        createdAt: true,
        id: true,
        image: {
          select: {
            height: true,
            id: true,
            url: true,
            width: true,
          },
        },
        public: true,
        publishedAt: true,
        slug: true,
        summary: true,
        title: true,
        views: true,
      },
    })
  );

export const findPostBySlug = async ({ slug }: FindPostBySlugSchema) =>
  nullToUndefined(
    await prisma.post.findFirst({
      select: {
        authors: {
          select: {
            user: {
              select: {
                id: true,
                image: true,
                name: true,
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
        body: true,
        category: true,
        id: true,
        image: {
          select: {
            height: true,
            id: true,
            url: true,
            width: true,
          },
        },
        public: true,
        publishedAt: true,
        slug: true,
        summary: true,
        title: true,
        updatedAt: true,
        views: true,
      },
      where: {
        deletedAt: null,
        slug,
      },
    })
  );

export const findPosts = async ({
  category,
  public: isPublic,
}: FindPostsSchema = {}) =>
  nullToUndefined(
    await prisma.post.findMany({
      orderBy: {
        publishedAt: "desc",
      },
      select: {
        authors: {
          select: {
            user: {
              select: {
                id: true,
                image: true,
                name: true,
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
        category: true,
        id: true,
        image: {
          select: {
            height: true,
            id: true,
            url: true,
            width: true,
          },
        },
        publishedAt: true,
        slug: true,
        summary: true,
        title: true,
        views: true,
      },
      where: {
        category,
        deletedAt: null,
        public: isPublic,
      },
    })
  );

export const incrementPostViews = async ({ id }: IncrementPostViewsSchema) =>
  nullToUndefined(
    await prisma.post.update({
      data: {
        views: {
          increment: 1,
        },
      },
      where: {
        id,
      },
    })
  );

export const updatePostById = async ({
  authors,
  id,
  image,
  ...post
}: UpdatePostByIdSchema) =>
  await prisma.$transaction(async (transaction) => {
    await Promise.all(
      authors.map(async ({ userId }) =>
        transaction.authorship.upsert({
          create: {
            id: await generateId(),
            postId: id,
            userId,
          },
          update: {
            deletedAt: null,
          },
          where: {
            postId_userId: {
              postId: id,
              userId,
            },
          },
        })
      )
    );

    return nullToUndefined(
      await transaction.post.update({
        data: {
          ...post,
          authors: {
            updateMany: [
              {
                data: {
                  deletedAt: new Date(),
                },
                where: {
                  userId: {
                    notIn: authors.map(({ userId }) => userId),
                  },
                },
              },
              {
                data: {
                  deletedAt: null,
                },
                where: {
                  userId: {
                    in: authors.map(({ userId }) => userId),
                  },
                },
              },
            ],
          },
          id: await generateId(),
          image: {
            connectOrCreate: image
              ? {
                  create: {
                    height: image.height,
                    id: await generateId(),
                    url: image.url,
                    width: image.width,
                  },
                  where: {
                    url: image.url,
                  },
                }
              : undefined,
            disconnect: image ? undefined : true,
          },
        },
        select: {
          authors: {
            select: {
              user: {
                select: {
                  id: true,
                  image: true,
                  name: true,
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
          body: true,
          category: true,
          createdAt: true,
          id: true,
          image: {
            select: {
              height: true,
              id: true,
              url: true,
              width: true,
            },
          },
          public: true,
          publishedAt: true,
          slug: true,
          summary: true,
          title: true,
          views: true,
        },
        where: {
          id,
        },
      })
    );
  });
