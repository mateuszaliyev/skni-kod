import NextAuth from "next-auth";

import { nextAuthOptions } from "@/server/authentication";

export default NextAuth(nextAuthOptions);
