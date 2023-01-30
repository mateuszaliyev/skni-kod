import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import { mdxComponents } from "@/content/mdx/components";

import { LayoutContent, type LayoutContentProps } from "./layout";

export type PostProps = {
  post: Pick<LayoutContentProps, "authors" | "image" | "slug" | "title"> & {
    publishedAt?: Date;
  };
  preview?: boolean;
  source: MDXRemoteSerializeResult;
};

export const Post = ({ post, preview, source }: PostProps) => (
  <LayoutContent
    authors={post.authors}
    date={post.publishedAt}
    image={post.image}
    preview={preview}
    slug={post.slug}
    title={post.title}
  >
    <div className="prose prose-gray grid grid-cols-1 prose-p:before:content-none prose-blockquote:not-italic prose-blockquote:text-gray-500 prose-pre:flex prose-pre:border prose-pre:border-gray-200 prose-pre:bg-transparent prose-pre:text-inherit selection:prose-pre:bg-gray-300 selection:prose-pre:text-inherit dark:prose-invert dark:prose-pre:border-gray-700 dark:selection:prose-pre:bg-gray-700 lg:prose-lg xl:prose-xl">
      <MDXRemote components={mdxComponents} {...source} />
    </div>
  </LayoutContent>
);
