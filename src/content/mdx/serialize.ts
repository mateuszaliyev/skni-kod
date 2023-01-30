import { serialize } from "next-mdx-remote/serialize";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export const serializeMdx = async (source: string) =>
  await serialize(source, {
    mdxOptions: {
      format: "mdx",
      rehypePlugins: [
        rehypeCodeTitles,
        rehypeKatex,
        rehypePrism,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
          },
        ],
      ],
      remarkPlugins: [remarkGfm, remarkMath],
    },
  });
