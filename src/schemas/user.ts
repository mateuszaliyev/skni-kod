import { z } from "zod";

export type FindUsersSchema = z.infer<typeof findUsersSchema>;

export const findUsersSchema = z
  .object({
    deleted: z.boolean(),
  })
  .partial()
  .optional();
