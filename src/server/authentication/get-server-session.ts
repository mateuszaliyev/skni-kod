import type { GetServerSidePropsContext } from "next";
import { getServerSession as getNextAuthServerSession } from "next-auth";

import { nextAuthOptions } from "./options";

export const getServerSession = async (
  request: GetServerSidePropsContext["req"],
  response: GetServerSidePropsContext["res"]
) => await getNextAuthServerSession(request, response, nextAuthOptions);
