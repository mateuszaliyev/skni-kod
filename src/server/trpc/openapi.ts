import { generateOpenApiDocument } from "trpc-openapi";

import { env } from "@/environment/server.mjs";

import { router } from "@/server/router";

export const openApiDocument = generateOpenApiDocument(router, {
  baseUrl: `${env.NEXT_PUBLIC_BASE_URL}/api/rest`,
  title: "SKNI KOD OpenAPI",
  version: "0.0.0",
});
