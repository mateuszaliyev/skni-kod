import type { FindUsersSchema } from "@/schemas/user";

import { prisma } from "@/server/database/client";

import { nullToUndefined } from "@/utilities/null-to-undefined";

export const findUsers = async ({ deleted }: FindUsersSchema = {}) =>
  nullToUndefined(
    await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        image: true,
        name: true,
      },
      where: {
        deletedAt: deleted ? undefined : null,
      },
    })
  );
