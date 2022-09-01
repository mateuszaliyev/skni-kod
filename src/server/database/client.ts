import { PrismaClient } from "@prisma/client";

import { NODE_ENV } from "@/environment";

declare global {
  /* eslint-disable-next-line no-var */
  var prisma: PrismaClient | undefined;
}

/**
 * @see {@link https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution Best practice for instantiating PrismaClient with Next.js}
 */
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: NODE_ENV === "development" ? ["error", "query", "warn"] : ["error"],
  });

if (NODE_ENV !== "production") {
  global.prisma = prisma;
}
