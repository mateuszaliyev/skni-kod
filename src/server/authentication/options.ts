import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "@/environment";

import { prisma } from "@/server/database/client";

import { PrismaAdapter } from "./adapter";

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }

      return session;
    },
  },
  pages: {
    error: "/error",
    signIn: "/",
  },
  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
};
