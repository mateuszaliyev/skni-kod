import { generateOpenApiDocument } from "trpc-openapi";

import { BASE_URL } from "@/environment";

import { router } from "@/server/router";

export const openApiDocument = generateOpenApiDocument(router, {
  baseUrl: `${BASE_URL}/api/rest`,
  title: "SKNI KOD OpenAPI",
  version: "0.0.0",
});
