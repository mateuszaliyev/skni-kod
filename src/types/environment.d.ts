declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ANALYZE_BUNDLE?: string;
      DATABASE_URL: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_SKNI_KOD_FACEBOOK: string;
      NEXT_PUBLIC_SKNI_KOD_GITHUB: string;
      NEXT_PUBLIC_SKNI_KOD_INSTAGRAM: string;
      NEXTAUTH_SECRET: string;
    }
  }
}

export {};
