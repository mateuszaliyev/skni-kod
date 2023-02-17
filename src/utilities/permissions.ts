import type { UserRole } from "@prisma/client";

export type ModeratorRole = (typeof MODERATOR_ROLES)[number];

export const MODERATOR_ROLES = [
  "ADMINISTRATOR",
  "MODERATOR",
] satisfies readonly UserRole[];

export const isAdministrator = (role?: UserRole): role is "ADMINISTRATOR" =>
  role === "ADMINISTRATOR";

export const isModerator = (role?: UserRole): role is ModeratorRole =>
  MODERATOR_ROLES.includes(role as ModeratorRole);
