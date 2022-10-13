import { NextApiRequest, NextApiResponse } from "next";
import cors from "nextjs-cors";

import { createOpenApiNextHandler } from "trpc-openapi";

import { createContext } from "@/server/context";
import { applicationRouter } from "@/server/router";

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
