import type { NextApiHandler } from "next";
import cors from "nextjs-cors";

import {
  createOpenApiNextHandler,
  generateOpenApiDocument,
} from "trpc-openapi";

import { OPENAPI_URL } from "@/environment";

import { createContext } from "@/server/api";
import { applicationRouter as router } from "@/server/api/router";

export const openApiDocument = generateOpenApiDocument(router, {
  baseUrl: OPENAPI_URL,
  title: "SKNI KOD OpenAPI",
  version: "0.0.0",
});

export const openApiDocumentHandler: NextApiHandler = (_, response) =>
  response.status(200).send(openApiDocument);

export const openApiHandler: NextApiHandler = async (request, response) => {
  await cors(request, response);

  return createOpenApiNextHandler({
    createContext,
    router,
  })(request, response);
};
