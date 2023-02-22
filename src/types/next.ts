import type { GetStaticProps, InferGetStaticPropsType } from "next";

export type InferGetStaticProps<GetStaticPropsFunction extends GetStaticProps> =
  Omit<InferGetStaticPropsType<GetStaticPropsFunction>, "trpcState">;
