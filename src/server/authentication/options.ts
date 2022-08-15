import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { env } from "@/environment/server.mjs";

import { prisma } from "@/server/database/client";

import { PrismaAdapter } from "./adapter";

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
  pages: {
    error: "/error",
    signIn: "/sign-in",
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
};
