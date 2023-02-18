import { serialize } from "next-mdx-remote/serialize";

import {
  default as rehypeAutolinkHeadings,
  type Options as RehypeAutolinkHeadingsOptions,
} from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import {
  default as rehypePrettyCode,
  type Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import dark from "./themes/dark.json";
import light from "./themes/light.json";

type RehypePrettyCodeNode = {
  children: unknown[];
  properties: {
    className: string[];
  };
};

const rehypeAutolinkHeadingsOptions: RehypeAutolinkHeadingsOptions = {
  behavior: "wrap",
};

const rehypePrettyCodeOptions: Partial<RehypePrettyCodeOptions> = {
  onVisitHighlightedLine: (node: RehypePrettyCodeNode) => {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord: (node: RehypePrettyCodeNode) => {
    node.properties.className = ["word"];
  },
  onVisitLine: (node: RehypePrettyCodeNode) => {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  theme: {
    dark,
    light,
  } as unknown as Record<string, JSON>,
};

export const serializeMdx = (source: string) =>
  serialize(source, {
    mdxOptions: {
      format: "mdx",
      rehypePlugins: [
        rehypeKatex,
        [rehypePrettyCode, rehypePrettyCodeOptions],
        rehypeSlug,
        [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
      ],
      remarkPlugins: [remarkGfm, remarkMath],
    },
  });
