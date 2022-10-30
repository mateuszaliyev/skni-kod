import type { Adapter } from "next-auth/adapters";

import type { PrismaClient } from "@prisma/client";
import type { PrismaClientKnownRequestError } from "@prisma/client/runtime";

import { generateId } from "@/utilities/generate-id";

export const PrismaAdapter = (prisma: PrismaClient): Adapter => ({
  createSession: async (session) => {
    const result = await prisma.session.create({
      data: {
        expiresAt: session.expires,
        publicId: await generateId(),
        sessionToken: session.sessionToken,
        user: {
          connect: {
            publicId: session.userId,
          },
        },
      },
      select: {
        expiresAt: true,
        publicId: true,
        sessionToken: true,
        user: {
          select: {
            publicId: true,
          },
        },
      },
    });

    return {
      expires: result.expiresAt,
      id: result.publicId,
      sessionToken: result.sessionToken,
      userId: result.user.publicId,
    };
  },
  createUser: async ({ email, emailVerified, image, name }) => {
    const result = await prisma.user.create({
      data: {
        email,
        emailVerifiedAt: emailVerified,
        image,
        name,
        publicId: await generateId(),
      },
      select: {
        email: true,
        emailVerifiedAt: true,
        image: true,
        name: true,
        publicId: true,
      },
    });

    return {
      email: result.email ?? email,
      emailVerified: result.emailVerifiedAt,
      id: result.publicId,
      image: result.image,
      name: result.name,
    };
  },
  createVerificationToken: async (data) => {
    const verificationToken = await prisma.verificationToken.create({
      data,
    });

    return verificationToken;
  },
  deleteSession: async (sessionToken) => {
    await prisma.session.delete({
      where: {
        sessionToken,
      },
    });
  },
  deleteUser: async (publicId) => {
    await prisma.user.updateMany({
      data: {
        deletedAt: new Date(),
      },
      where: {
        deletedAt: {
          equals: null,
        },
        publicId,
      },
    });
  },
  getSessionAndUser: async (sessionToken) => {
    const result = await prisma.session.findFirst({
      select: {
        expiresAt: true,
        publicId: true,
        sessionToken: true,
        user: {
          select: {
            email: true,
            emailVerifiedAt: true,
            image: true,
            name: true,
            publicId: true,
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

    return {
      session: {
        expires: result.expiresAt,
        id: result.publicId,
        sessionToken: result.sessionToken,
        userId: result.user.publicId,
      },
      user: {
        email: result.user.email ?? "",
        emailVerified: result.user.emailVerifiedAt,
        id: result.user.publicId,
        image: result.user.image,
        name: result.user.name,
      },
    };
  },
  getUser: async (publicId) => {
    const result = await prisma.user.findFirst({
      select: {
        email: true,
        emailVerifiedAt: true,
        image: true,
        name: true,
        publicId: true,
      },
      where: {
        deletedAt: {
          equals: null,
        },
        publicId,
      },
    });

    if (!result) {
      return null;
    }

    return {
      email: result.email ?? "",
      emailVerified: result.emailVerifiedAt,
      id: result.publicId,
      image: result.image,
      name: result.name,
    };
  },
  getUserByAccount: async ({ provider, providerAccountId }) => {
    const result = await prisma.account.findFirst({
      select: {
        user: {
          select: {
            email: true,
            emailVerifiedAt: true,
            image: true,
            name: true,
            publicId: true,
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

    return {
      email: result.user.email ?? "",
      emailVerified: result.user.emailVerifiedAt,
      id: result.user.publicId,
      image: result.user.image,
      name: result.user.name,
    };
  },
  getUserByEmail: async (email) => {
    const result = await prisma.user.findFirst({
      select: {
        email: true,
        emailVerifiedAt: true,
        image: true,
        name: true,
        publicId: true,
      },
      where: {
        deletedAt: {
          equals: null,
        },
        email,
      },
    });

    if (!result) {
      return null;
    }

    return {
      email: result.email ?? email,
      emailVerified: result.emailVerifiedAt,
      id: result.publicId,
      image: result.image,
      name: result.name,
    };
  },
  linkAccount: async (account) => {
    await prisma.account.create({
      data: {
        accessToken: account.access_token,
        expiresAt: account.expires_at,
        idToken: account.id_token,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        publicId: await generateId(),
        refreshToken: account.refresh_token,
        scope: account.scope,
        sessionState: account.session_state,
        tokenType: account.token_type,
        type: account.type,
        user: {
          connect: {
            publicId: account.userId,
          },
        },
      },
    });
  },
  unlinkAccount: async ({ provider, providerAccountId }) => {
    await prisma.account.updateMany({
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
    });
  },
  updateSession: async (session) => {
    const result = await prisma.session.update({
      data: {
        expiresAt: session.expires,
      },
      select: {
        expiresAt: true,
        publicId: true,
        sessionToken: true,
        user: {
          select: {
            publicId: true,
          },
        },
      },
      where: {
        sessionToken: session.sessionToken,
      },
    });

    return {
      expires: result.expiresAt,
      id: result.publicId,
      sessionToken: result.sessionToken,
      userId: result.user.publicId,
    };
  },
  updateUser: async (user) => {
    const result = await prisma.user.update({
      data: {
        email: user.email,
        emailVerifiedAt: user.emailVerified,
        image: user.image,
        name: user.name,
      },
      select: {
        email: true,
        emailVerifiedAt: true,
        image: true,
        name: true,
        publicId: true,
      },
      where: {
        publicId: user.id,
      },
    });

    return {
      email: result.email ?? "",
      emailVerified: result.emailVerifiedAt,
      id: result.publicId,
      image: result.image,
      name: result.name,
    };
  },
  useVerificationToken: async (identifier_token) => {
    try {
      const verificationToken = await prisma.verificationToken.delete({
        where: {
          identifier_token,
        },
      });

      return verificationToken;
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
