import { PrismaClient } from "@prisma/client";

import { env } from "@/environment/server.mjs";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * @see {@link https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution Best practice for instantiating PrismaClient with Next.js}
 */
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
