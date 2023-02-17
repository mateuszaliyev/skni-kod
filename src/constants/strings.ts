import type { UserRole } from "@prisma/client";

import type { PostCategory } from "@/schemas/post";

export const CATEGORIES: Record<PostCategory, string> = {
  article: "Artykuł",
  news: "Aktualności",
};

export const POLISH_LOCALE_IDENTIFIER = "pl";

export const ROLES: Record<UserRole, string> = {
  ADMINISTRATOR: "Administrator",
  MEMBER: "Członek",
  MODERATOR: "Moderator",
  USER: "Użytkownik",
};

export const SKNI_KOD = 'Studenckie Koło Naukowe Informatyków "KOD"';
export const SKNI_KOD_ABBREVIATION = "SKNI KOD";

export const viewsPlural = (views: number) => {
  const rule = new Intl.PluralRules(POLISH_LOCALE_IDENTIFIER).select(views);

  switch (rule) {
    case "few":
      return "Wyświetlenia";
    case "one":
      return "Wyświetlenie";
    default:
      return "Wyświetleń";
  }
};
