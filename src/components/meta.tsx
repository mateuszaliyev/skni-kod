import NextHead from "next/head";

import { SKNI_KOD } from "@/constants/strings";

import { useUrl } from "@/hooks/url";

export type MetaProps = {
  description?: string;
  title?: string;
};

export const Meta = ({
  description = SKNI_KOD,
  title = SKNI_KOD,
}: MetaProps) => {
  const url = useUrl();

  return (
    <NextHead>
      <link href={url} rel="canonical" />
      <meta content={description} name="description" />
      <title>{title}</title>
    </NextHead>
  );
};
