import { generateOpenApiDocument } from "trpc-openapi";

import { OPENAPI_URL } from "@/environment";

import { applicationRouter } from "@/server/router";

export const openApiDocument = generateOpenApiDocument(applicationRouter, {
  baseUrl: OPENAPI_URL,
  title: "SKNI KOD OpenAPI",
  version: "0.0.0",
});
