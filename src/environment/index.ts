/* Client */

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "");

export const OPENAPI_URL = `${BASE_URL}/api/openapi`;

export const SKNI_KOD_FACEBOOK = process.env.NEXT_PUBLIC_SKNI_KOD_FACEBOOK;
export const SKNI_KOD_GITHUB = process.env.NEXT_PUBLIC_SKNI_KOD_GITHUB;
export const SKNI_KOD_INSTAGRAM = process.env.NEXT_PUBLIC_SKNI_KOD_INSTAGRAM;

export const TRPC_URL =
  typeof window !== "undefined" ? "/api/trpc" : `${BASE_URL}/api/trpc`;

/* Server */

export const ANALYZE_BUNDLE = process.env.ANALYZE_BUNDLE;

export const DATABASE_URL = process.env.DATABASE_URL;

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL ?? BASE_URL;

export const NODE_ENV = process.env.NODE_ENV;
