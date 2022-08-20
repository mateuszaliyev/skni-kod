import { useRouter } from "next/router";

import { env } from "@/environment/client.mjs";

export const useUrl = () => {
  const { asPath } = useRouter();

  return `${env.NEXT_PUBLIC_BASE_URL}${asPath}`;
};
