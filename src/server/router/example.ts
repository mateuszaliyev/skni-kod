import { z } from "zod";

import { createRouter } from "./create";

export const exampleRouter = createRouter().query("hello", {
  input: z.object({
    text: z.string(),
  }),
  meta: {
    openapi: {
      enabled: true,
      method: "GET",
      path: "/example/hello",
    },
  },
  output: z.object({
    greeting: z.string(),
  }),
  resolve: ({ input }) => {
    return {
      greeting: `Hello ${input?.text ?? "world"}`,
    };
  },
});
