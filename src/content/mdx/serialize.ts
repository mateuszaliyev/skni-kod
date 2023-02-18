import { serialize } from "next-mdx-remote/serialize";

import {
  default as rehypeAutolinkHeadings,
  type Options as RehypeAutolinkHeadingsOptions,
} from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { rehypeCode } from "./code";

const rehypeAutolinkHeadingsOptions: RehypeAutolinkHeadingsOptions = {
  behavior: "wrap",
};

export const serializeMdx = (source: string) =>
  serialize(source, {
    mdxOptions: {
      format: "mdx",
      rehypePlugins: [
        rehypeKatex,
        rehypeCode,
        rehypeSlug,
        [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
      ],
      remarkPlugins: [remarkGfm, remarkMath],
    },
  });
