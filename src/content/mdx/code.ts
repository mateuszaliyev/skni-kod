/**
 * TODO: Simplify this solution using `experimental.outputFileTracingIncludes`
 * when released.
 *
 * @see {@link https://nextjs.org/docs/advanced-features/output-file-tracing#caveats Output File Tracing Caveats}
 * @see {@link https://github.com/vercel/next.js/pull/44605 Add top-level trace include/exclude config}
 */

import { readdir } from "fs/promises";
import { join } from "path";

import type { serialize } from "next-mdx-remote/serialize";

import {
  default as rehypePrettyCode,
  type Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import { getHighlighter, type HighlighterOptions } from "shiki";

import dark from "./themes/dark.json";
import light from "./themes/light.json";

type RehypeCode = NonNullable<
  NonNullable<
    NonNullable<Parameters<typeof serialize>[1]>["mdxOptions"]
  >["rehypePlugins"]
>[number];

type RehypePrettyCodeNode = {
  children: unknown[];
  properties: {
    className: string[];
  };
};

let shikiPathRead = false;

/**
 * Shiki loads languages and themes using `fs` instead of `import`, so Next.js
 * doesn't bundle them into production build. To work around, those files are
 * copied over to the source code (`./src/content/mdx/shiki/*`) and the `paths`
 * are updated accordingly.
 *
 * Note that they are only referenced on server side.
 * @see {@link https://github.com/shikijs/shiki/issues/138#issuecomment-1057471160 Usage with Next.js SSR}
 * @see {@link https://github.com/thien-do/memos.pub/blob/a3babb1f149f05c43012278331f885d81f5fcfac/lib/mdx/plugins/code.ts Sample code}
 */
const getShikiPath = () => join(process.cwd(), "./src/content/mdx/shiki");

/**
 * Read the Shiki assets so that Vercel will include them in the production
 * bundle. This is required because shiki itself dynamically access these
 * files, so Vercel doesn't know about them by default.
 *
 * `readdir` can be fired once and forgotten
 */
const readShikiPath = async () => {
  if (shikiPathRead) return;
  await readdir(getShikiPath());
  shikiPathRead = true;
};

const rehypePrettyCodeOptions: Partial<RehypePrettyCodeOptions> = {
  getHighlighter: async (options) => {
    await readShikiPath();

    /**
     * This is technically not compatible with shiki's interface but necessary
     * for `rehype-pretty-code` to work.
     *
     * @see {@link https://rehype-pretty-code.netlify.app/ Rehype Pretty Code (Custom Highlighter section)}
     */
    return getHighlighter({
      ...(options as HighlighterOptions),
      paths: {
        languages: `${getShikiPath()}/languages/`,
        themes: `${getShikiPath()}/themes/`,
      },
    });
  },
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

export const rehypeCode: RehypeCode = [
  rehypePrettyCode,
  rehypePrettyCodeOptions,
];
