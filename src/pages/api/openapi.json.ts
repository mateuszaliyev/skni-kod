import type { NextApiHandler } from "next";

import { openApiDocument } from "@/server/trpc/openapi";

const openApiDocumentHandler: NextApiHandler = (_request, response) =>
  response.status(200).send(openApiDocument);

export default openApiDocumentHandler;
