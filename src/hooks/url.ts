import { useRouter } from "next/router";

import { BASE_URL } from "@/environment";

export const useUrl = () => {
  const { asPath } = useRouter();

  return `${BASE_URL}${asPath}`;
};
