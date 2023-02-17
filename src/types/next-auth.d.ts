import type { DefaultSession } from "next-auth";

import type { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface User {
    role: PrismaUser["role"];
  }

  interface Session {
    user?: {
      id: PrismaUser["id"];
      role: PrismaUser["role"];
    } & DefaultSession["user"];
  }
}
