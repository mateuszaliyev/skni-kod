import type { Adapter } from "next-auth/adapters";

import type { PrismaClient } from "@prisma/client";
import type { PrismaClientKnownRequestError } from "@prisma/client/runtime";

import { generateId } from "@/utilities/generate-id";

export const PrismaAdapter = (prisma: PrismaClient): Adapter => ({
  createSession: async (session) =>
    await prisma.session.create({
      data: {
        ...session,
        id: await generateId(),
      },
      select: {
        expires: true,
        id: true,
        sessionToken: true,
        userId: true,
      },
    }),
  createUser: async (user) => {
    const { email, ...result } = await prisma.user.create({
      data: {
        ...user,
        id: await generateId(),
      },
      select: {
        email: true,
        emailVerified: true,
        id: true,
        image: true,
        name: true,
      },
    });

    return {
      ...result,
      email: email ?? user.email,
    };
  },
  createVerificationToken: async (data) =>
    await prisma.verificationToken.create({
      data,
    }),
  deleteSession: async (sessionToken) =>
    await prisma.session.delete({
      where: {
        sessionToken,
      },
    }),
  deleteUser: async (id) => {
    await prisma.user.updateMany({
      data: {
        deletedAt: new Date(),
      },
      where: {
        deletedAt: {
          equals: null,
        },
        id,
      },
    });
  },
  getSessionAndUser: async (sessionToken) => {
    const result = await prisma.session.findFirst({
      select: {
        expires: true,
        id: true,
        sessionToken: true,
        user: {
          select: {
            email: true,
            emailVerified: true,
            id: true,
            image: true,
            name: true,
          },
        },
        userId: true,
      },
      where: {
        sessionToken,
        user: {
          deletedAt: {
            equals: null,
          },
        },
      },
    });

    if (!result) {
      return null;
    }

    const {
      user: { email, ...user },
      ...session
    } = result;

    return {
      session,
      user: {
        ...user,
        email: email ?? "",
      },
    };
  },
  getUser: async (id) => {
    const result = await prisma.user.findFirst({
      select: {
        email: true,
        emailVerified: true,
        id: true,
        image: true,
        name: true,
      },
      where: {
        deletedAt: {
          equals: null,
        },
        id,
      },
    });

    if (!result) {
      return null;
    }

    const { email, ...user } = result;

    return {
      ...user,
      email: email ?? "",
    };
  },
  getUserByAccount: async ({ provider, providerAccountId }) => {
    const result = await prisma.account.findFirst({
      select: {
        user: {
          select: {
            email: true,
            emailVerified: true,
            id: true,
            image: true,
            name: true,
          },
        },
      },
      where: {
        deletedAt: {
          equals: null,
        },
        provider,
        providerAccountId,
        user: {
          deletedAt: {
            equals: null,
          },
        },
      },
    });

    if (!result) {
      return null;
    }

    const {
      user: { email, ...user },
    } = result;

    return {
      ...user,
      email: email ?? "",
    };
  },
  getUserByEmail: async (email) => {
    const user = await prisma.user.findFirst({
      select: {
        email: true,
        emailVerified: true,
        id: true,
        image: true,
        name: true,
      },
      where: {
        deletedAt: {
          equals: null,
        },
        email,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      email: user.email ?? email,
    };
  },
  linkAccount: async ({
    access_token,
    expires_at,
    id_token,
    refresh_token,
    session_state,
    token_type,
    ...account
  }) =>
    void (await prisma.account.create({
      data: {
        ...account,
        accessToken: access_token,
        expiresAt: expires_at,
        id: await generateId(),
        idToken: id_token,
        refreshToken: refresh_token,
        sessionState: session_state,
        tokenType: token_type,
      },
    })),
  unlinkAccount: async ({ provider, providerAccountId }) =>
    void (await prisma.account.updateMany({
      data: {
        deletedAt: new Date(),
      },
      where: {
        deletedAt: {
          equals: null,
        },
        provider,
        providerAccountId,
      },
    })),
  updateSession: async (session) =>
    await prisma.session.update({
      data: {
        expires: session.expires,
      },
      select: {
        expires: true,
        id: true,
        sessionToken: true,
        userId: true,
      },
      where: {
        sessionToken: session.sessionToken,
      },
    }),
  updateUser: async ({ id, ...data }) => {
    const user = await prisma.user.update({
      data,
      select: {
        email: true,
        emailVerified: true,
        id: true,
        image: true,
        name: true,
      },
      where: {
        id,
      },
    });

    return {
      ...user,
      email: user.email ?? "",
    };
  },
  useVerificationToken: async (identifier_token) => {
    try {
      return await prisma.verificationToken.delete({
        where: {
          identifier_token,
        },
      });
    } catch (error) {
      /**
       * If token already used/deleted, just return null.
       * @see {@link https://www.prisma.io/docs/reference/api-reference/error-reference#p2025 Prisma Error Reference}
       */
      if ((error as PrismaClientKnownRequestError).code === "P2025") {
        return null;
      }

      throw error;
    }
  },
});
