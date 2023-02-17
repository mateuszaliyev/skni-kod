import { findUsersSchema } from "@/schemas/user";

import { procedure, router } from "@/server/api";
import { findUsers } from "@/server/database/user";

export const user = router({
  find: router({
    all: procedure
      .input(findUsersSchema)
      .query(({ input }) => findUsers(input)),
  }),
});
