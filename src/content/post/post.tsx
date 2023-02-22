import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

import { CATEGORIES } from "@/constants/strings";

import { mdxComponents } from "@/content/mdx/components";

import type { PostCategory } from "@/schemas/post";

import { LayoutContent, type LayoutContentProps } from "../layout";

export type PostProps = {
  post: Pick<
    LayoutContentProps,
    "authors" | "category" | "image" | "slug" | "title"
  > & {
    publishedAt?: Date;
  };
  preview?: boolean;
  source: MDXRemoteSerializeResult;
};

export const Post = ({ post, preview, source }: PostProps) => (
  <LayoutContent
    authors={post.authors}
    category={CATEGORIES[post.category as PostCategory]}
    date={post.publishedAt}
    image={post.image}
    preview={preview}
    slug={post.slug}
    title={post.title}
  >
    <div className="prose prose-gray mx-auto dark:prose-invert lg:prose-lg xl:prose-xl prose-p:text-gray-700 prose-p:before:content-none prose-blockquote:not-italic prose-blockquote:text-gray-500 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-pre:!m-0 prose-pre:bg-transparent dark:prose-p:text-gray-400 lg:prose-pre:rounded-xl xl:prose-pre:rounded-xl">
      <MDXRemote components={mdxComponents} {...source} />
    </div>
  </LayoutContent>
);
