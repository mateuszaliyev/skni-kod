import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";

import { nextAuthOptions } from "./options";

export const getServerSession = async (
  request: GetServerSidePropsContext["req"],
  response: GetServerSidePropsContext["res"]
) => await unstable_getServerSession(request, response, nextAuthOptions);
