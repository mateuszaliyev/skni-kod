import { z } from "zod";

import { getPostByType, getPostByTypeOutput } from "@/server/repository/post";

import { createRouter } from "./create";

export const articleRouter = createRouter().query("getAll", {
  input: z.void(),
  meta: {
    openapi: {
      enabled: true,
      method: "GET",
      path: "/articles",
    },
  },
  output: getPostByTypeOutput,
  resolve: async () => await getPostByType("article"),
});
