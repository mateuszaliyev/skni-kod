import { z } from "zod";

import { getPostByType, getPostByTypeOutput } from "@/server/repository/post";

import { createRouter } from "./create";

export const newsRouter = createRouter().query("getAll", {
  input: z.void(),
  meta: {
    openapi: {
      enabled: true,
      method: "GET",
      path: "/news",
    },
  },
  output: getPostByTypeOutput,
  resolve: async () => await getPostByType("news"),
});
