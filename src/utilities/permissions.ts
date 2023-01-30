import { UserRole } from "@prisma/client";

export const isAdministrator = (role?: UserRole) => role === "ADMINISTRATOR";

export const isModerator = (role?: UserRole) =>
  role === "ADMINISTRATOR" || role === "MODERATOR";
