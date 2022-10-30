import { type NextApiRequest, type NextApiResponse } from "next";
import cors from "nextjs-cors";

import { createOpenApiNextHandler } from "trpc-openapi";

import { applicationRouter } from "@/server/router";
import { createContext } from "@/server/trpc/context";

const openApiHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  await cors(request, response);

  return createOpenApiNextHandler({
    createContext,
    router: applicationRouter,
  })(request, response);
};

export default openApiHandler;
